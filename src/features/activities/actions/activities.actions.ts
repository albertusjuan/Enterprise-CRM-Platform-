'use server'

import { revalidatePath } from 'next/cache'
import { createServerSupabaseClient } from '@/shared/lib/supabase/server'
import { requireAuth } from '@/shared/lib/auth/guards'
import { ActivitySchema, type ActivityInput } from '../schemas/activities.schema'

export async function createActivity(input: ActivityInput) {
  const user = await requireAuth()
  const supabase = await createServerSupabaseClient()

  const validated = ActivitySchema.parse(input)

  const { data: activity, error } = await supabase
    .from('activities')
    .insert({
      ...validated,
      user_id: user.id,
      next_contact_date: validated.next_contact_date || null,
    })
    .select()
    .single()

  if (error) throw error

  await supabase
    .from('customers')
    .update({ last_contact_date: validated.activity_date })
    .eq('id', validated.customer_id)

  revalidatePath(`/customers/${validated.customer_id}`)
  revalidatePath('/activities')
  revalidatePath('/follow-ups')
  
  return activity
}

export async function updateActivity(id: string, input: ActivityInput) {
  await requireAuth()
  const supabase = await createServerSupabaseClient()

  const validated = ActivitySchema.parse(input)

  const { error } = await supabase
    .from('activities')
    .update({
      ...validated,
      next_contact_date: validated.next_contact_date || null,
    })
    .eq('id', id)

  if (error) throw error

  await supabase
    .from('customers')
    .update({ last_contact_date: validated.activity_date })
    .eq('id', validated.customer_id)

  revalidatePath(`/customers/${validated.customer_id}`)
  revalidatePath('/activities')
  revalidatePath('/follow-ups')
}

export async function deleteActivity(id: string, customerId: string) {
  await requireAuth()
  const supabase = await createServerSupabaseClient()

  const { error } = await supabase
    .from('activities')
    .delete()
    .eq('id', id)

  if (error) throw error

  revalidatePath(`/customers/${customerId}`)
  revalidatePath('/activities')
}
