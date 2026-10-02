---
version: 1
slug: "src-legacy-pages-contact-tsx"
primary_target: "src/legacy-pages/contact.tsx"
related_targets: ["src/legacy-pages/contact/contact.css"]
---

# Contact page design

Scope: `/contact`, extending the owner-approved Classes and About design. Code-led; no Painter. Shared navigation, footer, other pages and route-level SEO remain unchanged.
Mode: Operate. Visitors choose a contact channel or find the centre; the contact destinations and real address carry the useful content.

## Direction contract

THESIS: Make the three real ways to contact Fusion Tuition immediately available, then help visitors find the centre. Remove duplicated contact badges and put contact actions before directions.

OWN-WORLD: Inherit white, charcoal, light gray, Fusion orange, self-hosted Manrope and genuine Source Serif 4 italic. Use `TuitionHero` for the desktop dot matrix/orange hover circle and mobile quarter-sun/shimmering rays. Contact methods are readable rows rather than multicoloured icon cards.

STORY: Choose WhatsApp, telephone or email; read the address; open the existing Google/Apple Maps destinations or directions page. No new form, booking backend, opening hours or response-time promise.

FIRST VIEWPORT: A full-width hero pairs “Contact us.” with a short enquiry explanation and orange WhatsApp action. On mobile, the italic “us.” occupies a second line so copy clears the quarter-sun. A centered body starts with the direct contact rows. The address and native Google Maps embed follow, side by side on desktop and stacked on mobile.

FORM: Owner-pinned extension of the established design, not a new concept roll. `src/lib/agent-ready.ts` owns contact destinations; `src/lib/location.ts` owns address, map URLs and the directions route.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
