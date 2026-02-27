import { FollowUpCard } from './FollowUpCard'
import { EmptyState } from '@/shared/components/feedback/EmptyState'

interface FollowUpsListProps {
  followUps: {
    overdue: any[]
    dueToday: any[]
    upcoming: any[]
    total: number
  }
}

export function FollowUpsList({ followUps }: FollowUpsListProps) {
  if (followUps.total === 0) {
    return (
      <EmptyState
        icon="✅"
        title="All caught up!"
        description="You have no pending follow-ups at the moment."
      />
    )
  }

  return (
    <div className="space-y-8">
      {followUps.overdue.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-semibold text-red-900">Overdue Follow-ups</h2>
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
              {followUps.overdue.length}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {followUps.overdue.map((followUp: any) => (
              <FollowUpCard key={followUp.id} followUp={followUp} variant="overdue" />
            ))}
          </div>
        </div>
      )}

      {followUps.dueToday.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-semibold text-amber-900">Due Today</h2>
            <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
              {followUps.dueToday.length}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {followUps.dueToday.map((followUp: any) => (
              <FollowUpCard key={followUp.id} followUp={followUp} variant="today" />
            ))}
          </div>
        </div>
      )}

      {followUps.upcoming.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-semibold text-blue-900">Upcoming (Next 7 Days)</h2>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {followUps.upcoming.length}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {followUps.upcoming.map((followUp: any) => (
              <FollowUpCard key={followUp.id} followUp={followUp} variant="upcoming" />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
