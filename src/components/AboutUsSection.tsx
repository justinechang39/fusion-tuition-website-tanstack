'use client'
import { motion } from 'framer-motion'
import React from 'react'

const AboutUsSection: React.FC = () => {
  return (
    <section className="relative mb-10 flex flex-col items-center justify-center overflow-hidden rounded-2xl px-4 py-16 md:flex-row md:px-20">
      {/* Background Gradient */}
      <div className="via-white-300 absolute inset-0 bg-gradient-to-b from-white to-orange-200 opacity-30" />

      {/* ABOUT US Heading */}
      <div className="z-10 flex w-full justify-center md:w-1/2 md:justify-start">
        <motion.h2
          className="mb-6 text-xl font-bold text-gray-900 md:mb-0 md:text-4xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          About Us
        </motion.h2>
      </div>

      {/* Divider */}
      <div className="z-10 mx-8 hidden h-32 w-px bg-gray-300 md:block"></div>

      {/* Description */}
      <div className="z-10 mt-6 w-full md:mt-0 md:w-1/2">
        <motion.p
          className="text-lg text-gray-800 md:ml-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          At Fusion Tuition, we are dedicated to providing top-notch education
          to help students excel academically.
        </motion.p>
      </div>
    </section>
  )
}

export default AboutUsSection
