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
      title: 'About Fusion Tuition',
      description:
        'Meet the engineer teachers behind Fusion Tuition and learn how our small-group science and mathematics lessons support students in Singapore.',
      path: '/about',
      jsonLd: [
        buildAboutPageJsonLd(
          'About Fusion Tuition',
          'Meet the engineer teachers behind Fusion Tuition and learn how our small-group science and mathematics lessons support students in Singapore.',
        ),
        buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'About Us', path: '/about' },
        ]),
      ],
    }),
  component: AboutPage,
})
