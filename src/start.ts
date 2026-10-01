import {
  buildAgentSkillsIndex,
  buildApiCatalog,
  buildLinkHeader,
  buildLlmsTxt,
  buildRobotsTxt,
  buildSitemapXml,
  getAgentSkill,
  getPageMarkdown,
  hasPageMarkdown,
} from '@/lib/agent-ready'
import { buildRssXml } from '@/lib/content'
import { siteOrigin } from '@/lib/seo'
import { createMiddleware, createStart } from '@tanstack/react-start'

function withResponseHeaders(
  response: Response,
  update: (headers: Headers) => void,
) {
  const headers = new Headers(response.headers)
  update(headers)
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

function preferredPageFormat(request: Request) {
  if (!request.headers.get('accept')) return 'html'
  const ranges = (request.headers.get('accept') ?? '')
    .split(',')
    .map((range) => {
      const [type, ...parameters] = range.trim().toLowerCase().split(';')
      const q = parameters.find((parameter) =>
        parameter.trim().startsWith('q='),
      )
      const quality = q ? Number(q.trim().slice(2)) : 1
      return {
        type: type.trim(),
        quality:
          Number.isFinite(quality) && quality >= 0 && quality <= 1
            ? quality
            : 0,
      }
    })

  function qualityFor(type: string) {
    for (const match of [type, 'text/*', '*/*']) {
      const matches = ranges.filter((range) => range.type === match)
      if (matches.length)
        return Math.max(...matches.map((range) => range.quality))
    }
    return 0
  }

  const htmlQuality = qualityFor('text/html')
  const markdownQuality = qualityFor('text/markdown')
  // Browsers and wildcard-only clients keep HTML. Markdown must be explicit.
  if (
    ranges.some((range) => range.type === 'text/markdown') &&
    markdownQuality > 0 &&
    markdownQuality >= htmlQuality
  )
    return 'markdown'
  return htmlQuality > 0 ? 'html' : null
}

const agentReadinessMiddleware = createMiddleware().server(
  async ({ next, pathname, request }) => {
    const origin = siteOrigin
    const isHeadRequest = request.method === 'HEAD'
    const isGetLikeRequest = request.method === 'GET' || isHeadRequest

    if (isGetLikeRequest) {
      if (pathname === '/robots.txt') {
        return new Response(isHeadRequest ? null : buildRobotsTxt(origin), {
          status: 200,
          headers: {
            'content-type': 'text/plain; charset=utf-8',
          },
        })
      }

      if (pathname === '/sitemap.xml') {
        return new Response(isHeadRequest ? null : buildSitemapXml(origin), {
          status: 200,
          headers: {
            'content-type': 'application/xml; charset=utf-8',
          },
        })
      }

      if (pathname === '/llms.txt') {
        return new Response(isHeadRequest ? null : buildLlmsTxt(origin), {
          status: 200,
          headers: {
            'content-type': 'text/plain; charset=utf-8',
          },
        })
      }

      if (pathname === '/rss.xml') {
        return new Response(isHeadRequest ? null : buildRssXml(origin), {
          status: 200,
          headers: {
            'content-type': 'application/rss+xml; charset=utf-8',
          },
        })
      }

      if (pathname === '/.well-known/api-catalog') {
        return new Response(
          isHeadRequest
            ? null
            : JSON.stringify(buildApiCatalog(origin), null, 2),
          {
            status: 200,
            headers: {
              'content-type':
                'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
            },
          },
        )
      }

      if (pathname === '/.well-known/agent-skills/index.json') {
        return new Response(
          isHeadRequest
            ? null
            : JSON.stringify(await buildAgentSkillsIndex(origin), null, 2),
          {
            status: 200,
            headers: {
              'content-type': 'application/json; charset=utf-8',
            },
          },
        )
      }

      const skillMatch = pathname.match(
        /^\/\.well-known\/agent-skills\/([^/]+)\/SKILL\.md$/,
      )
      if (skillMatch) {
        const skill = getAgentSkill(skillMatch[1] ?? '')
        if (!skill) {
          return new Response('Skill not found', { status: 404 })
        }

        return new Response(isHeadRequest ? null : skill.content, {
          status: 200,
          headers: {
            'content-type': 'text/markdown; charset=utf-8',
          },
        })
      }

      const format = preferredPageFormat(request)
      if (!format && hasPageMarkdown(pathname)) {
        return new Response(
          isHeadRequest ? null : 'No acceptable page format',
          {
            status: 406,
            headers: { vary: 'Accept', 'X-Robots-Tag': 'noindex' },
          },
        )
      }

      if (format === 'markdown') {
        const markdown = await getPageMarkdown(pathname, origin)
        if (markdown) {
          return new Response(isHeadRequest ? null : markdown, {
            headers: {
              'content-type': 'text/markdown; charset=utf-8',
              vary: 'Accept',
              ...(pathname === '/' ? { Link: buildLinkHeader() } : {}),
            },
          })
        }
      }
    }

    const result = await next()

    return {
      ...result,
      response: withResponseHeaders(result.response, (headers) => {
        if (
          pathname === '/demo' ||
          pathname.startsWith('/demo/') ||
          pathname.startsWith('/api/') ||
          result.response.status >= 400
        ) {
          headers.set('X-Robots-Tag', 'noindex')
        }
        if (pathname === '/') {
          headers.append('Link', buildLinkHeader())
        }

        if (hasPageMarkdown(pathname)) {
          headers.append('Vary', 'Accept')
        }
      }),
    }
  },
)

export const startInstance = createStart(() => ({
  requestMiddleware: [agentReadinessMiddleware],
}))
