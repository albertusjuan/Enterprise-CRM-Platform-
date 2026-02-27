import { getDashboardStats, getRecentActivities } from '@/features/dashboard'
import { StatsCard } from '@/features/dashboard/components/StatsCard'
import { QuickActions } from '@/features/dashboard/components/QuickActions'
import { RecentActivityList } from '@/features/dashboard/components/RecentActivityList'
import Link from 'next/link'

export const revalidate = 30

export default async function DashboardPage() {
  const [stats, recentActivities] = await Promise.all([
    getDashboardStats(),
    getRecentActivities(5),
  ])

  const hasOverdue = stats.overdueCount > 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">Welcome to CRM SAM</p>
        </div>
      </div>

      {hasOverdue && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <span className="text-2xl">⚠️</span>
          <div className="flex-1">
            <p className="font-medium text-red-900">You have {stats.overdueCount} overdue follow-up(s)</p>
            <p className="text-sm text-red-700 mt-1">These customers need immediate attention</p>
          </div>
          <Link
            href="/dashboard/follow-ups"
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            View Follow-ups
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon="👥"
          label="Active Customers"
          value={stats.customerCount}
          href="/dashboard/customers"
        />
        <StatsCard
          icon="📋"
          label="Total Activities"
          value={stats.activityCount}
          href="/dashboard/activities"
        />
        <StatsCard
          icon="📞"
          label="Contact Persons"
          value={stats.contactCount}
        />
        <StatsCard
          icon="🔔"
          label="Due Today"
          value={stats.todayCount}
          href="/dashboard/follow-ups"
        />
      </div>

      <QuickActions />

      <RecentActivityList activities={recentActivities} />
    </div>
  )
}
