'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/shared/lib/supabase/server'
import { requireAdmin } from '@/shared/lib/auth/guards'
import { UpdateUserSchema, type UpdateUserInput } from '../schemas/users.schema'

export async function updateUser(userId: string, input: UpdateUserInput) {
  const { user: currentUser } = await requireAdmin()
  const supabase = await createServerSupabaseClient()

  if (currentUser.id === userId) {
    throw new Error('Cannot edit your own account')
  }

  const validated = UpdateUserSchema.parse(input)

  const { error } = await supabase
    .from('user_profiles')
    .update(validated)
    .eq('id', userId)

  if (error) throw error

  revalidatePath('/dashboard/admin')
  revalidatePath(`/dashboard/admin/users/${userId}`)
  redirect('/dashboard/admin')
}

export async function deleteUser(userId: string) {
  const { user: currentUser } = await requireAdmin()
  const supabase = await createServerSupabaseClient()

  if (currentUser.id === userId) {
    throw new Error('Cannot delete your own account')
  }

  const { error } = await supabase
    .from('user_profiles')
    .delete()
    .eq('id', userId)

  if (error) throw error

  revalidatePath('/dashboard/admin')
}
