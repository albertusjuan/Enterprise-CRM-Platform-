import { Card, CardHeader, CardBody } from '@/shared/components/ui'
import { getActivityTypeInfo } from '@/features/activities/constants'

interface ActivityBreakdownProps {
  breakdown: { type: string; count: number; percentage: number }[]
}

export function ActivityBreakdown({ breakdown }: ActivityBreakdownProps) {
  const sortedBreakdown = [...breakdown].sort((a, b) => b.count - a.count)

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-slate-900">Activity Type Breakdown</h3>
      </CardHeader>
      <CardBody>
        {sortedBreakdown.length === 0 ? (
          <p className="text-slate-500 text-center py-8">No activities recorded yet</p>
        ) : (
          <div className="space-y-4">
            {sortedBreakdown.map((item) => {
              const typeInfo = getActivityTypeInfo(item.type)
              return (
                <div key={item.type}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{typeInfo.icon}</span>
                      <span className="text-sm font-medium text-slate-700">{typeInfo.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-slate-600">{item.count} activities</span>
                      <span className="text-sm font-semibold text-slate-900 w-12 text-right">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-slate-700 to-slate-900 rounded-full transition-all duration-300"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardBody>
    </Card>
  )
}
