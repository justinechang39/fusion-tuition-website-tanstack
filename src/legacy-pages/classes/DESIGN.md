---
name: Fusion Tuition classes
description: Route-scoped small-group tuition catalogue; not the site-wide design system.
colors:
  ink: "#202622"
  muted: "#5b625d"
  orange: "#ff7819"
  action: "#a63f00"
  paper: "#fff8f0"
  line: "#dedfd8"
typography:
  display:
    fontFamily: "Classes Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 5.7vw, 5.25rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.04em"
rounded:
  button: "8px"
  programme: "16px"
  finder: "20px"
---

# Classes page design

Scope: `/classes` only. The shared navigation, footer, and other pages retain their existing designs.

## Direction contract

THESIS: The small-group offering leads directly into choosing a syllabus, rather than a long stack of detached subject tiles.

OWN-WORLD: Fusion orange, white, warm pale-orange fields, and charcoal. Locally hosted Manrope headings give the page a confident, approachable voice. Subject rows look like a course directory, not decorative cards.

STORY: Understand the small-group offer, find a curriculum, see its real subjects and syllabus codes, and ask about a free trial through WhatsApp.

FIRST VIEWPORT: Oversized left-aligned heading and free-trial action share the opening with a dark, four-row curriculum navigator. A compact benefit strip separates the opening from the catalogue.

FORM: Typography-led course directory chosen for clarity within the established Fusion brand; Impeccable surface seed `1caea9bf`, with three visual layouts compared. This is a code-led implementation; the generated comparison is a design reference, not an approved pixel contract.

FINISH: Verify desktop and narrow layouts, curriculum anchors, all eleven subject enquiries, contact destinations, readable contrast, keyboard focus, and reduced motion. Review the finished page and record its tokens before release.

## Tokens and behavior

- Display/body: Manrope variable, with system sans fallback; display weight 800, maximum 5.25rem, tracking -0.04em.
- Ink: `#202622`; muted: `#5b625d`; orange field: `#ff7819`; orange text/action: `#a63f00`; pale ground: `#fff8f0`; lines: `#dedfd8`.
- One-pixel divisions structure course rows. Curriculum panels use 16px corners; the dark finder uses 20px corners.
- Curriculum links jump to headings with sticky-header clearance. Every subject opens a WhatsApp enquiry naming its curriculum, subject, and syllabus code.
- The trailing enquiry chevron uses the transitions.dev learn-more recipe, with reduced-motion support. Content is visible before JavaScript; no entrance animation hides headings.
- Below 760px, the opening and catalogue become single columns. The heading uses `clamp(2.25rem, 10.5vw, 4rem)` and opening/contact tracks use `minmax(0, 1fr)` to prevent long words from widening the page. Tablet headings use `clamp(2.75rem, 5.5vw, 3.5rem)`.
- Subject and curriculum links have a minimum 64px height; long subject names and contact addresses wrap without horizontal scrolling.
