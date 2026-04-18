import React from 'react'
import Footer from '../Footer'
import { ScrollProgress } from '../ScrollProgress'
import Navbar from './Navbar'
import { NextHeadComponent } from './NextHeadComponent'

interface DefaultLayoutProps {
  children: React.ReactNode
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <NextHeadComponent title="fusion tuition | home" />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        {/* Main Content */}
        <main className="container mx-auto mt-[80px] flex-grow px-4 py-8 pb-32">
          {children}
        </main>
        <Footer />
        <ScrollProgress />
      </div>
    </>
  )
}
