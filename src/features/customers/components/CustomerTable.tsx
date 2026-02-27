import Link from 'next/link'
import { Badge } from '@/shared/components/ui'
import { formatDate } from '@/shared/lib/utils/dates'
import type { Customer } from '@/shared/types'

interface CustomerTableProps {
  customers: (Customer & { contacts?: any[] })[]
}

export function CustomerTable({ customers }: CustomerTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
              Company
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
              Industry
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
              Last Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {customers.map((customer) => {
            const primaryContact = customer.contacts?.[0]
            return (
              <tr key={customer.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <Link href={`/customers/${customer.id}`} className="font-medium text-slate-900 hover:text-slate-700">
                    {customer.company_name}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {customer.city && customer.district ? `${customer.city}, ${customer.district}` : customer.city || '-'}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {customer.industry_type || '-'}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {primaryContact ? (
                    <div>
                      <div>{primaryContact.name}</div>
                      {primaryContact.mobile && (
                        <div className="text-xs text-slate-500">{primaryContact.mobile}</div>
                      )}
                    </div>
                  ) : '-'}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {customer.last_contact_date ? formatDate(customer.last_contact_date) : '-'}
                </td>
                <td className="px-6 py-4">
                  <Badge variant={customer.status === 'active' ? 'success' : 'default'}>
                    {customer.status}
                  </Badge>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
