import { getUserProfile } from '@/shared/lib/auth/guards'
import { Sidebar } from '@/shared/components/layout/Sidebar'
import { Header } from '@/shared/components/layout/Header'
import { signOut } from '@/features/auth'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, profile } = await getUserProfile()

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar 
        userRole={profile?.role} 
        userName={profile?.full_name}
        onLogout={signOut}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName={profile?.full_name} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
