---
name: Fusion Tuition classes
description: Route-scoped small-group tuition catalogue; not the site-wide design system.
colors:
  ink: "#202020"
  muted: "#606060"
  orange: "#ff7819"
  background: "#ffffff"
  paper: "#f6f6f6"
  line: "#dedede"
  selection: "#ffdcc2"
  actionHover: "#ff963d"
  darkAccent: "#ffae73"
  darkSecondary: "#cccccc"
  darkLine: "#4a4a4a"
typography:
  display:
    fontFamily: "Classes Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 4.4vw, 4.25rem)"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  emphasis:
    fontFamily: "Classes Source Serif, Georgia, serif"
    fontStyle: italic
    fontWeight: 500
    letterSpacing: "-0.025em"
rounded:
  button: "8px"
  programme: "16px"
  finder: "20px"
---

# Classes page design

Scope: `/classes` only. The shared navigation, footer, and other pages retain their existing designs.

## Direction contract

THESIS: The small-group offering leads directly into choosing a syllabus, rather than a long stack of detached subject tiles.

OWN-WORLD: White, neutral charcoal, light-gray course panels, and Fusion orange actions. Locally hosted Manrope carries the practical information; Source Serif 4 italic distinguishes the catalogue heading. Subject rows look like a course directory, not decorative cards. The rejected cream, brown, and green-tinted palette is not part of this direction. Copy is direct and factual, without motivational slogans.

STORY: Understand the small-group offer, find a curriculum, see its real subjects and syllabus codes, and ask about a free trial through WhatsApp.

FIRST VIEWPORT: Oversized left-aligned heading and free-trial action share the opening with a dark, four-row curriculum navigator. A compact benefit strip separates the opening from the catalogue.

FORM: Typography-led course directory chosen for clarity within the established Fusion brand; Impeccable surface seed `1caea9bf`. The owner requests direct code-led UI design and rendered browser review, without Painter or generated UI mockups.

FINISH: Verify desktop and narrow layouts, curriculum anchors, all eleven subject enquiries, contact destinations, readable contrast, keyboard focus, and reduced motion. Review the finished page and record its tokens before release.

## Tokens and behavior

- Display/body: Manrope variable, with system sans fallback; display weight 800, maximum 4.25rem, tracking -0.035em. The owner-supplied hero direction is “Small class. Same school. Same stream.”
- Catalogue heading: Source Serif 4 genuine italic at weight 500, automatic optical sizing, tracking -0.025em, and Georgia fallback. Keep the hero to the three owner-supplied lines; no additional slogan. Curriculum names, subjects, and controls remain sans serif.
- Font assets are self-hosted with `font-display: swap` and their SIL Open Font Licenses. The serif file is the Google Fonts Latin WOFF2 subset with weight and optical-size axes; only the used italic style is loaded. No runtime Google Fonts request is needed.
- Pairing research: [Google Fonts Knowledge, Pairing typefaces](https://fonts.google.com/knowledge/choosing_type/pairing_typefaces) recommends contrast with harmony and a genuine secondary italic rather than a synthesized one. [Manrope pairing examples](https://bonfx.com/what-fonts-go-with-manrope/) include Source Serif. This page assigns the two faces distinct expressive and practical roles.
- Ink: `#202020`; muted: `#606060`; orange action: `#ff7819`; background: white; panel ground: `#f6f6f6`; lines: `#dedede`. Orange buttons use charcoal text. Small text stays charcoal or gray for contrast; dark panels use `#cccccc` secondary text.
- One-pixel divisions structure course rows. Curriculum panels use 16px corners; the dark finder uses 20px corners.
- Curriculum links jump to headings with sticky-header clearance. Every subject opens a WhatsApp enquiry naming its curriculum, subject, and syllabus code.
- The trailing enquiry chevron uses the transitions.dev learn-more recipe, with reduced-motion support. Content is visible before JavaScript; no entrance animation hides headings.
- Below 760px, the opening and catalogue become single columns. The heading uses `clamp(2rem, 10.5vw, 4rem)` and opening/contact tracks use `minmax(0, 1fr)` to prevent long words from widening the page. Tablet headings use `clamp(2rem, 4.4vw, 3.5rem)`.
- Subject and curriculum links have a minimum 64px height; long subject names and contact addresses wrap without horizontal scrolling.
