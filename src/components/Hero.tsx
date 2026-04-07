import { Home, Media } from '@/payload-types'
import { Navbar } from './Navbar'
import Image from 'next/image'
import { resolveMedia } from '@/utils/resolveMedia'
import { RichText } from './RichText'
import { ButtonLink } from './ButtonLink'

export function Hero({ logo, home }: { logo: string | Media; home: Home }) {
  const backgroundImage = resolveMedia(home.hero.background)
  return (
    <div className="min-h-svh xl:min-h-0 xl:h-220 w-full relative flex items-center xl:items-end justify-center pb-16 xl:pb-25">
      {backgroundImage?.url && (
        <Image
          src={backgroundImage.url}
          alt={backgroundImage.alt}
          fill
          className="object-cover -z-10"
          quality={100}
          priority
        />
      )}
      <Navbar logo={logo} fixed />

      <div className="w-full max-w-6xl mx-auto flex flex-col px-6">
        <RichText
          data={home.hero.title}
          className="text-white font-heading text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extralight text-center [&_strong]:font-semibold"
        />
        <p className="text-white text-center text-sm sm:text-base leading-6 mt-4 sm:mt-5 mb-8 sm:mb-12 max-w-2xl mx-auto">
          {home.hero.description}
        </p>
        <div className="w-full flex flex-col sm:flex-row items-center gap-3 sm:gap-5 justify-center">
          <ButtonLink {...home.hero.cta1} variant={'white'} className="w-full sm:w-auto" />
          <ButtonLink {...home.hero.cta2} variant={'green'} className="w-full sm:w-auto" />
        </div>
      </div>
    </div>
  )
}
