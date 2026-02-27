import { cn } from '@/shared/lib/utils/cn'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-lg border border-slate-200 shadow-sm',
        'transition-shadow duration-150 hover:shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }: CardProps) {
  return (
    <div className={cn('px-6 py-4 border-b border-slate-200', className)} {...props}>
      {children}
    </div>
  )
}

export function CardBody({ className, children, ...props }: CardProps) {
  return (
    <div className={cn('px-6 py-4', className)} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ className, children, ...props }: CardProps) {
  return (
    <div className={cn('px-6 py-4 border-t border-slate-200 bg-slate-50', className)} {...props}>
      {children}
    </div>
  )
}
