'use client'

import { useEffect } from 'react'
import { Button } from '@/shared/components/ui'

export default function CustomersError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Customers error:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-6xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Failed to load customers</h2>
      <p className="text-slate-600 mb-6">There was an error loading the customer list</p>
      <Button variant="primary" onClick={reset}>
        Try Again
      </Button>
    </div>
  )
}
