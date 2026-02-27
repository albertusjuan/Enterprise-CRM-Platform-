import { Card, CardHeader, CardBody, Badge } from '@/shared/components/ui'
import { formatDate } from '@/shared/lib/utils/dates'
import type { Customer, Contact } from '@/shared/types'

interface CustomerProfileProps {
  customer: Customer
  contacts: Contact[]
}

export function CustomerProfile({ customer, contacts }: CustomerProfileProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{customer.company_name}</h2>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={customer.status === 'active' ? 'success' : 'default'}>
                {customer.status}
              </Badge>
              {customer.industry_type && (
                <span className="text-sm text-slate-600">• {customer.industry_type}</span>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 mb-3">Company Details</h3>
            
            {customer.city && (
              <div>
                <span className="text-sm text-slate-500">Location</span>
                <p className="text-slate-900">
                  {customer.city}{customer.district && `, ${customer.district}`}
                </p>
              </div>
            )}

            {customer.address && (
              <div>
                <span className="text-sm text-slate-500">Address</span>
                <p className="text-slate-900">{customer.address}</p>
              </div>
            )}

            {customer.phone && (
              <div>
                <span className="text-sm text-slate-500">Phone</span>
                <p className="text-slate-900">{customer.phone}</p>
              </div>
            )}

            {customer.email && (
              <div>
                <span className="text-sm text-slate-500">Email</span>
                <p className="text-slate-900">{customer.email}</p>
              </div>
            )}

            {customer.machine_type && (
              <div>
                <span className="text-sm text-slate-500">Machine Type</span>
                <p className="text-slate-900">{customer.machine_type}</p>
              </div>
            )}

            {customer.last_contact_date && (
              <div>
                <span className="text-sm text-slate-500">Last Contact</span>
                <p className="text-slate-900">{formatDate(customer.last_contact_date)}</p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 mb-3">Contact Persons</h3>
            
            {contacts.length > 0 ? (
              <div className="space-y-3">
                {contacts.map((contact) => (
                  <div key={contact.id} className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-slate-900">{contact.name}</span>
                      {contact.is_primary && (
                        <Badge variant="info">Primary</Badge>
                      )}
                    </div>
                    {contact.role && (
                      <p className="text-sm text-slate-600">{contact.role}</p>
                    )}
                    {contact.mobile && (
                      <p className="text-sm text-slate-600">📱 {contact.mobile}</p>
                    )}
                    {contact.email && (
                      <p className="text-sm text-slate-600">📧 {contact.email}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">No contacts added</p>
            )}
          </div>
        </div>

        {customer.notes && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">Notes</h3>
            <p className="text-slate-700 whitespace-pre-wrap">{customer.notes}</p>
          </div>
        )}
      </CardBody>
    </Card>
  )
}
