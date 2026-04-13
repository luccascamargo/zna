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
import { usePathname } from 'next/navigation'
import { NAV_LINKS } from '@/config/nav'

export { NAV_LINKS }

export const Navbar = ({
  logo,
  logoDark,
  fixed,
}: {
  logo: string | Media
  logoDark?: string | Media | null
  fixed?: boolean
}) => {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const elevated = fixed || scrolled
  const logoMedia = resolveMedia(elevated || !logoDark ? logo : logoDark)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={cn(
        'w-full transition-all duration-300',
        fixed ? 'fixed top-0 left-0 right-0 z-50' : 'sticky top-0 z-50',
        scrolled ? 'pt-4 pb-4 bg-primary' : 'pt-12',
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
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === '/'
                  ? /^\/[a-z]{2}(\/)?$/.test(pathname)
                  : pathname.includes(link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'font-heading relative pb-1',
                      elevated ? 'text-white' : 'text-primary',
                      'after:absolute after:bottom-0 after:left-0 after:h-px after:bg-secondary',
                      'after:transition-all after:duration-300',
                      isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Desktop actions */}
        <div className="hidden xl:flex items-center gap-4">
          <SearchDialog dark={elevated} />
          <LocaleSwitcher dark={elevated} />
        </div>

        {/* Mobile hamburger */}
        <div className="xl:hidden">
          <MobileMenu links={NAV_LINKS} dark={elevated} />
        </div>
      </Container>
    </div>
  )
}
