import Link from 'next/link'
import { Card, Badge } from '@/shared/components/ui'
import { formatDate } from '@/shared/lib/utils/dates'
import type { Customer } from '@/shared/types'

interface CustomerCardsProps {
  customers: (Customer & { contacts?: any[] })[]
}

export function CustomerCards({ customers }: CustomerCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {customers.map((customer) => {
        const primaryContact = customer.contacts?.[0]
        return (
          <Link key={customer.id} href={`/dashboard/customers/${customer.id}`}>
            <Card className="p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-1">{customer.company_name}</h3>
                  <p className="text-sm text-slate-600">
                    {customer.city && customer.district ? `${customer.city}, ${customer.district}` : customer.city || 'No location'}
                  </p>
                </div>
                <Badge variant={customer.status === 'active' ? 'success' : 'default'}>
                  {customer.status}
                </Badge>
              </div>

              {customer.industry_type && (
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                  <span>🏭</span>
                  <span>{customer.industry_type}</span>
                </div>
              )}

              {primaryContact && (
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                  <span>👤</span>
                  <span>{primaryContact.name}</span>
                  {primaryContact.mobile && <span className="text-slate-400">• {primaryContact.mobile}</span>}
                </div>
              )}

              {customer.last_contact_date && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span>📅</span>
                  <span>Last contact: {formatDate(customer.last_contact_date)}</span>
                </div>
              )}
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
