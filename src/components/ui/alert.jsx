import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const alertVariants = cva(
  'relative w-full rounded-lg border-l-[3px] p-3.5 my-4 text-sm',
  {
    variants: {
      variant: {
        tip: 'border-accent-green bg-accent-green/5 text-accent-green-dim',
        warning: 'border-accent-amber bg-accent-amber/5 text-accent-amber-dim',
        danger: 'border-accent-red bg-accent-red/5 text-accent-red-dim',
        info: 'border-accent-cyan bg-accent-cyan/5 text-accent-cyan-dim',
      },
    },
    defaultVariants: { variant: 'info' },
  }
)

export function Alert({ className, variant, ...props }) {
  return <div role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
}

export function AlertTitle({ className, ...props }) {
  return (
    <div
      className={cn('font-mono text-[11px] uppercase tracking-wider mb-1.5 font-semibold', className)}
      {...props}
    />
  )
}

export function AlertDescription({ className, ...props }) {
  return <div className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
}
