'use client'

import { useState } from 'react'
import { Badge, Button } from '@/shared/components/ui'
import { formatDate } from '@/shared/lib/utils/dates'
import { getActivityTypeInfo, getOutcomeInfo } from '../constants'
import { EditActivityDialog } from './EditActivityDialog'
import { deleteActivity } from '../actions/activities.actions'
import type { Activity } from '@/shared/types'

interface ActivityTimelineProps {
  activities: Activity[]
  contacts?: { name: string }[]
  canEdit?: boolean
}

export function ActivityTimeline({ activities, contacts = [], canEdit = false }: ActivityTimelineProps) {
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (activity: Activity) => {
    if (!confirm('Are you sure you want to delete this activity?')) return
    
    try {
      setDeletingId(activity.id)
      await deleteActivity(activity.id, activity.customer_id)
    } catch (error) {
      alert('Failed to delete activity')
    } finally {
      setDeletingId(null)
    }
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">No activities recorded yet</p>
      </div>
    )
  }

  return (
    <>
      <div className="relative space-y-6">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200" />
        
        {activities.map((activity, index) => {
          const typeInfo = getActivityTypeInfo(activity.activity_type)
          const outcomeInfo = activity.outcome ? getOutcomeInfo(activity.outcome) : null

          return (
            <div key={activity.id} className="relative pl-14 group">
              <div className={`absolute left-0 w-12 h-12 rounded-lg ${typeInfo.color} flex items-center justify-center text-2xl border-4 border-white shadow-md z-10`}>
                {typeInfo.icon}
              </div>

              <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default">{typeInfo.label}</Badge>
                    {outcomeInfo && (
                      <Badge variant="info">{outcomeInfo.label}</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-500 whitespace-nowrap">
                      {formatDate(activity.activity_date)}
                    </span>
                    {canEdit && (
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        <button
                          onClick={() => setEditingActivity(activity)}
                          className="text-slate-600 hover:text-slate-900 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(activity)}
                          disabled={deletingId === activity.id}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          {deletingId === activity.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {activity.contact_person && (
                  <p className="text-sm text-slate-600 mb-2">
                    <span className="font-medium">Contact:</span> {activity.contact_person}
                  </p>
                )}

                {activity.notes && (
                  <p className="text-slate-700 mb-2">{activity.notes}</p>
                )}

                {activity.next_contact_date && (
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <div className="flex items-center gap-2 text-sm text-amber-600">
                      <span>📅</span>
                      <span className="font-medium">Follow-up scheduled: {formatDate(activity.next_contact_date)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {editingActivity && (
        <EditActivityDialog
          isOpen={true}
          onClose={() => setEditingActivity(null)}
          activity={editingActivity}
          contacts={contacts}
        />
      )}
    </>
  )
}
