import { buildSiteInfo } from '@/lib/agent-ready'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/site-info')({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin
        return Response.json(buildSiteInfo(origin))
      },
    },
  },
})
