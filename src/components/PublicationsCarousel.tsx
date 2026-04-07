'use client'

import type { Area, Media, Publication } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { resolveMedia } from '@/utils/resolveMedia'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { RichText } from './RichText'

interface PublicationsCarouselProps {
  publications: Publication[]
  locale: string
}

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
    <Link
      href={`/${locale}/publicacoes/${publication.id}`}
      className="flex flex-col h-full bg-[#202246] rounded-[30px] overflow-hidden"
    >
      {image?.url && (
        <div className="relative h-87.5 w-full shrink-0">
          <Image src={image.url} alt={image.alt} fill className="object-cover rounded-[30px]" />
        </div>
      )}

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white">{formatDate(publication.createdAt)}</span>
          <span className="border border-white rounded-[30px] px-5 py-0.5 text-white/80 text-sm">
            {publication.type}
          </span>
        </div>

        <h3 className="font-heading text-white text-2xl font-light leading-snug mt-3.5">
          {publication.title}
        </h3>

        <div className="line-clamp-3 text-white sm:text-sm mt-10">
          <RichText data={publication.content} className="" />
        </div>

        <div className="flex items-center justify-between mt-16">
          {areas[0] && (
            <span className="border border-secondary rounded-[30px] px-5 py-0.5 text-secondary text-sm">
              {areas[0].title}
            </span>
          )}
          <span className="flex items-center gap-1.5 text-white font-medium text-sm ml-auto">
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
      </div>
    </Link>
  )
}

export function PublicationsCarousel({ publications, locale }: PublicationsCarouselProps) {
  if (!publications.length) return null

  return (
    <Carousel opts={{ align: 'start', loop: false }} className="w-full">
      <div className="flex gap-6">
        <CarouselContent className="-ml-6 flex-1">
          {publications.map((pub) => (
            <CarouselItem key={pub.id} className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3">
              <PublicationCard publication={pub} locale={locale} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="hidden sm:flex flex-col gap-2 justify-center shrink-0">
          <CarouselPrevious className="static translate-x-0 translate-y-0 bg-white text-[#202246] hover:bg-white/90 border-none" />
          <CarouselNext className="static translate-x-0 translate-y-0 bg-secondary text-white hover:bg-secondary/90 border-none" />
        </div>
      </div>

      <div className="flex sm:hidden gap-2 justify-start mt-6">
        <CarouselPrevious className="static translate-x-0 translate-y-0 bg-white text-[#202246] hover:bg-white/90 border-none" />
        <CarouselNext className="static translate-x-0 translate-y-0 bg-secondary text-white hover:bg-secondary/90 border-none" />
      </div>
    </Carousel>
  )
}
