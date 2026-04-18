'use client'

import { cn } from '@/lib/utils'

interface ShineBorderProps {
  borderRadius?: number
  borderWidth?: number
  duration?: number
  className?: string
  children: React.ReactNode
}

export default function ShineBorder({
  borderRadius = 8,
  borderWidth = 1,
  duration = 14,
  className,
  children,
}: ShineBorderProps) {
  return (
    <div
      style={
        {
          '--border-radius': `${borderRadius}px`,
        } as React.CSSProperties
      }
      className={cn('relative w-full rounded-[--border-radius]', className)}
    >
      <div
        style={
          {
            '--border-width': `${borderWidth}px`,
            '--border-radius': `${borderRadius}px`,
            '--duration': `${duration}s`,
            '--mask-linear-gradient': `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            '--background-linear-gradient': `conic-gradient(from 0deg, #ff6b6b, #feca57, #ff9ff3, #48cae4, #ff6b6b, #feca57)`,
          } as React.CSSProperties
        }
        className={`before:pointer-events-none before:absolute before:inset-0 before:rounded-[--border-radius] before:p-[--border-width] before:will-change-[background-position] before:content-[''] before:![-webkit-mask-composite:xor] before:[background-image:var(--background-linear-gradient)] before:[background-size:300%_100%] before:![mask-composite:exclude] before:[mask:var(--mask-linear-gradient)] motion-safe:before:animate-shine`}
      ></div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
