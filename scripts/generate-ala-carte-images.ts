import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  type GeminiImageAspectRatio,
  type GeminiImageModel,
  type GeminiImageSize,
  type GeminiServiceTier,
  type GeneratedImageFormat,
  generateGeminiImage,
  isRecord,
  loadEnvFile,
  publicSrcForPath,
  requireEnv,
  runConcurrently,
  saveGeneratedImageAsset,
} from './gemini-image-generator'

type AlaCartePrompt = {
  id: string
  categoryId: string
  subject: 'Chemistry' | 'Physics'
  title: string
  prompt: string
}

type AlaCartePromptFile = {
  filePurpose?: string
  sharedNegativePrompt: string
  prompts: AlaCartePrompt[]
}

type GenerateResult = {
  id: string
  title: string
  src: string
  outputPath: string
  promptHash: string
  skipped: boolean
}

type CliOptions = {
  aspectRatio: GeminiImageAspectRatio
  concurrency: number
  dotenvPath: string
  force: boolean
  format: GeneratedImageFormat
  help: boolean
  imageSize: GeminiImageSize
  model: GeminiImageModel
  only: Set<string>
  outputDir: string
  promptFile?: string
  retries: number
  serviceTier: GeminiServiceTier
  skip: Set<string>
  updateData: boolean
}

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const publicRoot = path.join(rootDir, 'public')
const alaCarteDataPath = path.join(
  rootDir,
  'src',
  'data',
  'ala-carte-classes.json',
)

const defaultPromptFiles = [
  path.join(rootDir, 'scripts', 'ala-carte-image-prompts.json'),
  '/Users/justinechang/Downloads/ala-carte-image-prompts.json',
]

const subjectReferenceImages: Record<AlaCartePrompt['subject'], string> = {
  Chemistry: path.join(publicRoot, 'chemistry_ala_carte.png'),
  Physics: path.join(publicRoot, 'physics_ala_carte.png'),
}

const defaultOptions: CliOptions = {
  aspectRatio: '21:9',
  concurrency: 1,
  dotenvPath: path.join(rootDir, '.env'),
  force: false,
  format: 'webp',
  help: false,
  imageSize: '2K',
  model: 'gemini-3-pro-image-preview',
  only: new Set(),
  outputDir: path.join(publicRoot, 'ala-carte'),
  promptFile: undefined,
  retries: 12,
  serviceTier: 'standard',
  skip: new Set(),
  updateData: true,
}

function printUsage(): void {
  console.log(`Usage: bun run scripts/generate-ala-carte-images.ts [options]

Feeds the ala-carte prompt JSON into the reusable Gemini image generator, saves
topic assets into public/ala-carte, and updates src/data/ala-carte-classes.json.

Options:
  --prompt-file <path>     Defaults to scripts/ala-carte-image-prompts.json,
                           then /Users/justinechang/Downloads/ala-carte-image-prompts.json.
  --output-dir <path>      Default: public/ala-carte
  --only <id,id>           Generate only these prompt IDs.
  --skip <id,id>           Skip these prompt IDs.
  --force                  Regenerate existing files.
  --no-update-data         Do not update src/data/ala-carte-classes.json.
  --concurrency <n>        Concurrent image requests. Default: 1
  --retries <n>            Retries per image. Default: 12
  --service-tier <tier>    standard or flex. Default: standard
  --image-size <1K|2K|4K>  Default: 2K
  --aspect-ratio <ratio>   Default: 21:9
  --format <webp|png>      Default: webp
  --model <model>          Default: gemini-3-pro-image-preview
  --dotenv <path>          Default: .env
  --help                   Show this help.
`)
}

function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = {
    ...defaultOptions,
    only: new Set(defaultOptions.only),
    skip: new Set(defaultOptions.skip),
  }

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]
    const nextValue = (): string => {
      const value = argv[index + 1]
      if (!value || value.startsWith('--')) {
        throw new Error(`Missing value for ${arg}`)
      }
      index += 1
      return value
    }

    if (arg === '--help') {
      options.help = true
    } else if (arg === '--force') {
      options.force = true
    } else if (arg === '--no-update-data') {
      options.updateData = false
    } else if (arg === '--prompt-file') {
      options.promptFile = path.resolve(nextValue())
    } else if (arg === '--output-dir') {
      options.outputDir = path.resolve(nextValue())
    } else if (arg === '--only') {
      options.only = parseCommaList(nextValue())
    } else if (arg === '--skip') {
      options.skip = parseCommaList(nextValue())
    } else if (arg === '--concurrency') {
      options.concurrency = parsePositiveInteger(nextValue(), '--concurrency')
    } else if (arg === '--retries') {
      options.retries = parsePositiveInteger(nextValue(), '--retries')
    } else if (arg === '--service-tier') {
      options.serviceTier = parseServiceTier(nextValue())
    } else if (arg === '--image-size') {
      options.imageSize = parseImageSize(nextValue())
    } else if (arg === '--aspect-ratio') {
      options.aspectRatio = parseAspectRatio(nextValue())
    } else if (arg === '--format') {
      options.format = parseFormat(nextValue())
    } else if (arg === '--model') {
      options.model = parseModel(nextValue())
    } else if (arg === '--dotenv') {
      options.dotenvPath = path.resolve(nextValue())
    } else {
      throw new Error(`Unknown option: ${arg}`)
    }
  }

  return options
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2))
  if (options.help) {
    printUsage()
    return
  }

  await loadEnvFile(options.dotenvPath)
  const apiKey = requireEnv('GEMINI_API_KEY')
  const promptFile = await readPromptFile(options.promptFile)

  const selectedPrompts = promptFile.prompts.filter((prompt) => {
    if (options.only.size > 0 && !options.only.has(prompt.id)) return false
    return !options.skip.has(prompt.id)
  })

  await mkdir(options.outputDir, { recursive: true })

  console.log(`Prompt file: ${promptFile.path}`)
  console.log(`Output directory: ${options.outputDir}`)
  console.log(`Model: ${options.model}`)
  console.log(`Service tier: ${options.serviceTier}`)
  console.log(`Image config: ${options.aspectRatio}, ${options.imageSize}`)
  console.log(`Retries per image: ${options.retries}`)
  console.log(`Selected prompts: ${selectedPrompts.length}`)

  const results = await runConcurrently(
    selectedPrompts,
    options.concurrency,
    async (prompt) =>
      generateOne(prompt, promptFile.sharedNegativePrompt, options, apiKey),
  )

  await writeManifest(results, promptFile.path, options)

  if (options.updateData) {
    await updateAlaCarteData(results)
  }

  console.log('Done')
}

async function generateOne(
  prompt: AlaCartePrompt,
  sharedNegativePrompt: string,
  options: CliOptions,
  apiKey: string,
): Promise<GenerateResult> {
  const outputPath = path.join(
    options.outputDir,
    `${prompt.id}.${options.format}`,
  )
  const src = publicSrcForPath(publicRoot, outputPath)

  if (!options.force && existsSync(outputPath)) {
    console.log(`Skipping existing ${prompt.id}`)
    return {
      id: prompt.id,
      outputPath,
      promptHash: promptHash(prompt.prompt),
      skipped: true,
      src,
      title: prompt.title,
    }
  }

  console.log(`Generating ${prompt.id}`)
  const referencePath = subjectReferenceImages[prompt.subject]
  const response = await generateGeminiImage({
    apiKey,
    aspectRatio: options.aspectRatio,
    imageSize: options.imageSize,
    model: options.model,
    prompt: buildPrompt(prompt, sharedNegativePrompt),
    referenceImages: [{ path: referencePath }],
    retries: options.retries,
    serviceTier: options.serviceTier,
  })

  const saved = await saveGeneratedImageAsset({
    image: response.image,
    outputPath,
    publicRoot,
    targetFormat: options.format,
    targetHeight: 821,
    targetWidth: 1916,
  })

  console.log(`Saved ${saved.src}`)
  return {
    id: prompt.id,
    outputPath,
    promptHash: promptHash(prompt.prompt),
    skipped: false,
    src: saved.src,
    title: prompt.title,
  }
}

function buildPrompt(
  prompt: AlaCartePrompt,
  sharedNegativePrompt: string,
): string {
  return `${prompt.prompt}

Use the attached current ${prompt.subject} ala-carte banner only as a visual style reference: match its dark cinematic science-banner mood, warm amber glow, subtle teal accents, premium 3D/holographic finish, and website hero composition. Do not copy the exact image, objects, or layout; create a unique topic-specific banner for this class.

Shared negative constraints: ${sharedNegativePrompt}`
}

async function readPromptFile(
  promptFilePath: string | undefined,
): Promise<AlaCartePromptFile & { path: string }> {
  const resolvedPath =
    promptFilePath ?? defaultPromptFiles.find((file) => existsSync(file))
  if (!resolvedPath) {
    throw new Error(
      `No prompt JSON found. Tried: ${defaultPromptFiles.join(', ')}`,
    )
  }

  const rawJson = await readFile(resolvedPath, 'utf8')
  const parsed: unknown = JSON.parse(rawJson)
  if (!isRecord(parsed)) throw new Error(`Invalid prompt JSON: ${resolvedPath}`)

  const sharedNegativePrompt = readString(parsed, 'sharedNegativePrompt')
  const promptsValue = parsed.prompts
  if (!Array.isArray(promptsValue)) {
    throw new Error(`Invalid prompts array in ${resolvedPath}`)
  }

  return {
    filePurpose:
      typeof parsed.filePurpose === 'string' ? parsed.filePurpose : undefined,
    path: resolvedPath,
    prompts: promptsValue.map(readPrompt),
    sharedNegativePrompt,
  }
}

function readPrompt(value: unknown): AlaCartePrompt {
  if (!isRecord(value)) throw new Error('Invalid prompt entry')

  const subject = readString(value, 'subject')
  if (subject !== 'Chemistry' && subject !== 'Physics') {
    throw new Error(`Unsupported subject: ${subject}`)
  }

  return {
    categoryId: readString(value, 'categoryId'),
    id: readString(value, 'id'),
    prompt: readString(value, 'prompt'),
    subject,
    title: readString(value, 'title'),
  }
}

function readString(record: Record<string, unknown>, key: string): string {
  const value = record[key]
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`Expected non-empty string at ${key}`)
  }
  return value
}

async function writeManifest(
  results: readonly GenerateResult[],
  promptFilePath: string,
  options: CliOptions,
): Promise<void> {
  const manifest = {
    generatedAt: new Date().toISOString(),
    imageConfig: {
      aspectRatio: options.aspectRatio,
      imageSize: options.imageSize,
      targetSize: '1916x821',
    },
    model: options.model,
    promptFile: manifestPathFor(promptFilePath),
    results: results.map((result) => ({
      id: result.id,
      promptHash: result.promptHash,
      src: result.src,
      title: result.title,
    })),
    serviceTier: options.serviceTier,
  }
  const manifestPath = path.join(options.outputDir, 'generated-images.json')
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(`Manifest saved: ${publicSrcForPath(publicRoot, manifestPath)}`)
}

function manifestPathFor(filePath: string): string {
  const relativePath = path.relative(rootDir, filePath)
  if (!relativePath.startsWith('..') && !path.isAbsolute(relativePath)) {
    return relativePath.split(path.sep).join('/')
  }
  return path.basename(filePath)
}

async function updateAlaCarteData(
  results: readonly GenerateResult[],
): Promise<void> {
  const resultById = new Map(results.map((result) => [result.id, result]))
  let dataText = await readFile(alaCarteDataPath, 'utf8')

  for (const result of resultById.values()) {
    dataText = replaceItemImage(dataText, result)
  }

  await writeFile(alaCarteDataPath, dataText)
  console.log('Updated src/data/ala-carte-classes.json image references')
}

function replaceItemImage(dataText: string, result: GenerateResult): string {
  const idNeedle = `"id": ${JSON.stringify(result.id)}`
  const idIndex = dataText.indexOf(idNeedle)
  if (idIndex === -1) {
    throw new Error(`Could not find item id in ala-carte data: ${result.id}`)
  }

  const nextItemIndex = dataText.indexOf('\n    {', idIndex + idNeedle.length)
  const itemEndIndex = nextItemIndex === -1 ? dataText.length : nextItemIndex
  const imageIndex = dataText.indexOf('"image": {', idIndex)
  if (imageIndex === -1 || imageIndex > itemEndIndex) {
    throw new Error(`Could not find image block for ${result.id}`)
  }

  const imageEndIndex = dataText.indexOf('\n      },', imageIndex)
  if (imageEndIndex === -1 || imageEndIndex > itemEndIndex) {
    throw new Error(`Could not find image block end for ${result.id}`)
  }

  const before = dataText.slice(0, imageIndex)
  const imageBlock = dataText.slice(imageIndex, imageEndIndex)
  const after = dataText.slice(imageEndIndex)
  const updatedImageBlock = imageBlock
    .replace(/("src"\s*:\s*)"[^"]*"/, `$1${JSON.stringify(result.src)}`)
    .replace(
      /("alt"\s*:\s*)"[^"]*"/,
      `$1${JSON.stringify(`${result.title} ala-carte class artwork`)}`,
    )

  return `${before}${updatedImageBlock}${after}`
}

function promptHash(prompt: string): string {
  return createHash('sha256').update(prompt).digest('hex').slice(0, 16)
}

function parseCommaList(value: string): Set<string> {
  return new Set(
    value
      .split(',')
      .map((entry) => entry.trim())
      .filter(Boolean),
  )
}

function parsePositiveInteger(value: string, label: string): number {
  const parsed = Number.parseInt(value, 10)
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(`${label} must be a positive integer`)
  }
  return parsed
}

function parseImageSize(value: string): GeminiImageSize {
  if (value === '1K' || value === '2K' || value === '4K') return value
  throw new Error('--image-size must be 1K, 2K, or 4K')
}

function parseAspectRatio(value: string): GeminiImageAspectRatio {
  const validRatios: readonly GeminiImageAspectRatio[] = [
    '1:1',
    '2:3',
    '3:2',
    '3:4',
    '4:3',
    '4:5',
    '5:4',
    '9:16',
    '16:9',
    '21:9',
  ]
  for (const ratio of validRatios) {
    if (value === ratio) return ratio
  }
  throw new Error(`Unsupported aspect ratio: ${value}`)
}

function parseFormat(value: string): GeneratedImageFormat {
  if (value === 'png' || value === 'webp') return value
  throw new Error('--format must be png or webp')
}

function parseServiceTier(value: string): GeminiServiceTier {
  if (value === 'standard' || value === 'flex') return value
  throw new Error('--service-tier must be standard or flex')
}

function parseModel(value: string): GeminiImageModel {
  if (
    value === 'gemini-3-pro-image-preview' ||
    value === 'gemini-3.1-flash-image-preview' ||
    value === 'gemini-2.5-flash-image'
  ) {
    return value
  }
  throw new Error(`Unsupported Gemini image model: ${value}`)
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exitCode = 1
})
