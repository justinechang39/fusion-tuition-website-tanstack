import { ClassSizeSection } from '@/components/ClassSizeSection'
import ContactSection from '@/components/ContactSection'
import { CustomizedExercisesSection } from '@/components/CustomizedExercisesSection'
import { FreeTrialSection } from '@/components/FreeTrialSection'
import { MobileAccordion } from '@/components/MobileAccordion'
import { ParentFeedbackSection } from '@/components/ParentFeedbackSection'
import { SchoolPolicySection } from '@/components/SchoolPolicySection'
import SplitText from '@/components/SplitText'
import { StickyContactBar } from '@/components/StickyContactBar'
import { StudentScoreTableSection } from '@/components/StudentScoreTableSection'
import { StudentTypesSection } from '@/components/StudentTypesSection'
import { SubjectsSection } from '@/components/SubjectsSection'
import { TikTokEmbed } from '@/components/TikTokEmbed'
import { NextHeadComponent } from '@/components/components/NextHeadComponent'
import {
  CalendarCheck,
  FlaskConical,
  School,
  Target,
  Users,
} from 'lucide-react'

export default function Connect() {
  return (
    <>
      <div className="container mx-auto space-y-8 px-2 pb-24 md:space-y-16 md:px-4">
        <NextHeadComponent title="fusion tuition | connect" />

        {/* Welcome Header */}
        <header className="relative overflow-hidden border-b border-gray-200 py-12 md:py-20">
          <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <SplitText
                text="Welcome"
                className="mb-4 text-5xl font-bold text-gray-900 md:text-7xl"
                delay={50}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-50px"
                textAlign="left"
              />
              <p className="max-w-2xl text-lg text-gray-600 md:text-xl">
                Discover personalized learning with small group classes designed
                to help you excel in your studies.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="inline-flex items-center gap-3 rounded-full border-2 border-orange-500 bg-orange-50 px-6 py-3 md:px-8 md:py-4">
                <CalendarCheck className="h-6 w-6 text-orange-600 md:h-7 md:w-7" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-orange-900 md:text-base">
                    2026 Classes Open
                  </p>
                  <p className="text-xs text-orange-700 md:text-sm">
                    Limited spots
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Key Strengths Section */}
        <section className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
          {[
            {
              icon: Users,
              title: 'Small Classes',
              description: 'Max 3 students',
              color: 'text-blue-600',
              bg: 'bg-blue-50',
            },
            {
              icon: School,
              title: 'No Mixing',
              description: 'Same school, same stream',
              color: 'text-green-600',
              bg: 'bg-green-50',
            },
            {
              icon: FlaskConical,
              title: 'Core Subjects',
              description: 'Chem, Physics, Maths for O/A Level, IGCSE, IB',
              color: 'text-purple-600',
              bg: 'bg-purple-50',
            },
            {
              icon: Target,
              title: 'Personalized',
              description: 'Custom exercises',
              color: 'text-orange-600',
              bg: 'bg-orange-50',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-gray-300 hover:shadow-lg"
            >
              <div className={`mb-4 inline-flex rounded-lg ${item.bg} p-3`}>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <h3 className="mb-1 text-base font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </section>

        {/* Student Results Section - Always visible */}
        <div className="animate-fade-in-up animation-delay-600">
          <StudentScoreTableSection />
        </div>

        {/* Self Assessment Section - Always visible */}
        {/* <div className="animation-delay-1000 animate-fade-in-up">
          <SelfAssessmentSection />
        </div> */}

        {/* Mobile Accordion View for remaining sections */}
        <div className="block md:hidden">
          <MobileAccordion />
        </div>
        {/* TikTok Section - Always visible */}
        <div className="animate-fade-in-up animation-delay-800">
          <TikTokEmbed />
        </div>

        {/* Desktop Stacked View for remaining sections */}
        <div className="hidden space-y-8 md:block md:space-y-16">
          {/* 1. HIGHLIGHT KEY STRENGTHS: Show our main advantages */}
          <ClassSizeSection />

          <CustomizedExercisesSection />

          {/* 2. HOOK: Lead with irresistible offer */}
          <FreeTrialSection />

          {/* 3. ESTABLISH AUTHORITY: Show what we teach and who we serve */}
          <SubjectsSection />

          <StudentTypesSection />

          {/* 4. REMOVE OBJECTIONS: Address concerns */}
          <ParentFeedbackSection />

          <SchoolPolicySection />
        </div>

        {/* Contact section for both mobile and desktop */}
        <ContactSection />
      </div>

      {/* Sticky contact bar for immediate action */}
      <StickyContactBar />
    </>
  )
}
