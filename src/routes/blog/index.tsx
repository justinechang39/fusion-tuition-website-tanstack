import { ArticleCard } from '@/components/content/ArticleCard'
import {
  HeroHighlight,
  Highlight,
} from '@/components/ui/hero-highlight'
import {
  type ContentEntrySummary,
  getCollectionEntries,
  getFeaturedEntry,
} from '@/lib/content'
import {
  buildBreadcrumbJsonLd,
  buildCollectionPageJsonLd,
  buildSeoHead,
} from '@/lib/seo'
import { Link, createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const blogEntries = getCollectionEntries('blog')
const announcementEntries = getCollectionEntries('announcements').slice(0, 3)
const featuredEntry = getFeaturedEntry('blog') ?? blogEntries[0] ?? null
const remainingBlogEntries = featuredEntry
  ? blogEntries.filter((entry) => entry.slug !== featuredEntry.slug)
  : blogEntries

function AnnouncementLinkCard({ entry }: { entry: ContentEntrySummary }) {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 pl-7 transition-[border-color] duration-200 hover:border-orange-300">
      <span className="absolute inset-y-0 left-0 w-[3px] bg-teal-200 transition-colors duration-300 group-hover:bg-teal-500" />
      <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.2em] text-teal-600">
        Announcement
      </p>
      <h3 className="text-base font-semibold leading-snug tracking-tight text-slate-900">
        <Link
          to={entry.path}
          className="transition-colors duration-200 group-hover:text-orange-600"
        >
          {entry.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        {entry.excerpt}
      </p>
    </article>
  )
}

export const Route = createFileRoute('/blog/')({
  head: () =>
    buildSeoHead({
      title: 'Fusion Tuition Blog',
      description:
        'Articles from Fusion Tuition about Physics, Chemistry, and Mathematics learning, revision habits, and academic planning in Singapore.',
      path: '/blog',
      jsonLd: [
        buildCollectionPageJsonLd({
          path: '/blog',
          title: 'Fusion Tuition Blog',
          description:
            'Articles from Fusion Tuition about Physics, Chemistry, and Mathematics learning, revision habits, and academic planning in Singapore.',
          entries: blogEntries,
        }),
        buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ]),
      ],
    }),
  component: BlogIndexPage,
})

function BlogIndexPage() {
  return (
    <div className="-mx-4 -mt-8">
      {/* Hero with dot-pattern highlight effect */}
      <HeroHighlight containerClassName="rounded-none bg-gradient-to-t from-slate-50 to-gray-100">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 md:px-8 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          >
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-orange-600">
              From Our Teachers
            </p>
            <h1 className="mb-5 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-6xl md:leading-[1.1]">
              Insights for{' '}
              <Highlight className="bg-gradient-to-r from-orange-300 to-amber-300 text-slate-900">
                smarter
              </Highlight>{' '}
              studying
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg md:leading-8">
              Practical tips, subject guides, and revision strategies from our
              teachers to help students build confidence in Physics, Chemistry,
              and Mathematics.
            </p>
          </motion.div>
        </div>
      </HeroHighlight>

      <div className="h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500" />

      {/* Content area */}
      <div className="bg-[linear-gradient(180deg,#fffbf5_0%,#ffffff_12%,#fffdf9_100%)] px-4 pb-20 pt-10 md:px-8 md:pt-14">
        <div className="mx-auto max-w-6xl">
          {featuredEntry ? (
            <section className="mb-12">
              <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Featured
              </h2>
              <ArticleCard entry={featuredEntry} />
            </section>
          ) : null}

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(300px,0.85fr)]">
            <section>
              <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Latest articles
              </h2>
              <div className="grid gap-5">
                {remainingBlogEntries.map((entry) => (
                  <ArticleCard key={entry.slug} entry={entry} compact />
                ))}
              </div>
            </section>

            <aside>
              <div className="mb-5 flex items-center justify-between gap-4">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Announcements
                </h2>
                <Link
                  to="/announcements"
                  className="group inline-flex items-center gap-1.5 text-xs font-medium text-orange-600 transition-colors duration-200 hover:text-orange-700"
                >
                  View all
                  <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
              <div className="grid gap-4">
                {announcementEntries.map((entry) => (
                  <AnnouncementLinkCard key={entry.slug} entry={entry} />
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
