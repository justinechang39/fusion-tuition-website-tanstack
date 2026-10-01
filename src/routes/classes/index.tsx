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
        'Physics, Chemistry, and Mathematics tuition in Singapore for IGCSE, O Level, A Level, and IB. Maximum three students per class. Enquire about a free trial.',
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
          'Small-group science and mathematics tuition in Singapore for IGCSE, GCE O Level, A Level, and IB, with a maximum of three students per class.',
        ),
        buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Classes', path: '/classes' },
        ]),
      ],
    }),
  component: ClassesPage,
})
