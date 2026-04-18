import { Link } from '@tanstack/react-router'
import { ArrowRight, CalendarCheck } from 'lucide-react'

export function Registration2026Banner() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="relative overflow-hidden border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 px-8 py-12 md:px-16 md:py-16">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-orange-100 opacity-30 blur-3xl md:h-96 md:w-96"></div>
        <div className="relative z-10 flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2">
              <CalendarCheck className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-semibold text-orange-900">
                Now Open
              </span>
            </div>
            <h2 className="mb-3 text-3xl font-bold text-gray-900 md:text-5xl">
              2026 Classes
            </h2>
            <p className="max-w-xl text-lg text-gray-600 md:text-xl">
              Limited spots available in our small group classes. Maximum 3
              students per class for personalized attention.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-orange-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-orange-700 hover:shadow-xl"
            >
              Register Now
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
