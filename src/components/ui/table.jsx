import { cn } from '@/lib/utils'

export function Table({ className, ...props }) {
  return (
    <div className="my-4 overflow-x-auto rounded-lg border border-border">
      <table className={cn('w-full text-[13px] border-collapse', className)} {...props} />
    </div>
  )
}

export function TableHeader({ className, ...props }) {
  return <thead className={cn('', className)} {...props} />
}

export function TableBody({ className, ...props }) {
  return <tbody className={cn('', className)} {...props} />
}

export function TableRow({ className, ...props }) {
  return (
    <tr
      className={cn('border-b border-border/50 hover:bg-accent-green/[0.02] transition-colors', className)}
      {...props}
    />
  )
}

export function TableHead({ className, ...props }) {
  return (
    <th
      className={cn(
        'font-mono text-[11px] uppercase tracking-wider text-accent-amber text-left p-2.5 border-b border-border bg-bg-secondary',
        className
      )}
      {...props}
    />
  )
}

export function TableCell({ className, ...props }) {
  return <td className={cn('p-2.5 text-text-secondary', className)} {...props} />
}
