'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { SearchDialog } from './SearchDialog'
import LocaleSwitcher from './LocaleSwitcher'

interface NavLink {
  label: string
  href: string
}

interface MobileMenuProps {
  links: NavLink[]
}

export function MobileMenu({ links }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        className="relative flex flex-col justify-center items-center w-8 h-8 gap-1.5"
      >
        <span
          className={`block h-0.5 w-6 bg-white transition-all duration-300 origin-center ${
            open ? 'translate-y-2 rotate-45' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
            open ? 'opacity-0 scale-x-0' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-white transition-all duration-300 origin-center ${
            open ? '-translate-y-2 -rotate-45' : ''
          }`}
        />
      </button>

      {mounted && createPortal(
        <>
          {/* Overlay */}
          <div
            className={`fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
              open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setOpen(false)}
          />

          {/* Slide-in panel */}
          <div
            className={`fixed top-0 right-0 z-[101] h-full w-4/5 max-w-sm bg-[#202246] flex flex-col pt-24 px-8 pb-8 transition-transform duration-300 ease-in-out ${
              open ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <nav className="flex-1">
              <ul className="flex flex-col gap-6">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="font-heading text-white text-xl font-light hover:opacity-70 transition-opacity"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-4 pt-8 border-t border-white/20">
              <SearchDialog />
              <LocaleSwitcher />
            </div>
          </div>
        </>,
        document.body,
      )}
    </>
  )
}
