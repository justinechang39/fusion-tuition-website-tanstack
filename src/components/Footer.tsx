// Footer.tsx
// This file defines the Footer component, which appears at the bottom of the website.
// The Footer becomes visible when the user scrolls near the bottom of the page and hides when scrolling up.
// It displays the current year, the company name "fusion tuition", and a message "Made with 🧡 by the founders".
// React hooks like useState and useEffect are used to manage the visibility based on the scroll position.
// Tailwind CSS classes are applied for styling and smooth transition effects.

import { useEffect, useState } from 'react'

export default function Footer() {
  const [showFooter, setShowFooter] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  const controlFooter = () => {
    if (typeof window !== 'undefined') {
      const scrollY = window.scrollY || window.pageYOffset
      const scrollHeight = document.body.scrollHeight
      const windowHeight = window.innerHeight

      if (scrollY + windowHeight >= scrollHeight - 50) {
        // User is near the bottom of the page
        setShowFooter(true)
      } else if (scrollY < lastScrollY) {
        // User is scrolling up
        setShowFooter(false)
      }

      setLastScrollY(scrollY)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlFooter)

      return () => {
        window.removeEventListener('scroll', controlFooter)
      }
    }
  }, [lastScrollY])

  return (
    <footer
      className={`fixed bottom-0 left-0 right-0 transform transition-transform duration-300 ${
        showFooter ? 'translate-y-0' : 'translate-y-full'
      } flex flex-col items-center justify-center bg-primary py-2 text-primary-foreground`}
    >
      <div className="container mx-auto px-4 text-center text-sm">
        © {new Date().getFullYear()} fusion tuition. All rights reserved.
      </div>
      <div className="container mx-auto px-4 text-center text-sm">
        Made with 🧡 by the founders
      </div>
    </footer>
  )
}
