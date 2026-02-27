<<<<<<< HEAD
export default function ReportsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Reports</h1>
      <p className="text-slate-600 mt-1">Reports and analytics coming soon</p>
=======
import { getReportsData, getActivityBreakdown, getOutcomeStats, getTopPerformers } from '@/features/reports'
import { StatsCard } from '@/features/dashboard/components/StatsCard'
import { ActivityBreakdown } from '@/features/reports/components/ActivityBreakdown'
import { OutcomeStats } from '@/features/reports/components/OutcomeStats'
import { TopPerformers } from '@/features/reports/components/TopPerformers'

export const revalidate = 60

export default async function ReportsPage() {
  const [stats, activityBreakdown, outcomeStats, topPerformers] = await Promise.all([
    getReportsData(),
    getActivityBreakdown(),
    getOutcomeStats(),
    getTopPerformers(),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Reports & Analytics</h1>
        <p className="text-slate-600 mt-1">Overview of system activity and performance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon="📋"
          label="Total Activities"
          value={stats.totalActivities}
        />
        <StatsCard
          icon="📅"
          label="Last 30 Days"
          value={stats.recentActivities}
        />
        <StatsCard
          icon="👥"
          label="Active Customers"
          value={stats.activeCustomers}
        />
        <StatsCard
          icon="🔔"
          label="Pending Follow-ups"
          value={stats.followUpsCount}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityBreakdown breakdown={activityBreakdown} />
        <OutcomeStats outcomes={outcomeStats} />
      </div>

      <TopPerformers performers={topPerformers} />
>>>>>>> feat/reports
    </div>
  )
}
