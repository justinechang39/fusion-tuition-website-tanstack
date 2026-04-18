import React from 'react'

interface NextHeadComponentProps {
  title: string
  description?: string
  image?: string
  url?: string
  children?: React.ReactNode
}

export function NextHeadComponent({ children }: NextHeadComponentProps) {
  return <>{children ?? null}</>
}
