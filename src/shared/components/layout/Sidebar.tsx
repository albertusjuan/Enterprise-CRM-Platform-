'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

interface SidebarProps {
  userRole?: string
  userName?: string
  onLogout: () => void
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
  { name: 'Follow-ups', href: '/follow-ups', icon: '🔔' },
  { name: 'Customers', href: '/customers', icon: '👥' },
  { name: 'Activities', href: '/activities', icon: '📋' },
  { name: 'Reports', href: '/reports', icon: '📊' },
]

export function Sidebar({ userRole, userName, onLogout }: SidebarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-slate-900 rounded-md flex items-center justify-center text-white"
      >
        {mobileOpen ? '✕' : '☰'}
      </button>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMobileOpen(false)} />
      )}

      <div className={`w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen fixed lg:static z-40 transition-transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="px-6 py-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500/20 rounded-md flex items-center justify-center border border-amber-500/30">
              <span className="text-xl">📊</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">CRM SAM</h1>
              <p className="text-xs text-slate-500">v2.0</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md font-medium text-sm transition-all ${
                isActive(item.href)
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}

          {userRole === 'admin' && (
            <Link
              href="/admin"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md font-medium text-sm transition-all ${
                isActive('/admin')
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span>⚙️</span>
              <span>Admin</span>
            </Link>
          )}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">{userName}</div>
              <div className="text-xs text-slate-500 capitalize">{userRole}</div>
            </div>
            <button onClick={onLogout} className="text-red-400 hover:text-red-300 text-sm">
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
