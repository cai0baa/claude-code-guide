import { useState, useEffect, useRef, createContext, useContext } from 'react'
import { Menu, X, Languages } from 'lucide-react'
import { t, sidebarLinks, sidebarSections } from './translations'
import { contentEN } from './content-en'
import { contentPT } from './content-pt'

const LangContext = createContext()

function useLang() {
  return useContext(LangContext)
}

export function CodeBlock({ lang, children }) {
  return (
    <div className="relative my-4 rounded-lg border border-border bg-code-bg overflow-hidden">
      <div className="absolute top-2 right-3 text-[10px] uppercase tracking-wider text-text-muted font-mono">{lang}</div>
      <pre className="p-4 pt-6 text-[13px] leading-relaxed font-mono overflow-x-auto"><code>{children}</code></pre>
    </div>
  )
}

export function Callout({ type, title, children }) {
  const { lang } = useLang()
  const colors = {
    tip: 'border-accent-green bg-accent-green/5 text-accent-green-dim',
    warning: 'border-accent-amber bg-accent-amber/5 text-accent-amber-dim',
    danger: 'border-accent-red bg-accent-red/5 text-accent-red-dim',
    info: 'border-accent-cyan bg-accent-cyan/5 text-accent-cyan-dim',
  }
  return (
    <div className={`my-4 p-3.5 rounded-lg border-l-[3px] text-sm ${colors[type]}`}>
      <div className="font-mono text-[11px] uppercase tracking-wider mb-1.5 font-semibold">{t[lang][title] || title}</div>
      {children}
    </div>
  )
}

export function Table({ headers, rows }) {
  return (
    <div className="my-4 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-[13px] border-collapse">
        <thead>
          <tr className="bg-bg-secondary">
            {headers.map((h, i) => (
              <th key={i} className="font-mono text-[11px] uppercase tracking-wider text-accent-amber text-left p-2.5 border-b border-border">
                {typeof h === 'string' ? <span dangerouslySetInnerHTML={{ __html: h }} /> : h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-border/50 hover:bg-accent-green/[0.02]">
              {row.map((cell, ci) => (
                <td key={ci} className="p-2.5 text-text-secondary">
                  {typeof cell === 'string' ? <span dangerouslySetInnerHTML={{ __html: cell }} /> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

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

export function Card({ title, children }) {
  return (
    <div className="bg-bg-card border border-border rounded-lg p-4">
      <h4 className="font-mono text-[13px] text-accent-cyan mb-2">{title}</h4>
      <p className="text-[13px] text-text-secondary">{children}</p>
    </div>
  )
}

export default function App() {
  const [lang, setLang] = useState('en')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const mainRef = useRef(null)

  const links = sidebarLinks[lang]
  const sections = sidebarSections[lang]
  const content = lang === 'en' ? contentEN : contentPT
  const tr = t[lang]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    const s = document.querySelectorAll('[data-section]')
    s.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [lang])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setSidebarOpen(false)
  }

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'pt' : 'en')
  }

  return (
    <LangContext.Provider value={{ lang }}>
      <div className="min-h-screen bg-bg">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 h-[60px] bg-bg/90 backdrop-blur-xl border-b border-border z-50 flex items-center px-6 justify-between">
          <div className="font-mono text-[14px] text-accent-green flex items-center gap-2.5">
            <span className="text-accent-amber">❯</span>
            <span>claude-code-guide</span>
            <span className="text-text-muted">~/docs</span>
            <span className="inline-block w-2 h-4 bg-accent-green animate-pulse ml-1" />
          </div>
          <div className="flex items-center gap-3">
            <div className="font-mono text-[11px] px-2.5 py-1 bg-bg-secondary border border-border rounded text-accent-cyan">
              v2026.03 · 30 checkpoints
            </div>
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 font-mono text-[12px] bg-bg-secondary border border-border rounded text-accent-amber hover:border-accent-amber transition-colors"
            >
              <Languages size={14} />
              {tr.lang}
            </button>
          </div>
        </header>

        {/* Mobile toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed bottom-5 right-5 z-[60] w-12 h-12 rounded-full bg-accent-green text-bg flex items-center justify-center shadow-lg shadow-accent-green/30 md:hidden"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Sidebar */}
        <aside className={`fixed top-[60px] left-0 w-[280px] h-[calc(100vh-60px)] bg-bg-secondary border-r border-border overflow-y-auto z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
          <nav className="py-5">
            {sections.map((section, si) => (
              <div key={si}>
                <div className="px-4 mb-2">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-text-muted px-2 mb-2">{section.title}</div>
                  {section.links.map((li) => {
                    const link = links[li]
                    return (
                      <button key={link.id} onClick={() => scrollTo(link.id)} className={`block w-full text-left px-3 py-1.5 font-mono text-[12px] rounded border-l-2 border-transparent transition-all ${activeSection === link.id ? 'text-accent-green bg-accent-green/8 border-l-accent-green' : 'text-text-secondary hover:text-accent-green hover:bg-accent-green/5 hover:border-l-accent-green-dim'}`}>
                        {link.label}
                      </button>
                    )
                  })}
                </div>
                {si < sections.length - 1 && <div className="h-px bg-border mx-4 my-3" />}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <div className="ml-[280px] mt-[60px] flex justify-center">
          <main ref={mainRef} className="w-full max-w-[900px] px-[60px] py-10 pb-24">
            {content}
          </main>
        </div>
      </div>
    </LangContext.Provider>
  )
}
