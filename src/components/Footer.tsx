import type { Media, Setting } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { resolveMedia } from '@/utils/resolveMedia'
import { Container } from './Container'
import { ButtonLink } from './ButtonLink'
import { NAV_LINKS } from '@/config/nav'
import { RichText } from './RichText'

const NAV_LEFT = NAV_LINKS.slice(0, Math.ceil(NAV_LINKS.length / 2))
const NAV_RIGHT = NAV_LINKS.slice(Math.ceil(NAV_LINKS.length / 2))

interface FooterProps {
  settings: Setting
  locale: string
}

export function Footer({ settings, locale }: FooterProps) {
  const logo = resolveMedia(settings.logo)

  return (
    <footer className="bg-[#202246] pt-20 lg:pt-36 pb-8">
      <Container className="flex flex-col">
        {/* Addresses */}
        <div className="flex flex-row flex-wrap lg:flex-nowrap gap-6 lg:gap-14 items-end mb-12 order-2 lg:order-1">
          {settings.location && (
            <div className="min-w-57">
              <RichText
                data={settings.location}
                className="text-white/80 text-sm sm:text-base leading-relaxed [&_strong]:text-secondary [&_strong]:font-medium [&_strong]:block [&_strong]:mb-1"
              />
            </div>
          )}
          {settings.locationTwo && (
            <div className="min-w-45">
              <RichText
                data={settings.locationTwo}
                className="text-white/80 text-sm sm:text-base leading-relaxed [&_strong]:text-secondary [&_strong]:font-medium [&_strong]:block [&_strong]:mb-1"
              />
            </div>
          )}
          <div className="w-full h-px bg-secondary hidden lg:flex" />
        </div>

        {/* Main row */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 mb-12 order-1 lg:order-2">
          {/* Logo */}
          <div className="shrink-0">
            {logo?.url && (
              <Link href={`/${locale}`}>
                <Image
                  src={logo.url}
                  alt={logo.alt}
                  width={433}
                  height={90}
                  className="w-55 lg:w-108.25 h-auto"
                />
              </Link>
            )}
          </div>
          {/* Right group */}
          <div className="flex flex-wrap gap-10 lg:gap-16">
            {/* Quick links */}
            <div>
              <p className="text-secondary text-sm font-medium mb-5">Acesso rápido</p>
              <ul className="flex flex-col gap-3">
                {NAV_LEFT.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={`/${locale}${link.href === '/' ? '' : link.href}`}
                      className="text-white/70 text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-0 lg:mt-8">
              <ul className="flex flex-col gap-3">
                {NAV_RIGHT.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className="text-white/70 text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social + Language */}
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-secondary text-sm font-medium mb-5">Acompanhe a gente</p>
                <div className="grid grid-cols-2 gap-3 gap-x-6">
                  {settings.instagram && (
                    <a
                      href={settings.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white/70 text-sm hover:text-white transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_16_1554)">
                          <path
                            d="M9.00302 4.37842C6.45077 4.37842 4.38452 6.44692 4.38452 8.99692C4.38452 11.5492 6.45302 13.6154 9.00302 13.6154C11.5553 13.6154 13.6215 11.5469 13.6215 8.99692C13.6215 6.44467 11.553 4.37842 9.00302 4.37842ZM9.00302 11.9947C7.34627 11.9947 6.00527 10.6529 6.00527 8.99692C6.00527 7.34092 7.34702 5.99917 9.00302 5.99917C10.659 5.99917 12.0008 7.34092 12.0008 8.99692C12.0015 10.6529 10.6598 11.9947 9.00302 11.9947Z"
                            fill="white"
                          />
                          <path
                            d="M12.711 0.0570283C11.055 -0.0202217 6.9533 -0.0164717 5.2958 0.0570283C3.8393 0.125278 2.55455 0.477028 1.5188 1.51278C-0.212202 3.24378 0.00904838 5.57628 0.00904838 8.99703C0.00904838 12.498 -0.185952 14.7765 1.5188 16.4813C3.25655 18.2183 5.6228 17.991 9.00305 17.991C12.471 17.991 13.668 17.9933 14.8943 17.5185C16.5615 16.8713 17.82 15.381 17.943 12.7043C18.021 11.0475 18.0165 6.94653 17.943 5.28903C17.7945 2.12928 16.0988 0.213028 12.711 0.0570283ZM15.3323 15.336C14.1975 16.4708 12.6233 16.3695 8.9813 16.3695C5.2313 16.3695 3.72755 16.425 2.6303 15.3248C1.36655 14.067 1.5953 12.0473 1.5953 8.98503C1.5953 4.84128 1.17005 1.85703 5.3288 1.64403C6.2843 1.61028 6.56555 1.59903 8.9708 1.59903L9.00455 1.62153C13.0013 1.62153 16.137 1.20303 16.3253 5.36103C16.368 6.30978 16.3778 6.59478 16.3778 8.99628C16.377 12.7028 16.4475 14.2155 15.3323 15.336Z"
                            fill="white"
                          />
                          <path
                            d="M13.8045 5.27569C14.4005 5.27569 14.8837 4.79249 14.8837 4.19644C14.8837 3.60038 14.4005 3.11719 13.8045 3.11719C13.2084 3.11719 12.7252 3.60038 12.7252 4.19644C12.7252 4.79249 13.2084 5.27569 13.8045 5.27569Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_16_1554">
                            <rect width="18" height="18" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>{' '}
                      Instagram
                    </a>
                  )}
                  {settings.linkedin && (
                    <a
                      href={settings.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white/70 text-sm hover:text-white transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="M16.2 16.2V10.926C16.2 8.334 15.642 6.354 12.618 6.354C11.16 6.354 10.188 7.146 9.79204 7.902H9.75604V6.588H6.89404V16.2H9.88204V11.43C9.88204 10.17 10.116 8.964 11.664 8.964C13.194 8.964 13.212 10.386 13.212 11.502V16.182H16.2V16.2Z"
                          fill="white"
                        />
                        <path d="M2.03406 6.58789H5.02206V16.1999H2.03406V6.58789Z" fill="white" />
                        <path
                          d="M3.52805 1.7998C2.57405 1.7998 1.80005 2.5738 1.80005 3.5278C1.80005 4.4818 2.57405 5.2738 3.52805 5.2738C4.48205 5.2738 5.25605 4.4818 5.25605 3.5278C5.25605 2.5738 4.48205 1.7998 3.52805 1.7998Z"
                          fill="white"
                        />
                      </svg>{' '}
                      Linkedin
                    </a>
                  )}
                  {settings.facebook && (
                    <a
                      href={settings.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white/70 text-sm hover:text-white transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 9 18"
                        fill="none"
                      >
                        <path
                          d="M2.5058 10.1602C2.44316 10.1602 1.06497 10.1602 0.438515 10.1602C0.104408 10.1602 0 10.025 0 9.68711C0 8.78598 0 7.86233 0 6.9612C0 6.60075 0.12529 6.48811 0.438515 6.48811H2.5058C2.5058 6.42053 2.5058 5.11389 2.5058 4.50563C2.5058 3.60451 2.65197 2.74844 3.06961 1.95995C3.50812 1.14894 4.13457 0.60826 4.92807 0.292866C5.45012 0.0901125 5.97216 0 6.53596 0H8.58237C8.87471 0 9 0.135169 9 0.450563V3.01877C9 3.33417 8.87471 3.46934 8.58237 3.46934C8.01856 3.46934 7.45476 3.46934 6.89095 3.49186C6.32715 3.49186 6.0348 3.78473 6.0348 4.41552C6.01392 5.09136 6.0348 5.74468 6.0348 6.44305H8.45708C8.79118 6.44305 8.91647 6.57822 8.91647 6.93867V9.66458C8.91647 10.025 8.81207 10.1377 8.45708 10.1377C7.70534 10.1377 6.09745 10.1377 6.0348 10.1377V17.4819C6.0348 17.8648 5.93039 18 5.55452 18C4.67749 18 3.82135 18 2.94432 18C2.63109 18 2.5058 17.8648 2.5058 17.5269C2.5058 15.1615 2.5058 10.2278 2.5058 10.1602Z"
                          fill="white"
                        />
                      </svg>{' '}
                      Facebook
                    </a>
                  )}
                  {settings.youtube && (
                    <a
                      href={settings.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white/70 text-sm hover:text-white transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="M17.2984 3.75345C16.6487 2.98107 15.4491 2.66602 13.1581 2.66602H4.84177C2.49834 2.66602 1.27841 3.0014 0.631103 3.82371C0 4.62546 0 5.80678 0 7.44176V10.558C0 13.7255 0.7488 15.3337 4.84177 15.3337H13.1581C15.1449 15.3337 16.2458 15.0557 16.958 14.3741C17.6884 13.6751 18 12.5338 18 10.558V7.44176C18 5.71754 17.9512 4.52925 17.2984 3.75345ZM11.5561 9.43013L7.77966 11.4038C7.69523 11.4479 7.60291 11.4698 7.5107 11.4698C7.4063 11.4698 7.30214 11.4417 7.20987 11.3859C7.03614 11.2806 6.93006 11.0923 6.93006 10.8892V6.95449C6.93006 6.75173 7.03585 6.5636 7.20923 6.45827C7.38267 6.35294 7.59838 6.34574 7.77832 6.43922L11.5547 8.40018C11.7469 8.49993 11.8675 8.69828 11.8678 8.91469C11.868 9.13127 11.7479 9.32991 11.5561 9.43013Z"
                          fill="white"
                        />
                      </svg>{' '}
                      Youtube
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div>
              <p className="text-secondary text-sm font-medium mb-3">Idiomas</p>
              <div className="flex flex-col gap-2">
                <Link
                  href={`/pt`}
                  className="text-white/70 text-sm hover:text-white transition-colors"
                >
                  PT-BR
                </Link>
                <Link
                  href={`/en`}
                  className="text-white/70 text-sm hover:text-white transition-colors"
                >
                  EN-US
                </Link>
              </div>
            </div>
          </div>{' '}
          {/* end right group */}
        </div>

        {/* Selos + CTA */}
        <div className="flex flex-col sm:flex-row items-start lg:items-center justify-between gap-6 py-8 order-3">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            {settings.selos?.map((selo, i) => {
              const seloMedia = resolveMedia(selo.logo)
              return seloMedia?.url ? (
                <Image
                  key={i}
                  src={seloMedia.url}
                  alt={seloMedia.alt}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              ) : null
            })}
          </div>

          <ButtonLink {...settings.cta} variant="green" />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 order-4">
          <p className="text-white/40 text-xs">
            ZNA, {new Date().getFullYear()}. Todos os direitos reservados.
          </p>
          <Link
            href={`/${locale}/politica-de-privacidade`}
            className="text-white/40 text-xs hover:text-white/70 transition-colors"
          >
            Política de cookies e privacidade
          </Link>
          <a
            href="https://macaw.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 text-xs hover:text-white/70 transition-colors"
          >
            macaw
          </a>
        </div>
      </Container>
    </footer>
  )
}
