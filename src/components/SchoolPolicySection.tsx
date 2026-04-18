import { motion } from 'framer-motion'
import { BookCheck, School, Target, Users2 } from 'lucide-react'

const benefits = [
  {
    icon: BookCheck,
    title: 'Consistent Curriculum',
    description:
      'All students follow the same syllabus and pace, ensuring cohesive learning',
  },
  {
    icon: Target,
    title: 'Targeted Preparation',
    description:
      "Exam strategies and materials specific to each school's requirements",
  },
  {
    icon: Users2,
    title: 'Peer Learning',
    description:
      'Students can relate to similar academic challenges and support each other',
  },
]

export function SchoolPolicySection() {
  return (
    <section className="border-t border-gray-200 px-4 py-16 md:px-0 md:py-24">
      <div className="mb-12">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2">
          <School className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-semibold text-blue-900">
            Our Teaching Philosophy
          </span>
        </div>
        <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-5xl">
          No School Mixing Policy
        </h2>
        <p className="max-w-2xl text-lg text-gray-600">
          We maintain cohesive classes tailored to each group&apos;s specific
          curriculum needs
        </p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            className="border border-gray-200 bg-white p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 inline-flex rounded-lg bg-blue-50 p-3">
              <benefit.icon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              {benefit.title}
            </h3>
            <p className="text-sm text-gray-600">{benefit.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.div
          className="border border-gray-200 bg-gray-50 p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Different Schools, Different Needs
          </h3>
          <ul className="space-y-2.5 text-sm text-gray-600">
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>Each school has unique teaching methods and emphasis</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>
                Exam formats and question styles can vary significantly
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>
                Pacing and chapter sequences differ between institutions
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>
                School-specific resources and past papers are more relevant
              </span>
            </li>
          </ul>
        </motion.div>

        <motion.div
          className="border border-gray-200 bg-gray-50 p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Our Approach
          </h3>
          <ul className="space-y-2.5 text-sm text-gray-600">
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>Classes grouped by school and academic level</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>Curriculum-specific lesson plans and materials</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>
                Exam preparation tailored to each school&apos;s format
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>
                Better understanding of individual school&apos;s requirements
              </span>
            </li>
          </ul>
        </motion.div>
      </div>

      <div className="mt-8 border-l-4 border-blue-500 bg-blue-50 p-4">
        <p className="text-sm text-gray-700">
          This approach ensures every student receives the most relevant and
          effective tuition for their specific academic environment
        </p>
      </div>
    </section>
  )
}
