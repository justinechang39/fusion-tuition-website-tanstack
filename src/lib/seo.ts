import {
  contactDetails,
  curriculumCatalog,
  locationDetails,
  siteDescription,
  siteName,
  teachers,
} from '@/lib/agent-ready'
import type { ContentEntrySummary } from '@/lib/content'

const fallbackSiteOrigin = 'https://fusiontuition.com'
const defaultSocialImagePath = '/fusion_tuition_logo_horizontal.png'
const defaultRobotsContent =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

export const siteOrigin =
  import.meta.env.VITE_PUBLIC_SITE_URL || fallbackSiteOrigin

type JsonLdValue = Record<string, unknown>
type MetaDescriptor = {
  charSet?: string
  content?: string
  name?: string
  property?: string
  title?: string
}

type BreadcrumbItem = {
  name: string
  path: string
}

type SeoHeadInput = {
  title: string
  description: string
  path: string
  imagePath?: string
  ogType?: 'website' | 'article'
  noIndex?: boolean
  jsonLd?: JsonLdValue | JsonLdValue[]
  extraMeta?: MetaDescriptor[]
}

type PageSchemaInput = {
  path: string
  title: string
  description: string
  pageType?: string
  keywords?: string[]
}

function serializeJsonLd(value: JsonLdValue) {
  return JSON.stringify(value).replaceAll('<', '\\u003c')
}

export function buildAbsoluteUrl(path: string) {
  return new URL(path, siteOrigin).toString()
}

export function buildCanonicalUrl(path: string) {
  return buildAbsoluteUrl(path)
}

export function buildPageTitle(title: string) {
  return `${title} | ${siteName}`
}

export function buildRootSeoHead() {
  return {
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: siteName,
      },
      {
        name: 'description',
        content: siteDescription,
      },
      {
        name: 'application-name',
        content: siteName,
      },
      {
        name: 'apple-mobile-web-app-title',
        content: siteName,
      },
      {
        name: 'theme-color',
        content: '#fff7ed',
      },
      {
        property: 'og:site_name',
        content: siteName,
      },
      {
        property: 'og:locale',
        content: 'en_SG',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
    links: [
      {
        rel: 'icon',
        href: '/favicon.ico',
        sizes: 'any',
      },
      {
        rel: 'shortcut icon',
        href: '/favicon.ico',
      },
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: serializeJsonLd(buildOrganizationJsonLd()),
      },
      {
        type: 'application/ld+json',
        children: serializeJsonLd(buildWebsiteJsonLd()),
      },
    ],
  }
}

export function buildSeoHead({
  title,
  description,
  path,
  imagePath = defaultSocialImagePath,
  ogType = 'website',
  noIndex = false,
  jsonLd,
  extraMeta = [],
}: SeoHeadInput) {
  const fullTitle = buildPageTitle(title)
  const canonicalUrl = buildCanonicalUrl(path)
  const imageUrl = buildAbsoluteUrl(imagePath)
  const robotsContent = noIndex ? 'noindex, nofollow' : defaultRobotsContent
  const jsonLdItems = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  return {
    meta: [
      {
        title: fullTitle,
      },
      {
        name: 'description',
        content: description,
      },
      {
        name: 'robots',
        content: robotsContent,
      },
      {
        property: 'og:title',
        content: fullTitle,
      },
      {
        property: 'og:description',
        content: description,
      },
      {
        property: 'og:type',
        content: ogType,
      },
      {
        property: 'og:url',
        content: canonicalUrl,
      },
      {
        property: 'og:image',
        content: imageUrl,
      },
      {
        name: 'twitter:title',
        content: fullTitle,
      },
      {
        name: 'twitter:description',
        content: description,
      },
      {
        name: 'twitter:image',
        content: imageUrl,
      },
      ...extraMeta,
    ],
    links: [
      {
        rel: 'canonical',
        href: canonicalUrl,
      },
    ],
    scripts: jsonLdItems.map((item) => ({
      type: 'application/ld+json',
      children: serializeJsonLd(item),
    })),
  }
}

export function buildPageJsonLd({
  path,
  title,
  description,
  pageType = 'WebPage',
  keywords,
}: PageSchemaInput): JsonLdValue {
  const url = buildCanonicalUrl(path)

  return {
    '@context': 'https://schema.org',
    '@type': pageType,
    '@id': `${url}#webpage`,
    name: title,
    description,
    url,
    inLanguage: 'en-SG',
    ...(keywords ? { keywords: keywords.join(', ') } : {}),
    audience: {
      '@type': 'Audience',
      audienceType: 'Singapore parents and secondary school students',
    },
    isPartOf: {
      '@id': `${siteOrigin}/#website`,
    },
    about: {
      '@id': `${siteOrigin}/#organization`,
    },
  }
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): JsonLdValue {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: buildCanonicalUrl(item.path),
    })),
  }
}

export function buildAboutPageJsonLd(title: string, description: string) {
  return {
    ...buildPageJsonLd({
      path: '/about',
      title,
      description,
      pageType: 'AboutPage',
    }),
    mainEntity: teachers.map((teacher) => ({
      '@type': 'Person',
      name: teacher.name,
      jobTitle: 'Teacher',
      worksFor: {
        '@id': `${siteOrigin}/#organization`,
      },
      knowsAbout: teacher.subjects,
      description: teacher.experience,
    })),
  }
}

export function buildClassesPageJsonLd(title: string, description: string) {
  return {
    ...buildPageJsonLd({
      path: '/classes',
      title,
      description,
      pageType: 'CollectionPage',
      keywords: [
        'tuition Singapore',
        'O Level tuition',
        'IGCSE tuition',
        'Physics tuition',
        'Chemistry tuition',
        'Mathematics tuition',
      ],
    }),
    mainEntity: {
      '@type': 'OfferCatalog',
      name: 'Fusion Tuition Programmes',
      itemListElement: [
        ...curriculumCatalog.igcse.map((item) => ({
          '@type': 'Course',
          name: `IGCSE ${item.name}`,
          courseCode: item.code,
          educationalLevel: 'IGCSE',
          courseMode: 'In-person small-group tuition',
          provider: {
            '@id': `${siteOrigin}/#organization`,
          },
        })),
        ...curriculumCatalog.oLevel.map((item) => ({
          '@type': 'Course',
          name: `GCE O Level ${item.name}`,
          courseCode: item.code,
          educationalLevel: 'GCE O Level',
          courseMode: 'In-person small-group tuition',
          provider: {
            '@id': `${siteOrigin}/#organization`,
          },
        })),
        ...curriculumCatalog.aLevel.map((item) => ({
          '@type': 'Course',
          name: `GCE A Level ${item.name}`,
          courseCode: item.code,
          educationalLevel: 'GCE A Level',
          courseMode: 'In-person small-group tuition',
          provider: {
            '@id': `${siteOrigin}/#organization`,
          },
        })),
        ...curriculumCatalog.ib.map((item) => ({
          '@type': 'Course',
          name: `IB ${item.name}`,
          courseCode: item.code,
          educationalLevel: 'IB',
          courseMode: 'In-person small-group tuition',
          provider: {
            '@id': `${siteOrigin}/#organization`,
          },
        })),
      ],
    },
  }
}

export function buildContactPageJsonLd(title: string, description: string) {
  return {
    ...buildPageJsonLd({
      path: '/contact',
      title,
      description,
      pageType: 'ContactPage',
    }),
    mainEntity: {
      '@id': `${siteOrigin}/#organization`,
    },
  }
}

export function buildDirectionsPageJsonLd(title: string, description: string) {
  const page = buildPageJsonLd({
    path: '/how-to-get-here',
    title,
    description,
  })

  return {
    ...page,
    mainEntity: {
      '@type': 'Place',
      '@id': `${siteOrigin}/#place`,
      name: locationDetails.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: locationDetails.addressLine1,
        addressLocality: 'Singapore',
        postalCode: locationDetails.postalCode,
        addressCountry: 'SG',
      },
      telephone: contactDetails.phoneDisplay,
      url: buildCanonicalUrl('/how-to-get-here'),
    },
  }
}

export function buildCollectionPageJsonLd({
  path,
  title,
  description,
  entries,
}: {
  path: string
  title: string
  description: string
  entries: ContentEntrySummary[]
}) {
  return {
    ...buildPageJsonLd({
      path,
      title,
      description,
      pageType: 'CollectionPage',
    }),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: entries.map((entry, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: buildCanonicalUrl(entry.path),
        name: entry.title,
      })),
    },
  }
}

export function buildArticleJsonLd(entry: ContentEntrySummary) {
  const canonicalUrl = buildCanonicalUrl(entry.path)

  return {
    '@context': 'https://schema.org',
    '@type': entry.collection === 'blog' ? 'BlogPosting' : 'Article',
    '@id': `${canonicalUrl}#article`,
    headline: entry.title,
    description: entry.description,
    datePublished: entry.publishedAt,
    dateModified: entry.updatedAt ?? entry.publishedAt,
    articleSection: entry.category,
    keywords: entry.tags.join(', '),
    author: {
      '@type': 'Organization',
      name: entry.author,
    },
    publisher: {
      '@id': `${siteOrigin}/#organization`,
    },
    image: buildAbsoluteUrl(entry.ogImage ?? defaultSocialImagePath),
    mainEntityOfPage: {
      '@id': `${canonicalUrl}#webpage`,
    },
  }
}

function buildOrganizationJsonLd(): JsonLdValue {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${siteOrigin}/#organization`,
    name: siteName,
    url: siteOrigin,
    description: siteDescription,
    logo: buildAbsoluteUrl('/logo512.png'),
    image: buildAbsoluteUrl(defaultSocialImagePath),
    email: [contactDetails.email, contactDetails.alternateEmail],
    telephone: contactDetails.phoneDisplay,
    priceRange: '$$',
    areaServed: {
      '@type': 'Country',
      name: 'Singapore',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: locationDetails.addressLine1,
      addressLocality: 'Singapore',
      postalCode: locationDetails.postalCode,
      addressCountry: 'SG',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: contactDetails.phoneDisplay,
        email: contactDetails.email,
        areaServed: 'SG',
        availableLanguage: ['en'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'enrolment enquiries',
        telephone: contactDetails.phoneDisplay,
        email: contactDetails.alternateEmail,
        areaServed: 'SG',
        availableLanguage: ['en'],
      },
    ],
    knowsAbout: Array.from(
      new Set<string>([
        ...teachers.flatMap((teacher) => [...teacher.subjects]),
        'IGCSE',
        'GCE O Level',
        'GCE A Level',
        'IB',
        'small-group tuition',
        'June holiday revision',
      ]),
    ),
  }
}

function buildWebsiteJsonLd(): JsonLdValue {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteOrigin}/#website`,
    url: siteOrigin,
    name: siteName,
    description: siteDescription,
    publisher: {
      '@id': `${siteOrigin}/#organization`,
    },
    inLanguage: 'en-SG',
  }
}
