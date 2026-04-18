import useIsMobile from '@/hooks/useIsMobile'
import React from 'react'
import { HeroHighlight } from './ui/hero-highlight'
import { Meteors } from './ui/meteors'

interface TeacherCardProps {
  name: string
  experience: string
  subjects: string
  imageSrc: string
  imageOnRight?: boolean
}

const TeacherCard: React.FC<TeacherCardProps> = ({
  name,
  experience,
  subjects,
  imageSrc,
  imageOnRight = false,
}) => {
  const isMobile = useIsMobile()

  const CardContent = () => (
    <div
      className={`flex h-full w-full flex-row items-center p-4 md:p-0 ${
        imageOnRight ? 'md:flex-row-reverse' : ''
      }`}
    >
      <div className="relative h-32 w-32 overflow-hidden rounded-full md:h-full md:w-1/4 md:rounded-none">
        <img
          src={imageSrc}
          alt={name}
          className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
        />
      </div>

      <div
        className={`flex flex-1 flex-col justify-start p-4 md:p-6 ${
          imageOnRight ? 'md:items-end md:text-right' : 'md:text-left'
        }`}
      >
        <h3 className="mb-2 text-2xl font-bold text-gray-800 dark:text-foreground md:text-3xl">
          {name}
        </h3>
        <p className="text-md mb-1 text-gray-600 dark:text-muted-foreground md:text-xl">
          Experience: {experience}
        </p>
        <p className="text-md text-gray-600 dark:text-muted-foreground md:text-xl">
          Subjects: {subjects}
        </p>
      </div>
    </div>
  )

  return (
    <>
      {isMobile ? (
        <div className="via-white-300 relative mb-10 overflow-hidden rounded-2xl bg-gradient-to-tr from-white to-orange-200">
          <div className="relative z-10 flex min-h-[200px] items-center justify-center overflow-hidden rounded-2xl bg-white/50 backdrop-blur-none transition-all duration-300 dark:bg-card/80">
            <CardContent />
          </div>
          <div className="absolute inset-0">
            <Meteors number={10} />
          </div>
        </div>
      ) : (
        <HeroHighlight containerClassName="mb-6">
          <div className="md:min-h relative flex min-h-[200px] flex-col overflow-hidden rounded-2xl transition-all duration-300 dark:bg-card md:flex-row">
            <CardContent />
          </div>
        </HeroHighlight>
      )}
    </>
  )
}

export default TeacherCard
