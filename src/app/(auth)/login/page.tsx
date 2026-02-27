import { LoginForm } from '@/features/auth'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-amber-500/20 rounded-md flex items-center justify-center border border-amber-500/30">
              <span className="text-2xl">📊</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">CRM SAM</h1>
              <p className="text-slate-400 text-sm">Customer Management</p>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Enterprise-grade<br />customer management
          </h2>
          <p className="text-slate-300 text-lg">
            Professional CRM solution for managing customer relationships.
          </p>
        </div>
        <p className="text-slate-500 text-sm">© 2026 CRM SAM</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h2>
            <p className="text-slate-600">Sign in to continue</p>
          </div>
          <LoginForm />
          <p className="text-center text-sm text-slate-500 mt-6">
            Need access? Contact your administrator
          </p>
        </div>
      </div>
    </div>
  )
}
