import { execFile as execFileWithCallback } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { setTimeout as sleep } from 'node:timers/promises'
import { promisify } from 'node:util'

const execFile = promisify(execFileWithCallback)

export type GeminiImageModel =
  | 'gemini-3-pro-image-preview'
  | 'gemini-3.1-flash-image-preview'
  | 'gemini-2.5-flash-image'

export type GeminiImageAspectRatio =
  | '1:1'
  | '2:3'
  | '3:2'
  | '3:4'
  | '4:3'
  | '4:5'
  | '5:4'
  | '9:16'
  | '16:9'
  | '21:9'

export type GeminiImageSize = '1K' | '2K' | '4K'

export type GeminiServiceTier = 'standard' | 'flex'

export type GeneratedImageFormat = 'png' | 'webp'

export type ReferenceImageInput = {
  path: string
  mimeType?: string
}

export type GenerateGeminiImageInput = {
  apiKey: string
  prompt: string
  model: GeminiImageModel
  aspectRatio: GeminiImageAspectRatio
  imageSize: GeminiImageSize
  referenceImages?: ReferenceImageInput[]
  retryBaseDelayMs?: number
  retryMaxDelayMs?: number
  retries?: number
  serverTimeoutSeconds?: number
  serviceTier: GeminiServiceTier
  timeoutMs?: number
}

export type GeminiGeneratedImage = {
  data: string
  mimeType: string
}

export type GenerateGeminiImageResult = {
  image: GeminiGeneratedImage
  text: string[]
}

export type SavedImageAsset = {
  outputPath: string
  src: string
  mimeType: string
}

type GeminiTextPart = {
  text: string
}

type GeminiInlineDataPart = {
  inlineData: {
    data: string
    mimeType: string
  }
}

type GeminiRequestPart = GeminiTextPart | GeminiInlineDataPart

type GeminiRequestBody = {
  contents: Array<{
    role: 'user'
    parts: GeminiRequestPart[]
  }>
  generationConfig: {
    imageConfig: {
      aspectRatio: GeminiImageAspectRatio
      imageSize: GeminiImageSize
    }
    responseModalities: Array<'TEXT' | 'IMAGE'>
  }
  serviceTier: GeminiServiceTier
}

export class GeminiImageGenerationError extends Error {
  readonly status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'GeminiImageGenerationError'
    this.status = status
  }
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export async function loadEnvFile(envPath: string): Promise<void> {
  if (!existsSync(envPath)) return

  const contents = await readFile(envPath, 'utf8')
  for (const line of contents.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const assignment = trimmed.startsWith('export ')
      ? trimmed.slice('export '.length)
      : trimmed
    const equalsIndex = assignment.indexOf('=')
    if (equalsIndex === -1) continue

    const key = assignment.slice(0, equalsIndex).trim()
    const value = parseEnvValue(assignment.slice(equalsIndex + 1))
    if (key && process.env[key] === undefined) {
      process.env[key] = value
    }
  }
}

export function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`${name} is not set`)
  }
  return value
}

export async function generateGeminiImage(
  input: GenerateGeminiImageInput,
): Promise<GenerateGeminiImageResult> {
  const retries = input.retries ?? 12
  const retryBaseDelayMs = input.retryBaseDelayMs ?? 10_000
  const retryMaxDelayMs = input.retryMaxDelayMs ?? 300_000
  let lastError: unknown

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      if (attempt > 1) {
        console.log(
          `Retrying ${input.serviceTier} image request, attempt ${attempt}/${retries}`,
        )
      }
      return await generateGeminiImageOnce(input)
    } catch (error) {
      lastError = error
      if (!isRetryableGeminiError(error) || attempt === retries) break
      const delayMs = Math.min(
        retryMaxDelayMs,
        retryBaseDelayMs * 2 ** (attempt - 1),
      )
      console.log(
        `${input.serviceTier} request was busy; waiting ${delayMs / 1000}s before retry`,
      )
      await sleep(delayMs)
    }
  }

  if (lastError instanceof Error) throw lastError
  throw new Error(String(lastError))
}

export async function saveGeneratedImageAsset({
  image,
  outputPath,
  publicRoot,
  targetFormat,
  targetHeight,
  targetWidth,
}: {
  image: GeminiGeneratedImage
  outputPath: string
  publicRoot: string
  targetFormat: GeneratedImageFormat
  targetHeight: number
  targetWidth: number
}): Promise<SavedImageAsset> {
  await mkdir(path.dirname(outputPath), { recursive: true })

  const sourceExtension = extensionFromMimeType(image.mimeType)
  const rawPath = `${outputPath}.raw.${sourceExtension}`
  const imageBuffer = Buffer.from(image.data, 'base64')
  await writeFile(rawPath, imageBuffer)

  const magick = await findImageMagick()
  if (!magick) {
    if (sourceExtension !== targetFormat) {
      throw new Error(
        `ImageMagick is required to convert ${sourceExtension} to ${targetFormat}`,
      )
    }
    await writeFile(outputPath, imageBuffer)
    await rm(rawPath, { force: true })
  } else {
    await execFile(magick, [
      rawPath,
      '-resize',
      `${targetWidth}x${targetHeight}^`,
      '-gravity',
      'center',
      '-extent',
      `${targetWidth}x${targetHeight}`,
      '-strip',
      '-quality',
      '90',
      outputPath,
    ])
    await rm(rawPath, { force: true })
  }

  return {
    mimeType: mimeTypeForFormat(targetFormat),
    outputPath,
    src: publicSrcForPath(publicRoot, outputPath),
  }
}

export async function runConcurrently<TInput, TResult>(
  items: readonly TInput[],
  workerCount: number,
  worker: (item: TInput) => Promise<TResult>,
): Promise<TResult[]> {
  const results: TResult[] = []
  let nextIndex = 0

  async function runWorker() {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex
      nextIndex += 1
      results[currentIndex] = await worker(items[currentIndex])
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(workerCount, items.length) }, () =>
      runWorker(),
    ),
  )

  return results
}

export function publicSrcForPath(
  publicRoot: string,
  outputPath: string,
): string {
  const relativePath = path.relative(publicRoot, outputPath)
  return `/${relativePath.split(path.sep).join('/')}`
}

async function generateGeminiImageOnce(
  input: GenerateGeminiImageInput,
): Promise<GenerateGeminiImageResult> {
  const requestBody: GeminiRequestBody = {
    contents: [
      {
        parts: await buildRequestParts(
          input.prompt,
          input.referenceImages ?? [],
        ),
        role: 'user',
      },
    ],
    generationConfig: {
      imageConfig: {
        aspectRatio: input.aspectRatio,
        imageSize: input.imageSize,
      },
      responseModalities: ['TEXT', 'IMAGE'],
    },
    serviceTier: input.serviceTier,
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${input.model}:generateContent`,
    {
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'X-Server-Timeout': String(input.serverTimeoutSeconds ?? 840),
        'x-goog-api-key': input.apiKey,
      },
      method: 'POST',
      signal: AbortSignal.timeout(input.timeoutMs ?? 900_000),
    },
  )

  const rawResponse = await response.text()
  const parsedResponse = parseJsonSafely(rawResponse)

  if (!response.ok) {
    throw new GeminiImageGenerationError(
      summarizeGeminiError(response.status, parsedResponse, rawResponse),
      response.status,
    )
  }

  const finalParts = extractFinalResponseParts(parsedResponse)
  const text: string[] = []
  const images: GeminiGeneratedImage[] = []

  for (const part of finalParts) {
    const textPart = extractText(part)
    if (textPart) text.push(textPart)

    const imagePart = extractInlineImage(part)
    if (imagePart) images.push(imagePart)
  }

  const image = images[0]
  if (!image) {
    throw new GeminiImageGenerationError(
      `Gemini returned no final image. Text response: ${text.join(' ').slice(0, 300)}`,
    )
  }

  return { image, text }
}

async function buildRequestParts(
  prompt: string,
  referenceImages: readonly ReferenceImageInput[],
): Promise<GeminiRequestPart[]> {
  const parts: GeminiRequestPart[] = [{ text: prompt }]

  for (const referenceImage of referenceImages) {
    const image = await readFile(referenceImage.path)
    parts.push({
      inlineData: {
        data: image.toString('base64'),
        mimeType:
          referenceImage.mimeType ?? mimeTypeForPath(referenceImage.path),
      },
    })
  }

  return parts
}

function parseEnvValue(rawValue: string): string {
  const trimmed = rawValue.trim()
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }
  return trimmed
}

function parseJsonSafely(raw: string): unknown {
  try {
    return raw ? JSON.parse(raw) : undefined
  } catch {
    return undefined
  }
}

function extractFinalResponseParts(
  responseJson: unknown,
): Record<string, unknown>[] {
  if (!isRecord(responseJson) || !Array.isArray(responseJson.candidates)) {
    return []
  }

  const firstCandidate = responseJson.candidates[0]
  if (!isRecord(firstCandidate) || !isRecord(firstCandidate.content)) {
    return []
  }

  const parts = firstCandidate.content.parts
  if (!Array.isArray(parts)) return []

  return parts.filter((part) => isRecord(part) && part.thought !== true)
}

function extractText(part: Record<string, unknown>): string | undefined {
  return typeof part.text === 'string' ? part.text : undefined
}

function extractInlineImage(
  part: Record<string, unknown>,
): GeminiGeneratedImage | undefined {
  const inlineData = part.inlineData ?? part.inline_data
  if (!isRecord(inlineData)) return undefined

  const data = inlineData.data
  const mimeType = inlineData.mimeType ?? inlineData.mime_type
  if (typeof data !== 'string' || typeof mimeType !== 'string') return undefined

  if (!mimeType.startsWith('image/')) return undefined

  return { data, mimeType }
}

function summarizeGeminiError(
  status: number,
  parsedResponse: unknown,
  rawResponse: string,
): string {
  if (isRecord(parsedResponse) && isRecord(parsedResponse.error)) {
    const message = parsedResponse.error.message
    if (typeof message === 'string') return `Gemini API ${status}: ${message}`
  }
  return `Gemini API ${status}: ${rawResponse.slice(0, 500)}`
}

function isRetryableGeminiError(error: unknown): boolean {
  if (!(error instanceof GeminiImageGenerationError)) return false
  return [429, 500, 502, 503].includes(error.status ?? 0)
}

async function findImageMagick(): Promise<string | undefined> {
  try {
    await execFile('magick', ['-version'])
    return 'magick'
  } catch {
    return undefined
  }
}

function mimeTypeForPath(filePath: string): string {
  const extension = path.extname(filePath).toLowerCase()
  if (extension === '.jpg' || extension === '.jpeg') return 'image/jpeg'
  if (extension === '.webp') return 'image/webp'
  return 'image/png'
}

function extensionFromMimeType(mimeType: string): GeneratedImageFormat | 'jpg' {
  if (mimeType === 'image/jpeg') return 'jpg'
  if (mimeType === 'image/webp') return 'webp'
  return 'png'
}

function mimeTypeForFormat(format: GeneratedImageFormat): string {
  if (format === 'webp') return 'image/webp'
  return 'image/png'
}
