import { useLocation } from '@tanstack/react-router'
import React from 'react'
import Footer from '../Footer'
import { ScrollProgress } from '../ScrollProgress'
import Navbar from './Navbar'
import { NextHeadComponent } from './NextHeadComponent'

interface DefaultLayoutProps {
  children: React.ReactNode
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const location = useLocation()
  const isFullWidthPage = [
    '/classes',
    '/about',
    '/contact',
    '/blog',
    '/blog/',
  ].includes(location.pathname)

  return (
    <>
      <NextHeadComponent title="fusion tuition | home" />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        {/* Main Content */}
        <main
          className={`${isFullWidthPage ? 'w-full' : 'container'} mx-auto mt-[80px] flex-grow px-4 py-8 pb-32`}
        >
          {children}
        </main>
        <Footer />
        <ScrollProgress />
      </div>
    </>
  )
}
