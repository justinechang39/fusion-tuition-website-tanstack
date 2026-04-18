'use client'
import { cn } from '@/lib/utils'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import React from 'react'

export const HeroHighlight = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode
  className?: string
  containerClassName?: string
}) => {
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)

  function handlePointerMove({
    currentTarget,
    clientX,
    clientY,
  }: React.PointerEvent<HTMLDivElement>) {
    if (!currentTarget) return
    const { left, top } = currentTarget.getBoundingClientRect()

    pointerX.set(clientX - left)
    pointerY.set(clientY - top)
  }

  return (
    <div
      className={cn(
        'group relative flex w-full items-center justify-center rounded-xl bg-gradient-to-t from-white to-gray-100 px-1 pb-1 dark:bg-black dark:from-indigo-500',
        containerClassName,
      )}
      onPointerMove={handlePointerMove}
    >
      <div className="pointer-events-none absolute inset-0 bg-dot-thick-white/40 dark:bg-dot-thick-neutral-800" />
      <motion.div
        className="dark:bg-dot-orange-orange-500 pointer-events-none absolute inset-0 opacity-0 transition duration-300 bg-dot-thick-orange-500 group-hover:opacity-100"
        style={{
          WebkitMaskImage: useMotionTemplate`
                radial-gradient(
                  73px circle at ${pointerX}px ${pointerY}px,
                  black 100%,
                  transparent 100%
                )
              `,
          maskImage: useMotionTemplate`
                radial-gradient(
                  73px circle at ${pointerX}px ${pointerY}px,
                  black 100%,
                  transparent 100%
                )
              `,
        }}
      />

      <div className={cn('relative z-20', className)}>{children}</div>
    </div>
  )
}

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <motion.span
      initial={{
        backgroundSize: '0% 100%',
      }}
      animate={{
        backgroundSize: '100% 100%',
      }}
      transition={{
        duration: 1,
        ease: 'anticipate',
        delay: 0.5,
      }}
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        display: 'inline',
      }}
      className={cn(
        `relative inline-block rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 px-1 dark:from-indigo-500 dark:to-purple-500 md:px-5`,
        className,
      )}
    >
      {children}
    </motion.span>
  )
}
