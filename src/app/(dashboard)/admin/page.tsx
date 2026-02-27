import { requireAdmin } from '@/shared/lib/auth/guards'
import { getAllUsers, getAdminStats } from '@/features/admin'
import { UserList } from '@/features/admin'
import { StatsCard } from '@/features/dashboard/components/StatsCard'

export const revalidate = 30

export default async function AdminPage() {
  await requireAdmin()

  const [users, stats] = await Promise.all([
    getAllUsers(),
    getAdminStats(),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
        <p className="text-slate-600 mt-1">Manage users and system settings</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatsCard
          icon="👥"
          label="Total Users"
          value={stats.total}
        />
        <StatsCard
          icon="⚙️"
          label="Admins"
          value={stats.admins}
        />
        <StatsCard
          icon="📢"
          label="Marketing"
          value={stats.marketing}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-4">User Management</h2>
        <UserList users={users} />
      </div>
    </div>
  )
}
