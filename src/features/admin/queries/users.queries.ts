import { createServerSupabaseClient } from '@/shared/lib/supabase/server'
import { cache } from 'react'

export const getAllUsers = cache(async () => {
  const supabase = await createServerSupabaseClient()

  const { data: profiles, error } = await supabase
    .from('user_profiles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error

  const userIds = profiles?.map(p => p.id) || []
  if (userIds.length === 0) return []

  const { data: authUsers } = await supabase.auth.admin.listUsers()

  const usersMap = new Map(authUsers.users.map(u => [u.id, u.email]))

  return profiles?.map(profile => ({
    ...profile,
    email: usersMap.get(profile.id) || 'N/A',
  })) || []
})

export const getUser = cache(async (id: string) => {
  const supabase = await createServerSupabaseClient()

  const { data: profile, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error

  const { data: authUser } = await supabase.auth.admin.getUserById(id)

  return {
    ...profile,
    email: authUser.user?.email || 'N/A',
  }
})

export const getAdminStats = cache(async () => {
  const supabase = await createServerSupabaseClient()

  const { data: profiles } = await supabase
    .from('user_profiles')
    .select('role')

  const total = profiles?.length || 0
  const admins = profiles?.filter(p => p.role === 'admin').length || 0
  const marketing = profiles?.filter(p => p.role === 'marketing').length || 0

  return { total, admins, marketing }
})
