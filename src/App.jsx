import { useState, useEffect, useRef } from 'react'
import { Menu, X, Languages } from 'lucide-react'
import { t, sidebarLinks, sidebarSections } from './translations'
import { contentEN } from './content-en'
import { contentPT } from './content-pt'
import { blogEN } from './blog-en'
import { blogPT } from './blog-pt'
import { configEN } from './config-en'
import { configPT } from './config-pt'
import { LangContext } from '@/components/LangContext'
import { SearchBar } from '@/components/SearchBar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export default function App() {
  const [lang, setLang] = useState('en')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const mainRef = useRef(null)

  const links = sidebarLinks[lang]
  const sections = sidebarSections[lang]
  const mainContent = lang === 'en' ? contentEN : contentPT
  const blogContent = lang === 'en' ? blogEN : blogPT
  const configContent = lang === 'en' ? configEN : configPT
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

  const SidebarNav = () => (
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
          {si < sections.length - 1 && <Separator className="mx-4 my-3" />}
        </div>
      ))}
    </nav>
  )

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
            <div className="hidden md:block">
              <SearchBar links={links} lang={lang} />
            </div>
            <div className="font-mono text-[11px] px-2.5 py-1 bg-bg-secondary border border-border rounded text-accent-cyan hidden sm:block">
              v2026.03 · 30 checkpoints + blog
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLang}
              className="flex items-center gap-1.5 font-mono text-[12px] text-accent-amber hover:border-accent-amber"
            >
              <Languages size={14} />
              {tr.lang}
            </Button>
          </div>
        </header>

        {/* Mobile menu - Sheet */}
        <div className="md:hidden">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <button className="fixed bottom-5 right-5 z-[60] w-12 h-12 rounded-full bg-accent-green text-bg flex items-center justify-center shadow-lg shadow-accent-green/30">
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0 bg-bg-secondary border-r border-border">
              <div className="p-4">
                <SearchBar links={links} lang={lang} />
              </div>
              <Separator />
              <SidebarNav />
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Sidebar */}
        <aside className="fixed top-[60px] left-0 w-[280px] h-[calc(100vh-60px)] bg-bg-secondary border-r border-border z-40 hidden md:block">
          <ScrollArea className="h-full">
            <SidebarNav />
          </ScrollArea>
        </aside>

        {/* Main content */}
        <div className="md:ml-[280px] mt-[60px] flex justify-center">
          <main ref={mainRef} className="w-full max-w-[900px] px-6 md:px-[60px] py-10 pb-24">
            {mainContent}
            {blogContent}
            {configContent}
          </main>
        </div>
      </div>
    </LangContext.Provider>
  )
}
