'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { LoginSchema, type LoginInput } from '../schemas/auth.schema'
import { signIn } from '../actions/auth.actions'
import { Button } from '@/shared/components/ui'

export function LoginForm() {
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    setError('')
    const result = await signIn(data)
    if (result?.error) {
      setError(result.error)
    }
  })

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          className="w-full h-11 px-3 rounded-md border border-slate-300 focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
          placeholder="you@company.com"
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Password
        </label>
        <input
          {...register('password')}
          type="password"
          className="w-full h-11 px-3 rounded-md border border-slate-300 focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
          placeholder="Enter password"
        />
        {errors.password && (
          <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" variant="primary" isLoading={isSubmitting} className="w-full py-3">
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  )
}
