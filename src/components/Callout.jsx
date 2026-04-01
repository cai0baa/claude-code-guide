import { useContext } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { LangContext } from '@/components/LangContext'
import { t } from '@/translations'

export function Callout({ type, title, children }) {
  const { lang } = useContext(LangContext)
  return (
    <Alert variant={type}>
      <div className="font-mono text-[11px] uppercase tracking-wider mb-1.5 font-semibold">{t[lang][title] || title}</div>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  )
}
