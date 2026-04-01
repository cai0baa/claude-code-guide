export function Section({ id, number, title, desc, children }) {
  return (
    <section id={id} className="mb-[60px] scroll-mt-[80px]">
      <div className="mb-8 pb-4 border-b border-border">
        <span className="font-mono text-[12px] text-accent-amber block mb-2">{number}</span>
        <h2 className="font-mono text-[24px] font-semibold text-text-primary mb-2">{title}</h2>
        <p className="text-text-secondary text-[15px]">{desc}</p>
      </div>
      {children}
    </section>
  )
}

export function Subsection({ title, children }) {
  return (
    <div className="mb-8">
      <h3 className="font-mono text-[17px] font-semibold text-accent-cyan mb-3 flex items-center gap-2">
        <span className="text-accent-green">▸</span> {title}
      </h3>
      {children}
    </div>
  )
}

export function H4({ children }) {
  return <h4 className="font-mono text-[14px] font-medium text-accent-purple mt-4 mb-2">{children}</h4>
}

export function InlineCode({ children }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 rounded text-[12px] text-accent-green font-mono">{children}</code>
}

export function BulletList({ items }) {
  return (
    <ul className="my-3 ml-5 space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="text-text-secondary text-[14px] marker:text-accent-green-dim">
          {typeof item === 'string' ? <span dangerouslySetInnerHTML={{ __html: item }} /> : item}
        </li>
      ))}
    </ul>
  )
}

export function OrderedList({ items }) {
  return (
    <ol className="my-3 ml-5 space-y-1.5 list-decimal">
      {items.map((item, i) => (
        <li key={i} className="text-text-secondary text-[14px] marker:text-accent-green-dim">
          {typeof item === 'string' ? <span dangerouslySetInnerHTML={{ __html: item }} /> : item}
        </li>
      ))}
    </ol>
  )
}

export function Grid2({ children }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">{children}</div>
}
