import { Card, CardHeader, CardBody, Badge } from '@/shared/components/ui'
import { getOutcomeInfo } from '@/features/activities/constants'

interface OutcomeStatsProps {
  outcomes: { outcome: string; count: number; percentage: number }[]
}

export function OutcomeStats({ outcomes }: OutcomeStatsProps) {
  const sortedOutcomes = [...outcomes].sort((a, b) => b.count - a.count)

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-slate-900">Outcome Statistics</h3>
      </CardHeader>
      <CardBody>
        {sortedOutcomes.length === 0 ? (
          <p className="text-slate-500 text-center py-8">No outcomes recorded yet</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sortedOutcomes.map((item) => {
              const outcomeInfo = getOutcomeInfo(item.outcome)
              return (
                <div key={item.outcome} className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{outcomeInfo.icon}</span>
                    <span className="font-medium text-slate-900">{outcomeInfo.label}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-900">{item.count}</span>
                    <span className="text-lg text-slate-600">({item.percentage}%)</span>
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
