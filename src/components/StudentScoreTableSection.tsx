import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

interface ScoreData {
  name: string
  subject: string
  before: string
  after: string
  description: string
}

const studentData: ScoreData[] = [
  {
    name: 'Student A',
    subject: 'Chemistry',
    before: 'E8',
    after: 'A1',
    description: 'highest in class',
  },
  {
    name: 'Student B',
    subject: 'Physics',
    before: 'E8',
    after: 'B3',
    description: 'after 4 failed exams, half a mark from A2',
  },
  {
    name: 'Student C',
    subject: 'Chemistry',
    before: 'E8',
    after: 'A1',
    description: 'In the span of 3 months',
  },
  {
    name: 'Student D',
    subject: 'Chemistry',
    before: 'C5',
    after: 'A2',
    description: 'In the span of 3 months',
  },
  {
    name: 'Student E',
    subject: 'Chemistry',
    before: 'F9',
    after: 'B3',
    description: 'In the span of 3 months',
  },
]

const sampleImages = ['/student1.jpg', '/student2.jpg', '/student3.jpg']

export function StudentScoreTableSection() {
  return (
    <section className="border-t border-gray-200 px-4 py-16 md:px-0 md:py-24">
      <div className="mb-12">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          <span className="text-sm font-semibold text-green-900">
            Proven Results
          </span>
        </div>
        <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-5xl">
          Real Students, Real Improvements
        </h2>
        <p className="max-w-2xl text-lg text-gray-600">
          See the tangible impact of our personalized approach
        </p>
      </div>

      {/* Results Table */}
      <motion.div
        className="mb-12 overflow-hidden border border-gray-200 bg-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900 md:px-6 md:py-4">
                Student
              </th>
              <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900 md:px-6 md:py-4">
                Subject
              </th>
              <th className="px-3 py-3 text-center text-sm font-semibold text-gray-900 md:px-6 md:py-4">
                Before
              </th>
              <th className="px-3 py-3 text-center text-sm font-semibold text-gray-900 md:px-6 md:py-4">
                After
              </th>
              <th className="hidden px-3 py-3 text-left text-sm font-semibold text-gray-900 md:table-cell md:px-6 md:py-4">
                Achievement
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {studentData.map((student, index) => (
              <motion.tr
                key={index}
                className="transition-colors hover:bg-gray-50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <td className="px-3 py-3 text-sm font-medium text-gray-900 md:px-6 md:py-4">
                  {student.name}
                </td>
                <td className="px-3 py-3 text-sm text-gray-600 md:px-6 md:py-4">
                  {student.subject}
                </td>
                <td className="px-3 py-3 text-center md:px-6 md:py-4">
                  <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
                    {student.before}
                  </span>
                </td>
                <td className="px-3 py-3 text-center md:px-6 md:py-4">
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                    {student.after}
                  </span>
                </td>
                <td className="hidden px-3 py-3 text-sm text-gray-600 md:table-cell md:px-6 md:py-4">
                  {student.description}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Testimonial Images */}
      <div className="mb-8">
        <h3 className="mb-6 text-xl font-semibold text-gray-900">
          Student Testimonials
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {sampleImages.map((image, index) => (
            <motion.div
              key={index}
              className="h-48 flex-shrink-0 overflow-hidden border border-gray-200 bg-gray-100 md:h-56"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src={image}
                alt={`Student testimonial ${index + 1}`}
                width={200}
                height={224}
                className="h-full w-auto object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="border-l-4 border-green-500 bg-green-50 p-4">
        <p className="text-sm text-gray-700">
          *Results are based on actual student performance. Individual results
          may vary.
        </p>
      </div>
    </section>
  )
}
