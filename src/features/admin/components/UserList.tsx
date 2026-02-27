import Link from 'next/link'
import { Badge } from '@/shared/components/ui'
import { formatDate } from '@/shared/lib/utils/dates'

interface User {
  id: string
  full_name: string
  email: string
  role: 'admin' | 'marketing'
  is_active: boolean
  created_at: string
}

interface UserListProps {
  users: User[]
}

export function UserList({ users }: UserListProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">{user.full_name}</div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {user.email}
                </td>
                <td className="px-6 py-4">
                  <Badge variant={user.role === 'admin' ? 'warning' : 'info'}>
                    {user.role}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={user.is_active ? 'success' : 'default'}>
                    {user.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {formatDate(user.created_at)}
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/users/${user.id}`}
                    className="text-slate-700 hover:text-slate-900 text-sm font-medium"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
