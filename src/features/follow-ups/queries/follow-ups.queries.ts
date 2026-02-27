import { createServerSupabaseClient } from '@/shared/lib/supabase/server'
import { cache } from 'react'

export const getFollowUps = cache(async () => {
  const supabase = await createServerSupabaseClient()
  const today = new Date().toISOString().split('T')[0]
  const weekFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  const { data: followUps, error } = await supabase
    .from('activities')
    .select(`
      id,
      customer_id,
      activity_type,
      activity_date,
      notes,
      next_contact_date,
      customers!inner(company_name, city, phone),
      contacts(name, mobile)
    `)
    .not('next_contact_date', 'is', null)
    .lte('next_contact_date', weekFromNow)
    .order('next_contact_date', { ascending: true })

  if (error) throw error

  const customerLatestFollowUp = new Map()
  
  followUps?.forEach((followUp: any) => {
    const existing = customerLatestFollowUp.get(followUp.customer_id)
    if (!existing || followUp.next_contact_date < existing.next_contact_date) {
      customerLatestFollowUp.set(followUp.customer_id, followUp)
    }
  })

  const uniqueFollowUps = Array.from(customerLatestFollowUp.values())

  const overdue = uniqueFollowUps.filter((f: any) => f.next_contact_date < today)
  const dueToday = uniqueFollowUps.filter((f: any) => f.next_contact_date === today)
  const upcoming = uniqueFollowUps.filter((f: any) => f.next_contact_date > today)

  return {
    overdue,
    dueToday,
    upcoming,
    total: uniqueFollowUps.length,
  }
})
