import { useState, useEffect, useRef, useCallback } from 'react'
import { Search, X } from 'lucide-react'
import { Popover, PopoverContent, PopoverAnchor } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'

function getSnippet(text, query) {
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text.slice(0, 120) + '...'
  const start = Math.max(0, idx - 40)
  const end = Math.min(text.length, idx + query.length + 80)
  return (start > 0 ? '...' : '') + text.slice(start, end) + (end < text.length ? '...' : '')
}

function highlightMatch(snippet, query) {
  if (!query) return snippet
  const idx = snippet.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return snippet
  return (
    <>
      {snippet.slice(0, idx)}
      <mark className="bg-accent-green/30 text-accent-green rounded px-0.5">{snippet.slice(idx, idx + query.length)}</mark>
      {snippet.slice(idx + query.length)}
    </>
  )
}

export function SearchBar({ links, lang }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [open, setOpen] = useState(false)
  const [selectedIdx, setSelectedIdx] = useState(0)
  const inputRef = useRef(null)
  const indexRef = useRef([])

  // Build search index from DOM content
  const buildIndex = useCallback(() => {
    const entries = []
    for (const link of links) {
      const el = document.getElementById(link.id)
      if (!el) continue
      const text = el.innerText || ''
      entries.push({ id: link.id, label: link.label, text })
    }
    indexRef.current = entries
  }, [links])

  useEffect(() => {
    // Wait for DOM to update after lang change
    const raf = requestAnimationFrame(() => {
      buildIndex()
    })
    return () => cancelAnimationFrame(raf)
  }, [lang, buildIndex])

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }
      if (e.key === 'Escape') {
        setOpen(false)
        setQuery('')
        inputRef.current?.blur()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  // Search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setSelectedIdx(0)
      return
    }
    const q = query.toLowerCase()
    const matches = indexRef.current
      .filter((entry) => entry.text.toLowerCase().includes(q) || entry.label.toLowerCase().includes(q))
      .map((entry) => ({
        ...entry,
        snippet: getSnippet(entry.text, query),
      }))
    setResults(matches)
    setSelectedIdx(0)
  }, [query])

  const navigateToResult = (result) => {
    const el = document.getElementById(result.id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      // Flash highlight
      el.classList.add('ring-2', 'ring-accent-green', 'rounded-lg')
      setTimeout(() => {
        el.classList.remove('ring-2', 'ring-accent-green', 'rounded-lg')
      }, 2000)
    }
    setOpen(false)
    setQuery('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIdx((prev) => Math.min(prev + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIdx((prev) => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter' && results[selectedIdx]) {
      e.preventDefault()
      navigateToResult(results[selectedIdx])
    }
  }

  return (
    <Popover open={open && (results.length > 0 || query.trim().length > 0)} onOpenChange={setOpen}>
      <PopoverAnchor asChild>
        <div className="relative flex items-center">
          <Search size={14} className="absolute left-2.5 text-text-muted pointer-events-none" />
          <Input
            ref={inputRef}
            type="text"
            placeholder={lang === 'pt' ? 'Buscar... ⌘K' : 'Search... ⌘K'}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              if (!open) setOpen(true)
            }}
            onFocus={() => {
              if (query.trim()) setOpen(true)
            }}
            onKeyDown={handleKeyDown}
            className="pl-8 pr-8 w-[260px] h-8 text-[12px]"
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setOpen(false) }}
              className="absolute right-2.5 text-text-muted hover:text-text-primary transition-colors"
            >
              <X size={12} />
            </button>
          )}
        </div>
      </PopoverAnchor>
      <PopoverContent
        className="w-[400px] max-h-[350px] overflow-y-auto p-1"
        align="start"
        sideOffset={8}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {results.length === 0 && query.trim() ? (
          <div className="px-3 py-6 text-center text-text-muted text-[13px] font-mono">
            {lang === 'pt' ? 'Nenhum resultado encontrado' : 'No results found'}
          </div>
        ) : (
          results.map((result, i) => (
            <button
              key={result.id}
              onClick={() => navigateToResult(result)}
              className={`w-full text-left px-3 py-2.5 rounded-md transition-colors ${
                i === selectedIdx
                  ? 'bg-accent-green/10 text-accent-green'
                  : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
              }`}
            >
              <div className="font-mono text-[12px] font-medium mb-0.5">{result.label}</div>
              <div className="text-[11px] text-text-muted leading-relaxed line-clamp-2">
                {highlightMatch(result.snippet, query)}
              </div>
            </button>
          ))
        )}
      </PopoverContent>
    </Popover>
  )
}
