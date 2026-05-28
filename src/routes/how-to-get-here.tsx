import HowToGetHerePage from '@/legacy-pages/how-to-get-here'
import {
  buildBreadcrumbJsonLd,
  buildDirectionsPageJsonLd,
  buildSeoHead,
} from '@/lib/seo'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/how-to-get-here')({
  head: () =>
    buildSeoHead({
      title: 'Fusion Tuition Jalan Pemimpin Directions',
      description:
        'Find Fusion Tuition at #02-13, 37 Jalan Pemimpin, Singapore 577177, with directions for parents and students travelling by car or public transport.',
      path: '/how-to-get-here',
      extraMeta: [
        {
          name: 'keywords',
          content:
            'Fusion Tuition address, 37 Jalan Pemimpin tuition centre, tuition centre near Marymount, tuition centre directions Singapore',
        },
      ],
      jsonLd: [
        buildDirectionsPageJsonLd(
          'Fusion Tuition Jalan Pemimpin Directions',
          'Find Fusion Tuition at #02-13, 37 Jalan Pemimpin, Singapore 577177, with directions by car or public transport.',
        ),
        buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'How To Get Here', path: '/how-to-get-here' },
        ]),
      ],
    }),
  component: HowToGetHerePage,
})
