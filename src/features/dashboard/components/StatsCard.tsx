import Link from 'next/link'
import { Card } from '@/shared/components/ui'

interface StatsCardProps {
  icon: string
  label: string
  value: number | string
  href?: string
  trend?: {
    value: number
    isPositive: boolean
  }
}

export function StatsCard({ icon, label, value, href, trend }: StatsCardProps) {
  const CardContent = () => (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 mb-1">{label}</p>
          <p className="text-3xl font-bold text-slate-900">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% from last month
            </p>
          )}
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </Card>
  )

  if (href) {
    return (
      <Link href={href}>
        <CardContent />
      </Link>
    )
  }

  return <CardContent />
}
