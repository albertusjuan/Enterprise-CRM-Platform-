'use client'

import { useEffect } from 'react'
import { Button } from '@/shared/components/ui'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Dashboard error:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-6xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Something went wrong</h2>
      <p className="text-slate-600 mb-6">Failed to load dashboard data</p>
      <Button variant="primary" onClick={reset}>
        Try Again
      </Button>
    </div>
  )
}
