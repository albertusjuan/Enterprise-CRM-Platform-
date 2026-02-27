'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react'
import { Dialog, Button, Input } from '@/shared/components/ui'
import { CustomerSchema, ContactSchema, type CustomerInput, type ContactInput } from '../schemas/customers.schema'
import { updateCustomer } from '../actions/customers.actions'
import { z } from 'zod'
import type { Customer, Contact } from '@/shared/types'

const FormSchema = z.object({
  customer: CustomerSchema,
  contacts: z.array(ContactSchema).default([]),
})

type FormInput = z.infer<typeof FormSchema>

interface EditCustomerDialogProps {
  isOpen: boolean
  onClose: () => void
  customer: Customer
  contacts: Contact[]
}

export function EditCustomerDialog({ isOpen, onClose, customer, contacts }: EditCustomerDialogProps) {
  const [error, setError] = useState('')
  const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm<FormInput>({
    resolver: zodResolver(FormSchema),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contacts',
  })

  useEffect(() => {
    if (isOpen) {
      reset({
        customer: {
          company_name: customer.company_name,
          industry_type: customer.industry_type || '',
          city: customer.city || '',
          district: customer.district || '',
          address: customer.address || '',
          phone: customer.phone || '',
          email: customer.email || '',
          machine_type: customer.machine_type || '',
          status: customer.status,
          notes: customer.notes || '',
        },
        contacts: contacts.length > 0 ? contacts : [{ name: '', is_primary: true }],
      })
    }
  }, [isOpen, customer, contacts, reset])

  const onSubmit = handleSubmit(async (data) => {
    try {
      setError('')
      await updateCustomer(customer.id, data)
      onClose()
    } catch (err: any) {
      setError(err.message || 'Failed to update customer')
    }
  })

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Edit Customer" size="lg">
      <form onSubmit={onSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <h3 className="font-semibold text-slate-900">Company Information</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              {...register('customer.company_name')}
              label="Company Name *"
              error={errors.customer?.company_name?.message}
            />
            <Input
              {...register('customer.industry_type')}
              label="Industry Type"
            />
            <Input
              {...register('customer.city')}
              label="City"
            />
            <Input
              {...register('customer.district')}
              label="District"
            />
            <Input
              {...register('customer.phone')}
              label="Phone"
              error={errors.customer?.phone?.message}
            />
            <Input
              {...register('customer.email')}
              label="Email"
              type="email"
              error={errors.customer?.email?.message}
            />
            <Input
              {...register('customer.machine_type')}
              label="Machine Type"
            />
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
              <select
                {...register('customer.status')}
                className="w-full h-11 px-3 rounded-md border border-slate-300 focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="dormant">Dormant</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
            <textarea
              {...register('customer.address')}
              rows={3}
              className="w-full px-3 py-2 rounded-md border border-slate-300 focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Notes</label>
            <textarea
              {...register('customer.notes')}
              rows={3}
              className="w-full px-3 py-2 rounded-md border border-slate-300 focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
            />
          </div>
        </div>

        <div className="space-y-4 border-t border-slate-200 pt-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Contact Persons</h3>
            <Button
              type="button"
              variant="secondary"
              onClick={() => append({ name: '', is_primary: false })}
            >
              + Add Contact
            </Button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="p-4 bg-slate-50 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Contact {index + 1}</span>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  {...register(`contacts.${index}.name`)}
                  label="Name *"
                  error={errors.contacts?.[index]?.name?.message}
                />
                <Input
                  {...register(`contacts.${index}.role`)}
                  label="Role"
                />
                <Input
                  {...register(`contacts.${index}.mobile`)}
                  label="Mobile"
                />
                <Input
                  {...register(`contacts.${index}.email`)}
                  label="Email"
                  type="email"
                  error={errors.contacts?.[index]?.email?.message}
                />
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  {...register(`contacts.${index}.is_primary`)}
                  className="rounded border-slate-300"
                />
                <span className="text-slate-700">Primary contact</span>
              </label>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            Update Customer
          </Button>
        </div>
      </form>
    </Dialog>
  )
}
