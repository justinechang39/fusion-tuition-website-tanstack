import {
  type ContentCollection,
  formatContentDate,
  getCollectionConfig,
} from '@/lib/content'
import type { RenderedContentEntry } from '@/lib/content-render'
import { cn } from '@/lib/utils'
import { HeroHighlight } from '@/components/ui/hero-highlight'
import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

import type { ComponentPropsWithoutRef } from 'react'

function ArticleLink({
  href = '',
  className,
  ...props
}: ComponentPropsWithoutRef<'a'>) {
  const sharedClassName = cn(
    'font-medium text-orange-700 underline decoration-orange-300 underline-offset-4 transition-colors duration-200 hover:text-orange-800',
    className,
  )

  if (href.startsWith('/')) {
    return (
      <Link
        to={href}
        className={sharedClassName}
        activeProps={{ className: sharedClassName }}
        {...props}
      />
    )
  }

  const shouldOpenNewTab =
    href.startsWith('http://') || href.startsWith('https://')

  return (
    <a
      href={href}
      className={sharedClassName}
      rel={shouldOpenNewTab ? 'noreferrer' : props.rel}
      target={shouldOpenNewTab ? '_blank' : props.target}
      {...props}
    />
  )
}

function ArticleImage(props: ComponentPropsWithoutRef<'img'>) {
  return (
    <img
      {...props}
      alt={props.alt ?? ''}
      className={cn(
        'w-full rounded-2xl border border-slate-200 bg-white shadow-sm',
        props.className,
      )}
      loading="lazy"
    />
  )
}

export function ArticlePage({
  entry,
  collection,
}: {
  entry: RenderedContentEntry
  collection: ContentCollection
}) {
  const Content = entry.Component
  const collectionConfig = getCollectionConfig(collection)

  return (
    <div className="-mx-4 -mt-8">
      {/* Hero with dot-pattern highlight effect */}
      <HeroHighlight containerClassName="rounded-none bg-gradient-to-t from-slate-50 to-gray-100">
        <div className="mx-auto w-full max-w-5xl px-4 py-12 md:px-8 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          >
            {/* Breadcrumb */}
            <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
              <Link
                to="/"
                className="transition-colors duration-200 hover:text-slate-900"
              >
                Home
              </Link>
              <span className="text-slate-300">›</span>
              <Link
                to={collectionConfig.basePath}
                className="transition-colors duration-200 hover:text-slate-900"
              >
                {collectionConfig.label}
              </Link>
            </nav>

            {/* Title — big and first */}
            <h1 className="mb-5 max-w-4xl text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl md:leading-[1.15]">
              {entry.title}
            </h1>

            {/* Meta row */}
            <div className="mb-5 flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full border border-orange-200/60 bg-orange-50 px-3 py-1 font-medium text-orange-600">
                {entry.category}
              </span>
              <time className="text-slate-500" dateTime={entry.publishedAt}>
                {formatContentDate(entry.publishedAt)}
              </time>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500">{entry.author}</span>
            </div>

            {/* Description */}
            <p className="max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg md:leading-8">
              {entry.description}
            </p>

            {/* Tags */}
            <div className="mt-5 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-200/60 px-3 py-1 text-xs font-medium text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </HeroHighlight>

      <div className="h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500" />

      {/* Cover image */}
      {entry.coverImage ? (
        <div className="relative h-[240px] w-full overflow-hidden md:h-[360px]">
          <img
            src={entry.coverImage}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80" />
        </div>
      ) : null}

      {/* Article body */}
      <div className="bg-[linear-gradient(180deg,#fffbf5_0%,#ffffff_12%,#fffdf9_100%)] px-4 pb-20 pt-10 md:px-8 md:pt-14">
        <article className="mx-auto max-w-4xl">
          <div className="prose prose-slate prose-lg max-w-none prose-headings:scroll-mt-28 prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mt-14 prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-3 prose-h3:mt-10 prose-p:leading-[1.8] prose-a:no-underline prose-img:my-10 prose-pre:overflow-x-auto prose-ul:marker:text-orange-500">
            <Content components={{ a: ArticleLink, img: ArticleImage }} />
          </div>

          {/* Bottom divider + back link */}
          <div className="mt-16 border-t border-slate-200 pt-8">
            <Link
              to={collectionConfig.basePath}
              className="group inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors duration-200 hover:text-orange-600"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
              Back to {collectionConfig.label}
            </Link>
          </div>
        </article>
      </div>
    </div>
  )
}
