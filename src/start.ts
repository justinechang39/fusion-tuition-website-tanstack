import {
  buildAgentSkillsIndex,
  buildApiCatalog,
  buildLinkHeader,
  buildLlmsTxt,
  buildRobotsTxt,
  buildSitemapXml,
  getAgentSkill,
  getPageMarkdown,
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

function getDiscoveryOrigin(request: Request) {
  const configuredOrigin = import.meta.env.VITE_PUBLIC_SITE_URL
  return configuredOrigin || siteOrigin || new URL(request.url).origin
}

function wantsMarkdown(request: Request) {
  return request.headers.get('accept')?.includes('text/markdown') ?? false
}

function isMarkdownPage(pathname: string) {
  return getPageMarkdown(pathname, 'https://example.com') !== null
}

const agentReadinessMiddleware = createMiddleware().server(
  async ({ next, pathname, request }) => {
    const origin = getDiscoveryOrigin(request)
    const isHeadRequest = request.method === 'HEAD'
    const isGetLikeRequest = request.method === 'GET' || isHeadRequest

    if (isGetLikeRequest) {
      if (pathname === '/robots.txt') {
        return new Response(buildRobotsTxt(origin), {
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

      if (wantsMarkdown(request)) {
        const markdown = getPageMarkdown(pathname, origin)
        if (markdown) {
          return new Response(markdown, {
            headers: {
              'content-type': 'text/markdown; charset=utf-8',
              vary: 'Accept',
            },
          })
        }
      }
    }

    const result = await next()

    return {
      ...result,
      response: withResponseHeaders(result.response, (headers) => {
        if (pathname === '/') {
          headers.append('Link', buildLinkHeader())
        }

        if (isMarkdownPage(pathname)) {
          headers.append('Vary', 'Accept')
        }
      }),
    }
  },
)

export const startInstance = createStart(() => ({
  requestMiddleware: [agentReadinessMiddleware],
}))
