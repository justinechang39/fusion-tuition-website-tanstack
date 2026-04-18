import { motion } from 'framer-motion'
import { Award, CheckCircle2, Globe, Users } from 'lucide-react'

const studentTypes = [
  {
    code: 'IB',
    name: 'IB Programme',
    description: 'International Baccalaureate curriculum guidance',
    icon: Globe,
  },
  {
    code: 'A Level',
    name: 'A Level Programme',
    description: 'Advanced level support for A Level students',
    icon: Globe,
  },
  {
    code: 'IGCSE',
    name: 'IGCSE Programme',
    description: 'International curriculum support for IGCSE students',
    icon: Globe,
  },
  {
    code: 'IP',
    name: 'Integrated Programme',
    description: 'Tailored guidance for IP students with unique curricula',
    icon: Award,
  },
  {
    code: 'Express',
    name: 'Express Stream',
    description: 'Advanced preparation for Express stream students',
    icon: Award,
  },
  {
    code: 'NA',
    name: 'Normal (Academic)',
    description: 'Comprehensive support for Normal Academic stream students',
    icon: Award,
  },
  {
    code: 'NT',
    name: 'Normal (Technical)',
    description: 'Specialized approach for Normal Technical stream learners',
    icon: Award,
  },
]

export function StudentTypesSection() {
  return (
    <section className="border-t border-gray-200 px-4 py-16 md:px-0 md:py-24">
      <div className="mb-12">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2">
          <Users className="h-5 w-5 text-purple-600" />
          <span className="text-sm font-semibold text-purple-900">
            Who We Teach
          </span>
        </div>
        <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-5xl">
          We Welcome All Students
        </h2>
        <p className="max-w-2xl text-lg text-gray-600">
          Inclusive learning environment for students from all academic streams
          and programmes
        </p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {studentTypes.map((type, index) => (
          <motion.div
            key={index}
            className="border border-gray-200 bg-white p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 inline-flex rounded-lg bg-blue-50 p-3">
              <type.icon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="mb-2 text-lg font-bold text-gray-900">
              {type.code}
            </div>
            <h3 className="mb-2 font-semibold text-gray-900">{type.name}</h3>
            <p className="text-sm text-gray-600">{type.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="mb-8 border border-gray-200 bg-gray-50 p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Our Inclusive Approach
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Curriculum-specific teaching methods for each stream</li>
            <li>• Appropriate pace and difficulty levels</li>
          </ul>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Stream-relevant exam preparation strategies</li>
            <li>• Individual attention within small group settings</li>
          </ul>
        </div>
      </div>

      <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
        <div className="flex items-center">
          <CheckCircle2 className="mr-2 h-5 w-5 text-purple-600" />
          <span className="text-sm font-medium text-gray-700">
            All Students Welcome • No Prerequisites Required
          </span>
        </div>
      </div>
    </section>
  )
}
