import ContactSection from '@/components/ContactSection'
import { NextHeadComponent } from '@/components/components/NextHeadComponent'

export default function ClassesPage() {
  return (
    <>
      <div className="container mx-auto space-y-8 px-2 pb-24 md:space-y-16 md:px-4">
        <NextHeadComponent title="fusion tuition | classes" />

        {/* Main Content */}
        <section className="text-center">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="rounded-3xl border bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8 md:p-16">
              <h2 className="mb-8 text-3xl font-bold text-gray-800 md:text-5xl">
                Contact us for classes and timing
              </h2>

              <div className="space-y-6 text-lg text-gray-600 md:text-xl">
                <p className="font-medium">We&#39;re very flexible on timing</p>
                <p>
                  Please reach out to us - we try to create timeslots that best
                  match the student&#39;s availability
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <div>
          <ContactSection />
        </div>
      </div>
    </>
  )
}
