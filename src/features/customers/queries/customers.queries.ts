import { createServerSupabaseClient } from '@/shared/lib/supabase/server'
import type { CustomerFilters } from '../schemas/customers.schema'
import { cache } from 'react'

export const getCustomers = cache(async (filters: CustomerFilters) => {
  const supabase = await createServerSupabaseClient()
  const pageSize = 20

  let query = supabase.from('customers').select('*, contacts(name, mobile)', { count: 'exact' })

  if (filters.search) {
    query = query.or(`company_name.ilike.%${filters.search}%,address.ilike.%${filters.search}%`)
  }
  if (filters.city) {
    query = query.eq('city', filters.city)
  }
  if (filters.industry) {
    query = query.eq('industry_type', filters.industry)
  }

  const from = (filters.page - 1) * pageSize
  const to = from + pageSize - 1

  const { data, count, error } = await query
    .order('company_name', { ascending: true })
    .range(from, to)

  if (error) throw error

  return { data: data || [], count: count || 0, pageSize }
})

export const getCustomer = cache(async (id: string) => {
  const supabase = await createServerSupabaseClient()

  const [customerResult, contactsResult, activitiesResult] = await Promise.all([
    supabase.from('customers').select('*').eq('id', id).single(),
    supabase.from('contacts').select('*').eq('customer_id', id).order('is_primary', { ascending: false }),
    supabase.from('activities').select('*').eq('customer_id', id).order('activity_date', { ascending: false }),
  ])

  if (customerResult.error) throw customerResult.error

  return {
    customer: customerResult.data,
    contacts: contactsResult.data || [],
    activities: activitiesResult.data || [],
  }
})

export async function getCities() {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase.from('customers').select('city').not('city', 'is', null).order('city')
  return Array.from(new Set(data?.map((c) => c.city).filter(Boolean))) as string[]
}

export async function getIndustries() {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase.from('customers').select('industry_type').not('industry_type', 'is', null).order('industry_type')
  return Array.from(new Set(data?.map((c) => c.industry_type).filter(Boolean))) as string[]
}
