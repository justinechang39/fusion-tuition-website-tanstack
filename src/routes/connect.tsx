import ConnectPage from '@/legacy-pages/connect'
import { buildBreadcrumbJsonLd, buildPageJsonLd, buildSeoHead } from '@/lib/seo'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/connect')({
  head: () =>
    buildSeoHead({
      title: 'Join Fusion Tuition',
      description:
        'See how Fusion Tuition structures small-group learning, personalised exercises, trial lessons, and student support for families in Singapore.',
      path: '/connect',
      jsonLd: [
        buildPageJsonLd({
          path: '/connect',
          title: 'Join Fusion Tuition',
          description:
            'See how Fusion Tuition structures small-group learning, personalised exercises, trial lessons, and student support for families in Singapore.',
        }),
        buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Connect', path: '/connect' },
        ]),
      ],
    }),
  component: ConnectPage,
})
