interface HeaderProps {
  userName?: string
}

export function Header({ userName }: HeaderProps) {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-6 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <div className="ml-12 lg:ml-0">
          <h2 className="text-xl font-semibold text-slate-900">
            {getGreeting()}, {userName?.split(' ')[0] || 'User'}
          </h2>
          <p className="text-sm text-slate-500 mt-0.5 hidden sm:block">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
    </header>
  )
}
