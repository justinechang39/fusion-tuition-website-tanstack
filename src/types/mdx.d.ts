declare module '*.mdx' {
  import type { ComponentType } from 'react'

  import type { ContentMetadata } from '@/lib/content'

  export const metadata: ContentMetadata

  const MDXComponent: ComponentType<Record<string, unknown>>
  export default MDXComponent
}
