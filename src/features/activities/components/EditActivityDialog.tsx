'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react'
import { Dialog, Button, Input } from '@/shared/components/ui'
import { ActivitySchema, type ActivityInput } from '../schemas/activities.schema'
import { updateActivity } from '../actions/activities.actions'
import { ACTIVITY_TYPES, OUTCOMES } from '../constants'
import type { Activity } from '@/shared/types'

interface EditActivityDialogProps {
  isOpen: boolean
  onClose: () => void
  activity: Activity
  contacts?: { name: string }[]
}

export function EditActivityDialog({ isOpen, onClose, activity, contacts = [] }: EditActivityDialogProps) {
  const [error, setError] = useState('')
  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm<ActivityInput>({
    resolver: zodResolver(ActivitySchema),
  })

  const selectedOutcome = watch('outcome')
  const showNextContactDate = selectedOutcome === 'follow_up'

  useEffect(() => {
    if (isOpen) {
      reset({
        customer_id: activity.customer_id,
        activity_type: activity.activity_type,
        activity_date: activity.activity_date,
        contact_person: activity.contact_person || '',
        notes: activity.notes || '',
        outcome: activity.outcome || undefined,
        next_contact_date: activity.next_contact_date || '',
      })
    }
  }, [isOpen, activity, reset])

  const onSubmit = handleSubmit(async (data) => {
    try {
      setError('')
      await updateActivity(activity.id, data)
      onClose()
    } catch (err: any) {
      setError(err.message || 'Failed to update activity')
    }
  })

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Edit Activity" size="md">
      <form onSubmit={onSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Activity Type *</label>
          <select
            {...register('activity_type')}
            className="w-full h-11 px-3 rounded-md border border-slate-300 focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
          >
            {ACTIVITY_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.icon} {type.label}
              </option>
            ))}
          </select>
        </div>

        <Input
          {...register('activity_date')}
          label="Activity Date *"
          type="date"
          error={errors.activity_date?.message}
        />

        {contacts.length > 0 ? (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Contact Person</label>
            <select
              {...register('contact_person')}
              className="w-full h-11 px-3 rounded-md border border-slate-300 focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
            >
              <option value="">Select contact person...</option>
              {contacts.map((contact, idx) => (
                <option key={idx} value={contact.name}>{contact.name}</option>
              ))}
            </select>
          </div>
        ) : (
          <Input
            {...register('contact_person')}
            label="Contact Person"
          />
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Outcome</label>
          <select
            {...register('outcome')}
            className="w-full h-11 px-3 rounded-md border border-slate-300 focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
          >
            <option value="">Select outcome...</option>
            {OUTCOMES.map((outcome) => (
              <option key={outcome.value} value={outcome.value}>
                {outcome.icon} {outcome.label}
              </option>
            ))}
          </select>
        </div>

        {showNextContactDate && (
          <Input
            {...register('next_contact_date')}
            label="Next Contact Date"
            type="date"
            error={errors.next_contact_date?.message}
          />
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Notes</label>
          <textarea
            {...register('notes')}
            rows={4}
            className="w-full px-3 py-2 rounded-md border border-slate-300 focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            Update Activity
          </Button>
        </div>
      </form>
    </Dialog>
  )
}
