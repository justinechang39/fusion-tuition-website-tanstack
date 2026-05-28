import AboutPage from '@/legacy-pages/about'
import {
  buildAboutPageJsonLd,
  buildBreadcrumbJsonLd,
  buildSeoHead,
} from '@/lib/seo'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  head: () =>
    buildSeoHead({
      title: 'Engineer Teachers for Science and Math Tuition',
      description:
        'Meet Fusion Tuition’s engineer teachers for small-group Physics, Chemistry, and Mathematics tuition in Singapore across O Level, IGCSE, A Level, and IB.',
      path: '/about',
      extraMeta: [
        {
          name: 'keywords',
          content:
            'engineer tuition teachers Singapore, Physics tutor Singapore, Chemistry tutor Singapore, Math tutor Singapore, small group tuition centre',
        },
      ],
      jsonLd: [
        buildAboutPageJsonLd(
          'Engineer Teachers for Science and Math Tuition',
          'Meet Fusion Tuition’s engineer teachers for small-group Physics, Chemistry, and Mathematics tuition in Singapore.',
        ),
        buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'About Us', path: '/about' },
        ]),
      ],
    }),
  component: AboutPage,
})
