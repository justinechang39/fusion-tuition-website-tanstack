import { cn } from '@/lib/utils'
import { useNavigate } from '@tanstack/react-router'
import React from 'react'

const gradeCardStyles =
  'relative flex h-full flex-col overflow-hidden rounded-lg cursor-pointer transition-transform hover:bg-primary hover:text-white'

interface GradeCardProps {
  label: string
  href?: string
  description?: string
  imageSrc?: string
  size?: 'small' | 'large'
}

const GradeCard: React.FC<GradeCardProps> = ({
  label,
  href,
  description,
  imageSrc,
  size = 'small',
}) => {
  const navigate = useNavigate()

  return (
    <div
      className={cn(gradeCardStyles, size === 'large' && 'lg:row-span-2')}
      onClick={() => {
        if (href) {
          void navigate({ to: href })
        }
      }}
    >
      {/* Background */}
      <div className="absolute inset-px rounded-lg"></div>
      {/* Content */}
      <div className="relative flex h-full flex-col overflow-hidden rounded-lg">
        {/* Text Content */}
        <div className="px-4 pb-2 pt-4 sm:px-6 sm:pb-4 sm:pt-6">
          <p className="text-xl font-semibold">{label}</p>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {/* Image Content */}
        {imageSrc && (
          <div
            className={cn(
              'flex flex-1 items-center justify-center px-4 sm:px-6',
              size === 'large'
                ? 'relative min-h-[15rem] w-full grow'
                : 'mx-auto max-w-xs',
            )}
          >
            <div className="relative h-full w-full">
              <img
                className="h-full w-full rounded-b-lg object-cover object-center"
                src={imageSrc}
                alt={label}
              />
            </div>
          </div>
        )}
      </div>
      {/* Border and Shadow */}
      <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-ring"></div>
    </div>
  )
}
export default GradeCard
