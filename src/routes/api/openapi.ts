import { buildOpenApiDocument } from '@/lib/agent-ready'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/openapi')({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin
        return new Response(
          JSON.stringify(buildOpenApiDocument(origin), null, 2),
          {
            headers: {
              'content-type': 'application/json; charset=utf-8',
            },
          },
        )
      },
    },
  },
})
