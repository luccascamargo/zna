'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Area, Specialist, Expert } from '@/payload-types'
import { resolveMedia } from '@/utils/resolveMedia'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

type ExpertItem = Specialist
type ActuationItem = Area

function normalizeHref(value?: string | null) {
  if (!value) return '#'
  if (value.startsWith('http://') || value.startsWith('https://')) return value
  return `https://${value}`
}

function normalizeWhatsAppHref(value?: string | null) {
  if (!value) return '#'
  if (value.startsWith('http://') || value.startsWith('https://')) return value

  const digits = value.replace(/\D/g, '')
  return digits ? `https://wa.me/${digits}` : '#'
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.725 10.722C18.725 12.4254 17.2417 13.8088 15.4206 13.8088H4.57944C2.75832 13.8088 1.27501 12.4253 1.27501 10.722V4.27795C1.27501 3.70944 1.44164 3.17548 1.73087 2.7172L7.02069 7.65881C7.81209 8.40028 8.87188 8.80884 10.0011 8.80884C11.1281 8.80884 12.1879 8.40028 12.9793 7.65881L18.2691 2.7172C18.5584 3.17548 18.7249 3.7094 18.7249 4.27795V10.722H18.725ZM15.4206 1.19108H4.57944C3.82739 1.19108 3.13316 1.42885 2.57781 1.82444L7.92086 6.81794C8.47393 7.3324 9.21206 7.61776 10.0011 7.61776C10.7879 7.61776 11.5261 7.3324 12.0791 6.81794L17.4221 1.82444C16.8668 1.42885 16.1727 1.19108 15.4206 1.19108ZM15.4206 0H4.57944C2.05485 0 0 1.91959 0 4.27799V10.722C0 13.0826 2.05485 15 4.57944 15H15.4206C17.9452 15 20 13.0826 20 10.722V4.27795C20 1.91955 17.9452 0 15.4206 0Z"
        fill="#2AAB5E"
      />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M11.9429 0H3.98096C1.79163 0 0 1.79163 0 3.98096V11.9433C0 14.132 1.79163 15.9242 3.98096 15.9242H11.9429C14.1322 15.9242 15.9238 14.132 15.9238 11.9433V3.98096C15.9238 1.79163 14.1322 0 11.9429 0ZM14.5968 11.9433C14.5968 13.4063 13.4067 14.5972 11.9429 14.5972H3.98096C2.51776 14.5972 1.32705 13.4063 1.32705 11.9433V3.98096C1.32705 2.51757 2.51776 1.32705 3.98096 1.32705H11.9429C13.4067 1.32705 14.5968 2.51757 14.5968 3.98096V11.9433Z"
        fill="#2AAB5E"
      />
      <path
        d="M12.2765 4.64441C12.8261 4.64441 13.2717 4.19883 13.2717 3.64917C13.2717 3.09951 12.8261 2.65393 12.2765 2.65393C11.7268 2.65393 11.2812 3.09951 11.2812 3.64917C11.2812 4.19883 11.7268 4.64441 12.2765 4.64441Z"
        fill="#2AAB5E"
      />
      <path
        d="M7.9624 3.98096C5.76331 3.98096 3.98145 5.76302 3.98145 7.96191C3.98145 10.16 5.76331 11.9433 7.9624 11.9433C10.1609 11.9433 11.9434 10.16 11.9434 7.96191C11.9434 5.76302 10.1609 3.98096 7.9624 3.98096ZM7.9624 10.6162C6.4968 10.6162 5.3085 9.42791 5.3085 7.96191C5.3085 6.49592 6.4968 5.30801 7.9624 5.30801C9.42801 5.30801 10.6163 6.49592 10.6163 7.96191C10.6163 9.42791 9.42801 10.6162 7.9624 10.6162Z"
        fill="#2AAB5E"
      />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M15.4313 15.4311V9.77947C15.4313 7.00189 14.8333 4.88013 11.5928 4.88013C10.0304 4.88013 8.98883 5.72883 8.56447 6.53896H8.5259V5.13088H5.45898V15.4311H8.66092V10.3196C8.66092 8.96934 8.91167 7.677 10.5705 7.677C12.21 7.677 12.2293 9.20081 12.2293 10.3967V15.4118H15.4313V15.4311Z"
        fill="#2AAB5E"
      />
      <path d="M0.250977 5.13086H3.45291V15.4311H0.250977V5.13086Z" fill="#2AAB5E" />
      <path
        d="M1.85172 0C0.829416 0 0 0.829416 0 1.85172C0 2.87402 0.829416 3.72273 1.85172 3.72273C2.87402 3.72273 3.70344 2.87402 3.70344 1.85172C3.70344 0.829416 2.87402 0 1.85172 0Z"
        fill="#2AAB5E"
      />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M15.1587 2.58549C13.4862 0.919199 11.2612 0.00095085 8.89315 0C6.53043 0 4.30191 0.917433 2.61836 2.58332C0.931831 4.25206 0.00217337 6.46971 0 8.81966V8.82238V8.82401C0.000271671 10.2463 0.373955 11.6812 1.08329 12.9909L0.0243146 17.8042L4.89306 16.6968C6.12618 17.3182 7.50206 17.6458 8.88975 17.6464H8.89328C11.2556 17.6464 13.4841 16.7288 15.1679 15.0628C16.856 13.3927 17.786 11.1779 17.7871 8.82645C17.7878 6.49158 16.8545 4.27515 15.1587 2.58549ZM8.89315 16.2568H8.89002C7.644 16.2562 6.4094 15.9434 5.31986 15.3519L5.08962 15.2269L1.85212 15.9632L2.55534 12.7673L2.41977 12.5335C1.74576 11.3712 1.3896 10.0881 1.3896 8.82251C1.39218 4.72612 4.75791 1.3896 8.89288 1.3896C10.8905 1.39041 12.7674 2.16481 14.178 3.56989C15.6098 4.99671 16.3981 6.86336 16.3974 8.82604C16.3957 12.9234 13.0293 16.2568 8.89315 16.2568Z"
        fill="#2AAB5E"
      />
      <path
        d="M6.47339 4.93323H6.08354C5.94784 4.93323 5.72752 4.98403 5.54115 5.18683C5.35465 5.38977 4.8291 5.88027 4.8291 6.87785C4.8291 7.87542 5.55813 8.83931 5.65974 8.97474C5.76148 9.11003 7.06699 11.2225 9.13468 12.0352C10.8531 12.7106 11.2029 12.5763 11.5758 12.5425C11.9488 12.5088 12.7794 12.0521 12.9489 11.5787C13.1185 11.1053 13.1185 10.6994 13.0677 10.6147C13.0167 10.5302 12.881 10.4795 12.6777 10.3782C12.4742 10.2767 11.4772 9.77794 11.2907 9.71015C11.1042 9.64264 10.9686 9.60882 10.8329 9.81189C10.6972 10.0146 10.2977 10.4835 10.179 10.6188C10.0604 10.7542 9.94168 10.7712 9.73819 10.6697C9.53471 10.568 8.88623 10.3501 8.10912 9.65949C7.50424 9.12199 7.08451 8.43656 6.96579 8.23362C6.84721 8.03082 6.95316 7.92106 7.05517 7.81987C7.14659 7.72913 7.27006 7.60498 7.37181 7.48666C7.47341 7.36821 7.50234 7.28372 7.57026 7.14843C7.63804 7.01314 7.60408 6.89469 7.55328 6.79336C7.50234 6.69189 7.11195 5.68929 6.93102 5.2883H6.93116C6.77875 4.95061 6.61833 4.9392 6.47339 4.93323Z"
        fill="#2AAB5E"
      />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

function SocialAction({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-secondary transition-colors hover:text-primary"
    >
      {children}
    </a>
  )
}

function ExpertCard({ expert, locale }: { expert: ExpertItem; locale: string }) {
  const image = resolveMedia(expert.image)
  const expertAreas = expert.areas.filter((item): item is Area => typeof item !== 'string')

  return (
    <article className="flex h-full flex-col">
      <h2 className="font-heading text-2xl font-light text-primary">{expert.name}</h2>

      <div className="relative mt-4 overflow-hidden rounded-3xl bg-muted">
        {image?.url && (
          <Image
            src={image.url}
            alt={image.alt || expert.name}
            width={640}
            height={720}
            className="h-80 w-full object-cover"
          />
        )}

        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-full border border-border bg-card px-4 py-2 shadow-sm">
          <SocialAction href={`mailto:${expert.email}`} label={`Enviar email para ${expert.name}`}>
            <MailIcon />
          </SocialAction>
          <SocialAction
            href={normalizeHref(expert.instagram)}
            label={`Abrir Instagram de ${expert.name}`}
          >
            <InstagramIcon />
          </SocialAction>
          <SocialAction
            href={normalizeHref(expert.linkedin)}
            label={`Abrir Linkedin de ${expert.name}`}
          >
            <LinkedinIcon />
          </SocialAction>
          <SocialAction
            href={normalizeWhatsAppHref(expert.whatsapp)}
            label={`Abrir WhatsApp de ${expert.name}`}
          >
            <WhatsAppIcon />
          </SocialAction>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {expertAreas.map((item) => (
          <span
            key={item.id}
            className="rounded-lg bg-card px-4 py-2 text-xs text-muted-foreground"
          >
            {item.title}
          </span>
        ))}
      </div>

      <p className="mt-4 text-sm leading-5.5 text-muted-foreground">{expert.description}</p>

      <Button asChild className="mt-6 w-full justify-between group">
        <Link href={`/${locale}/publicacoes`}>
          Ver as publicações
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            className="transition-all group-hover:[&_path]:fill-primary"
          >
            <g clipPath="url(#clip0_2150_172)">
              <path
                d="M13.5 27C6.0558 27 0 20.9442 0 13.5C0 6.0558 6.0558 0 13.5 0C20.9442 0 27 6.0558 27 13.5C27 20.9442 20.9442 27 13.5 27ZM13.5 1.6875C6.98627 1.6875 1.6875 6.98627 1.6875 13.5C1.6875 20.0137 6.98627 25.3125 13.5 25.3125C20.0137 25.3125 25.3125 20.0137 25.3125 13.5C25.3125 6.98627 20.0137 1.6875 13.5 1.6875Z"
                fill="white"
              />
              <path
                d="M19.4062 14.3438H7.59375C7.128 14.3438 6.75 13.9658 6.75 13.5C6.75 13.0342 7.128 12.6562 7.59375 12.6562H19.4062C19.872 12.6562 20.25 13.0342 20.25 13.5C20.25 13.9658 19.872 14.3438 19.4062 14.3438Z"
                fill="white"
              />
              <path
                d="M13.5 20.25C13.0342 20.25 12.6562 19.872 12.6562 19.4062V7.59375C12.6562 7.128 13.0342 6.75 13.5 6.75C13.9658 6.75 14.3438 7.128 14.3438 7.59375V19.4062C14.3438 19.872 13.9658 20.25 13.5 20.25Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_2150_172">
                <rect width="27" height="27" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Link>
      </Button>
    </article>
  )
}

interface ExpertsDirectoryProps {
  experts: Specialist[]
  locale: string
  title?: string
  description?: string
  actuationAreaLabel?: string
  expertsPage?: Expert
}

export function ExpertsDirectory({ experts, locale, expertsPage }: ExpertsDirectoryProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const actuationOptions = experts.reduce<ActuationItem[]>((acc, expert) => {
    expert.areas.forEach((item) => {
      if (typeof item === 'string') return
      const key = item.slug || item.title
      if (!acc.some((current) => (current.slug || current.title) === key)) {
        acc.push(item)
      }
    })
    return acc
  }, [])

  const filteredExperts = activeFilter
    ? experts.filter((expert) =>
        expert.areas.some((item) => {
          if (typeof item === 'string') return false
          return (item.slug || item.title) === activeFilter
        }),
      )
    : experts

  return (
    <section className="bg-[#F7F7F7] pb-24 pt-10 sm:pb-28 sm:pt-14 lg:pb-32 lg:pt-24">
      <div className="mx-auto flex w-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-4xl font-extralight leading-tight text-primary sm:text-5xl lg:text-6xl">
            {expertsPage?.title ?? 'Especialistas'}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
            {expertsPage?.description ?? 'Conheça os especialistas da nossa equipe.'}
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-4 lg:items-start">
          <div>
            <p className="font-heading text-2xl font-medium text-primary">
              {expertsPage?.actuationArea ?? 'Áreas de atuação'}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:col-span-3 lg:justify-end">
            {actuationOptions.map((item) => {
              const value = item.slug || item.title
              const isActive = activeFilter === value

              return (
                <button
                  key={item.id ?? value}
                  type="button"
                  onClick={() => setActiveFilter(isActive ? null : value)}
                  className={cn(
                    'rounded-lg px-5 py-2 text-sm transition-colors cursor-pointer',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-muted-foreground hover:bg-muted hover:text-primary',
                  )}
                >
                  {item.title}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          {filteredExperts.map((expert) => (
            <ExpertCard key={expert.id ?? expert.name} expert={expert} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  )
}
