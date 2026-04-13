import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Container } from '@/components/Container'
import { RichText } from '@/components/RichText'
import { getPayload, TypedLocale } from 'payload'
import config from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { resolveMedia } from '@/utils/resolveMedia'
import type { Area, Publication } from '@/payload-types'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function PublicationMetaPill({
  children,
  variant = 'neutral',
}: {
  children: ReactNode
  variant?: 'neutral' | 'secondary'
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-5 py-1 text-xs sm:text-sm leading-[22px]',
        variant === 'secondary'
          ? 'border-secondary text-secondary'
          : 'border-[#969696] text-[#969696]',
      )}
    >
      {children}
    </span>
  )
}

function RelatedPublicationCard({
  publication,
  locale,
}: {
  publication: Publication
  locale: string
}) {
  const image = resolveMedia(publication.imagem)
  const primaryArea = publication.areas?.find((area): area is Area => typeof area !== 'string')

  return (
    <Link
      href={`/${locale}/publicacoes/${publication.slug}`}
      className="group flex h-full flex-col text-[#969696]"
    >
      {image?.url && (
        <div className="relative mb-5 aspect-[451/323] overflow-hidden rounded-[24px] bg-[#e7e7e7]">
          <Image
            src={image.url}
            alt={image.alt || publication.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="mb-4 flex items-center justify-between gap-3 text-[11px] leading-[18px] sm:text-sm sm:leading-[22px]">
        <span>{formatDate(publication.createdAt)}</span>
        <PublicationMetaPill>{publication.type}</PublicationMetaPill>
      </div>

      <h2 className="mb-4 font-heading text-[24px] leading-[28px] font-light text-primary sm:text-[25px] sm:leading-[30px]">
        {publication.title}
      </h2>

      <div className="mb-6 line-clamp-3 text-sm leading-[22px] sm:text-base [&_p]:m-0 [&_p:not(:first-child)]:hidden">
        <RichText data={publication.content} />
      </div>

      <div className="mt-auto flex items-center justify-between gap-4">
        {primaryArea ? (
          <PublicationMetaPill variant="secondary">{primaryArea.title}</PublicationMetaPill>
        ) : (
          <span />
        )}

        <span className="flex items-center gap-3 font-heading text-sm font-bold text-primary transition-colors group-hover:text-secondary sm:text-base">
          Ler mais
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
          >
            <path
              d="M5.54163 13.4584L13.4583 5.54169M13.4583 5.54169H5.54163M13.4583 5.54169V13.4584"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  )
}

export default async function PublicacaoPage({
  params,
}: {
  params: Promise<{ locale: TypedLocale; slug: string }>
}) {
  const { locale, slug } = await params
  const payload = await getPayload({ config })

  const [result, settings] = await Promise.all([
    payload.find({
      collection: 'publications',
      where: { slug: { equals: slug } },
      locale,
      depth: 2,
      limit: 1,
    }),
    payload.findGlobal({ slug: 'settings', locale, depth: 10 }),
  ])

  const publication = result.docs[0]
  if (!publication) notFound()

  const image = resolveMedia(publication.imagem)
  const areas = publication.areas?.filter((area): area is Area => typeof area !== 'string') ?? []

  const relatedResult = await payload.find({
    collection: 'publications',
    locale,
    depth: 2,
    limit: 2,
    sort: '-createdAt',
    where: {
      and: [
        { slug: { not_equals: slug } },
        ...(areas.length > 0 ? [{ areas: { in: areas.map((a) => a.id) } }] : []),
      ],
    },
  })

  const related = relatedResult.docs

  return (
    <>
      <main className="bg-[#f7f7f7] pb-20 sm:pb-24">
        <Navbar logo={settings.logo} logoDark={settings.logoDark} />
        <Container className="pt-10 sm:pt-16 lg:pt-28">
          <section className="mx-auto max-w-230.5">
            <div className="mb-5 flex flex-wrap justify-between items-center gap-3 text-[#969696] sm:mb-7">
              <span className="text-xs leading-5.5 sm:text-sm">
                {formatDate(publication.createdAt)}
              </span>
              <div className="space-x-2.5">
                {areas[0] && (
                  <PublicationMetaPill variant="secondary">{areas[0].title}</PublicationMetaPill>
                )}
                <PublicationMetaPill>{publication.type}</PublicationMetaPill>
              </div>
            </div>

            {image?.url && (
              <div className="relative mb-8 aspect-[916/524] overflow-hidden rounded-[20px] bg-[#e7e7e7] sm:mb-10 sm:rounded-[30px]">
                <Image
                  src={image.url}
                  alt={image.alt || publication.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 916px"
                />
              </div>
            )}

            <h1 className="font-heading mb-14 text-[#969696] text-3xl sm:text-4xl xl:text-6xl font-light leading-snug lg:leading-14 mt-5">
              {publication.title}
            </h1>

            <div className="text-[#969696]">
              <RichText
                data={publication.content}
                className={cn(
                  'text-xl leading-7 sm:text-[20px] sm:leading-7.5',
                  '[&_p]:mb-8 [&_p:last-child]:mb-0',
                  '[&_h1]:mb-6 [&_h1]:font-heading [&_h1]:text-primary',
                  '[&_h2]:mb-5 [&_h2]:font-heading [&_h2]:text-primary',
                  '[&_h3]:mb-4 [&_h3]:font-heading [&_h3]:text-primary',
                  '[&_ul]:mb-8 [&_ul]:list-disc [&_ul]:pl-6',
                  '[&_ol]:mb-8 [&_ol]:list-decimal [&_ol]:pl-6',
                  '[&_li]:mb-2',
                  '[&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline',
                  '[&_strong]:font-medium [&_strong]:text-primary',
                )}
              />
            </div>
          </section>

          {related.length > 0 && (
            <section className="mx-auto mt-16 max-w-230.5 sm:mt-20 lg:mt-24">
              <h2 className="mb-8 font-heading text-[22px] leading-7.5 font-medium text-primary sm:mb-10 sm:text-[25px]">
                Publicações relacionadas
              </h2>

              <div className="grid gap-10 md:grid-cols-2 md:gap-5 lg:gap-8">
                {related.map((item) => (
                  <RelatedPublicationCard key={item.id} publication={item} locale={locale} />
                ))}
              </div>
            </section>
          )}
        </Container>
      </main>

      <Footer locale={locale} settings={settings} />
    </>
  )
}
