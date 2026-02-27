'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/shared/lib/supabase/server'
import { requireAuth } from '@/shared/lib/auth/guards'
import { CustomerSchema, ContactSchema, type CustomerInput, type ContactInput } from '../schemas/customers.schema'

export async function createCustomer(input: { customer: CustomerInput, contacts: ContactInput[] }) {
  const user = await requireAuth()
  const supabase = await createServerSupabaseClient()

  const validatedCustomer = CustomerSchema.parse(input.customer)
  const validatedContacts = input.contacts.map(c => ContactSchema.parse(c))

  const { data: customer, error: customerError } = await supabase
    .from('customers')
    .insert(validatedCustomer)
    .select()
    .single()

  if (customerError) throw customerError

  if (validatedContacts.length > 0) {
    const contactsToInsert = validatedContacts.map(c => ({
      ...c,
      customer_id: customer.id,
    }))
    await supabase.from('contacts').insert(contactsToInsert)
  }

  await supabase.from('activities').insert({
    customer_id: customer.id,
    user_id: user.id,
    activity_type: 'visit',
    activity_date: new Date().toISOString().split('T')[0],
    notes: 'Initial contact - customer added to system',
  })

  revalidatePath('/customers')
  redirect(`/customers/${customer.id}`)
}

export async function updateCustomer(id: string, input: { customer: CustomerInput, contacts: ContactInput[] }) {
  await requireAuth()
  const supabase = await createServerSupabaseClient()

  const validatedCustomer = CustomerSchema.parse(input.customer)
  const validatedContacts = input.contacts.map(c => ContactSchema.parse(c))

  const { error } = await supabase
    .from('customers')
    .update(validatedCustomer)
    .eq('id', id)

  if (error) throw error

  await supabase.from('contacts').delete().eq('customer_id', id)

  if (validatedContacts.length > 0) {
    const contactsToInsert = validatedContacts.map(c => ({
      ...c,
      customer_id: id,
    }))
    await supabase.from('contacts').insert(contactsToInsert)
  }

  revalidatePath(`/customers/${id}`)
  revalidatePath('/customers')
}

export async function deleteCustomer(id: string) {
  await requireAuth()
  const supabase = await createServerSupabaseClient()

  const { error } = await supabase
    .from('customers')
    .delete()
    .eq('id', id)

  if (error) throw error

  revalidatePath('/customers')
  redirect('/customers')
}
