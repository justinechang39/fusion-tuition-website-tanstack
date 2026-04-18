import ContactPage from '@/legacy-pages/contact'
import {
  buildBreadcrumbJsonLd,
  buildContactPageJsonLd,
  buildSeoHead,
} from '@/lib/seo'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contact')({
  head: () =>
    buildSeoHead({
      title: 'Contact Fusion Tuition',
      description:
        'Call, WhatsApp, or email Fusion Tuition to ask about class timings, enrolment, and science or mathematics tuition in Singapore.',
      path: '/contact',
      jsonLd: [
        buildContactPageJsonLd(
          'Contact Fusion Tuition',
          'Call, WhatsApp, or email Fusion Tuition to ask about class timings, enrolment, and science or mathematics tuition in Singapore.',
        ),
        buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]),
      ],
    }),
  component: ContactPage,
})
