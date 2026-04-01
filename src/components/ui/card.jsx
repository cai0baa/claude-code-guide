import { cn } from '@/lib/utils'

export function Card({ className, ...props }) {
  return (
    <div
      className={cn('bg-bg-card border border-border rounded-lg', className)}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }) {
  return <div className={cn('px-4 pt-4 pb-1', className)} {...props} />
}

export function CardContent({ className, ...props }) {
  return <div className={cn('px-4 pb-4', className)} {...props} />
}
