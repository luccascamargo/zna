import type { Home, Publication } from '@/payload-types'
import { ButtonLink } from './ButtonLink'
import { Container } from './Container'
import { RichText } from './RichText'
import { PublicationsCarousel } from './PublicationsCarousel'

interface PublicationsSectionProps {
  data: Home['publicationsSection']
  publications: Publication[]
  locale: string
}

export function PublicationsSection({ data, publications, locale }: PublicationsSectionProps) {
  return (
    <section
      className="py-20"
      style={{ background: 'linear-gradient(to bottom, white 45%, #202246 45%)' }}
    >
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="max-w-141.75">
            <RichText
              data={data.title}
              className="text-[#969696] font-heading text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extralight [&_strong]:text-primary"
            />
            <p className="text-[#969696] mt-7">{data.description}</p>
          </div>

          <ButtonLink {...data.cta} variant="primary" className="shrink-0" />
        </div>

        <PublicationsCarousel publications={publications} locale={locale} />
      </Container>
    </section>
  )
}
