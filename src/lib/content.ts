export type ContentCollection = 'blog' | 'announcements'

export type ContentMetadata = {
  slug: string
  title: string
  description: string
  excerpt: string
  publishedAt: string
  updatedAt?: string
  author: string
  category: string
  tags: string[]
  published: boolean
  featured?: boolean
  ogImage?: string
  coverImage?: string
}

export type ContentEntrySummary = ContentMetadata & {
  collection: ContentCollection
  path: string
  modulePath: string
}

type ContentCollectionConfig = {
  label: string
  basePath: string
  description: string
}

const collectionConfig: Record<ContentCollection, ContentCollectionConfig> = {
  blog: {
    label: 'Blog',
    basePath: '/blog',
    description:
      'Long-form articles from Fusion Tuition about science and mathematics learning, study strategy, and parent-facing guidance.',
  },
  announcements: {
    label: 'Announcements',
    basePath: '/announcements',
    description:
      'Short updates from Fusion Tuition about registration windows, schedules, term reminders, and new programmes.',
  },
}

const blogMetadataModules = import.meta.glob('/src/content/blog/*.mdx', {
  eager: true,
  import: 'metadata',
}) as Record<string, ContentMetadata>

const announcementMetadataModules = import.meta.glob(
  '/src/content/announcements/*.mdx',
  {
    eager: true,
    import: 'metadata',
  },
) as Record<string, ContentMetadata>

function sortEntriesDesc(
  left: Pick<ContentEntrySummary, 'publishedAt' | 'featured'>,
  right: Pick<ContentEntrySummary, 'publishedAt' | 'featured'>,
) {
  if (left.featured && !right.featured) {
    return -1
  }

  if (!left.featured && right.featured) {
    return 1
  }

  return Date.parse(right.publishedAt) - Date.parse(left.publishedAt)
}

function buildEntrySummary(
  collection: ContentCollection,
  modulePath: string,
  metadata: ContentMetadata,
): ContentEntrySummary {
  const config = collectionConfig[collection]

  return {
    ...metadata,
    collection,
    path: `${config.basePath}/${metadata.slug}`,
    modulePath,
  }
}

function createCollectionEntries(
  collection: ContentCollection,
  modules: Record<string, ContentMetadata>,
) {
  return Object.entries(modules)
    .map(([modulePath, metadata]) =>
      buildEntrySummary(collection, modulePath, metadata),
    )
    .filter((entry) => entry.published)
    .sort(sortEntriesDesc)
}

const contentEntriesByCollection: Record<
  ContentCollection,
  ContentEntrySummary[]
> = {
  blog: createCollectionEntries('blog', blogMetadataModules),
  announcements: createCollectionEntries(
    'announcements',
    announcementMetadataModules,
  ),
}

export function getCollectionConfig(collection: ContentCollection) {
  return collectionConfig[collection]
}

export function getCollectionEntries(collection: ContentCollection) {
  return [...contentEntriesByCollection[collection]]
}

export function getFeaturedEntry(collection: ContentCollection) {
  return contentEntriesByCollection[collection].find((entry) => entry.featured)
}

export function getContentEntryBySlug(
  collection: ContentCollection,
  slug: string,
) {
  return contentEntriesByCollection[collection].find(
    (entry) => entry.slug === slug,
  )
}

export function getAllContentEntries() {
  return [
    ...contentEntriesByCollection.blog,
    ...contentEntriesByCollection.announcements,
  ].sort(sortEntriesDesc)
}

export function getRecentContentEntries(
  limit = 5,
  collections: ContentCollection[] = ['blog', 'announcements'],
) {
  return collections
    .flatMap((collection) => contentEntriesByCollection[collection])
    .sort(sortEntriesDesc)
    .slice(0, limit)
}

export function formatContentDate(dateString: string) {
  return new Intl.DateTimeFormat('en-SG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString))
}

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

export function buildRssXml(origin: string) {
  const items = getAllContentEntries()
    .slice(0, 20)
    .map(
      (entry) => `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${origin}${entry.path}</link>
      <guid>${origin}${entry.path}</guid>
      <pubDate>${new Date(entry.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(entry.description)}</description>
      <category>${escapeXml(entry.category)}</category>
    </item>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Fusion Tuition Updates</title>
    <link>${origin}/blog</link>
    <description>Articles and announcements from Fusion Tuition.</description>
    <language>en-sg</language>
${items}
  </channel>
</rss>
`
}
