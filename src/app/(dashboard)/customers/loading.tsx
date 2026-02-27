import { SkeletonTable } from '@/shared/components/ui/Skeleton'

export default function CustomersLoading() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
      <div className="flex gap-3">
        <div className="flex-1 h-11 bg-slate-200 rounded animate-pulse" />
        <div className="w-32 h-11 bg-slate-200 rounded animate-pulse" />
        <div className="w-32 h-11 bg-slate-200 rounded animate-pulse" />
      </div>
      <SkeletonTable />
    </div>
  )
}
