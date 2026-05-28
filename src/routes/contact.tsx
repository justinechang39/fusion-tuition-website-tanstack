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
      title: 'Contact Fusion Tuition Singapore',
      description:
        'Call, WhatsApp, or email Fusion Tuition in Singapore to ask about O Level, IGCSE, A Level, IB, Physics, Chemistry, and Math tuition classes.',
      path: '/contact',
      extraMeta: [
        {
          name: 'keywords',
          content:
            'contact Fusion Tuition, tuition centre Singapore phone, O Level tuition enquiry, IGCSE tuition enquiry',
        },
      ],
      jsonLd: [
        buildContactPageJsonLd(
          'Contact Fusion Tuition Singapore',
          'Call, WhatsApp, or email Fusion Tuition in Singapore to ask about class timings, enrolment, and science or mathematics tuition.',
        ),
        buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]),
      ],
    }),
  component: ContactPage,
})
