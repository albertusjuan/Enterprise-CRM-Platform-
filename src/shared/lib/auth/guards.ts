import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '../supabase/server'

export async function requireAuth() {
  const supabase = await createServerSupabaseClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect('/login')
  }
  
  return user
}

export async function requireAdmin() {
  const user = await requireAuth()
  const supabase = await createServerSupabaseClient()
  
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  
  if (profile?.role !== 'admin') {
    redirect('/dashboard')
  }
  
  return { user, profile }
}

export async function getUserProfile() {
  const user = await requireAuth()
  const supabase = await createServerSupabaseClient()
  
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()
  
  return { user, profile }
}
