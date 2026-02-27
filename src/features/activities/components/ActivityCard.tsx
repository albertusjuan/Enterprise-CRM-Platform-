import { Badge } from '@/shared/components/ui'
import { formatDate } from '@/shared/lib/utils/dates'
import { getActivityTypeInfo, getOutcomeInfo } from '../constants'
import type { Activity } from '@/shared/types'

interface ActivityCardProps {
  activity: Activity & { customers?: { company_name: string } }
  showCustomer?: boolean
}

export function ActivityCard({ activity, showCustomer = false }: ActivityCardProps) {
  const typeInfo = getActivityTypeInfo(activity.activity_type)
  const outcomeInfo = activity.outcome ? getOutcomeInfo(activity.outcome) : null

  return (
    <div className="flex gap-4 p-4 bg-white border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
      <div className="flex-shrink-0">
        <div className={`w-12 h-12 rounded-lg ${typeInfo.color} flex items-center justify-center text-2xl`}>
          {typeInfo.icon}
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <Badge variant="default">{typeInfo.label}</Badge>
            {outcomeInfo && (
              <Badge variant="info" className="ml-2">{outcomeInfo.label}</Badge>
            )}
          </div>
          <span className="text-sm text-slate-500 whitespace-nowrap">{formatDate(activity.activity_date)}</span>
        </div>

        {showCustomer && activity.customers && (
          <p className="font-medium text-slate-900 mb-1">{activity.customers.company_name}</p>
        )}

        {activity.contact_person && (
          <p className="text-sm text-slate-600 mb-2">Contact: {activity.contact_person}</p>
        )}

        {activity.notes && (
          <p className="text-slate-700 text-sm line-clamp-2">{activity.notes}</p>
        )}

        {activity.next_contact_date && (
          <div className="mt-2 flex items-center gap-2 text-sm text-amber-600">
            <span>📅</span>
            <span>Follow-up: {formatDate(activity.next_contact_date)}</span>
          </div>
        )}
      </div>
    </div>
  )
}
