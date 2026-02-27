import Link from 'next/link'
import { Button } from '@/shared/components/ui'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6">
      <div className="text-6xl mb-4">🔍</div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Page Not Found</h2>
      <p className="text-slate-600 mb-6">The page you are looking for does not exist</p>
      <Link href="/dashboard">
        <Button variant="primary">
          Go to Dashboard
        </Button>
      </Link>
    </div>
  )
}
