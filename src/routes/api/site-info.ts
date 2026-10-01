import { buildSiteInfo } from '@/lib/agent-ready'
import { siteOrigin } from '@/lib/seo'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/site-info')({
  server: {
    handlers: {
      GET: () => Response.json(buildSiteInfo(siteOrigin)),
    },
  },
})
