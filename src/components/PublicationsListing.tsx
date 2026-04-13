import type { Area, Publication } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { resolveMedia } from '@/utils/resolveMedia'
import { RichText } from './RichText'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function PublicationCard({ publication, locale }: { publication: Publication; locale: string }) {
  const image = resolveMedia(publication.imagem)
  const areas = publication.areas?.filter((a): a is Area => typeof a !== 'string') ?? []

  return (
    <Link href={`/${locale}/publicacoes/${publication.slug}`} className="group flex flex-col">
      {image?.url && (
        <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden mb-5">
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-[#969696]">{formatDate(publication.createdAt)}</span>
        <span className="border border-[#969696] rounded-full px-3 py-0.5 text-[#969696] text-xs">
          {publication.type}
        </span>
      </div>

      <h3 className="font-heading text-[#969696] text-xl font-light leading-snug mb-3">
        {publication.title}
      </h3>

      <div className="line-clamp-3 text-[#969696] text-sm leading-relaxed mb-5 flex-1">
        <RichText data={publication.content} className="" />
      </div>

      <div className="flex items-center justify-between mt-auto">
        {areas[0] && (
          <span className="border border-secondary rounded-full px-3 py-0.5 text-secondary text-xs">
            {areas[0].title}
          </span>
        )}
        <span className="flex items-center gap-1.5 text-[#969696] font-medium text-sm ml-auto group-hover:text-secondary transition-colors">
          Ler mais
          <svg
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </span>
      </div>
    </Link>
  )
}

interface PublicationsListingProps {
  publications: Publication[]
  locale: string
}

export function PublicationsListing({ publications, locale }: PublicationsListingProps) {
  if (!publications.length) {
    return <div className="py-20 text-center text-[#969696]">Nenhuma publicação encontrada.</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 py-10">
      {publications.map((pub) => (
        <PublicationCard key={pub.id} publication={pub} locale={locale} />
      ))}
    </div>
  )
}
