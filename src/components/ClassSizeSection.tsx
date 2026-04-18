import { motion } from 'framer-motion'
import { Award, MessageCircle, UserCheck, Users } from 'lucide-react'

const benefits = [
  {
    icon: UserCheck,
    title: 'Individual Attention',
    description:
      'Each student receives personalized guidance and feedback during every lesson',
  },
  {
    icon: MessageCircle,
    title: 'Interactive Learning',
    description:
      'More opportunities to ask questions and engage in meaningful discussions',
  },
  {
    icon: Award,
    title: 'Better Results',
    description:
      'Proven track record of improved performance with our small group approach',
  },
]

export function ClassSizeSection() {
  return (
    <section className="border-t border-gray-200 px-4 py-16 md:px-0 md:py-24">
      <div className="mb-12">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2">
          <Users className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-semibold text-blue-900">
            Class Size
          </span>
        </div>
        <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-5xl">
          Small Classes, Big Impact
        </h2>
        <p className="max-w-2xl text-lg text-gray-600">
          Maximum 3 students per class for optimal learning outcomes
        </p>
      </div>

      <div className="mb-12 grid grid-cols-3 gap-4 border border-gray-200 bg-gray-50 p-6 md:gap-8 md:p-8">
        {[
          { value: '3', label: 'Max Students' },
          { value: '1', label: 'Expert Teacher' },
          { value: '100%', label: 'Attention' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="text-3xl font-bold text-orange-600 md:text-4xl">
              {stat.value}
            </div>
            <div className="mt-1 text-sm text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
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

      <div className="mt-8 border-l-4 border-orange-500 bg-orange-50 p-4">
        <p className="text-sm text-gray-700">
          Unlike traditional classroom settings with 30+ students, our intimate
          learning environment ensures every student receives the attention they
          deserve
        </p>
      </div>
    </section>
  )
}
