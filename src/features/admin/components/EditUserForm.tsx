'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Button, Input } from '@/shared/components/ui'
import { UpdateUserSchema, type UpdateUserInput } from '../schemas/users.schema'
import { updateUser } from '../actions/users.actions'

interface EditUserFormProps {
  user: {
    id: string
    full_name: string
    email: string
    role: 'admin' | 'marketing'
    is_active: boolean
  }
  currentUserId: string
}

export function EditUserForm({ user, currentUserId }: EditUserFormProps) {
  const [error, setError] = useState('')
  const isOwnAccount = user.id === currentUserId

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UpdateUserInput>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      full_name: user.full_name,
      role: user.role,
      is_active: user.is_active,
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      setError('')
      await updateUser(user.id, data)
    } catch (err: any) {
      setError(err.message || 'Failed to update user')
    }
  })

  if (isOwnAccount) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
        <span className="text-4xl mb-3 block">⚠️</span>
        <h3 className="text-lg font-semibold text-amber-900 mb-2">Cannot Edit Own Account</h3>
        <p className="text-amber-700">For security reasons, you cannot modify your own role or status.</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
        <p className="text-sm text-slate-600">Email</p>
        <p className="text-slate-900 font-medium">{user.email}</p>
      </div>

      <Input
        {...register('full_name')}
        label="Full Name *"
        placeholder="John Doe"
        error={errors.full_name?.message}
      />

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Role *</label>
        <select
          {...register('role')}
          className="w-full h-11 px-3 rounded-md border border-slate-300 focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
        >
          <option value="admin">Admin</option>
          <option value="marketing">Marketing</option>
        </select>
        {errors.role && (
          <p className="text-red-600 text-sm mt-1">{errors.role.message}</p>
        )}
      </div>

      <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
        <input
          type="checkbox"
          {...register('is_active')}
          className="rounded border-slate-300 h-5 w-5"
          id="is_active"
        />
        <label htmlFor="is_active" className="text-sm font-medium text-slate-700">
          Active (User can log in)
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
        <Button type="button" variant="secondary" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          Update User
        </Button>
      </div>
    </form>
  )
}
