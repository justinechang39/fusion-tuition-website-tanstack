import HomePage from '@/legacy-pages/index'
import { buildBreadcrumbJsonLd, buildPageJsonLd, buildSeoHead } from '@/lib/seo'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  head: () =>
    buildSeoHead({
      title: 'O Level & IGCSE Physics, Chemistry and Math Tuition Singapore',
      description:
        'Small-group Physics, Chemistry, and Mathematics tuition in Singapore for O Level, IGCSE, A Level, and IB students, taught by engineer teachers.',
      path: '/',
      extraMeta: [
        {
          name: 'keywords',
          content:
            'tuition Singapore, O Level tuition, IGCSE tuition, Physics tuition Singapore, Chemistry tuition Singapore, Math tuition Singapore, small group tuition',
        },
      ],
      jsonLd: [
        buildPageJsonLd({
          path: '/',
          title: 'Fusion Tuition',
          description:
            'Small-group Physics, Chemistry, and Mathematics tuition in Singapore for IGCSE, GCE O Level, A Level, and IB students.',
          keywords: [
            'O Level tuition Singapore',
            'IGCSE tuition Singapore',
            'Physics tuition Singapore',
            'Chemistry tuition Singapore',
            'Mathematics tuition Singapore',
          ],
        }),
        buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }]),
      ],
    }),
  component: HomePage,
})
