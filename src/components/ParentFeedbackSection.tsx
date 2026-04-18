import { motion } from 'framer-motion'
import { CheckCircle2, Clock, MessageSquare, Target } from 'lucide-react'

const feedbackFeatures = [
  {
    icon: MessageSquare,
    title: 'After Every Class',
    description: 'Detailed feedback sent immediately after each lesson',
  },
  {
    icon: CheckCircle2,
    title: 'Progress Updates',
    description: 'What your child learned and areas of improvement',
  },
  {
    icon: Clock,
    title: 'Real-time Communication',
    description: "Stay informed about your child's academic journey",
  },
]

export function ParentFeedbackSection() {
  return (
    <section className="border-t border-gray-200 px-4 py-16 md:px-0 md:py-24">
      <div className="mb-12">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2">
          <MessageSquare className="h-5 w-5 text-green-600" />
          <span className="text-sm font-semibold text-green-900">
            Parent Communication
          </span>
        </div>
        <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-5xl">
          Feedback After Every Class
        </h2>
        <p className="max-w-2xl text-lg text-gray-600">
          We believe in keeping parents informed every step of the way
        </p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {feedbackFeatures.map((feature, index) => (
          <motion.div
            key={index}
            className="border border-gray-200 bg-white p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 inline-flex rounded-lg bg-green-50 p-3">
              <feature.icon className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="border border-gray-200 bg-gray-50 p-6 md:p-8">
        <h3 className="mb-6 text-xl font-semibold text-gray-900">
          What You&apos;ll Receive
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="mb-3 flex items-center gap-2 text-base font-medium text-gray-900">
              📚 Academic Progress
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Topics covered in the lesson</li>
              <li>• Student&apos;s understanding level</li>
              <li>• Areas that need more practice</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 flex items-center gap-2 text-base font-medium text-gray-900">
              <Target className="h-5 w-5 text-green-600" />
              Next Steps
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Homework assignments given</li>
              <li>• Study recommendations</li>
              <li>• Upcoming lesson preview</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
