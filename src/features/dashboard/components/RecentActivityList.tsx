import Link from 'next/link'
import { Card, CardHeader, CardBody, Badge } from '@/shared/components/ui'
import { formatDate } from '@/shared/lib/utils/dates'

interface Activity {
  id: string
  activity_type: string
  activity_date: string
  notes?: string
  customers: {
    company_name: string
  }
}

interface RecentActivityListProps {
  activities: Activity[]
}

const activityIcons: Record<string, string> = {
  call: '📞',
  visit: '🏢',
  meeting: '🤝',
  email: '📧',
  whatsapp: '💬',
  quotation: '💰',
  service: '🔧',
  complaint: '⚠️',
  'follow-up': '🔄',
}

export function RecentActivityList({ activities }: RecentActivityListProps) {
  if (activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">Recent Activities</h3>
        </CardHeader>
        <CardBody>
          <p className="text-slate-500 text-center py-8">No recent activities</p>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Recent Activities</h3>
          <Link href="/activities" className="text-sm text-slate-600 hover:text-slate-900">
            View all →
          </Link>
        </div>
      </CardHeader>
      <CardBody className="p-0">
        <div className="divide-y divide-slate-200">
          {activities.map((activity) => (
            <div key={activity.id} className="px-6 py-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{activityIcons[activity.activity_type] || '📋'}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-slate-900">{activity.customers.company_name}</p>
                      <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                        {activity.notes || 'No notes'}
                      </p>
                    </div>
                    <Badge variant="default" className="whitespace-nowrap">
                      {activity.activity_type}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">{formatDate(activity.activity_date)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}
