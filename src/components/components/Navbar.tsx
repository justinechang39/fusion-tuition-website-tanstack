import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuNavLink,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import useIsMobile from '@/hooks/useIsMobile'
import useScrollDirection from '@/hooks/useScrollDirection'
import { Link, useLocation } from '@tanstack/react-router'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Menu } from 'lucide-react'
import { useRef, useState } from 'react'

export default function Navbar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const scrollDirection = useScrollDirection()
  const navShrink = scrollDirection === 'down'
  const isMobile = useIsMobile()

  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/classes', label: 'Classes' },
    { href: '/about', label: 'About Us' },
    { href: '/connect', label: 'Connect' },
    { href: '/contact', label: 'Contact' },
  ]

  // Reference to the navigation menu for distance calculation
  const navMenuRef = useRef<HTMLDivElement>(null)

  // Orange dot effect
  const dotSize = navShrink ? 9 : 11
  const dotX = useMotionValue(0)
  const dotY = useMotionValue(0)
  const dotSpringX = useSpring(dotX, { stiffness: 100, damping: 10 })
  const dotSpringY = useSpring(dotY, { stiffness: 100, damping: 10 })
  const [isHovering, setIsHovering] = useState(false)

  // Opacity transformation based on distance
  const dotOpacity = useMotionValue(1)

  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top } = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - left + dotSize / 0.5
    const y = e.clientY - top - dotSize / 0.5 - 10
    dotX.set(x)
    dotY.set(y)

    // Calculate distance to nav items
    if (navMenuRef.current) {
      const navRect = navMenuRef.current.getBoundingClientRect()
      const navCenterX = navRect.left + navRect.width / 2
      const navCenterY = navRect.top + navRect.height / 2
      const distance = Math.hypot(
        e.clientX - navCenterX,
        e.clientY - navCenterY,
      )

      // Adjust opacity based on distance (you can tweak the range)
      const maxDistance = 300 // Maximum distance for full opacity
      const minDistance = 200 // Minimum distance to start fading
      const opacity =
        distance < minDistance
          ? 0
          : distance > maxDistance
            ? 1
            : (distance - minDistance) / (maxDistance - minDistance)
      dotOpacity.set(opacity)
    }
  }

  return (
    <header
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`fixed left-0 top-0 z-50 w-full bg-white shadow transition-all duration-300 ${
        navShrink ? 'py-2' : 'py-4'
      }`}
    >
      {/* Orange dot that follows the cursor */}
      {!isMobile && isHovering && (
        <motion.div
          className="pointer-events-none absolute z-40 rounded-full bg-orange-500"
          style={{
            width: dotSize,
            height: dotSize,
            x: dotSpringX,
            y: dotSpringY,
            opacity: dotOpacity,
          }}
        />
      )}
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/">
          <img
            src="/fusion_tuition_logo_horizontal.png"
            alt="Fusion Tuition Logo"
            width={navShrink ? 150 : 200}
            height={navShrink ? 40 : 50}
          />
        </Link>
        {/* Desktop Navigation */}
        <nav
          className="hidden space-x-4 md:flex"
          ref={navMenuRef} // Reference for distance calculation
        >
          <NavigationMenu>
            <NavigationMenuList className="flex items-center">
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuNavLink
                    asChild
                    active={
                      item.href === '/'
                        ? location.pathname === '/'
                        : location.pathname.includes(item.href)
                    }
                  >
                    <Link to={item.href}>{item.label}</Link>
                  </NavigationMenuNavLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] p-0 sm:w-[300px]">
            <div className="flex items-center justify-between border-b p-4">
              <Link to="/">
                <img
                  src="/fusion_tuition_logo_horizontal.png"
                  alt="Fusion Tuition Logo"
                  width={navShrink ? 120 : 150}
                  height={navShrink ? 32 : 40}
                />
              </Link>
            </div>
            <nav className="mt-4">
              <ul className="flex flex-col space-y-2 px-4">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className={`block rounded-md px-4 py-3 text-base font-medium text-gray-700 transition hover:bg-primary/90 hover:text-white ${
                        location.pathname === item.href
                          ? 'bg-primary text-white'
                          : ''
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
