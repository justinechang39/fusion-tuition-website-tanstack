import { TuitionHero } from '@/components/ui/TuitionHero'
import {
  type ContentEntrySummary,
  formatContentDate,
  getCollectionEntries,
  getFeaturedEntry,
} from '@/lib/content'
import {
  buildBreadcrumbJsonLd,
  buildCollectionPageJsonLd,
  buildSeoHead,
} from '@/lib/seo'
import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import './blog.css'

const blogEntries = getCollectionEntries('blog')
const announcementEntries = getCollectionEntries('announcements').slice(0, 3)
const featuredEntry = getFeaturedEntry('blog') ?? blogEntries[0] ?? null
const remainingBlogEntries = featuredEntry
  ? blogEntries.filter((entry) => entry.slug !== featuredEntry.slug)
  : blogEntries

function BlogArticleCard({
  entry,
  featured = false,
}: { entry: ContentEntrySummary; featured?: boolean }) {
  return (
    <article>
      <Link
        to={entry.path}
        aria-label={entry.title}
        className={`blog-card${featured ? ' blog-card-featured' : ''}${featured && entry.coverImage ? ' blog-card-with-image' : ''}`}
      >
        <div className="blog-card-copy">
          <h3>{entry.title}</h3>
          <div className="blog-card-meta">
            <span>{entry.category}</span>
            <time dateTime={entry.publishedAt}>
              {formatContentDate(entry.publishedAt)}
            </time>
          </div>
          <p>{entry.excerpt}</p>
          <span className="blog-read" aria-hidden="true">
            Read article <ArrowRight size={18} />
          </span>
        </div>
        {featured && entry.coverImage ? (
          <div className="blog-cover">
            <img src={entry.coverImage} alt="" loading="lazy" />
          </div>
        ) : null}
      </Link>
    </article>
  )
}

export const Route = createFileRoute('/blog/')({
  head: () =>
    buildSeoHead({
      title: 'O Level & IGCSE Study Tips Singapore',
      description:
        'Study tips from Fusion Tuition for O Level, IGCSE, Physics, Chemistry, Mathematics, revision planning, and exam preparation in Singapore.',
      path: '/blog',
      extraMeta: [
        {
          name: 'keywords',
          content:
            'O Level study tips Singapore, IGCSE study tips, Physics revision, Chemistry revision, Math revision, exam preparation Singapore',
        },
      ],
      jsonLd: [
        buildCollectionPageJsonLd({
          path: '/blog',
          title: 'O Level and IGCSE Study Tips Singapore',
          description:
            'Articles from Fusion Tuition about Physics, Chemistry, Mathematics learning, revision habits, and academic planning in Singapore.',
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
    <div className="blog-page">
      <TuitionHero className="blog-hero">
        <div className="blog-intro">
          <h1>
            Study <em>notes.</em>
          </h1>
          <div className="blog-intro-copy">
            <p>
              <span className="blog-intro-text">
                Science, mathematics, and revision advice from our teachers.
              </span>
            </p>
          </div>
        </div>
      </TuitionHero>

      <div className="blog-body">
        {featuredEntry ? (
          <section className="blog-featured" aria-labelledby="blog-featured">
            <h2 id="blog-featured">Featured article</h2>
            <BlogArticleCard entry={featuredEntry} featured />
          </section>
        ) : (
          <p>No articles have been published yet.</p>
        )}

        <div className="blog-lower">
          {remainingBlogEntries.length > 0 ? (
            <section aria-labelledby="blog-latest">
              <h2 id="blog-latest">More articles</h2>
              <div className="blog-articles">
                {remainingBlogEntries.map((entry) => (
                  <BlogArticleCard key={entry.slug} entry={entry} />
                ))}
              </div>
            </section>
          ) : null}

          {announcementEntries.length > 0 ? (
            <aside
              className="blog-announcements"
              aria-labelledby="blog-updates"
            >
              <div className="blog-updates-heading">
                <h2 id="blog-updates">Announcements</h2>
                <Link
                  to="/announcements"
                  className="blog-view-all"
                  aria-label="View all announcements"
                >
                  View all <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
              <div>
                {announcementEntries.map((entry) => (
                  <article key={entry.slug}>
                    <Link
                      to={entry.path}
                      aria-label={entry.title}
                      className="blog-announcement"
                    >
                      <h3>{entry.title}</h3>
                      <p>{entry.excerpt}</p>
                      <time dateTime={entry.publishedAt}>
                        {formatContentDate(entry.publishedAt)}
                      </time>
                    </Link>
                  </article>
                ))}
              </div>
            </aside>
          ) : null}
        </div>
      </div>
    </div>
  )
}
