// This component displays the core services offered by Fusion Tuition.
// Shows Physics, Chemistry, and Mathematics tuition with curriculum levels.

import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import React from 'react'
import { FaAtom, FaCalculator, FaFlask } from 'react-icons/fa'

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: FaAtom,
      title: 'Physics Tuition',
      description: 'IGCSE, O Level, A Level',
      color: 'blue',
    },
    {
      icon: FaFlask,
      title: 'Chemistry Tuition',
      description: 'IGCSE, O Level, A Level, IB',
      color: 'purple',
    },
    {
      icon: FaCalculator,
      title: 'Mathematics Tuition',
      description: 'IGCSE, O Level, A Level, IB',
      color: 'orange',
    },
  ]

  return (
    <section className="border-t border-gray-200 px-4 py-16 md:px-0 md:py-24">
      <div className="mb-12">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2">
          <Sparkles className="h-5 w-5 text-orange-600" />
          <span className="text-sm font-semibold text-orange-900">
            Our Services
          </span>
        </div>
        <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-5xl">
          What We Offer
        </h2>
        <p className="max-w-2xl text-lg text-gray-600">
          Expert tuition in core science and mathematics subjects across all
          major curricula.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Link
              to="/contact"
              className="group block border border-gray-200 bg-white p-6 transition-all duration-300 hover:shadow-lg"
            >
              <div
                className={`mb-4 inline-flex rounded-lg bg-${service.color}-50 p-3`}
              >
                <service.icon className={`h-6 w-6 text-${service.color}-600`} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600">{service.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default ServicesSection
