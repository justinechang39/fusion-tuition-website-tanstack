import { ArticlePage } from '@/components/content/ArticlePage'
import { getContentEntryBySlug } from '@/lib/content'
import { getRenderedContentEntry } from '@/lib/content-render'
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildSeoHead,
} from '@/lib/seo'
import { createFileRoute, notFound } from '@tanstack/react-router'

export const Route = createFileRoute('/announcements/$slug')({
  loader: ({ params }) => {
    const entry = getContentEntryBySlug('announcements', params.slug)

    if (!entry) {
      throw notFound()
    }

    return entry
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return buildSeoHead({
        title: 'Fusion Tuition Announcements',
        description:
          'Registration updates, timing reminders, and operational notices from Fusion Tuition.',
        path: '/announcements',
        noIndex: true,
      })
    }

    return buildSeoHead({
      title: loaderData.title,
      description: loaderData.description,
      path: loaderData.path,
      imagePath: loaderData.ogImage,
      ogType: 'article',
      extraMeta: [
        {
          property: 'article:published_time',
          content: loaderData.publishedAt,
        },
        {
          property: 'article:modified_time',
          content: loaderData.updatedAt ?? loaderData.publishedAt,
        },
      ],
      jsonLd: [
        buildArticleJsonLd(loaderData),
        buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Announcements', path: '/announcements' },
          { name: loaderData.title, path: loaderData.path },
        ]),
      ],
    })
  },
  component: AnnouncementArticlePage,
})

function AnnouncementArticlePage() {
  const summary = Route.useLoaderData()

  if (!summary) {
    throw notFound()
  }

  const entry = getRenderedContentEntry('announcements', summary.slug)

  if (!entry) {
    throw notFound()
  }

  return <ArticlePage entry={entry} collection="announcements" />
}
