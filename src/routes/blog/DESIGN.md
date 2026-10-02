# Blog listing design

Scope: `/blog` and `/blog/`, extending Classes/About/Contact. Code-led; no Painter. Shared navigation/footer, article detail pages and the announcement index are unchanged.

## Typography, color and layout

- Self-hosted `Fusion Manrope` carries headings, summaries and metadata. Genuine `Fusion Source Serif` italic accents “notes.”. Global typography is unchanged.
- White background; charcoal `#202020`; muted copy `#606060`; orange `#ff7819`; gray surface `#f6f6f6`; separators `#dedede`; selection `#ffdcc2`.
- Full-width `TuitionHero` reuses the existing dense 10px desktop dots and 73px orange pointer reveal. Hero copy has opaque per-line backing. At ≤760px, the shared quarter-sun and subtly shimmering/swaying rays replace dots. The stacked mobile heading places the copy below the solid sun.
- Content is centered and capped at 1152px with fluid outer gutters. The featured article pairs text with its original cover on the right. Mobile uses a single column, image first, in a reserved 16:10 frame.
- Featured title reaches 32px; other article titles reach 26.4px. Body copy is 15px with 1.8 line height. Metadata is 13px. No cream ground, blue-gray text, accent stripes, gradient text or duplicated featured badges.
- Featured surface uses a 1px border and 16px corners without a shadow. Its reading affordance is orange with charcoal text and 8px corners. Remaining articles and announcements use separated editorial rows.
- More articles and announcements are adjacent on larger desktops and stack at ≤960px.

## Whole-card navigation

`BlogArticleCard` is local to the index route; the legacy shared `ArticleCard` remains unchanged for the announcement index. Each article contains exactly one native TanStack `Link`, wrapping the title, metadata, excerpt, read affordance, image and padding. Its accessible name is the article title. The visible reading affordance is a span, not a nested link or button. Each card gets one keyboard stop, a 3px charcoal focus outline, native new-tab behavior and a real server-rendered `href`.

Announcement rows within the Blog sidebar also use whole-row links. All destinations come from existing content metadata. Hover changes background/border only, with no card lift or image zoom; reduced motion disables those transitions and shared hero animations.

## Content and image provenance

Published entries, featured selection, dates, categories, excerpts and SEO remain owned by `src/lib/content.ts` and the route's existing `head()`. The two MDX articles are unchanged. The featured image is the existing `public/blog/cover-science-tuition.jpg` (1200px natural width), reused without generation or processing. No new claims, content, filters, subscriptions or backend behavior.

## Verification

TypeScript, targeted Biome, production build and Cloudflare packaging dry run pass. The discovery regression passes for all 12 sitemap pages, HTML/Markdown negotiation, schemas, APIs, feeds, redirects and noindex controls.

Production-build Chromium renders were inspected on desktop and at 390px, including the complete mobile card and keyboard focus. Browser tests clicked the featured image, empty padding and excerpt, opened a new tab, used Tab/Enter between article cards, and clicked regular-article and announcement excerpts. Checks at 320, 760, 761, 960 and 1280px found no horizontal overflow; mobile copy clears the sun. Reduced-motion checks confirm static lighting and no card transitions. Narrow viewport checks are not real-device Safari tests.

Finish review performed inline against the owner-pinned design. Keep the neutral/orange palette, genuine font pairing, original content/images, desktop dots, mobile lighting and full-card native links.
