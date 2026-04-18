import React from 'react'
import SpotlightCard from './SpotlightCard'

interface WhyChooseUsCardProps {
  title: string
  description: string
}

const WhyChooseUsCard: React.FC<WhyChooseUsCardProps> = ({
  title,
  description,
}) => {
  return (
    <div className="relative mb-6">
      <SpotlightCard
        className="relative h-full rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow duration-300 dark:bg-card md:p-8"
        spotlightColor="rgba(255, 127, 20, 0.8)"
      >
        <h3 className="mb-4 text-xl font-semibold text-black dark:text-foreground md:text-2xl">
          {title}
        </h3>
        <p className="leading-relaxed text-gray-700 dark:text-muted-foreground">
          {description}
        </p>
      </SpotlightCard>
    </div>
  )
}

export default WhyChooseUsCard
