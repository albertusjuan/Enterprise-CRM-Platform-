import { cn } from '@/shared/lib/utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  isLoading?: boolean
}

export function Button({ variant = 'primary', isLoading, className, children, ...props }: ButtonProps) {
  const variantStyles = {
    primary: 'bg-slate-800 text-white hover:bg-slate-900 border border-slate-700',
    secondary: 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50',
    ghost: 'text-slate-700 hover:bg-slate-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 border border-red-500',
  }
  
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-md font-medium transition-all duration-150',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'flex items-center justify-center gap-2',
        variantStyles[variant],
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  )
}
