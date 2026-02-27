import Link from 'next/link'
import { Card, Badge } from '@/shared/components/ui'
import { formatDate } from '@/shared/lib/utils/dates'

interface FollowUpCardProps {
  followUp: {
    id: string
    customer_id: string
    next_contact_date: string
    notes?: string
    customers: {
      company_name: string
      city?: string
      phone?: string
    }
    contacts?: { name?: string; mobile?: string }[]
  }
  variant: 'overdue' | 'today' | 'upcoming'
}

export function FollowUpCard({ followUp, variant }: FollowUpCardProps) {
  const variantStyles = {
    overdue: 'border-red-300 bg-red-50',
    today: 'border-amber-300 bg-amber-50',
    upcoming: 'border-blue-300 bg-blue-50',
  }

  const variantBadges = {
    overdue: { variant: 'danger' as const, label: 'Overdue' },
    today: { variant: 'warning' as const, label: 'Due Today' },
    upcoming: { variant: 'info' as const, label: 'Upcoming' },
  }

  const contact = followUp.contacts?.[0]

  return (
    <Card className={`p-5 hover:shadow-lg transition-shadow ${variantStyles[variant]}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <Link 
            href={`/dashboard/customers/${followUp.customer_id}`}
            className="font-semibold text-slate-900 hover:text-slate-700 text-lg"
          >
            {followUp.customers.company_name}
          </Link>
          {followUp.customers.city && (
            <p className="text-sm text-slate-600 mt-1">📍 {followUp.customers.city}</p>
          )}
        </div>
        <Badge variant={variantBadges[variant].variant}>
          {variantBadges[variant].label}
        </Badge>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <span>📅</span>
          <span className="font-medium">Follow-up Date:</span>
          <span>{formatDate(followUp.next_contact_date)}</span>
        </div>

        {contact && (
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <span>👤</span>
            <span>{contact.name}</span>
            {contact.mobile && <span className="text-slate-500">• {contact.mobile}</span>}
          </div>
        )}

        {followUp.customers.phone && (
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <span>📞</span>
            <span>{followUp.customers.phone}</span>
          </div>
        )}
      </div>

      {followUp.notes && (
        <div className="mb-4 p-3 bg-white/50 rounded-md">
          <p className="text-sm text-slate-700 italic line-clamp-2">{followUp.notes}</p>
        </div>
      )}

      <Link href={`/dashboard/customers/${followUp.customer_id}`}>
        <Button variant="primary" className="w-full">
          View Customer
        </Button>
      </Link>
    </Card>
  )
}
