// HeroSection.tsx
// This file defines the HeroSection component, which serves as the main banner on the homepage.
// It displays an animated headline with the highlighted word "better" to emphasize the mission.
// Framer Motion is used for animation effects to make the entrance of the headline dynamic.
// The component renders differently on desktop and mobile views:
// - On desktop, it uses the HeroHighlight component for the animated headline.
// - On mobile, it displays animated meteor effects using the Meteors component.
// Tailwind CSS classes are utilized for responsive design and styling.

import { motion } from 'framer-motion'
import React from 'react'
import { HeroHighlight, Highlight } from './ui/hero-highlight'
import { Meteors } from './ui/meteors'

const HeroSection: React.FC = () => {
  return (
    <div className="relative">
      {/* Desktop view */}
      <div className="hidden md:block">
        <HeroHighlight>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [20, -5, 0] }}
            transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
            className="mx-auto mb-10 flex min-h-[20rem] max-w-4xl items-center justify-center gap-3 px-4 text-center text-2xl font-bold leading-relaxed text-neutral-700 dark:text-white md:min-h-[40rem] md:text-4xl lg:text-5xl lg:leading-snug"
          >
            In pursuit of{' '}
            <Highlight className="bg-gradient-to-r from-pink-300 to-orange-300 text-black dark:text-white">
              better
            </Highlight>
          </motion.h1>
        </HeroHighlight>
      </div>

      {/* Mobile view */}
      <div className="relative block overflow-hidden md:hidden">
        <div className="relative z-10 mx-auto mb-10 flex min-h-[20rem] max-w-4xl items-center justify-center gap-3 px-4 text-center text-2xl font-bold leading-relaxed text-neutral-700 dark:text-white">
          In pursuit of{' '}
          <Highlight className="bg-gradient-to-r from-pink-300 to-orange-300 text-black dark:text-white">
            better
          </Highlight>
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <Meteors number={10} />
        </div>
      </div>
    </div>
  )
}

export default HeroSection
