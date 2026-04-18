// This file defines the dynamic route for class pages based on the slug.
// It fetches class data using getStaticProps based on the slug and renders the class page.

import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export default function ClassPage() {
  const navigate = useNavigate()

  useEffect(() => {
    void navigate({ to: '/classes', replace: true })
  }, [navigate])

  return null
}
