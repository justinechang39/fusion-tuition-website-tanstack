import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/classes/$slug')({
  beforeLoad: () => {
    throw redirect({ to: '/classes', statusCode: 301 })
  },
})
