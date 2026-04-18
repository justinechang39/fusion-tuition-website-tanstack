import ClassesPage from '@/legacy-pages/classes/index'
import {
  buildBreadcrumbJsonLd,
  buildClassesPageJsonLd,
  buildSeoHead,
} from '@/lib/seo'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/classes/')({
  head: () =>
    buildSeoHead({
      title: 'Physics, Chemistry and Mathematics Classes',
      description:
        'Explore Fusion Tuition classes for IGCSE, GCE O Level, A Level, and IB students in Singapore, with flexible scheduling and personalised small-group support.',
      path: '/classes',
      jsonLd: [
        buildClassesPageJsonLd(
          'Fusion Tuition Classes',
          'Explore Fusion Tuition classes for IGCSE, GCE O Level, A Level, and IB students in Singapore.',
        ),
        buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Classes', path: '/classes' },
        ]),
      ],
    }),
  component: ClassesPage,
})
