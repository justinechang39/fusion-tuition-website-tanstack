# Fusion Tuition Content System

This project uses a git-backed MDX content workflow for both evergreen blog posts and time-bound announcements.

## Goals

- Keep authoring simple for developers.
- Preserve excellent SEO defaults.
- Keep public pages static-friendly and fast.
- Avoid hand-writing a new React route for every post.

## Content Locations

- Blog posts: `src/content/blog/*.mdx`
- Announcements: `src/content/announcements/*.mdx`

Each file is one published entry.

## Required Metadata

Every MDX file must export a `metadata` object with this shape:

```mdx
export const metadata = {
  slug: 'your-url-slug',
  title: 'Your page title',
  description: '150-160 character summary for search and sharing',
  excerpt: 'Short card summary used on listing pages',
  publishedAt: '2026-04-18',
  updatedAt: '2026-04-18',
  author: 'Fusion Tuition',
  category: 'Study Strategy',
  tags: ['O Level', 'Physics revision'],
  published: true,
  featured: false,
  ogImage: '/optional-social-image.png',
  coverImage: '/blog/cover-my-post.jpg',
}
```

Notes:

- `slug` becomes the URL segment.
- Blog URLs become `/blog/<slug>`.
- Announcement URLs become `/announcements/<slug>`.
- Set `published: false` to keep a draft out of listing pages, sitemap, RSS, and route lookup.
- `ogImage` is optional. If omitted, the site-wide default share image is used.
- `coverImage` is optional. When set on a non-compact card (e.g. the featured article on `/blog`), the card displays the image alongside the content. Use landscape images around `1200×630`. Store them in `public/blog/`.

## Writing A New Post

1. Copy an existing `.mdx` file in the right collection.
2. Update the metadata export.
3. Write the body in markdown or MDX.
4. Commit and deploy.

You do not need to:

- add a new route file
- update the sitemap manually
- update RSS manually
- add manual SEO tags

Those are generated from the metadata and shared content loaders.

## What Updates Automatically

- `/blog`
- `/announcements`
- individual article pages
- canonical metadata
- Open Graph and Twitter metadata
- JSON-LD article schema
- `/sitemap.xml`
- `/rss.xml`

## When To Use Blog vs Announcements

Use `blog` for evergreen, searchable content:

- study strategy
- curriculum explainers
- parent guidance
- revision advice

Use `announcements` for short-lived operational updates:

- registration windows
- class openings
- holiday programmes
- schedule reminders

## Authoring Guidelines

- Prefer one clear search intent per blog post.
- Keep titles concrete.
- Write the description for humans first, then search.
- Link to relevant marketing pages such as `/classes`, `/connect`, and `/contact`.
- Add 3 to 6 tags only.
- Use exact dates in metadata.
- If a post is meant to rank, make it a blog post, not an announcement.

## Images

- Put cover images in `public/blog/` and set `coverImage` in metadata (e.g. `coverImage: '/blog/cover-my-post.jpg'`).
- Put inline post images in `public/` and reference them in MDX with absolute paths such as `/my-post-image.png`.
- Use landscape `1200×630` images for both `coverImage` and `ogImage`.
- If you want social previews to look polished, create a dedicated `1200×630` image and set `ogImage`. If omitted, the site-wide default is used.
- `coverImage` controls the visual card on listing pages; `ogImage` controls what appears when the link is shared on social media. They can be the same file.

## Route And Loader Internals

- `src/lib/content.ts` loads typed metadata and powers list pages, sitemap, RSS, and discovery.
- `src/lib/content-render.ts` loads the compiled MDX component for detail pages.
- `src/routes/blog/*` and `src/routes/announcements/*` are generic collection routes, not post-specific routes.

## Scaling Later

This is the right setup while content is developer-authored and version-controlled.

If non-developers need an editor later, move the same metadata model into a CMS and keep the route structure unchanged.
