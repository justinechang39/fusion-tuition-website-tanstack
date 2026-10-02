# Contact page design

Scope: `/contact`, extending the owner-approved Classes and About design. Code-led; no Painter. Shared navigation, footer, other pages and route-level SEO remain unchanged.

## Typography and color

- Self-hosted `Fusion Manrope` carries practical copy and bold headings; genuine `Fusion Source Serif` italic accents “us.”. No global font changes.
- Ink `#202020`, muted copy `#606060`, orange `#ff7819`, orange hover `#ff963d`, white background, `#f6f6f6` hero/row hover, `#dedede` separators.
- Heading tracking stays between −0.03em and −0.035em. Hero type reaches 72px; body copy is 17px with 1.8 line height.

## Layout and interaction

- Full-width `TuitionHero`; body capped at 1152px with centered responsive gutters. Contact methods precede directions.
- Desktop inherits the shared 10px dot grid and 73px orange pointer reveal. Supporting text has opaque cloned line backing for readability.
- At ≤760px, the shared quarter-sun and shimmering/swaying rays replace dots. “us.” moves onto a second line so the introductory copy clears the solid sun.
- Contact rows use native WhatsApp, telephone and email anchors, with visible destinations. No duplicated badges or JavaScript-only buttons.
- The address and lazy native Google iframe sit side by side on desktop and stack on mobile. The iframe reserves at least 400px desktop / 320px mobile; existing external map links remain available if the embed is blocked.
- Buttons have 8px corners and a 52px minimum height. Address/map panels have 16px corners. Keyboard outlines are 3px, charcoal on light surfaces and white on the address panel.
- Only background-color hover transitions are added; shared hero motion and reduced-motion handling are reused unchanged.

## Content and assets

`src/lib/agent-ready.ts` owns contact destinations; `src/lib/location.ts` owns the real address, map URLs and directions route. No invented opening hours, response times, booking form or new raster assets. The map is Google's existing native embed; fonts and Lucide icons are reused.

## Verification

Reviewed production-build desktop and 390px Chromium captures inline. DOM checks verified pointer tracking, native destinations, directions navigation, visible keyboard focus, reduced motion, and no overflow at 320px, 761px and 1280px. The corrected mobile copy sits below the sun; sampled paragraph background contrast with `#606060` was at least 4.74:1 in the inspected capture. Typecheck, targeted Biome, production build, packaging dry run and the SEO/AI discovery regression passed. Narrow-screen Chromium checks are not real-device Safari tests.
