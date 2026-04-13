'use client'

import { RichText } from '@/components/RichText'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { About } from '@/payload-types'
import { resolveMedia } from '@/utils/resolveMedia'
import Image from 'next/image'

type AwardItem = NonNullable<About['awards']>['items'][number]
type AwardTitle = NonNullable<About['awards']>['title']

function AwardCard({ item }: { item: AwardItem }) {
  const image = resolveMedia(item.image)

  return (
    <article className="rounded-[24px] bg-white text-center lg:rounded-[30px] flex flex-col items-center my-auto select-none">
      {image?.url && (
        <div className="relative mx-auto mb-5 h-20 w-16 lg:mb-6">
          <Image
            src={image.url}
            alt={image.alt || 'Premiacao'}
            fill
            className="object-contain"
            sizes="64px"
          />
        </div>
      )}

      <RichText
        data={item.title}
        className="font-heading text-2xl font-light text-[#969696] [&_p]:m-0"
      />
      <RichText
        data={item.description}
        className="mt-3 text-sm leading-5.5 text-[#969696] [&_p]:m-0"
      />
    </article>
  )
}

export function AwardsCarousel({
  awards,
  awardsTitle,
}: {
  awards: AwardItem[]
  awardsTitle: AwardTitle
}) {
  if (!awards.length) return null

  return (
    <Carousel opts={{ align: 'start', loop: false }} className="w-full">
      <div className="flex justify-between flex-wrap gap-9">
        <div className="lg:translate-y-24">
          <RichText
            data={awardsTitle}
            className="max-w-full lg:max-w-138.5 font-heading text-2xl font-extralight text-white sm:text-5xl lg:text-6xl"
          />

          <div className="mt-16 flex space-x-2.5">
            <CarouselPrevious className="static h-8 w-8 translate-x-0 translate-y-0 bg-secondary text-white hover:bg-secondary/90 border-none" />
            <CarouselNext className="static h-8 w-8 translate-x-0 translate-y-0 bg-secondary text-white hover:bg-secondary/90 border-none" />
          </div>
        </div>

        <div className="bg-white p-14 rounded-[30px] min-h-fit lg:min-h-121 flex-1">
          <CarouselContent className="-ml-5">
            {awards.map((item, index) => (
              <CarouselItem key={index} className="pl-5 basis-full lg:basis-1/2 xl:basis-1/3">
                <AwardCard item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </div>
    </Carousel>
  )
}
