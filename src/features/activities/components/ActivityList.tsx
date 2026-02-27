'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/shared/components/ui'
import { ActivityCard } from './ActivityCard'
import type { Activity } from '@/shared/types'

interface ActivityListProps {
  data: {
    data: (Activity & { customers?: { company_name: string } })[]
    count: number
    pageSize: number
  }
  currentPage: number
}

export function ActivityList({ data, currentPage }: ActivityListProps) {
  const router = useRouter()
  const totalPages = Math.ceil(data.count / data.pageSize)

  const goToPage = (page: number) => {
    router.push(`/activities?page=${page}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">All Activities</h1>
          <p className="text-slate-600 mt-1">{data.count} total activities</p>
        </div>
      </div>

      {data.data.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">No activities found</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {data.data.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} showCustomer={true} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-200 pt-4">
              <p className="text-sm text-slate-600">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage <= 1}
                >
                  Previous
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
