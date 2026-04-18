import { Mail, MessageCircle, Phone } from 'lucide-react'
import React from 'react'

const ContactSection: React.FC = () => {
  const phoneNumber = '91796637'
  const email = 'justine@fusiontuition.com'
  const whatsappMessage = encodeURIComponent(
    "Hi! I'm interested in booking a free trial class at Fusion Tuition.",
  )

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/65${phoneNumber}?text=${whatsappMessage}`,
      '_blank',
    )
  }

  const handleCall = () => {
    window.location.href = `tel:+65${phoneNumber}`
  }

  const handleEmail = () => {
    window.location.href = `mailto:${email}`
  }

  return (
    <section className="border-t border-gray-200 py-16 md:py-24">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-5xl">
          Ready to Get Started?
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Book your free trial class today and experience the Fusion Tuition
          difference
        </p>
      </div>

      <div className="mb-12 flex justify-center">
        <button
          onClick={handleWhatsApp}
          className="group inline-flex items-center gap-3 bg-green-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl"
        >
          <MessageCircle className="h-6 w-6" />
          Book Your Free Trial Now
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <button
          onClick={handleCall}
          className="flex items-center gap-3 border border-gray-200 bg-white p-6 transition-all hover:border-gray-300 hover:shadow-lg"
        >
          <div className="rounded-lg bg-blue-50 p-3">
            <Phone className="h-6 w-6 text-blue-600" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-900">Call Us</p>
            <p className="text-sm text-gray-600">+65 {phoneNumber}</p>
          </div>
        </button>

        <button
          onClick={handleWhatsApp}
          className="flex items-center gap-3 border border-gray-200 bg-white p-6 transition-all hover:border-gray-300 hover:shadow-lg"
        >
          <div className="rounded-lg bg-green-50 p-3">
            <MessageCircle className="h-6 w-6 text-green-600" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-900">WhatsApp</p>
            <p className="text-sm text-gray-600">Chat with us</p>
          </div>
        </button>

        <button
          onClick={handleEmail}
          className="flex items-center gap-3 border border-gray-200 bg-white p-6 transition-all hover:border-gray-300 hover:shadow-lg"
        >
          <div className="rounded-lg bg-purple-50 p-3">
            <Mail className="h-6 w-6 text-purple-600" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-900">Email</p>
            <p className="text-sm text-gray-600">{email}</p>
          </div>
        </button>
      </div>
    </section>
  )
}

export default ContactSection
