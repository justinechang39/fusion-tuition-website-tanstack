import {
  buildSiteInfo,
  contactDetails,
  locationDetails,
  webMcpTools,
} from '@/lib/agent-ready'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export function WebMcpProvider() {
  const navigate = useNavigate()

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const modelContext = navigator.modelContext
    if (!modelContext) {
      return
    }

    const toolDefinitions = [
      {
        ...webMcpTools[0],
        execute: async () => buildSiteInfo(window.location.origin),
      },
      {
        ...webMcpTools[1],
        execute: async () => {
          await navigate({ to: '/contact' })
          return {
            page: '/contact',
            phone: contactDetails.phoneDisplay,
            email: contactDetails.email,
            whatsappUrl: contactDetails.whatsappUrl,
          }
        },
      },
      {
        ...webMcpTools[2],
        execute: async () => {
          await navigate({ to: '/classes' })
          return {
            page: '/classes',
            summary:
              'Fusion Tuition supports IGCSE, GCE O Level, A Level, and IB science and mathematics classes.',
          }
        },
      },
      {
        ...webMcpTools[3],
        execute: async () => {
          await navigate({ to: '/how-to-get-here' })
          return {
            page: '/how-to-get-here',
            address: `${locationDetails.addressLine1}, ${locationDetails.postalCode}, ${locationDetails.country}`,
          }
        },
      },
    ]

    try {
      if (typeof modelContext.provideContext === 'function') {
        modelContext.provideContext({ tools: toolDefinitions })
        return
      }

      if (typeof modelContext.registerTool === 'function') {
        const abortController = new AbortController()
        for (const tool of toolDefinitions) {
          modelContext.registerTool(tool, {
            signal: abortController.signal,
          })
        }
        return () => abortController.abort()
      }
    } catch (error) {
      console.warn('WebMCP registration failed', error)
    }

    return
  }, [navigate])

  return null
}
