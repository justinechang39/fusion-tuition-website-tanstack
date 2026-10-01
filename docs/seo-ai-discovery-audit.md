# Fusion Tuition SEO and AI discovery audit

Audit date: 1 October 2026 (Singapore time).
Source baseline: `5ad9315` on `main`.
Status: original audit retained below; technical follow-up implemented as described here. Programme-content recommendations still need confirmation.

## Technical follow-up, 1 October 2026

Rechecked the deployed site before changing it. Confirmed the stale robots sitemap reference, HTTP 200 for unknown ala-carte categories, client-only legacy class redirects, missing demo noindex controls, incomplete API-doc metadata, and Markdown negotiation accepting `q=0` and preferring Markdown over higher-priority HTML.

- Removed the static robots file that Cloudflare Assets served ahead of request middleware. The generated response now owns the policy and canonical sitemap reference.
- Added server-side legacy-class redirects, genuine unknown-category 404s, and noindex headers for demo, API, and error responses.
- Aligned regular-class facts and syllabus information across the visible page, JSON-LD, Markdown and agent skills. Moved `courseMode` to `CourseInstance`, as required by Schema.org. Corrected the A Level curriculum label without changing the supported codes.
- Added Markdown bodies for published articles and catalogue pages, quality-aware content negotiation, consistent HEAD/discovery headers, complete API-doc metadata, and documented OpenAPI response shapes.
- Added article cover images to sharing metadata, sitemap article modification dates, RSS discovery links and chronological feeds. Kept the existing search/AI-input permission and AI-training content signal unchanged.
- Added `bun scripts/check-discovery.ts <base-url>` for repeatable, read-only checks of every sitemap page's HTML/Markdown, metadata, schemas, API contracts, agent-skill hashes, content negotiation, redirects, 404s and indexing headers.

Not implemented: the Combined Science landing page (cohorts, cadence and programme details still need confirmation), verified arrival instructions/media, seasonal availability changes, or new content/measurement integrations. SEAB's 2026 listing marks 9729 and 9749 as last-year syllabuses; confirm the centre's next intake before replacing codes. Search Console, Business Profile and genuine provider-crawler logs were not available to this audit. Technical checks do not establish rankings, indexing or AI recommendations.

Fusion Tuition has a useful SEO foundation, but its website does not describe a programme the owner considers especially important: dedicated Combined Science (Physics, Chemistry) tuition with alternating Chemistry and Physics lessons. The first opportunity is to publish that programme clearly and make the website's visible content and automated discovery descriptions agree.

This document records a source review and public website checks. It distinguishes observations, proposed changes and open questions. It does not establish current search rankings or promise improved rankings or AI recommendations.

## Start by independently checking the findings

Please take a fresh look at the source and deployed website before implementing changes. Report whether you reproduce each finding, whether anything has already changed, and whether you identify a different cause or a more important issue. Do not treat this document as a substitute for your own investigation.

In your report, classify each finding as **confirmed**, **changed since audit**, **not reproduced**, or **requires access**. Include the inspected revision, relevant file or public endpoint, evidence, likely impact and recommended action. Distinguish a verified cause from a hypothesis. In particular, investigate how the static and dynamically generated robots files are served rather than assuming their precedence.

The owner's current priority is the Combined Science page. Homepage placement is a recommendation below. The wider backlog is context for later work, not a request to implement every item at once.

## Project and deployment context

- Active project root: `/Users/justinechang/code/new_fusion_tuition_website`.
- Repository: `git@github.com:justinechang39/fusion-tuition-website-tanstack.git`.
- Framework: TanStack Start with file-based TanStack Router routes.
- Hosting configuration: Cloudflare Workers; `wrangler.jsonc` names the worker `fusion-tuition-website`.
- Package manager: Bun. Follow the repository's `AGENTS.md`.
- The owner identified `/Users/justinechang/code/fusion-tuition-website` as the deprecated Next.js website. Do not implement this work there.
- `legacy-source/` is reference material. Some active page implementations are under `src/legacy-pages/`; that directory name does not mean those files are unused.
- Commit directly to `main`, following the owner's instruction, unless explicitly instructed otherwise.

The newer source matches the live site's metadata, article content, programme API and discovery responses. The Cloudflare account's actual domain-to-worker assignment and deployment history were not inspected. Confirm the deployment target before publishing changes; never deploy merely to test the target.

## Owner supplied programme context

The owner says Fusion Tuition:

- Teaches Combined Science specifically for the Physics/Chemistry combination.
- Offers alternating lessons: Chemistry, then Physics, then Chemistry, then Physics.
- Plans the programme around the Combined Science syllabus, rather than putting Combined Science students into Pure Science classes.
- Lets students receive support for both components through a coordinated arrangement without attending two separate tuition programmes.

These are owner supplied product facts, not facts currently evidenced by the website. Translate them into precise public explanations, with examples and materials where available. Avoid unverified claims that Fusion Tuition is the only provider offering dedicated Combined Science tuition; competing dedicated programmes exist.

Before publishing detailed promises, confirm:

1. Supported year levels and examination tracks: current O Level, 2027 SEC G3, G2, or some subset.
2. Whether alternation is weekly, every attended lesson, or an individually arranged sequence.
3. Lesson duration, fees, class size, trial arrangement and available timings for this programme.
4. How syllabus coverage, missed lessons, exam revision and unequal strengths in the two components are handled.
5. Whether both components use dedicated Combined Science teaching groups, and which teachers deliver them.

Do not infer these details from older class data or from the general website. For example, the site advertises regular groups of up to three students, while the chapter sessions advertise up to five; confirm the Combined Science limit separately.

### Accurate examination wording

Use **one combined subject**, not **one examination paper**, in programme copy. The 2026 Physics/Chemistry syllabus has MCQ, Physics written, Chemistry written and practical papers. The owner's tuition coordination point does not depend on there being only one paper.

SEAB lists 2027 SEC G3 Science (Physics, Chemistry) as `K326`, with `5086` as the earlier reference code. Mention the appropriate current and familiar terminology only for cohorts Fusion Tuition actually supports. Do not assume G3 coverage also means G2 coverage.

## Existing capabilities worth preserving

| Capability | Source | Observation |
| --- | --- | --- |
| Route titles, descriptions, canonical URLs and sharing metadata | `src/lib/seo.ts`, `src/routes/*` | Main public routes have reusable SEO helpers; canonical origin defaults to `https://fusiontuition.com`. |
| Structured business and page information | `src/lib/seo.ts`, `src/routes/__root.tsx` | Organization, website, breadcrumbs, teacher and programme metadata already exist. |
| Rendered HTML content | Public homepage, article and programme responses | Inspected responses contain text and metadata without requiring a user click. |
| Blog and announcements | `src/content/`, `src/lib/content.ts`, `src/lib/content-render.ts` | MDX entries feed listing pages, sitemap, RSS and article metadata. There were two published blog articles and two announcements at audit time. |
| Automated discovery | `src/lib/agent-ready.ts`, `src/start.ts`, `src/components/WebMcpProvider.tsx` | Public site information, Markdown responses, `llms.txt` and browser tool registration are implemented. Public API and Markdown responses were checked live; browser tool execution was not tested. |
| Subject-specific chapter sessions | `src/routes/ala-carte/` | Subject URLs already have individual metadata, canonical URLs, offer catalog information and breadcrumbs. |

These features make the proposed work an extension of existing patterns. Their presence does not prove Google indexing, crawler access from provider IP addresses, rich-result eligibility or AI recommendation frequency.

## Findings and recommended work

### 1. Combined Science is missing from programme discovery

**Observed:** No Combined Science offering or alternating lesson explanation was found in the reviewed marketing source. Live `/api/site-info`, `/llms.txt`, `/sitemap.xml`, and Markdown responses for `/` and `/classes` also omitted it. The listed O Level science courses are separate Physics (`6091`) and Chemistry (`6092`).

Relevant files:

- Homepage assembly: `src/legacy-pages/index.tsx`.
- Homepage metadata: `src/routes/index.tsx`.
- Homepage subjects: `src/components/FindYourClass.tsx`.
- Classes content: `src/legacy-pages/classes/index.tsx`.
- Classes metadata: `src/routes/classes/index.tsx`.
- Shared catalogue and automated descriptions: `src/lib/agent-ready.ts`.
- Structured programme data: `src/lib/seo.ts`.

**Proposed first implementation:**

- Create a dedicated `/combined-science-tuition` page with an appropriate title, description, canonical URL and visible programme explanation.
- Explain the Combined Science syllabus focus and alternation sequence, with the operational details confirmed above.
- Include useful parent FAQs, teacher information, programme-specific evidence where available, and an enquiry action.
- Add links from the homepage and classes page.
- Register the route in `publicRoutes` so it flows into the sitemap and discovery lists.
- Update shared programme information, Markdown summaries and browser tool descriptions where relevant. Keep these consistent with visible content.
- Add matching structured programme information using existing helpers. Do not publish claims solely in hidden metadata.

Suggested title: `Combined Science Physics & Chemistry Tuition Singapore | Fusion Tuition`.

### 2. Homepage gives the programme no visibility

**Observed order:** brand introduction → EyyCher → registration banner → student results → subject list → contact → directions section.

**Proposed placement:** a concise Combined Science section immediately after the registration banner and before student results. Explain the dedicated syllabus and Chemistry → Physics → Chemistry → Physics sequence, then link to the full programme page. Also add a linked entry in the subject list and classes overview. Decide whether a navigation entry fits the existing desktop and mobile menus.

The headline currently says “In pursuit of better.” Keep the brand identity, but consider a descriptive supporting line so first-time visitors can immediately understand the tuition offering. This is a content recommendation, not a finding that the headline prevents indexing.

### 3. Generic class detail routes are not programme landing pages

**Observed:** `src/routes/classes/$slug.tsx` uses `noIndex: true`, points the canonical to `/classes`, and renders `src/legacy-pages/classes/[slug].tsx`, which navigates to `/classes` in a client effect.

**Action:** use a dedicated top-level route for Combined Science, or deliberately redesign the class detail routing. Do not put new content behind the existing redirect behaviour. Leave unrelated legacy URLs alone unless their behaviour is part of the approved work.

### 4. Robots sitemap reference uses an old domain

**Observed:** `public/robots.txt` contains:

```text
Sitemap: https://tanstack-start-app.justinechang94.workers.dev/sitemap.xml
```

The live `https://fusiontuition.com/robots.txt` returned that same address, while the main-domain sitemap lists `https://fusiontuition.com` URLs. Separately, `src/start.ts` and `buildRobotsTxt()` in `src/lib/agent-ready.ts` generate a robots response using the configured site origin.

**Action:** establish which response is actually served and why; choose one maintained source and align the public reference with `https://fusiontuition.com/sitemap.xml`. Check `VITE_PUBLIC_SITE_URL` and the built deployment configuration without disclosing environment secrets. Verify the result after deployment. This mismatch is not proof that it caused a ranking loss.

### 5. Directions page contains production-visible placeholders

**Observed:** `src/legacy-pages/how-to-get-here.tsx` and the public directions page contain “Preview content for layout testing,” sample route copy, video placeholders and unverified parking/MRT guidance. The route metadata describes it as a finished directions page.

**Action:** replace placeholder guidance with verified arrival instructions and genuine media where available. Do not publish estimated walking times, parking permissions or drop-off advice without checking them. This matters for visitor trust and location clarity; no ranking impact was measured.

### 6. Programme data is duplicated and can drift

**Observed:** the homepage subject list, classes page and shared automated catalogue separately list curricula. The automated Markdown descriptions are also hand-maintained summaries, not complete copies of the rendered pages.

**Action:** update all relevant descriptions when adding Combined Science. Consider consolidating programme data if it makes this work simpler and reduces future inconsistencies, without requiring a broad refactor. Audit whether important confirmed benefits, such as class size and the alternating arrangement, remain clear in both human and automated views.

### 7. Content and evidence can be more specific

**Observed:** the published blog covers small groups and revision habits, without a Combined Science article. The site also presents engineer teachers, student improvements, EyyCher and chapter-specific sessions.

**Later work:** publish useful syllabus comparisons, Combined Science revision guides and original worked examples. Link these to the programme page. Include author information and genuine teaching materials. Contextualize student results by programme and timeframe where verified and permitted. Avoid presenting individual improvements as guaranteed outcomes.

Candidate search topics include “combined science tuition Singapore,” “combined Physics Chemistry tuition,” and “G3 combined science tuition.” These are proposed topics, not verified keyword-volume or difficulty estimates.

### 8. Seasonal wording and syllabus labels need a review

**Observed:** chapter sessions and automated descriptions prominently reference June holidays at the October audit date. Current catalogues still use O Level terminology and older codes.

**Action:** confirm the intended intake and availability. Date seasonal offers explicitly, or use evergreen wording if sessions run throughout the year. Review examination names, levels and codes against current official sources; do not relabel services for cohorts the centre does not support.

### 9. Discovery and enquiry measurement are unverified

**Observed:** dedicated enquiry conversion tracking was not found in the inspected source. This does not establish whether Cloudflare analytics or an external account already measures traffic.

**Later work:** inspect existing analytics and Search Console access, record a baseline, and track programme visits and enquiry actions. Evaluate genuine enquiries alongside search impressions and clicks. Any sample AI recommendation checks should record the exact question, date, locale and cited sources; they are observations, not stable rankings.

## Implementation sequence and acceptance checks

1. Reproduce the findings and report discrepancies before treating the proposed fixes as settled.
2. Confirm the Combined Science operational facts with the owner.
3. Implement the dedicated page, homepage placement, classes link and consistent programme metadata/discovery descriptions.
4. Resolve the robots mismatch and verify its serving path.
5. Address directions, content expansion, catalogue maintenance and measurement as follow-up work.

For the Combined Science change, check:

- Direct requests return the real page rather than a blank page or redirect to `/classes`.
- Desktop and mobile layouts are readable and the enquiry action works.
- The title, description, heading and canonical URL are appropriate; the page is not marked `noindex`.
- Relevant content is present in the initial HTML response and the page has crawlable internal links.
- Structured data matches the visible programme facts.
- Sitemap, programme API, Markdown summaries and discovery lists agree wherever they describe the offering.
- Existing Pure Science and other curriculum offerings remain accurate.
- Run the repository's production build and appropriate checks for the implementation. Avoid backend or database work unless separately required.
- After an authorized deployment, inspect the public response again; local code alone does not prove the published result. Use Search Console URL Inspection if access is available. Indexing and recommendations are not guaranteed.

Useful public checks to repeat:

```sh
curl -fsS https://fusiontuition.com/robots.txt
curl -fsS https://fusiontuition.com/sitemap.xml
curl -fsS https://fusiontuition.com/api/site-info
curl -fsS https://fusiontuition.com/llms.txt
curl -fsS -H 'Accept: text/markdown' https://fusiontuition.com/
curl -fsS -H 'Accept: text/markdown' https://fusiontuition.com/classes
```

## External guidance and audit limits

- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features): normal SEO fundamentals, crawlable content, useful text and internal links remain relevant; no special AI text file or schema is required. Existing discovery features can be retained without treating them as proven ranking mechanisms.
- [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots): OAI-SearchBot manages search discovery; search and training permissions are independent. Check hosting rules and genuine crawler access as well as robots directives.
- [Google: local ranking guidance](https://support.google.com/business/answer/7091?hl=en): audit Business Profile accuracy, services, location information and genuine reviews when access is available.
- [SEAB: 2027 G3 syllabuses](https://www.seab.gov.sg/secondary-education-certificate-sec/g3-syllabuses-for-school-candidates-2027/): verify supported examination terminology and codes.
- [SEAB: 2026 Science syllabus, assessment on page 6](https://isomer-user-content.by.gov.sg/334/6973a6ac-94c2-4663-82c3-84b538246574/5086_y26_sy.pdf): confirms multiple papers for the Physics/Chemistry subject.
- [Existing content authoring guide](content-authoring.md): follow this for blog and announcement additions.

Google Preferred Sources was discussed earlier as an optional future experiment. Domain eligibility was not confirmed because the picker required sign-in. It is lower priority than accurate programme content; the reviewed official material did not establish the TikTok claim of a ranking boost for everyone.

The audit did not inspect Search Console, analytics accounts, Business Profile, Cloudflare domain bindings or provider crawler logs. It did not run performance benchmarks, measure search demand, verify student outcomes, or test every browser interaction. No website changes or deployment were made as part of the audit. This handoff commit is documentation only.
