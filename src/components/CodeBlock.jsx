export function CodeBlock({ lang, children }) {
  return (
    <div className="relative my-4 rounded-lg border border-border bg-code-bg overflow-hidden">
      <div className="absolute top-2 right-3 text-[10px] uppercase tracking-wider text-text-muted font-mono">{lang}</div>
      <pre className="p-4 pt-6 text-[13px] leading-relaxed font-mono overflow-x-auto"><code>{children}</code></pre>
    </div>
  )
}
