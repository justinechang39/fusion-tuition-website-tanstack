import { WebMcpProvider } from '@/components/WebMcpProvider'
import DefaultLayout from '@/components/components/DefaultLayout'
import { Toaster } from '@/components/ui/toaster'
import { buildRootSeoHead } from '@/lib/seo'
import { TanStackDevtools } from '@tanstack/react-devtools'
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import TanstackQueryProvider from '../integrations/tanstack-query/root-provider'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => {
    const rootSeo = buildRootSeoHead()

    return {
      ...rootSeo,
      links: [
        ...rootSeo.links,
        {
          rel: 'stylesheet',
          href: appCss,
        },
      ],
    }
  },
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-SG">
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased">
        <TanstackQueryProvider>
          <WebMcpProvider />
          <DefaultLayout>
            <Toaster />
            {children}
          </DefaultLayout>
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
              TanStackQueryDevtools,
            ]}
          />
          <Scripts />
        </TanstackQueryProvider>
      </body>
    </html>
  )
}
