import { createServerSupabaseClient } from '@/shared/lib/supabase/server'
import { cache } from 'react'

export const getReportsData = cache(async () => {
  const supabase = await createServerSupabaseClient()
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  const [totalActivities, recentActivities, activeCustomers, followUpsCount] = await Promise.all([
    supabase.from('activities').select('*', { count: 'exact', head: true }),
    supabase.from('activities').select('*', { count: 'exact', head: true }).gte('activity_date', thirtyDaysAgo),
    supabase.from('customers').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('activities').select('*', { count: 'exact', head: true }).not('next_contact_date', 'is', null),
  ])

  return {
    totalActivities: totalActivities.count || 0,
    recentActivities: recentActivities.count || 0,
    activeCustomers: activeCustomers.count || 0,
    followUpsCount: followUpsCount.count || 0,
  }
})

export const getActivityBreakdown = cache(async () => {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from('activities')
    .select('activity_type')

  if (error) throw error

  const breakdown: Record<string, number> = {}
  data?.forEach((activity) => {
    breakdown[activity.activity_type] = (breakdown[activity.activity_type] || 0) + 1
  })

  const total = data?.length || 0

  return Object.entries(breakdown).map(([type, count]) => ({
    type,
    count,
    percentage: total > 0 ? Math.round((count / total) * 100) : 0,
  }))
})

export const getOutcomeStats = cache(async () => {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from('activities')
    .select('outcome')
    .not('outcome', 'is', null)

  if (error) throw error

  const outcomes: Record<string, number> = {}
  data?.forEach((activity) => {
    if (activity.outcome) {
      outcomes[activity.outcome] = (outcomes[activity.outcome] || 0) + 1
    }
  })

  const total = data?.length || 0

  return Object.entries(outcomes).map(([outcome, count]) => ({
    outcome,
    count,
    percentage: total > 0 ? Math.round((count / total) * 100) : 0,
  }))
})

export const getTopPerformers = cache(async () => {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from('activities')
    .select('user_id')
    .not('user_id', 'is', null)

  if (error) throw error

  const userActivityCounts: Record<string, number> = {}
  data?.forEach((activity) => {
    if (activity.user_id) {
      userActivityCounts[activity.user_id] = (userActivityCounts[activity.user_id] || 0) + 1
    }
  })

  const userIds = Object.keys(userActivityCounts)
  if (userIds.length === 0) return []

  const { data: profiles } = await supabase
    .from('user_profiles')
    .select('id, full_name')
    .in('id', userIds)

  return profiles?.map((profile) => ({
    userId: profile.id,
    userName: profile.full_name,
    activityCount: userActivityCounts[profile.id] || 0,
  }))
    .sort((a, b) => b.activityCount - a.activityCount)
    .slice(0, 10) || []
})
