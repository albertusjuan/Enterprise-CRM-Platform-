import Link from 'next/link'
import { Card, CardHeader, CardBody } from '@/shared/components/ui'

const actions = [
  { label: 'Add Customer', href: '/dashboard/customers?action=add', icon: '➕', color: 'bg-green-100 text-green-700' },
  { label: 'Log Activity', href: '/dashboard/activities?action=add', icon: '📝', color: 'bg-blue-100 text-blue-700' },
  { label: 'View Follow-ups', href: '/dashboard/follow-ups', icon: '🔔', color: 'bg-amber-100 text-amber-700' },
  { label: 'View Reports', href: '/dashboard/reports', icon: '📊', color: 'bg-purple-100 text-purple-700' },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`${action.color} p-4 rounded-lg text-center hover:shadow-md transition-all`}
            >
              <div className="text-2xl mb-2">{action.icon}</div>
              <div className="text-sm font-medium">{action.label}</div>
            </Link>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}
