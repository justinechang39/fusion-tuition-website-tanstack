import { motion } from 'framer-motion'
import { BookOpen, Brain, Target, TrendingUp } from 'lucide-react'

const features = [
  {
    icon: Target,
    title: 'Targeted Practice',
    description:
      'Questions specifically selected for chapters where you need the most improvement',
  },
  {
    icon: Brain,
    title: 'Conceptual Understanding',
    description:
      'Exercises designed to strengthen fundamental concepts before advancing to complex problems',
  },
  {
    icon: BookOpen,
    title: 'Exam-Style Questions',
    description:
      'Practice with questions that mirror actual exam formats and difficulty levels',
  },
  {
    icon: TrendingUp,
    title: 'Progressive Difficulty',
    description:
      'Gradual increase in complexity to build confidence and mastery step by step',
  },
]

export function CustomizedExercisesSection() {
  return (
    <section className="border-t border-gray-200 px-4 py-16 md:px-0 md:py-24">
      <div className="mb-12">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2">
          <Target className="h-5 w-5 text-purple-600" />
          <span className="text-sm font-semibold text-purple-900">
            Personalized Learning
          </span>
        </div>
        <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-5xl">
          Customized Exercises for Every Student
        </h2>
        <p className="max-w-2xl text-lg text-gray-600">
          We curate questions for chapters that students are weak at for more
          targeted studying, ensuring every minute spent learning counts towards
          real improvement
        </p>
      </div>

      <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="border border-gray-200 bg-white p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 inline-flex rounded-lg bg-purple-50 p-3">
              <feature.icon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="border border-gray-200 bg-gray-50 p-6 md:p-8">
        <h3 className="mb-8 text-xl font-semibold text-gray-900">
          How Our Customization Works
        </h3>
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {[
            {
              step: '1',
              title: 'Assessment',
              description: 'Initial evaluation to identify weak areas',
            },
            {
              step: '2',
              title: 'Curation',
              description: 'Personalized question sets for each student',
            },
            {
              step: '3',
              title: 'Progress Tracking',
              description: 'Continuous monitoring and adjustment',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-3 text-4xl font-bold text-purple-600">
                {item.step}
              </div>
              <h4 className="mb-2 text-base font-semibold text-gray-900">
                {item.title}
              </h4>
              <p className="text-sm text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
