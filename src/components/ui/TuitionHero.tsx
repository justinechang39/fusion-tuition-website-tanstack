import type { ReactNode } from 'react'
import { HeroHighlight } from './hero-highlight'
import './tuition-hero.css'

export function TuitionHero({
  children,
  className = '',
}: { children: ReactNode; className?: string }) {
  return (
    <HeroHighlight
      containerClassName={`tuition-hero rounded-none px-0 pb-0 ${className}`}
      className="w-full"
    >
      <div className="tuition-mobile-light" aria-hidden="true">
        <div className="tuition-mobile-rays" />
        <div className="tuition-mobile-sphere" />
      </div>
      {children}
    </HeroHighlight>
  )
}
