# Fusion Tuition TanStack Migration

## Source Of Truth

- Project root: `/Users/justinechang/code/new_fusion_tuition_website`
- Legacy reference only: `/Users/justinechang/code/new_fusion_tuition_website/legacy-source`
- Primary migration guide followed: [TanStack Start: Migrate from Next.js](https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js)

## Scaffold Commands Used

- TanStack CLI:
  `npx @tanstack/cli@latest create my-tanstack-app --agent --deployment cloudflare --add-ons neon,drizzle,sentry,better-auth,tanstack-query`
- TanStack Intent install:
  `npx @tanstack/intent@latest install`
- TanStack Intent list:
  `npx @tanstack/intent@latest list`

## Intent Result

- `install` printed the AGENTS/config mapping workflow.
- `list` reported: `No intent-enabled packages found. Scanned: global node_modules`.
- No package-shipped Intent skills were available in this scaffold, so migration decisions fell back to the official TanStack docs plus the local TanStack Start migration skill.

## Chosen Stack

- Runtime/framework: TanStack Start on Cloudflare
- Routing: TanStack Router file-based routes under `src/routes`
- Data fetching: TanStack Query kept via scaffold provider and demo route
- Package manager: Bun
- Toolchain: Biome
- Requested scaffold integrations preserved in-project:
  - Cloudflare deployment config
  - Neon and Drizzle scaffold files
  - Sentry scaffold files
  - Better Auth scaffold files
  - TanStack Query demo/provider

## Scope Decision

- This migration pass is intentionally frontend-only.
- Do not migrate `pages/api/*`.
- Do not migrate the self-assessment backend flow, email flow, or login-gated admin behavior yet.
- Public UX routes are the focus for parity in this pass.

## Architecture Decisions

- Fresh scaffold first, then copy-first migration from `legacy-source`.
- The actual app lives at the project root, not inside `my-tanstack-app`.
- Legacy page source for migrated public routes lives in `src/legacy-pages/`.
- Shared UI/components/hooks/assets were copied from the legacy app and only had framework edges changed:
  - `next/link` -> TanStack `Link`
  - `next/router` -> TanStack navigation/location hooks
  - `next/image` -> native `img`
  - `next/head` -> no-op component plus route-level `head`
- Public routes currently migrated:
  - `/`
  - `/about`
  - `/classes`
  - `/classes/$slug` (redirects to `/classes`)
  - `/connect`
  - `/contact`
  - `/how-to-get-here`
- Demo/integration routes from the scaffold are still present under `src/routes/demo/`.
- Shared SEO and metadata helpers now live in `src/lib/seo.ts`.
- TanStack Start metadata uses route-level `head()` declarations plus `<HeadContent />` in `src/routes/__root.tsx`.
- Canonical URLs, Open Graph tags, Twitter cards, favicon links, web app manifest tags, and JSON-LD structured data are now defined for the main public marketing routes.
- The app favicon is served from `public/favicon.ico`, and app icons in `public/logo192.png` and `public/logo512.png` were regenerated from that favicon to replace the starter React icons.

## Environment Variables

- Public-site relevant:
  - `VITE_PUBLIC_SITE_URL` for canonical/discovery metadata if a deployed custom domain should override the default `https://fusiontuition.com`
  - `VITE_PUBLIC_MAP_API_KEY` for map widgets
- Optional scaffold integrations:
  - `VITE_SENTRY_DSN`
  - `VITE_SENTRY_ORG`
  - `VITE_SENTRY_PROJECT`
  - `SENTRY_AUTH_TOKEN`
  - `BETTER_AUTH_URL`
  - `BETTER_AUTH_SECRET`
  - `DATABASE_URL`
  - `DATABASE_URL_POOLER`

## Build And Deployment Notes

- Install with `bun install`
- Local dev with `bun run dev`
- Production build with `bun run build`
- Cloudflare deploy with `bun run deploy`
- Deploy uses `wrangler deploy --config dist/server/wrangler.json`
- Important: if `wrangler.jsonc` changes, rebuild before deploying so the generated `dist/server/wrangler.json` stays current
- Agent-readiness endpoints are now served from global request middleware in `src/start.ts`, which handles:
  - `robots.txt`
  - `sitemap.xml`
  - `llms.txt`
  - `/.well-known/api-catalog`
  - `/.well-known/agent-skills/index.json`
  - `/.well-known/agent-skills/*/SKILL.md`
  - `Accept: text/markdown` negotiation for public marketing/docs routes
- Homepage responses add `Link` headers advertising the API catalog, API description, API docs, and agent-skills index.
- Browser-side WebMCP registration lives in `src/components/WebMcpProvider.tsx` for safe, read-only site tools.
- Root document metadata now includes favicon, `apple-touch-icon`, manifest, `theme-color`, organization JSON-LD, and website JSON-LD.
- Public route metadata now includes canonical tags plus route-specific titles/descriptions for `/`, `/about`, `/classes`, `/connect`, `/contact`, and `/how-to-get-here`.

## Known Issues / Deferred Work

- `legacy-source` is reference material only and should not replace the new app scaffold.
- Admin, assessment, and API routes are deferred.
- Better Auth is represented from the requested scaffold, but legacy Clerk-based admin gating was not migrated because auth is out of scope for this pass.
- Some scaffolded Neon/Drizzle/Better Auth/Sentry files remain as future integration starting points rather than active requirements for the public site.
- OAuth discovery metadata and OAuth protected resource metadata are intentionally not published yet because this frontend-only site does not expose protected APIs.
- A standalone MCP server and SEP-1649 server card are still deferred; the site currently exposes browser-local tools through WebMCP instead.
- Social sharing currently uses the horizontal Fusion Tuition logo asset as the fallback Open Graph image. A dedicated `1200x630` share image would be a stronger future upgrade.

## Next Steps

1. Migrate any remaining public marketing routes or content revisions from `legacy-source`.
2. Decide whether to keep Better Auth as the future auth path or reintroduce Clerk intentionally.
3. Rebuild the self-assessment flow as a separate future frontend-plus-backend project slice.
4. Configure the real Cloudflare worker name/domain and Sentry project before production deploy.
5. If the site later ships protected APIs or a real MCP transport, add OAuth well-known metadata and a proper MCP server card at that time.
