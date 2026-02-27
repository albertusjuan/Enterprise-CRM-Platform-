import Link from 'next/link'
import { getCustomer } from '@/features/customers'
import { CustomerProfile } from '@/features/customers'
import { Button, Badge } from '@/shared/components/ui'
import { getUserProfile } from '@/shared/lib/auth/guards'
import { canEditCustomer } from '@/shared/lib/auth/permissions'
import { formatDate } from '@/shared/lib/utils/dates'

export const revalidate = 30

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { customer, contacts, activities } = await getCustomer(id)
  const { profile } = await getUserProfile()
  const canEdit = canEditCustomer(profile?.role)

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

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <Link href="/customers" className="hover:text-slate-900">Customers</Link>
        <span>/</span>
        <span className="text-slate-900">{customer.company_name}</span>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Customer Details</h1>
        <div className="flex gap-3">
          <Button variant="secondary">Log Activity</Button>
          {canEdit && (
            <Button variant="primary">Edit</Button>
          )}
        </div>
      </div>

      <CustomerProfile customer={customer} contacts={contacts} />

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Activity History</h3>
          <p className="text-sm text-slate-600 mt-1">{activities.length} activities recorded</p>
        </div>
        <div className="p-6">
          {activities.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No activities yet</p>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <span className="text-2xl">{activityIcons[activity.activity_type] || '📋'}</span>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant="default">{activity.activity_type}</Badge>
                        {activity.outcome && (
                          <Badge variant="info" className="ml-2">{activity.outcome}</Badge>
                        )}
                      </div>
                      <span className="text-sm text-slate-500">{formatDate(activity.activity_date)}</span>
                    </div>
                    {activity.contact_person && (
                      <p className="text-sm text-slate-600 mt-2">Contact: {activity.contact_person}</p>
                    )}
                    {activity.notes && (
                      <p className="text-slate-700 mt-2">{activity.notes}</p>
                    )}
                    {activity.next_contact_date && (
                      <p className="text-sm text-amber-600 mt-2">
                        📅 Follow-up: {formatDate(activity.next_contact_date)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
