import { createServerSupabaseClient } from '@/shared/lib/supabase/server'
import { cache } from 'react'

export const getDashboardStats = cache(async () => {
  const supabase = await createServerSupabaseClient()
  const today = new Date().toISOString().split('T')[0]

  const [customerCount, activityCount, contactCount] = await Promise.all([
    supabase.from('customers').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('activities').select('*', { count: 'exact', head: true }),
    supabase.from('contacts').select('*', { count: 'exact', head: true }),
  ])

  const { data: followUps } = await supabase
    .from('activities')
    .select('customer_id, next_contact_date')
    .not('next_contact_date', 'is', null)
    .lte('next_contact_date', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])

  const uniqueCustomers = new Map()
  followUps?.forEach(f => {
    const existing = uniqueCustomers.get(f.customer_id)
    if (!existing || f.next_contact_date! < existing) {
      uniqueCustomers.set(f.customer_id, f.next_contact_date)
    }
  })

  const overdueCount = Array.from(uniqueCustomers.values()).filter(date => date < today).length
  const todayCount = Array.from(uniqueCustomers.values()).filter(date => date === today).length

  return {
    customerCount: customerCount.count || 0,
    activityCount: activityCount.count || 0,
    contactCount: contactCount.count || 0,
    overdueCount,
    todayCount,
  }
})

export const getRecentActivities = cache(async (limit = 5) => {
  const supabase = await createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('activities')
    .select('*, customers!inner(company_name)')
    .order('activity_date', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data || []
})
