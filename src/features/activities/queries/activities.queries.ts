import { createServerSupabaseClient } from '@/shared/lib/supabase/server'
import { cache } from 'react'

export const getActivities = cache(async (page: number = 1) => {
  const supabase = await createServerSupabaseClient()
  const pageSize = 50
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data, count, error } = await supabase
    .from('activities')
    .select('*, customers!inner(company_name, city)', { count: 'exact' })
    .order('activity_date', { ascending: false })
    .range(from, to)

  if (error) throw error

  return { data: data || [], count: count || 0, pageSize }
})

export const getActivity = cache(async (id: string) => {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase
    .from('activities')
    .select('*, customers!inner(company_name)')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
})
