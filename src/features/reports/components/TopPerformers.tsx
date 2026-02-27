import { Card, CardHeader, CardBody } from '@/shared/components/ui'

interface TopPerformersProps {
  performers: { userId: string; userName: string; activityCount: number }[]
}

export function TopPerformers({ performers }: TopPerformersProps) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-slate-900">Top Performers</h3>
      </CardHeader>
      <CardBody>
        {performers.length === 0 ? (
          <p className="text-slate-500 text-center py-8">No activity data available</p>
        ) : (
          <div className="space-y-3">
            {performers.map((performer, index) => (
              <div 
                key={performer.userId}
                className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                  index === 0 ? 'bg-amber-500' :
                  index === 1 ? 'bg-slate-400' :
                  index === 2 ? 'bg-amber-700' :
                  'bg-slate-600'
                }`}>
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{performer.userName}</p>
                  <p className="text-sm text-slate-600">{performer.activityCount} activities logged</p>
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {performer.activityCount}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  )
}
