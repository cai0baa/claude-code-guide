import { Card as ShadCard, CardHeader, CardContent } from '@/components/ui/card'

export function Card({ title, children }) {
  return (
    <ShadCard>
      <CardHeader>
        <h4 className="font-mono text-[13px] text-accent-cyan">{title}</h4>
      </CardHeader>
      <CardContent>
        <p className="text-[13px] text-text-secondary">{children}</p>
      </CardContent>
    </ShadCard>
  )
}
