import ClassPage from '@/legacy-pages/classes/[slug]'
import { buildSeoHead } from '@/lib/seo'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/classes/$slug')({
  head: () =>
    buildSeoHead({
      title: 'Classes',
      description:
        'Fusion Tuition class information is available on the main classes page.',
      path: '/classes',
      noIndex: true,
    }),
  component: ClassPage,
})
