import HowToGetHerePage from '@/legacy-pages/how-to-get-here'
import { buildBreadcrumbJsonLd, buildPageJsonLd, buildSeoHead } from '@/lib/seo'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/how-to-get-here')({
  head: () =>
    buildSeoHead({
      title: 'How To Get To Fusion Tuition',
      description:
        'Find the Fusion Tuition address in Singapore and get step-by-step guidance for reaching the tuition centre by car or public transport.',
      path: '/how-to-get-here',
      jsonLd: [
        buildPageJsonLd({
          path: '/how-to-get-here',
          title: 'How To Get To Fusion Tuition',
          description:
            'Find the Fusion Tuition address in Singapore and get step-by-step guidance for reaching the tuition centre by car or public transport.',
        }),
        buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'How To Get Here', path: '/how-to-get-here' },
        ]),
      ],
    }),
  component: HowToGetHerePage,
})
