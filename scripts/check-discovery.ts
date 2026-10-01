import assert from 'node:assert/strict'
import { JSDOM } from 'jsdom'

// Read-only checks against a built preview or the live site:
// bun scripts/check-discovery.ts <base-url> [expected-canonical-origin]
const base = new URL(process.argv[2] ?? 'https://fusiontuition.com').origin
const canonicalOrigin = new URL(process.argv[3] ?? 'https://fusiontuition.com')
  .origin

async function get(path: string, init?: RequestInit) {
  const response = await fetch(`${base}${path}`, init)
  assert.equal(response.status, 200, `${path}: expected HTTP 200`)
  return response
}

function xml(text: string) {
  return new JSDOM(text, { contentType: 'application/xml' }).window.document
}

const robots = await (await get('/robots.txt')).text()
assert(
  robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`),
  'robots sitemap origin',
)
assert(
  !robots.includes('workers.dev'),
  'robots must not advertise a stale Worker',
)
assert(
  robots.includes('ai-train=no, search=yes, ai-input=yes'),
  'preserve content policy',
)

const sitemap = xml(await (await get('/sitemap.xml')).text())
const urls = [...sitemap.querySelectorAll('loc')].map(
  (node) => node.textContent!,
)
assert.equal(new Set(urls).size, urls.length, 'duplicate sitemap URLs')
for (const url of urls) assert.equal(new URL(url).origin, canonicalOrigin)
assert(
  urls.includes(`${canonicalOrigin}/classes`),
  'classes missing from sitemap',
)
assert(
  !urls.some((url) => /\/demo\/|\/api\/|\/connect$/.test(url)),
  'utility/redirect in sitemap',
)

const siteInfo = await (await get('/api/site-info')).json()
assert.equal(
  siteInfo.site.canonicalOrigin,
  canonicalOrigin,
  'site-info canonical origin',
)
assert.equal(siteInfo.contact.phoneE164, '+6591796637')
assert.equal(siteInfo.contact.email, 'justine@fusiontuition.com')
const discoveryUrls = [
  ...siteInfo.routes.map((route: { url: string }) => route.url),
  ...Object.values(siteInfo.content).flatMap((entries) =>
    (entries as { url: string }[]).map((entry) => entry.url),
  ),
]
assert.deepEqual(
  [...discoveryUrls].sort(),
  [...urls].sort(),
  'API and sitemap coverage drift',
)

const courseCodes = [
  '0607',
  '0606',
  '0620',
  '0625',
  '6091',
  '6092',
  '4049',
  '9729',
  '9749',
  'HL/SL',
  'HL/SL',
]
const images = new Set<string>()
for (const url of urls) {
  const path = new URL(url).pathname
  const html = await get(path, { headers: { Accept: 'text/html' } })
  assert(
    html.headers.get('content-type')?.startsWith('text/html'),
    `${path}: HTML type`,
  )
  assert(
    html.headers.get('vary')?.toLowerCase().includes('accept'),
    `${path}: HTML Vary`,
  )
  const document = new JSDOM(await html.text()).window.document
  assert.equal(
    document.querySelectorAll('link[rel="canonical"]').length,
    1,
    `${path}: one canonical`,
  )
  assert.equal(
    document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
    url,
  )
  assert.equal(
    document.querySelectorAll('meta[name="description"]').length,
    1,
    `${path}: one description`,
  )
  assert(
    document.querySelector('meta[name="description"]')?.getAttribute('content'),
    `${path}: description`,
  )
  assert(document.title.includes('Fusion Tuition'), `${path}: title`)
  assert(
    !document
      .querySelector('meta[name="robots"]')
      ?.getAttribute('content')
      ?.includes('noindex'),
    `${path}: indexable`,
  )
  assert.equal(
    document.querySelector('meta[property="og:url"]')?.getAttribute('content'),
    url,
  )
  assert(
    document.querySelector('link[rel="alternate"][type="application/rss+xml"]'),
    `${path}: RSS discovery`,
  )
  const image = document
    .querySelector('meta[property="og:image"]')
    ?.getAttribute('content')
  assert(image, `${path}: social image`)
  images.add(new URL(image!).pathname)
  const schemas = [
    ...document.querySelectorAll('script[type="application/ld+json"]'),
  ].map((script) => JSON.parse(script.textContent!))
  assert(schemas.length >= 3, `${path}: structured data`)
  if (path === '/classes') {
    assert(
      !document.body.textContent?.includes('Big understanding'),
      'rejected slogan remains',
    )
    assert.equal(document.querySelectorAll('h1').length, 1)
    assert(document.querySelector('h1')?.textContent?.includes('Same stream.'))
    const courses = schemas.find(
      (schema) => schema['@type'] === 'CollectionPage',
    ).mainEntity.itemListElement
    assert.deepEqual(
      courses.map((course: { courseCode: string }) => course.courseCode),
      courseCodes,
    )
    for (const course of courses) {
      assert(course.description && course.url, 'course description and URL')
      assert(!('courseMode' in course), 'courseMode belongs to CourseInstance')
      assert.equal(course.hasCourseInstance['@type'], 'CourseInstance')
      assert.equal(
        course.hasCourseInstance.courseMode,
        'In-person small-group tuition',
      )
    }
    assert.equal(document.querySelectorAll('.classes-subjects a').length, 11)
  }
  const markdownResponse = await get(path, {
    headers: { Accept: 'text/markdown' },
  })
  assert(
    markdownResponse.headers.get('content-type')?.startsWith('text/markdown'),
    `${path}: Markdown type`,
  )
  assert(
    markdownResponse.headers.get('vary')?.toLowerCase().includes('accept'),
    `${path}: Markdown Vary`,
  )
  const markdown = await markdownResponse.text()
  assert(markdown.startsWith('# '), `${path}: Markdown title`)
  assert(markdown.includes(url), `${path}: Markdown canonical`)
  assert(
    !markdown.includes('export const metadata'),
    `${path}: metadata leaked into article body`,
  )
  if (path === '/classes') {
    assert(markdown.includes('Maximum of three students'))
    for (const code of courseCodes)
      assert(markdown.includes(code), `Markdown course ${code}`)
  }
  if (path === '/blog/small-group-science-tuition-singapore') {
    assert(
      markdown.includes('More feedback loops, less passive learning'),
      'article body missing',
    )
    assert(
      image!.endsWith('/blog/cover-science-tuition.jpg'),
      'article social cover',
    )
  }
  if (path.startsWith('/ala-carte/')) {
    assert(
      markdown.includes('## Classes') &&
        markdown.includes('- Chapters:') &&
        markdown.includes('- Price: SGD'),
      `${path}: catalogue details`,
    )
  }
}
for (const image of images) await get(image)

const preferences: [string, string][] = [
  ['text/markdown', 'text/markdown'],
  ['TEXT/MARKDOWN; Q=1', 'text/markdown'],
  ['text/html,text/markdown;q=0.2', 'text/html'],
  ['text/html;q=0.1,text/markdown;q=0.8', 'text/markdown'],
  ['text/markdown;q=0.4,*/*;q=0.9', 'text/html'],
  ['text/html;q=0,text/*;q=0.9,text/markdown;q=0.4', 'text/markdown'],
  ['*/*', 'text/html'],
  ['text/*', 'text/html'],
  ['text/*;q=0.8,text/markdown;q=0', 'text/html'],
]
for (const [accept, type] of preferences) {
  const response = await get('/classes', { headers: { Accept: accept } })
  assert(
    response.headers.get('content-type')?.startsWith(type),
    `Accept preference: ${accept}`,
  )
}
for (const accept of [
  'text/markdown;q=0',
  'text/html;q=0,text/*;q=0.9',
  'text/html;q=0,text/markdown;q=0',
  'application/json',
]) {
  const response = await fetch(`${base}/classes`, {
    headers: { Accept: accept },
  })
  assert.equal(response.status, 406, `No acceptable page format: ${accept}`)
  assert(response.headers.get('vary')?.toLowerCase().includes('accept'))
}
for (const path of [
  '/robots.txt',
  '/sitemap.xml',
  '/rss.xml',
  '/llms.txt',
  '/.well-known/api-catalog',
  '/.well-known/agent-skills/index.json',
  '/classes',
]) {
  const response = await get(path, {
    method: 'HEAD',
    headers: { Accept: 'text/markdown' },
  })
  assert.equal(await response.text(), '', `${path}: HEAD body`)
}
for (const accept of ['text/html', 'text/markdown']) {
  assert(
    (await get('/', { headers: { Accept: accept } })).headers
      .get('link')
      ?.includes('api-catalog'),
    `homepage discovery header: ${accept}`,
  )
}
for (const path of [
  '/missing-discovery-test',
  '/blog/missing-discovery-test',
  '/announcements/missing-discovery-test',
  '/ala-carte/missing-discovery-test',
]) {
  const response = await fetch(`${base}${path}`)
  assert.equal(response.status, 404, `${path}: genuine 404`)
  assert(
    response.headers.get('x-robots-tag')?.includes('noindex'),
    `${path}: error noindex`,
  )
}
const legacy = await fetch(`${base}/classes/legacy-discovery-test`, {
  redirect: 'manual',
})
assert.equal(legacy.status, 301, 'legacy class must redirect server-side')
assert.equal(
  new URL(legacy.headers.get('location')!, base).pathname,
  '/classes',
)
const demo = await get('/demo/tanstack-query')
assert(demo.headers.get('x-robots-tag')?.includes('noindex'), 'demo indexing')

const feed = xml(await (await get('/rss.xml')).text())
const dates = [...feed.querySelectorAll('item > pubDate')].map((node) =>
  Date.parse(node.textContent!),
)
assert.deepEqual(
  dates,
  [...dates].sort((a, b) => b - a),
  'RSS must be chronological',
)
assert.equal(
  feed.querySelectorAll('item').length,
  urls.filter((url) => /\/(blog|announcements)\/.+/.test(new URL(url).pathname))
    .length,
)
const llms = await (await get('/llms.txt')).text()
for (const url of discoveryUrls)
  assert(llms.includes(url), `LLM discovery URL ${url}`)

const openapi = await (await get('/api/openapi')).json()
assert.equal(openapi.openapi, '3.1.0')
assert.deepEqual(Object.keys(openapi.paths).sort(), [
  '/api/health',
  '/api/openapi',
  '/api/site-info',
])
for (const path of Object.keys(openapi.paths)) {
  const schema =
    openapi.paths[path].get.responses['200'].content['application/json'].schema
  assert.equal(schema.type, 'object', `${path}: response schema`)
  const response = await get(path)
  assert(
    response.headers.get('x-robots-tag')?.includes('noindex'),
    `${path}: API indexing`,
  )
  const payload = await response.json()
  for (const key of schema.required)
    assert(key in payload, `${path}: required ${key}`)
}
const catalogue = await (await get('/.well-known/api-catalog')).json()
assert.equal(catalogue.linkset[0].anchor, `${canonicalOrigin}/api/site-info`)
const skills = await (await get('/.well-known/agent-skills/index.json')).json()
assert.equal(skills.skills.length, 3)
for (const skill of skills.skills) {
  assert.equal(new URL(skill.url).origin, canonicalOrigin)
  const body = await (await get(new URL(skill.url).pathname)).text()
  const digest = Buffer.from(
    await crypto.subtle.digest('SHA-256', new TextEncoder().encode(body)),
  ).toString('hex')
  assert.equal(digest, skill.sha256, `skill hash: ${skill.name}`)
}
console.log(
  `PASS: ${urls.length} sitemap pages in HTML and Markdown; ${preferences.length} Accept cases; schemas, APIs, skill hashes, feeds, HEAD, redirects, 404s and noindex controls.`,
)
