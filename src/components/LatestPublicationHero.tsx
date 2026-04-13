import type { Area, Publication } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { resolveMedia } from '@/utils/resolveMedia'
import { RichText } from './RichText'
import { Container } from './Container'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

interface LatestPublicationHeroProps {
  publication: Publication
  locale: string
}

export function LatestPublicationHero({ publication, locale }: LatestPublicationHeroProps) {
  const image = resolveMedia(publication.imagem)
  const areas = publication.areas?.filter((a): a is Area => typeof a !== 'string') ?? []

  return (
    <section className="bg-white overflow-hidden mt-20">
      <Link
        href={`/${locale}/publicacoes/${publication.slug}`}
        className="group flex flex-col lg:flex-row lg:min-h-148.25"
      >
        {/* Image — flush to the left edge */}
        {image?.url && (
          <div className="relative w-full lg:w-1/2 aspect-4/3 lg:aspect-auto shrink-0 overflow-hidden lg:rounded-br-[30px] lg:rounded-tr-[30px]">
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              quality={90}
              priority
            />
          </div>
        )}

        {/* Content — padded like the Container */}
        <div className="flex flex-col justify-center w-full lg:w-1/2 px-4 sm:px-8 py-10 lg:pl-12 lg:pr-4 lg:py-12 lg:max-w-171">
          {/* Tags + Date */}
          <div className="flex items-center flex-wrap gap-2">
            {areas.map((area) => (
              <span
                key={area.id}
                className="border border-secondary rounded-full px-4 py-0.5 text-secondary text-sm"
              >
                {area.title}
              </span>
            ))}
            <span className="border border-[#969696] rounded-full px-4 py-0.5 text-[#969696] text-sm">
              {publication.type}
            </span>
            <span className="sm:ml-auto text-[#969696] text-sm">
              {formatDate(publication.createdAt)}
            </span>
          </div>

          {/* Title */}
          <h2 className="font-heading text-[#969696] text-3xl sm:text-4xl xl:text-5xl font-light leading-snug lg:leading-14 mt-5">
            {publication.title}
          </h2>

          {/* Content preview */}
          <div className="line-clamp-5 text-[#969696] text-sm sm:text-base leading-relaxed mt-5 lg:max-w-119.75">
            <RichText data={publication.content} className="" />
          </div>

          {/* Read more */}
          <span className="flex items-center gap-1.5 text-[#969696] font-medium text-sm mt-8 group-hover:text-secondary transition-colors">
            Ler mais
            <svg
              width={19}
              height={19}
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
    </section>
  )
}
