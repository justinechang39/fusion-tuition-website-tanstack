import { Link } from '@tanstack/react-router'
import { ArrowRight, Gift } from 'lucide-react'

export function FreeTrialSection() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="relative overflow-hidden border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 px-8 py-12 md:px-16 md:py-16">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-green-100 opacity-30 blur-3xl md:h-96 md:w-96"></div>
        <div className="relative z-10 flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2">
              <Gift className="h-5 w-5 text-green-600" />
              <span className="text-sm font-semibold text-green-900">
                Special Offer
              </span>
            </div>
            <h2 className="mb-3 text-3xl font-bold text-gray-900 md:text-5xl">
              Get 2 FREE Classes
            </h2>
            <p className="max-w-xl text-lg text-gray-600 md:text-xl">
              Try our proven teaching method risk-free. Experience how we help
              students improve their grades with personalized attention.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4 border border-green-200 bg-white p-4 md:mt-8 md:max-w-md md:gap-6 md:p-6">
              {[
                { value: '1st', label: 'Trial Free' },
                { value: '2nd', label: 'Class Free' },
                { value: '0', label: 'Risk' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-green-600 md:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-green-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl"
            >
              Book Your Free Trial
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
