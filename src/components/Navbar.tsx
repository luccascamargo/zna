'use client'

import type { Media } from '@/payload-types'
import { resolveMedia } from '@/utils/resolveMedia'
import Image from 'next/image'
import { Container } from './Container'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import LocaleSwitcher from './LocaleSwitcher'
import { SearchDialog } from './SearchDialog'
import { MobileMenu } from './MobileMenu'
import { useEffect, useState } from 'react'
import { NAV_LINKS } from '@/config/nav'

export { NAV_LINKS }

export const Navbar = ({ logo, fixed }: { logo: string | Media; fixed?: boolean }) => {
  const logoMedia = resolveMedia(logo)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={cn(
        'w-full transition-all duration-300',
        fixed && 'fixed top-0 left-0 right-0 z-50',
        scrolled ? 'pt-4 pb-4 backdrop-blur-md bg-primary/60' : 'pt-12',
      )}
    >
      <Container className="flex items-center justify-between">
        {logoMedia?.url && (
          <Link href={'/'}>
            <Image src={logoMedia.url} alt={logoMedia.alt} width={220} height={46} />
          </Link>
        )}

        {/* Desktop nav */}
        <nav className="hidden xl:block">
          <ul className="flex space-x-12">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="font-heading text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop actions */}
        <div className="hidden xl:flex items-center gap-4">
          <SearchDialog />
          <LocaleSwitcher />
        </div>

        {/* Mobile hamburger */}
        <div className="xl:hidden">
          <MobileMenu links={NAV_LINKS} />
        </div>
      </Container>
    </div>
  )
}
