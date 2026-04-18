import ContactSection from '@/components/ContactSection'
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight'
import { motion } from 'framer-motion'
import { BookOpen, Clock, Users } from 'lucide-react'

const curricula = [
  {
    name: 'IGCSE',
    label: 'Cambridge IGCSE',
    color: 'blue',
    subjects: [
      { name: 'International Math', code: '0607' },
      { name: 'Additional Mathematics', code: '0606' },
      { name: 'Chemistry', code: '0620' },
      { name: 'Physics', code: '0625' },
    ],
  },
  {
    name: 'GCE O Level',
    label: 'Singapore-Cambridge GCE O Level',
    color: 'orange',
    subjects: [
      { name: 'Physics', code: '6091' },
      { name: 'Chemistry', code: '6092' },
      { name: 'Additional Mathematics', code: '4049' },
    ],
  },
  {
    name: 'A Level',
    label: 'Cambridge International A Level',
    color: 'purple',
    subjects: [
      { name: 'Chemistry', code: '9729' },
      { name: 'Physics', code: '9749' },
    ],
  },
  {
    name: 'IB',
    label: 'International Baccalaureate',
    color: 'green',
    subjects: [
      { name: 'Mathematics', code: 'HL/SL' },
      { name: 'Chemistry', code: 'HL/SL' },
    ],
  },
] as const

const colorMap = {
  blue: {
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    accent: 'bg-blue-500',
  },
  orange: {
    badge: 'bg-orange-50 text-orange-700 border-orange-200',
    accent: 'bg-orange-500',
  },
  purple: {
    badge: 'bg-purple-50 text-purple-700 border-purple-200',
    accent: 'bg-purple-500',
  },
  green: {
    badge: 'bg-green-50 text-green-700 border-green-200',
    accent: 'bg-green-500',
  },
} as const

const highlights = [
  {
    icon: <Users className="h-5 w-5" />,
    title: 'Max 3 students',
    description: 'Personalised attention in every session',
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: 'Flexible timing',
    description: 'We match your schedule, not the other way around',
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: 'Free consultations',
    description: 'Extra help outside lesson hours at no charge',
  },
]

export default function ClassesPage() {
  return (
    <div className="-mx-4 -mt-8">
      {/* Hero */}
      <HeroHighlight containerClassName="rounded-none bg-gradient-to-t from-slate-50 to-gray-100">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 md:px-8 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          >
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-orange-600">
              What We Teach
            </p>
            <h1 className="mb-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-6xl md:leading-[1.15]">
              You pick the subject.
              <br />
              <Highlight className="bg-gradient-to-r from-orange-300 to-amber-300 text-slate-900">
                You pick the time.
              </Highlight>
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg md:leading-8">
              Physics, Chemistry, and Mathematics tuition for IGCSE, O Level, A
              Level, and IB — in groups of 3 or fewer, scheduled around your
              availability.
            </p>
          </motion.div>
        </div>
      </HeroHighlight>

      <div className="h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500" />

      {/* Content */}
      <div className="bg-[linear-gradient(180deg,#fffbf5_0%,#ffffff_12%,#fffdf9_100%)] px-4 pb-8 pt-10 md:px-8 md:pt-14">
        <div className="mx-auto max-w-6xl">
          {/* Highlights row */}
          <div className="mb-14 grid gap-4 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 pl-8 shadow-sm transition-[border-color] duration-200 hover:border-orange-300"
              >
                <span className="absolute inset-y-0 left-0 w-[3px] bg-orange-200 transition-colors duration-300 group-hover:bg-orange-500" />
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-orange-100 bg-orange-50 text-orange-600">
                  {item.icon}
                </div>
                <h3 className="mb-1 text-base font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Curricula */}
          <div className="mb-14 space-y-10">
            {curricula.map((curriculum, idx) => {
              const colors = colorMap[curriculum.color]
              return (
                <motion.section
                  key={curriculum.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                >
                  <h2 className="mb-4 text-xl font-bold text-slate-900 md:text-2xl">
                    {curriculum.name}
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {curriculum.subjects.map((subject) => (
                      <div
                        key={subject.code}
                        className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 pl-7 transition-[border-color] duration-200 hover:border-slate-300"
                      >
                        <span
                          className={`absolute inset-y-0 left-0 w-[3px] ${colors.accent} opacity-40 transition-opacity duration-300 group-hover:opacity-100`}
                        />
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-[0.938rem] font-semibold text-slate-900">
                            {subject.name}
                          </h3>
                          <span
                            className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${colors.badge}`}
                          >
                            {subject.code}
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs text-slate-400">
                          {curriculum.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )
            })}
          </div>

          {/* Contact section */}
          <ContactSection />
        </div>
      </div>
    </div>
  )
}
