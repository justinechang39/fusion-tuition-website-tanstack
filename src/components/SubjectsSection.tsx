import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'

const igcseSubjects = [
  { name: 'International Math', code: '0607' },
  { name: 'Additional Mathematics', code: '0606' },
  { name: 'Chemistry', code: '0620' },
  { name: 'Physics', code: '0625' },
]

const oLevelSubjects = [
  { name: 'Physics', code: '6091' },
  { name: 'Chemistry', code: '6092' },
  { name: 'Additional Mathematics', code: '4049' },
]

const aLevelSubjects = [
  { name: 'Chemistry', code: '9729' },
  { name: 'Physics', code: '9749' },
]

const ibSubjects = [
  { name: 'Mathematics', code: 'HL/SL' },
  { name: 'Chemistry', code: 'HL/SL' },
]

export function SubjectsSection() {
  return (
    <section className="border-t border-gray-200 px-4 py-16 md:px-0 md:py-24">
      <div className="mb-12">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2">
          <GraduationCap className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-semibold text-blue-900">
            What We Teach
          </span>
        </div>
        <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-5xl">
          Subjects We Teach
        </h2>
        <p className="max-w-2xl text-lg text-gray-600">
          Comprehensive tuition for IGCSE, GCE O Level, A Level, and IB subjects
          with curriculum-focused teaching.
        </p>
      </div>

      <div className="mb-12">
        <h3 className="mb-6 text-2xl font-bold text-gray-900">
          IGCSE Curriculum
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {igcseSubjects.map((subject, index) => (
            <motion.div
              key={subject.code}
              className="relative border border-gray-200 bg-white p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="absolute right-4 top-4">
                <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800">
                  {subject.code}
                </span>
              </div>
              <h4 className="pr-16 text-lg font-semibold text-gray-900">
                {subject.name}
              </h4>
              <p className="mt-2 text-sm text-gray-600">Cambridge IGCSE</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h3 className="mb-6 text-2xl font-bold text-gray-900">
          GCE O Level Curriculum
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {oLevelSubjects.map((subject, index) => (
            <motion.div
              key={subject.code}
              className="relative border border-gray-200 bg-white p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="absolute right-4 top-4">
                <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-800">
                  {subject.code}
                </span>
              </div>
              <h4 className="pr-16 text-lg font-semibold text-gray-900">
                {subject.name}
              </h4>
              <p className="mt-2 text-sm text-gray-600">
                Singapore-Cambridge GCE O Level
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h3 className="mb-6 text-2xl font-bold text-gray-900">
          A Level Curriculum
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aLevelSubjects.map((subject, index) => (
            <motion.div
              key={subject.code}
              className="relative border border-gray-200 bg-white p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="absolute right-4 top-4">
                <span className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-800">
                  {subject.code}
                </span>
              </div>
              <h4 className="pr-16 text-lg font-semibold text-gray-900">
                {subject.name}
              </h4>
              <p className="mt-2 text-sm text-gray-600">
                Cambridge International A Level
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-6 text-2xl font-bold text-gray-900">IB Curriculum</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {ibSubjects.map((subject, index) => (
            <motion.div
              key={subject.name}
              className="relative border border-gray-200 bg-white p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="absolute right-4 top-4">
                <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-800">
                  {subject.code}
                </span>
              </div>
              <h4 className="pr-16 text-lg font-semibold text-gray-900">
                {subject.name}
              </h4>
              <p className="mt-2 text-sm text-gray-600">
                International Baccalaureate
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
