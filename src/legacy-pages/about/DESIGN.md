# About page design

Scope: `/about`, extending the owner-approved Classes design without changing the shared navigation or footer. Code-led; no Painter or generated UI images.

## Direction contract

THESIS: Introduce the two real teachers and explain the consistent-teacher arrangement. Keep “Just the two of us” and the alternating portrait-and-biography layout, rather than replacing people with generic value cards.

OWN-WORLD: Inherit Classes' white, charcoal, light gray and Fusion orange. Self-hosted Manrope carries headings and practical information; Source Serif 4 italic accents “teach.” Real, rectangular portraits lead the teacher section. No cream or blue-gray palette, photo text overlays, or invented credentials.

STORY: Understand the engineer backgrounds, meet Justine and Qi Hui, see how small groups work, and view classes or ask about a free trial.

FIRST VIEWPORT: A full-width opening pairs a large, two-line heading with a concise introduction and Classes link. Desktop uses Classes' dense dot matrix with an orange circular pointer reveal; mobile replaces dots with the same top-right glowing quarter-sun and subtly shimmering, swaying rays. The teacher section follows immediately. Portraits use 4:5 frames and individual horizontal focal points; mobile centers each portrait above its biography.

FORM: Owner-pinned extension of the Classes world, not a new concept roll. Preserve the prior owner's two-teacher message and desktop alternating ordering. The original local JPEGs are unchanged; cropping belongs to CSS.

FINISH: Inspect desktop and 320–640px layouts, both complete faces, working contact links, keyboard focus, contrast and reduced motion. Unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Tokens and behavior

- Fonts: `Fusion Manrope` variable, with the same self-hosted registration as Classes; `Fusion Source Serif` genuine italic, weight 500, for “teach.” Global body typography is unchanged.
- Colors: ink `#202020`, muted `#606060`, action `#ff7819`, action hover `#ff963d`, paper `#f6f6f6`, lines `#dedede`, white background. Dark contact text is white with `#cccccc` secondary text. No colored text on orange.
- Display: weight 800, tracking −0.035em, line-height 1.12, maximum 4.5rem. Section and teacher headings use weight 750 and tracking −0.03em. Experience text uses natural width and pretty wrapping to avoid isolated last words.
- Layout: full-width hero with 1280px content; fluid side padding. Teacher profiles alternate photo sides on desktop and stack photo-first at 760px and below. Mobile portrait and biography columns are centered, up to 336px wide.
- Hero effects: `src/components/ui/TuitionHero.tsx` and `tuition-hero.css` own the shared Classes/About backgrounds. Desktop dots use 10px spacing and 1.4px radius, with the existing 73px orange pointer reveal. Introductory body text has an opaque per-line backing for readability. At 760px and below, dots disappear and the cropped orange quarter-sun appears with down-left rays, a 500ms entrance, an 8s ±10° half-cycle sway and a subtle 5s shimmer. Reduced motion disables all lighting animations and the pointer reveal. Effects never intercept clicks or cause horizontal scrolling.
- Portraits: fixed 4:5 aspect ratio, not fixed shallow heights; `object-fit: cover`. Justine uses `left center` to center her face rather than the original photo's person-and-dog composition; Qi Hui uses `center`. Both preserve the full source height and crop only the sides. Explicit source dimensions reserve space; lazy loading defers offscreen photos.
- Profile/contact panels: 16px corners, no borders or shadows. Portraits use 12px corners; buttons use 8px corners.
- Interaction: anchors work before JavaScript, with 52px action targets and 44px phone/email targets. Buttons change background only; no hover translation or photo zoom. Focus uses a 3px charcoal outline on light surfaces and white on the dark contact panel. Reduced motion disables the color transition. Content never waits for an entrance animation to become visible.
- Route-level About SEO and teacher structured data remain owned by `src/routes/about.tsx` and `src/lib/seo.ts`.

## Photo provenance

The existing repository photographs `public/justine.jpg` and `public/qihui.jpg` are the sole sources. No generated or retouched portraits. The originals remain unchanged; the page uses smaller WebP derivatives to reduce the combined photo payload from about 1.4MB to 114KB.

```sh
magick public/justine.jpg -auto-orient -resize '1000x1000>' -strip -quality 84 public/justine-portrait.webp
magick public/qihui.jpg -auto-orient -resize '1000x1000>' -strip -quality 84 public/qihui-portrait.webp
```

## Finish review

Disposition: ship. Review performed inline with actual browser renders, not a separate review agent.

- Persistence: product scope, owner-pinned direction and route tokens are recorded. Photo sources and reproducible conversion commands are documented.
- Fidelity: the selected neutral/orange palette and genuine serif/sans pairing match Classes. Both real faces remain complete and centered on mobile; the alternating desktop ordering and consistent-teacher message remain intact.
- Owner follow-up: restore both background effects, not just the typography. Desktop hover and the mobile sun/shimmer/sway were exercised and inspected in browser captures; Classes retains the same effects through the shared component.
- Ceiling: the real people, typographic contrast and editorial teaching rows carry the page without decorative icon cards or invented claims.
- Material fixes: the shallow photo crop and isolated “years” wrap were corrected; production-build captures confirm both fixes. No outstanding visual fixes in the scoped page.
- Keep: direct copy, real teacher facts, readable controls, no hover translation, and unchanged shared navigation/footer.

Verification: TypeScript and targeted Biome pass; production build and Cloudflare packaging dry-run pass. Browser checks cover 320, 390, 640, 760, 761, 1024 and 1280px layouts, centered 4:5 frames, no horizontal overflow, a working Classes link, 3px keyboard focus and reduced motion. Both production-build WebP portraits load at their expected dimensions. The existing site-wide discovery regression check passes for 12 sitemap pages, content negotiation, schemas, APIs, skill hashes, feeds, redirects, HEAD, 404s and noindex controls.
