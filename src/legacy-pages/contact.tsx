import DirectionsSection from '@/components/DirectionsSection'
import { NextHeadComponent } from '@/components/components/NextHeadComponent'
import { Mail, MessageCircle, Phone } from 'lucide-react'

export default function Contact() {
  const phoneNumber = '+6591796637'
  const whatsappPhoneNumber = '6591796637'
  const displayPhoneNumber = '+65 91796637'
  const email = 'justine@fusiontuition.com'
  const whatsappMessage = encodeURIComponent(
    'Hello there! I would like to learn more about fusion!',
  )

  return (
    <div className="container mx-auto space-y-16">
      <NextHeadComponent title="fusion tuition | contact" />
      <section>
        <h1 className="mb-4 text-4xl font-bold">Contact Us</h1>
      </section>

      <DirectionsSection />

      <section>
        <h2 className="mb-8 text-3xl font-semibold">Direct Contact</h2>
        <div className="gradient-section space-y-6 px-4 md:px-6">
          <p className="max-w-2xl text-base text-gray-600 md:text-lg">
            Reach us directly by phone, WhatsApp, or email. The details are
            listed below so they are easy to copy from any device.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <button
              onClick={() => (window.location.href = `tel:${phoneNumber}`)}
              className="flex items-center gap-4 rounded-2xl border border-blue-100 bg-white/90 p-5 text-left transition-all duration-300 hover:border-blue-200 hover:shadow-lg"
            >
              <div className="rounded-xl bg-blue-50 p-3">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-base font-semibold text-gray-900">Call Us</p>
                <p className="text-sm text-gray-600">{displayPhoneNumber}</p>
              </div>
            </button>

            <button
              onClick={() =>
                window.open(
                  `https://wa.me/${whatsappPhoneNumber}?text=${whatsappMessage}`,
                  '_blank',
                )
              }
              className="flex items-center gap-4 rounded-2xl border border-green-100 bg-white/90 p-5 text-left transition-all duration-300 hover:border-green-200 hover:shadow-lg"
            >
              <div className="rounded-xl bg-green-50 p-3">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-base font-semibold text-gray-900">
                  WhatsApp
                </p>
                <p className="text-sm text-gray-600">{displayPhoneNumber}</p>
              </div>
            </button>

            <button
              onClick={() => (window.location.href = `mailto:${email}`)}
              className="flex items-center gap-4 rounded-2xl border border-purple-100 bg-white/90 p-5 text-left transition-all duration-300 hover:border-purple-200 hover:shadow-lg"
            >
              <div className="rounded-xl bg-purple-50 p-3">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-base font-semibold text-gray-900">Email</p>
                <p className="text-sm text-gray-600">{email}</p>
              </div>
            </button>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-gray-500">
            <span className="rounded-full bg-white/80 px-3 py-1.5">
              Phone: {displayPhoneNumber}
            </span>
            <span className="rounded-full bg-white/80 px-3 py-1.5">
              Email: {email}
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
