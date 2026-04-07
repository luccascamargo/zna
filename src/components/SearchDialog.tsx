'use client'

import { useRouter, useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={19}
      height={19}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.797.162a8.445 8.445 0 0110.092 8.282 8.451 8.451 0 01-1.778 5.173l3.58 3.581a1.055 1.055 0 11-1.493 1.493l-3.58-3.58a8.451 8.451 0 01-5.174 1.778A8.445 8.445 0 016.797.162zm1.647 1.95a6.334 6.334 0 100 12.667 6.334 6.334 0 000-12.668z"
        fill="currentColor"
      />
    </svg>
  )
}

export function SearchDialog() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [mounted, setMounted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    setOpen(false)
    setQuery('')
    router.push(`/${locale}/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir busca"
        className="flex bg-white p-2 rounded-full text-black items-center transition-opacity cursor-pointer"
      >
        <SearchIcon />
      </button>

      {mounted && open && createPortal(
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative z-10 w-full max-w-xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-3 bg-white rounded-md px-5 py-4 shadow-xl"
            >
              <SearchIcon className="shrink-0 text-[#202246]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar publicações, serviços..."
                className="flex-1 text-[#202246] placeholder-[#969696] text-base outline-none bg-transparent"
              />
              <button
                type="submit"
                disabled={!query.trim()}
                className="shrink-0 bg-[#202246] text-white text-sm px-4 py-2 rounded-xl disabled:opacity-40 transition-opacity"
              >
                Buscar
              </button>
            </form>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
