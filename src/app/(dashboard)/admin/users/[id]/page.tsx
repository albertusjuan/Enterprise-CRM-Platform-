import Link from 'next/link'
import { requireAdmin } from '@/shared/lib/auth/guards'
import { getUser } from '@/features/admin'
import { EditUserForm } from '@/features/admin'
import { Card, CardHeader, CardBody } from '@/shared/components/ui'

export const revalidate = 0

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { user: currentUser } = await requireAdmin()
  const { id } = await params
  const user = await getUser(id)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <Link href="/admin" className="hover:text-slate-900">Admin</Link>
        <span>/</span>
        <span className="text-slate-900">Edit User</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-slate-900">Edit User</h1>
        <p className="text-slate-600 mt-1">Update user information and permissions</p>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-900">User Information</h3>
        </CardHeader>
        <CardBody>
          <EditUserForm user={user} currentUserId={currentUser.id} />
        </CardBody>
      </Card>
    </div>
  )
}
