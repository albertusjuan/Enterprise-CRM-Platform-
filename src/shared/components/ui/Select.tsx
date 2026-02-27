import { cn } from '@/shared/lib/utils/cn'
import { forwardRef } from 'react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-slate-700">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            'w-full h-11 px-3 rounded-md border border-slate-300',
            'focus:border-slate-800 focus:ring-1 focus:ring-slate-800',
            'disabled:bg-slate-100 disabled:cursor-not-allowed',
            'transition-colors duration-150',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
