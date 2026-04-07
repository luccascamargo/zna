import type { Area, Home } from '@/payload-types'
import { Container } from './Container'
import { RichText } from './RichText'
import { ButtonLink } from './ButtonLink'
import { AreaCard } from './AreaCard'

interface ActuationSectionProps {
  data: Home['actuationSection']
  areas: Area[]
  locale: string
}

export function ActuationSection({ data, areas, locale }: ActuationSectionProps) {
  return (
    <section className="bg-[#F7F7F7] py-20">
      <Container>
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 gap-4">
          <RichText
            data={data.title}
            className="font-heading text-primary text-4xl sm:text-5xl font-extralight [&_strong]:font-semibold"
          />
          <p className="text-[#969696] text-sm sm:text-base max-w-md">{data.description}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {areas.map((area) => (
            <AreaCard key={area.id} area={area} locale={locale} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <ButtonLink
            {...data.cta}
            variant="green"
            className="group"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                className="transition-all group-hover:[&_path]:fill-secondary"
              >
                <path
                  d="M28 12V5C28 4.45 27.55 4 27 4H20C19.45 4 19 4.45 19 5V12C19 12.55 19.45 13 20 13H27C27.55 13 28 12.55 28 12ZM27 2C28.66 2 30 3.34 30 5V12C30 13.66 28.66 15 27 15H20C18.34 15 17 13.66 17 12V5C17 3.34 18.34 2 20 2H27Z"
                  fill="white"
                />
                <path
                  d="M28 27V20C28 19.45 27.55 19 27 19H20C19.45 19 19 19.45 19 20V27C19 27.55 19.45 28 20 28H27C27.55 28 28 27.55 28 27ZM27 17C28.66 17 30 18.34 30 20V27C30 28.66 28.66 30 27 30H20C18.34 30 17 28.66 17 27V20C17 18.34 18.34 17 20 17H27Z"
                  fill="white"
                />
                <path
                  d="M12 13C12.55 13 13 12.55 13 12V5C13 4.45 12.55 4 12 4H5C4.45 4 4 4.45 4 5V12C4 12.55 4.45 13 5 13H12ZM12 2C13.66 2 15 3.34 15 5V12C15 13.66 13.66 15 12 15H5C3.34 15 2 13.66 2 12V5C2 3.34 3.34 2 5 2H12Z"
                  fill="white"
                />
                <path
                  d="M12 28C12.55 28 13 27.55 13 27V20C13 19.45 12.55 19 12 19H5C4.45 19 4 19.45 4 20V27C4 27.55 4.45 28 5 28H12ZM12 17C13.66 17 15 18.34 15 20V27C15 28.66 13.66 30 12 30H5C3.34 30 2 28.66 2 27V20C2 18.34 3.34 17 5 17H12Z"
                  fill="white"
                />
              </svg>
            }
          />
        </div>
      </Container>
    </section>
  )
}
