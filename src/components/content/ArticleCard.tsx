import { type ContentEntrySummary, formatContentDate } from '@/lib/content'
import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { ArrowRight, Star } from 'lucide-react'

type ArticleCardProps = {
  entry: ContentEntrySummary
  compact?: boolean
}

export function ArticleCard({ entry, compact = false }: ArticleCardProps) {
  if (!compact && entry.coverImage) {
    return <ArticleCardWithImage entry={entry} />
  }

  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-orange-300 hover:shadow-md',
        compact ? 'p-5 pl-7' : 'p-6 pl-8',
      )}
    >
      <span className="absolute inset-y-0 left-0 w-[3px] bg-orange-200 transition-colors duration-300 group-hover:bg-orange-500" />

      {entry.featured ? (
        <div className="absolute right-4 top-4">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-bold text-amber-950 shadow-sm">
            <Star className="h-3 w-3 fill-current" />
            Featured
          </span>
        </div>
      ) : null}

      <h2
        className={cn(
          'mb-2 font-bold leading-snug tracking-tight text-slate-900',
          compact ? 'pr-20 text-lg' : 'pr-24 text-xl',
        )}
      >
        <Link
          to={entry.path}
          className="transition-colors duration-200 group-hover:text-orange-600"
        >
          {entry.title}
        </Link>
      </h2>

      <div className="mb-2 flex flex-wrap items-center gap-2 text-sm">
        <span className="rounded-full border border-orange-200/60 bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-orange-600">
          {entry.category}
        </span>
      </div>

      <p
        className={cn(
          'leading-relaxed text-slate-500',
          compact ? 'text-sm' : 'text-[0.938rem]',
        )}
      >
        {entry.excerpt}
      </p>

      <div className="mt-4 flex items-end justify-between gap-4">
        <Link
          to={entry.path}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 transition-colors duration-200 hover:text-orange-700"
        >
          Read more
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>

        <time
          className="text-xs text-slate-400"
          dateTime={entry.publishedAt}
        >
          {formatContentDate(entry.publishedAt)}
        </time>
      </div>
    </article>
  )
}

function ArticleCardWithImage({ entry }: { entry: ContentEntrySummary }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-orange-300 hover:shadow-lg">
      <div className="grid md:grid-cols-[1fr_380px]">
        {/* Content side */}
        <div className="relative flex flex-col justify-between p-6 md:p-8">
          {entry.featured ? (
            <div className="absolute right-4 top-4 md:right-auto md:left-auto md:relative md:top-auto md:right-auto md:mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-3 py-1 text-xs font-bold text-white shadow-sm">
                <Star className="h-3 w-3 fill-current" />
                Featured
              </span>
            </div>
          ) : null}

          <div>
            <h2 className="mb-3 text-2xl font-bold leading-tight tracking-tight text-slate-900 md:text-3xl">
              <Link
                to={entry.path}
                className="transition-colors duration-200 group-hover:text-orange-600"
              >
                {entry.title}
              </Link>
            </h2>

            <span className="mb-3 inline-block rounded-full border border-orange-200/60 bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
              {entry.category}
            </span>

            <p className="text-[0.938rem] leading-relaxed text-slate-500">
              {entry.excerpt}
            </p>
          </div>

          <div className="mt-6 flex items-end justify-between gap-4">
            <Link
              to={entry.path}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-orange-600"
            >
              Read article
              <ArrowRight className="h-4 w-4" />
            </Link>

            <time
              className="text-xs text-slate-400"
              dateTime={entry.publishedAt}
            >
              {formatContentDate(entry.publishedAt)}
            </time>
          </div>
        </div>

        {/* Image side */}
        <div className="relative min-h-[200px] md:min-h-0">
          <img
            src={entry.coverImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          {/* Subtle gradient overlay blending into the card */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-transparent md:from-white/20" />
        </div>
      </div>
    </article>
  )
}
