'use server'

import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/shared/lib/supabase/server'
import { LoginSchema, type LoginInput } from '../schemas/auth.schema'

export async function signIn(credentials: LoginInput) {
  const validated = LoginSchema.parse(credentials)
  const supabase = await createServerSupabaseClient()
  
  const { error } = await supabase.auth.signInWithPassword(validated)
  
  if (error) {
    return { error: error.message }
  }
  
  redirect('/dashboard')
}

export async function signOut() {
  const supabase = await createServerSupabaseClient()
  await supabase.auth.signOut()
  redirect('/login')
}
