<<<<<<< HEAD
export default function FollowUpsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Follow-ups</h1>
      <p className="text-slate-600 mt-1">Follow-up tracking coming soon</p>
=======
import { getFollowUps } from '@/features/follow-ups'
import { FollowUpsList } from '@/features/follow-ups'

export const revalidate = 30

export default async function FollowUpsPage() {
  const followUps = await getFollowUps()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Follow-ups</h1>
          <p className="text-slate-600 mt-1">
            {followUps.total} customer{followUps.total !== 1 ? 's' : ''} need{followUps.total === 1 ? 's' : ''} attention
          </p>
        </div>
      </div>

      {followUps.overdue.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="font-medium text-red-900">
                {followUps.overdue.length} overdue follow-up{followUps.overdue.length !== 1 ? 's' : ''}
              </p>
              <p className="text-sm text-red-700 mt-1">These customers require immediate attention</p>
            </div>
          </div>
        </div>
      )}

      <FollowUpsList followUps={followUps} />
>>>>>>> feat/follow-ups
    </div>
  )
}
