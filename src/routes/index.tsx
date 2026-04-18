import HomePage from '@/legacy-pages/index'
import { buildBreadcrumbJsonLd, buildPageJsonLd, buildSeoHead } from '@/lib/seo'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  head: () =>
    buildSeoHead({
      title: 'Singapore Physics, Chemistry and Mathematics Tuition',
      description:
        'Fusion Tuition offers small-group Physics, Chemistry, and Mathematics tuition in Singapore for IGCSE, GCE O Level, A Level, and IB students.',
      path: '/',
      jsonLd: [
        buildPageJsonLd({
          path: '/',
          title: 'Fusion Tuition',
          description:
            'Small-group Physics, Chemistry, and Mathematics tuition in Singapore for IGCSE, GCE O Level, A Level, and IB students.',
        }),
        buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }]),
      ],
    }),
  component: HomePage,
})
