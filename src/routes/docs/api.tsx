import {
  apiDocsMarkdown,
  contactDetails,
  locationDetails,
} from '@/lib/agent-ready'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/docs/api')({
  head: () => ({
    meta: [{ title: 'fusion tuition | api docs' }],
  }),
  component: ApiDocsPage,
})

function ApiDocsPage() {
  return (
    <section className="mx-auto max-w-4xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold text-gray-900">Public API Docs</h1>
        <p className="text-lg text-gray-700">
          Fusion Tuition exposes a small public, read-only API so agents can
          discover site metadata without scraping the UI.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900">Endpoints</h2>
        <div className="mt-4 space-y-4 text-gray-700">
          <div>
            <p className="font-semibold">GET /api/health</p>
            <p>Returns a simple health payload for the public site API.</p>
          </div>
          <div>
            <p className="font-semibold">GET /api/site-info</p>
            <p>
              Returns contact details, location details, public routes,
              curricula, and teacher summaries.
            </p>
          </div>
          <div>
            <p className="font-semibold">GET /api/openapi</p>
            <p>Returns the OpenAPI description for the public site API.</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900">Authentication</h2>
        <p className="mt-3 text-gray-700">
          No authentication is required. These endpoints are public and
          read-only.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900">Useful Details</h2>
        <div className="mt-4 space-y-2 text-gray-700">
          <p>Phone: {contactDetails.phoneDisplay}</p>
          <p>Email: {contactDetails.email}</p>
          <p>
            Address: {locationDetails.addressLine1},{' '}
            {locationDetails.postalCode}, {locationDetails.country}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Markdown Version
        </h2>
        <pre className="mt-4 overflow-x-auto whitespace-pre-wrap text-sm text-gray-700">
          {apiDocsMarkdown}
        </pre>
      </div>
    </section>
  )
}
