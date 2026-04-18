import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useState } from 'react'
import GradeCard from './GradeCard'
import SparklesText from './ui/sparkles-text'

interface Grade {
  label: string
  href?: string
  description?: string
  imageSrc?: string
  size?: 'small' | 'large'
}

interface SubjectClassesSectionProps {
  subject: string
  slug: string
  description?: string
  grades?: Grade[]
  renderFooter?: () => React.ReactNode
  ctaText?: string
  isTBA?: boolean
  showExpandable?: boolean
}

const SubjectClassesSection: React.FC<SubjectClassesSectionProps> = ({
  subject,
  slug,
  description,
  grades,
  renderFooter,
  ctaText,
  isTBA,
  showExpandable = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const renderContent = () => (
    <>
      {/* Grade Cards Grid */}
      {grades && grades.length > 0 && (
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          {grades.map((grade, index) => (
            <GradeCard
              key={index}
              label={grade.label}
              href={grade.href}
              description={grade.description}
              imageSrc={grade.imageSrc}
              size={grade.size}
            />
          ))}
        </div>
      )}

      {/* Render Footer if provided */}
      {renderFooter && <div className="mt-6">{renderFooter()}</div>}
    </>
  )

  return (
    <section className={cn('gradient-section', 'relative overflow-hidden')}>
      <div className="mx-auto max-w-4xl lg:max-w-7xl">
        {/* Subject Heading */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground md:text-3xl">
            {subject}
          </h2>
          {!isTBA && description && (
            <p className="md:text-md mt-2 text-sm text-gray-500">
              {description}
            </p>
          )}
        </div>

        {/* TBA Notice */}
        {isTBA ? (
          <div className="align-center mt-10 justify-center text-center">
            <SparklesText
              text="To be announced"
              className="text-sm font-normal text-gray-700"
              sparklesCount={3}
            />
          </div>
        ) : (
          <>
            {showExpandable ? (
              <>
                {/* Collapsible Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      variants={{
                        expanded: { opacity: 1, height: 'auto' },
                        collapsed: { opacity: 0, height: 0 },
                      }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      {renderContent()}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Collapse Toggle Button and CTA Button */}
                <div className="mt-4 flex items-center">
                  {/* Left Spacer */}
                  <div
                    className={`hidden sm:block ${ctaText ? 'w-1/3' : 'w-1/2'}`}
                  ></div>

                  {/* Chevron Button */}
                  <div className="flex flex-1 justify-center">
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="flex h-12 w-12 items-center justify-center rounded-full text-primary transition-colors duration-200 hover:bg-primary hover:text-white"
                    >
                      {isExpanded ? (
                        <ChevronUp className="h-8 w-8" />
                      ) : (
                        <ChevronDown className="h-8 w-8" />
                      )}
                    </button>
                  </div>

                  {/* Right Spacer or CTA Button */}
                  {ctaText ? (
                    <div className="hidden w-1/3 justify-end sm:flex">
                      <Link to="/classes/$slug" params={{ slug }}>
                        <Button>{ctaText}</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="hidden w-1/2 sm:block"></div>
                  )}
                </div>
              </>
            ) : (
              // When showExpandable is false, render content directly
              renderContent()
            )}

            {/* CTA Button on Mobile */}
            {ctaText && (
              <div className="mt-4 sm:hidden">
                <Link to="/classes/$slug" params={{ slug }}>
                  <Button className="w-full">{ctaText}</Button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default SubjectClassesSection
