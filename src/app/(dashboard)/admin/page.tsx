import { requireAdmin } from '@/shared/lib/auth/guards'

export default async function AdminPage() {
  await requireAdmin()
  
  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <p className="text-slate-600 mt-1">User management coming soon</p>
    </div>
  )
}
