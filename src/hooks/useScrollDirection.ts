import { useEffect, useState } from 'react'

export default function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(
    null,
  )

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setScrollDirection('down')
      } else if (window.scrollY < lastScrollY) {
        setScrollDirection('up')
      }
      lastScrollY = window.scrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollDirection
}
