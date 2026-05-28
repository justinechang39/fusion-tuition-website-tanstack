import {
  getAllContentEntries,
  getCollectionEntries,
  getRecentContentEntries,
} from '@/lib/content'

export const siteName = 'Fusion Tuition'
export const siteDescription =
  'Fusion Tuition is a Singapore small-group tuition centre for Physics, Chemistry, and Mathematics, supporting IGCSE, GCE O Level, A Level, and IB students.'

export const publicRoutes = [
  { path: '/', title: 'Home' },
  { path: '/ala-carte', title: 'Ala-carte Classes' },
  {
    path: '/ala-carte/o-level-chemistry',
    title: 'O Level Chemistry June Holiday Tuition',
  },
  {
    path: '/ala-carte/o-level-physics',
    title: 'O Level Physics June Holiday Tuition',
  },
  {
    path: '/ala-carte/o-level-additional-mathematics',
    title: 'O Level Additional Mathematics June Holiday Tuition',
  },
  {
    path: '/ala-carte/igcse-chemistry',
    title: 'IGCSE Chemistry June Holiday Tuition',
  },
  {
    path: '/ala-carte/igcse-physics',
    title: 'IGCSE Physics June Holiday Tuition',
  },
  { path: '/about', title: 'About Us' },
  { path: '/classes', title: 'Classes' },
  { path: '/contact', title: 'Contact' },
  { path: '/how-to-get-here', title: 'How To Get Here' },
  { path: '/blog', title: 'Blog' },
  { path: '/announcements', title: 'Announcements' },
  { path: '/docs/api', title: 'API Docs' },
] as const

export const contactDetails = {
  phoneDisplay: '+65 9179 6637',
  phoneE164: '+6591796637',
  email: 'justine@fusiontuition.com',
  alternateEmail: 'justinechang94@gmail.com',
  whatsappUrl:
    'https://wa.me/6591796637?text=Hi%20Fusion%20Tuition%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20classes.',
}

export const locationDetails = {
  name: 'Fusion Tuition',
  addressLine1: '#02-13, 37 Jalan Pemimpin',
  postalCode: '577177',
  country: 'Singapore',
  pagePath: '/how-to-get-here',
}

export const curriculumCatalog = {
  igcse: [
    { code: '0607', name: 'International Math' },
    { code: '0606', name: 'Additional Mathematics' },
    { code: '0620', name: 'Chemistry' },
    { code: '0625', name: 'Physics' },
  ],
  oLevel: [
    { code: '6091', name: 'Physics' },
    { code: '6092', name: 'Chemistry' },
    { code: '4049', name: 'Additional Mathematics' },
  ],
  aLevel: [
    { code: '9729', name: 'Chemistry' },
    { code: '9749', name: 'Physics' },
  ],
  ib: [
    { code: 'HL/SL', name: 'Mathematics' },
    { code: 'HL/SL', name: 'Chemistry' },
  ],
}

export const teachers = [
  {
    name: 'Justine Chang',
    experience: '6 years as a Software and Mechanical Engineer',
    subjects: ['Physics', 'Mathematics'],
  },
  {
    name: 'Ng Qi Hui',
    experience: '6 years as a Chemical Engineer',
    subjects: ['Chemistry', 'Mathematics'],
  },
] as const

export const webMcpTools = [
  {
    name: 'get-site-info',
    description:
      'Return a concise overview of Fusion Tuition, including contact details, programmes, and key routes.',
    inputSchema: {
      type: 'object',
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: 'go-to-contact',
    description:
      'Navigate the current page to the Fusion Tuition contact page for phone, WhatsApp, and email details.',
    inputSchema: {
      type: 'object',
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: 'go-to-classes',
    description:
      'Navigate the current page to the classes page to review supported curricula and subjects.',
    inputSchema: {
      type: 'object',
      additionalProperties: false,
      properties: {},
    },
  },
  {
    name: 'go-to-directions',
    description:
      'Navigate the current page to the directions page for address and travel guidance.',
    inputSchema: {
      type: 'object',
      additionalProperties: false,
      properties: {},
    },
  },
] as const

type AgentSkill = {
  name: string
  type: 'workflow' | 'reference'
  description: string
  content: string
}

export const agentSkills: AgentSkill[] = [
  {
    name: 'contact-info',
    type: 'reference',
    description:
      'Find the fastest way to contact Fusion Tuition by phone, WhatsApp, or email.',
    content: `# Fusion Tuition Contact Info

Use this skill when the user wants the fastest way to reach Fusion Tuition.

## What to provide

- Phone: ${contactDetails.phoneDisplay}
- Email: ${contactDetails.email}
- WhatsApp: ${contactDetails.whatsappUrl}

## Guidance

- Prefer WhatsApp for quick enquiries.
- Use the contact page for the latest clickable actions: /contact
- If the user needs directions too, send them to /how-to-get-here.
`,
  },
  {
    name: 'find-program',
    type: 'workflow',
    description:
      'Match a student to the relevant curriculum and subjects offered by Fusion Tuition.',
    content: `# Find A Fusion Tuition Programme

Use this skill when the user asks whether Fusion Tuition supports a curriculum or subject.

## Curricula covered

- IGCSE: International Math (0607), Additional Mathematics (0606), Chemistry (0620), Physics (0625)
- GCE O Level: Physics (6091), Chemistry (6092), Additional Mathematics (4049)
- A Level: Chemistry (9729), Physics (9749)
- IB: Mathematics (HL/SL), Chemistry (HL/SL)

## Guidance

- Direct users to /classes for the public curriculum overview.
- Direct users to /contact if they want to register interest.
- If the question is about teachers, use the About Us page at /about.
`,
  },
  {
    name: 'visit-centre',
    type: 'workflow',
    description:
      'Help a visitor find the tuition centre address and the directions page.',
    content: `# Visit Fusion Tuition

Use this skill when a user wants the tuition centre address or travel help.

## Destination

- ${locationDetails.name}
- ${locationDetails.addressLine1}
- ${locationDetails.postalCode}
- ${locationDetails.country}

## Guidance

- Send users to /how-to-get-here for the full directions walkthrough.
- Mention that map links are available on the directions page.
- If the user wants to contact the centre before visiting, also send /contact.
`,
  },
]

export const apiDocsMarkdown = `# Fusion Tuition Public API

Fusion Tuition exposes a small public, read-only API to help automated agents discover site metadata.

## Endpoints

- \`GET /api/health\`: Health status for the public site API.
- \`GET /api/site-info\`: Contact details, location details, public routes, teachers, and curricula.
- \`GET /api/openapi\`: OpenAPI description for the public API.

## Authentication

No authentication is required. These endpoints are public and read-only.
`

const pageMarkdownByPath = {
  '/': `# ${siteName}

${siteDescription}

## Highlights

- Small-group tuition with personalised attention.
- Focus on Physics, Chemistry, and Mathematics.
- Supports IGCSE, GCE O Level, A Level, and IB students.
- High-intent support for O Level and IGCSE Physics, Chemistry, Mathematics, Additional Mathematics, and June holiday revision.

## Teachers

${teachers
  .map(
    (teacher) =>
      `- ${teacher.name}: ${teacher.experience}. Subjects: ${teacher.subjects.join(', ')}.`,
  )
  .join('\n')}

## Key routes

${publicRoutes.map((route) => `- ${route.title}: ${route.path}`).join('\n')}

## Contact

- Phone: ${contactDetails.phoneDisplay}
- Email: ${contactDetails.email}
- Alternative email: ${contactDetails.alternateEmail}
- WhatsApp: ${contactDetails.whatsappUrl}
`,
  '/about': `# About Fusion Tuition

Fusion Tuition is a Singapore tuition centre focused on high-quality science and mathematics teaching.

## Why choose Fusion Tuition

- Engineer teachers with real-world technical backgrounds.
- Small class sizes for more individual attention.
- Free consultations outside class hours.

## Teachers

${teachers
  .map(
    (teacher) =>
      `- ${teacher.name}: ${teacher.experience}. Subjects: ${teacher.subjects.join(', ')}.`,
  )
  .join('\n')}
`,
  '/classes': `# Fusion Tuition Classes

Fusion Tuition teaches students across multiple curricula.

## Search-relevant programmes

- O Level Physics tuition
- O Level Chemistry tuition
- O Level Additional Mathematics tuition
- IGCSE Physics tuition
- IGCSE Chemistry tuition
- IGCSE Mathematics and Additional Mathematics tuition
- A Level Physics and Chemistry tuition
- IB Mathematics and Chemistry tuition

## IGCSE

${curriculumCatalog.igcse
  .map((item) => `- ${item.name} (${item.code})`)
  .join('\n')}

## GCE O Level

${curriculumCatalog.oLevel
  .map((item) => `- ${item.name} (${item.code})`)
  .join('\n')}

## A Level

${curriculumCatalog.aLevel
  .map((item) => `- ${item.name} (${item.code})`)
  .join('\n')}

## IB

${curriculumCatalog.ib.map((item) => `- ${item.name} (${item.code})`).join('\n')}
`,
  '/contact': `# Contact Fusion Tuition

## Direct contact

- Phone: ${contactDetails.phoneDisplay}
- Email: ${contactDetails.email}
- Alternative email: ${contactDetails.alternateEmail}
- WhatsApp: ${contactDetails.whatsappUrl}

## Helpful related pages

- Classes: /classes
- Directions: /how-to-get-here
`,
  '/how-to-get-here': `# How To Get To Fusion Tuition

## Destination

- ${locationDetails.name}
- ${locationDetails.addressLine1}
- ${locationDetails.postalCode}
- ${locationDetails.country}

## Guidance

- Use the page /how-to-get-here for the full travel walkthrough.
- Map actions are available directly on the page.
`,
  '/blog': `# Fusion Tuition Blog

Fusion Tuition publishes evergreen articles about study strategy, revision habits, and how families can think about science and mathematics support.

Topics include O Level and IGCSE study tips, Physics revision, Chemistry revision, Mathematics revision, and June holiday planning.

## Recent articles

${getCollectionEntries('blog')
  .slice(0, 3)
  .map((entry) => `- ${entry.title}: ${entry.path}`)
  .join('\n')}
`,
  '/announcements': `# Fusion Tuition Announcements

Fusion Tuition also publishes short operational updates for registrations, scheduling, and term planning.

## Recent announcements

${getCollectionEntries('announcements')
  .slice(0, 3)
  .map((entry) => `- ${entry.title}: ${entry.path}`)
  .join('\n')}
`,
  '/docs/api': apiDocsMarkdown,
  '/ala-carte': `# Fusion Tuition Ala-carte Classes

One-off targeted June holiday classes in Singapore for O Level and IGCSE students who want help with selected chapters.

## Best For

- O Level and IGCSE students who need a focused June holiday revision plan.
- Students who want chapter-specific help in Physics, Chemistry, or Additional Mathematics.

## Contact

- Call or WhatsApp: ${contactDetails.phoneDisplay}
- Email: justinechang94@gmail.com and ${contactDetails.email}
`,
} as const

export function getPageMarkdown(pathname: string, origin: string) {
  const markdown =
    pageMarkdownByPath[pathname as keyof typeof pageMarkdownByPath]
  if (!markdown) {
    return null
  }

  return `${markdown}

## Canonical URL

${origin}${pathname === '/' ? '/' : pathname}
`
}

export function buildRobotsTxt(origin: string) {
  return `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
Content-Signal: ai-train=no, search=yes, ai-input=yes
`
}

export function buildSitemapXml(origin: string) {
  const urls = [
    ...publicRoutes,
    ...getAllContentEntries().map((entry) => ({
      path: entry.path,
      title: entry.title,
    })),
  ]
    .map((route) => {
      const path = route.path === '/' ? '/' : route.path

      return `  <url>
    <loc>${origin}${path}</loc>
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

export function buildApiCatalog(origin: string) {
  return {
    linkset: [
      {
        anchor: `${origin}/api/site-info`,
        'service-desc': [
          {
            href: `${origin}/api/openapi`,
            type: 'application/json',
          },
        ],
        'service-doc': [
          {
            href: `${origin}/docs/api`,
            type: 'text/html',
          },
        ],
        status: [
          {
            href: `${origin}/api/health`,
            type: 'application/json',
          },
        ],
      },
    ],
  }
}

export function buildOpenApiDocument(origin: string) {
  return {
    openapi: '3.1.0',
    info: {
      title: 'Fusion Tuition Public API',
      version: '1.0.0',
      description:
        'Read-only public metadata API for agent and service discovery on Fusion Tuition.',
    },
    servers: [{ url: origin }],
    paths: {
      '/api/health': {
        get: {
          summary: 'Public health check',
          operationId: 'getHealth',
          responses: {
            '200': {
              description: 'Site API health payload',
            },
          },
        },
      },
      '/api/site-info': {
        get: {
          summary: 'Public site metadata',
          operationId: 'getSiteInfo',
          responses: {
            '200': {
              description: 'Site, contact, route, and curriculum metadata',
            },
          },
        },
      },
    },
  }
}

export function buildSiteInfo(origin: string) {
  return {
    site: {
      name: siteName,
      description: siteDescription,
      canonicalOrigin: origin,
    },
    contact: contactDetails,
    location: {
      ...locationDetails,
      canonicalUrl: `${origin}${locationDetails.pagePath}`,
    },
    routes: publicRoutes.map((route) => ({
      ...route,
      url: `${origin}${route.path === '/' ? '/' : route.path}`,
    })),
    content: {
      blog: getCollectionEntries('blog').map((entry) => ({
        title: entry.title,
        description: entry.description,
        url: `${origin}${entry.path}`,
      })),
      announcements: getCollectionEntries('announcements').map((entry) => ({
        title: entry.title,
        description: entry.description,
        url: `${origin}${entry.path}`,
      })),
    },
    teachers,
    curricula: curriculumCatalog,
  }
}

export function buildLlmsTxt(origin: string) {
  return `# ${siteName}

> ${siteDescription}

## Important pages

${publicRoutes
  .map(
    (route) =>
      `- ${route.title}: ${origin}${route.path === '/' ? '/' : route.path}`,
  )
  .join('\n')}

## Latest writing

${getRecentContentEntries(6)
  .map((entry) => `- ${entry.title}: ${origin}${entry.path}`)
  .join('\n')}

## Public API

- OpenAPI: ${origin}/api/openapi
- Site info: ${origin}/api/site-info
- Health: ${origin}/api/health

## Contact

- Phone: ${contactDetails.phoneDisplay}
- Email: ${contactDetails.email}
- WhatsApp: ${contactDetails.whatsappUrl}
`
}

export async function sha256Hex(content: string) {
  const bytes = new TextEncoder().encode(content)
  const hashBuffer = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export async function buildAgentSkillsIndex(origin: string) {
  const skills = await Promise.all(
    agentSkills.map(async (skill) => ({
      name: skill.name,
      type: skill.type,
      description: skill.description,
      url: `${origin}/.well-known/agent-skills/${skill.name}/SKILL.md`,
      sha256: await sha256Hex(skill.content),
    })),
  )

  return {
    $schema:
      'https://agentskills.io/schemas/agent-skills-discovery-v0.2.0.json',
    skills,
  }
}

export function getAgentSkill(name: string) {
  return agentSkills.find((skill) => skill.name === name) ?? null
}

export function buildLinkHeader() {
  return [
    '</.well-known/api-catalog>; rel="api-catalog"',
    '</api/openapi>; rel="service-desc"; type="application/json"',
    '</docs/api>; rel="service-doc"',
    '</rss.xml>; rel="alternate"; type="application/rss+xml"',
    '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
  ].join(', ')
}
