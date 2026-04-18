import ContactSection from '@/components/ContactSection'
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight'
import { motion } from 'framer-motion'
import { BookOpen, FlaskConical, Lightbulb, Users } from 'lucide-react'

const values = [
  {
    icon: <Lightbulb className="h-5 w-5" />,
    title: 'Engineer Teachers',
    description:
      'Every teacher is an experienced engineer who translates complex concepts into clear, practical lessons.',
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: 'Max 3 per class',
    description:
      'Small enough for every student to get attention, ask questions, and stay accountable.',
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: 'Free consultations',
    description:
      'Students can reach out for help outside lesson hours at no extra charge.',
  },
  {
    icon: <FlaskConical className="h-5 w-5" />,
    title: 'No school mixing',
    description:
      'We group students by school and stream so lessons stay relevant and focused.',
  },
]

const teachers = [
  {
    name: 'Justine Chang',
    role: 'Physics & Mathematics',
    background: 'Software and Mechanical Engineer — 6 years',
    imageSrc: '/justine.jpg',
  },
  {
    name: 'Ng Qi Hui',
    role: 'Chemistry & Mathematics',
    background: 'Chemical Engineer — 6 years',
    imageSrc: '/qihui.jpg',
  },
]

export default function About() {
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
              About Us
            </p>
            <h1 className="mb-5 max-w-4xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-6xl md:leading-[1.1]">
              Engineers who{' '}
              <Highlight className="bg-gradient-to-r from-orange-300 to-amber-300 text-slate-900">
                teach
              </Highlight>
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg md:leading-8">
              Fusion Tuition is run by engineers who left industry to teach
              Physics, Chemistry, and Mathematics — because we believe great
              teaching starts with deep understanding.
            </p>
          </motion.div>
        </div>
      </HeroHighlight>

      <div className="h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500" />

      {/* Content */}
      <div className="bg-[linear-gradient(180deg,#fffbf5_0%,#ffffff_12%,#fffdf9_100%)] px-4 pb-8 pt-10 md:px-8 md:pt-14">
        <div className="mx-auto max-w-6xl">
          {/* Values */}
          <section className="mb-16">
            <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Why families choose us
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
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
                </motion.div>
              ))}
            </div>
          </section>

          {/* Teachers */}
          <section className="mb-16">
            <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Meet the teachers
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {teachers.map((teacher, idx) => (
                <motion.div
                  key={teacher.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-[border-color] duration-200 hover:border-orange-300"
                >
                  {/* Photo */}
                  <div className="relative h-[280px] overflow-hidden sm:h-[320px]">
                    <img
                      src={teacher.imageSrc}
                      alt={teacher.name}
                      className="h-full w-full object-cover object-top"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    {/* Name overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white">
                        {teacher.name}
                      </h3>
                      <p className="text-sm font-medium text-orange-300">
                        {teacher.role}
                      </p>
                    </div>
                  </div>
                  {/* Details */}
                  <div className="p-6">
                    <p className="text-sm leading-relaxed text-slate-500">
                      {teacher.background}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <ContactSection />
        </div>
      </div>
    </div>
  )
}
