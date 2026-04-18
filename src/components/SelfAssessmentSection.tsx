import { Link } from '@tanstack/react-router'
/**
 * Self-Assessment Section Component
 *
 * Displays a prominent call-to-action for the free automated self-assessment feature.
 * Features responsive design with gradients and animations to make it stand out.
 * Links to the /eval page where students can assess their understanding of learning outcomes.
 */
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Sparkles,
  Target,
} from 'lucide-react'

export default function SelfAssessmentSection() {
  return (
    <section className="w-full animate-fade-in-up px-4 py-8 md:py-16">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 p-8 text-center shadow-2xl md:p-12">
        {/* Background decoration */}
        <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-white/10 blur-sm md:h-48 md:w-48"></div>
        <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white/5 blur-sm md:h-36 md:w-36"></div>

        {/* Content */}
        <div className="relative z-10">
          {/* Badge */}
          <div className="mx-auto mb-4 inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
            <Sparkles className="mr-2 h-4 w-4" />
            New Feature
          </div>

          {/* Title */}
          <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">
            Free Automated Self Assessment
          </h2>

          {/* Description */}
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90 md:text-xl">
            Discover your learning gaps instantly. Our intelligent assessment
            system evaluates your understanding against official curriculum
            learning outcomes and provides personalized gap analysis reports.
            Perfect for students preparing for O-Levels, A-Levels, and IGCSE
            examinations.
          </p>

          {/* CTA Button */}
          <Link to="/contact">
            <button className="group inline-flex items-center rounded-full bg-white px-8 py-4 text-lg font-semibold text-gray-900 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-50 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white/20 md:px-10 md:py-5 md:text-xl">
              Ask About Current Class Options
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 md:h-6 md:w-6" />
            </button>
          </Link>

          {/* Feature highlights */}
          <div className="mt-8 grid grid-cols-1 gap-4 text-white/80 md:grid-cols-3 md:gap-6">
            <div className="flex items-center justify-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span className="text-sm font-medium md:text-base">
                Instant Results
              </span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Target className="h-5 w-5" />
              <span className="text-sm font-medium md:text-base">
                Personalized Analysis
              </span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-medium md:text-base">
                100% Free
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
