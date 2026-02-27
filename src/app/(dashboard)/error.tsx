'use client'

import { useEffect } from 'react'
import { Button } from '@/shared/components/ui'

export default function DashboardLayoutError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Dashboard layout error:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6">
      <div className="text-6xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Application Error</h2>
      <p className="text-slate-600 mb-6">Something went wrong loading the application</p>
      <Button variant="primary" onClick={reset}>
        Try Again
      </Button>
    </div>
  )
}
