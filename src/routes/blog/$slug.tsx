import { ArticlePage } from '@/components/content/ArticlePage'
import { getContentEntryBySlug } from '@/lib/content'
import { getRenderedContentEntry } from '@/lib/content-render'
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildSeoHead,
} from '@/lib/seo'
import { createFileRoute, notFound } from '@tanstack/react-router'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const entry = getContentEntryBySlug('blog', params.slug)

    if (!entry) {
      throw notFound()
    }

    return entry
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return buildSeoHead({
        title: 'Fusion Tuition Blog',
        description:
          'Articles from Fusion Tuition about Physics, Chemistry, and Mathematics learning, revision habits, and academic planning in Singapore.',
        path: '/blog',
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
          { name: 'Blog', path: '/blog' },
          { name: loaderData.title, path: loaderData.path },
        ]),
      ],
    })
  },
  component: BlogArticlePage,
})

function BlogArticlePage() {
  const summary = Route.useLoaderData()

  if (!summary) {
    throw notFound()
  }

  const entry = getRenderedContentEntry('blog', summary.slug)

  if (!entry) {
    throw notFound()
  }

  return <ArticlePage entry={entry} collection="blog" />
}
