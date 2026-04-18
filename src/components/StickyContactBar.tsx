import { MessageCircle, Phone } from 'lucide-react'

export function StickyContactBar() {
  const phoneNumber = '91796637'
  const whatsappMessage =
    "Hi! I'm interested in learning more about Fusion Tuition classes."

  const handleCall = () => {
    window.location.href = `tel:+65${phoneNumber}`
  }

  const handleWhatsApp = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage)
    window.open(
      `https://wa.me/65${phoneNumber}?text=${encodedMessage}`,
      '_blank',
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white shadow-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold text-gray-900">
              Ready to get started?
            </p>
            <p className="text-xs text-gray-600">
              Book your free trial class today
            </p>
          </div>

          <div className="flex w-full gap-2 md:w-auto">
            <button
              onClick={handleCall}
              className="flex flex-1 items-center justify-center gap-2 border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-all hover:bg-gray-50 md:flex-initial"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </button>

            <button
              onClick={handleWhatsApp}
              className="flex flex-1 items-center justify-center gap-2 bg-green-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-green-700 md:flex-initial"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
