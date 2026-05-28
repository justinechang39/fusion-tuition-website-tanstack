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
      title: 'O Level, IGCSE, A Level & IB Tuition Classes',
      description:
        'Explore Fusion Tuition small-group classes in Singapore for O Level, IGCSE, A Level, and IB Physics, Chemistry, Mathematics, and Additional Mathematics.',
      path: '/classes',
      extraMeta: [
        {
          name: 'keywords',
          content:
            'O Level Physics tuition, O Level Chemistry tuition, O Level A Math tuition, IGCSE Physics tuition, IGCSE Chemistry tuition, A Level tuition Singapore, IB tuition Singapore',
        },
      ],
      jsonLd: [
        buildClassesPageJsonLd(
          'O Level, IGCSE, A Level and IB Tuition Classes',
          'Small-group Physics, Chemistry, Mathematics, and Additional Mathematics classes for IGCSE, GCE O Level, A Level, and IB students in Singapore.',
        ),
        buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Classes', path: '/classes' },
        ]),
      ],
    }),
  component: ClassesPage,
})
