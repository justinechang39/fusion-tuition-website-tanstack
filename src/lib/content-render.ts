import type { ComponentType } from 'react'

import {
  type ContentCollection,
  type ContentEntrySummary,
  type ContentMetadata,
  getContentEntryBySlug,
} from '@/lib/content'

type ContentModule = {
  default: ComponentType<Record<string, unknown>>
  metadata: ContentMetadata
}

export type RenderedContentEntry = ContentEntrySummary & {
  Component: ContentModule['default']
}

const blogModules = import.meta.glob('/src/content/blog/*.mdx', {
  eager: true,
}) as Record<string, ContentModule>

const announcementModules = import.meta.glob(
  '/src/content/announcements/*.mdx',
  {
    eager: true,
  },
) as Record<string, ContentModule>

const modulesByCollection: Record<
  ContentCollection,
  Record<string, ContentModule>
> = {
  blog: blogModules,
  announcements: announcementModules,
}

export function getRenderedContentEntry(
  collection: ContentCollection,
  slug: string,
): RenderedContentEntry | null {
  const summary = getContentEntryBySlug(collection, slug)

  if (!summary) {
    return null
  }

  const module = modulesByCollection[collection][summary.modulePath]

  if (!module) {
    return null
  }

  return {
    ...summary,
    Component: module.default,
  }
}
