import { ArticleCard } from '@/components/content/ArticleCard'
import { getCollectionEntries } from '@/lib/content'
import {
  buildBreadcrumbJsonLd,
  buildCollectionPageJsonLd,
  buildSeoHead,
} from '@/lib/seo'
import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

const announcementEntries = getCollectionEntries('announcements')

export const Route = createFileRoute('/announcements/')({
  head: () =>
    buildSeoHead({
      title: 'Fusion Tuition Announcements',
      description:
        'Registration updates, timing reminders, and operational notices from Fusion Tuition.',
      path: '/announcements',
      jsonLd: [
        buildCollectionPageJsonLd({
          path: '/announcements',
          title: 'Fusion Tuition Announcements',
          description:
            'Registration updates, timing reminders, and operational notices from Fusion Tuition.',
          entries: announcementEntries,
        }),
        buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Announcements', path: '/announcements' },
        ]),
      ],
    }),
  component: AnnouncementsIndexPage,
})

function AnnouncementsIndexPage() {
  return (
    <div className="-mx-4 -mt-8">
      {/* Dark hero banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 pb-12 pt-10 md:px-8 md:pb-16 md:pt-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-20 h-[360px] w-[360px] rounded-full bg-teal-500/10 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 bottom-0 h-[280px] w-[280px] rounded-full bg-cyan-400/8 blur-[100px]"
        />

        <div className="relative mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-teal-400">
            What's New
          </p>
          <h1 className="mb-4 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-5xl md:leading-[1.15]">
            Stay in the Loop
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg md:leading-8">
            Class schedules, registration windows, and important dates —
            everything you need to stay up to date with Fusion Tuition.
          </p>
          <p className="mt-5">
            <Link
              to="/blog"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-orange-400 transition-colors duration-200 hover:text-orange-300"
            >
              Browse long-form articles instead
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </p>
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500" />

      {/* Content area */}
      <div className="bg-[linear-gradient(180deg,#fffbf5_0%,#ffffff_12%,#fffdf9_100%)] px-4 pb-20 pt-10 md:px-8 md:pt-14">
        <div className="mx-auto max-w-6xl">
          <section className="grid gap-5">
            {announcementEntries.map((entry) => (
              <ArticleCard key={entry.slug} entry={entry} compact />
            ))}
          </section>
        </div>
      </div>
    </div>
  )
}
