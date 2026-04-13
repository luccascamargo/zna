import config from '@payload-config'
import { ButtonLink } from '@/components/ButtonLink'
import { ContactPageForm } from '@/components/ContactPageForm'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { RichText } from '@/components/RichText'
import type { Area, Publication } from '@/payload-types'
import { resolveMedia } from '@/utils/resolveMedia'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload, TypedLocale } from 'payload'
import { notFound } from 'next/navigation'

function formatPublicationDate(dateValue: string) {
  const date = new Date(dateValue)
  const day = new Intl.DateTimeFormat('pt-BR', { day: '2-digit' }).format(date)
  const month = new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(date)
  const year = new Intl.DateTimeFormat('pt-BR', { year: 'numeric' }).format(date)

  return `${day}.${month}${year}`
}

function SendIcon() {
  return (
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" aria-hidden="true">
      <path
        d="M20.6363 3.52199C20.5302 3.43374 20.4008 3.37781 20.264 3.36094C20.1273 3.34408 19.9886 3.367 19.8646 3.42699L4.86458 10.927C4.73436 10.9921 4.62872 11.0978 4.56366 11.228C4.4986 11.3582 4.47776 11.5059 4.50416 11.6488C4.53056 11.7916 4.60276 11.922 4.71032 12.0207C4.81787 12.1193 4.95406 12.18 5.09858 12.194L11.6366 12.849L12.2916 19.387C12.3056 19.5315 12.3662 19.6677 12.4649 19.7752C12.5636 19.8828 12.6939 19.955 12.8368 19.9814C12.9797 20.0078 13.1273 19.9869 13.2576 19.9219C13.3878 19.8568 13.4934 19.7512 13.5586 19.621L21.0586 4.62099C21.1185 4.49702 21.1415 4.35827 21.1246 4.22156C21.1078 4.08485 21.0518 3.95535 20.9636 3.84925C20.8753 3.74314 20.7585 3.66498 20.627 3.62408C20.4955 3.58317 20.355 3.58126 20.2225 3.61858L20.6363 3.52199ZM12.3636 17.334L11.7916 11.612C11.773 11.4261 11.6882 11.253 11.5532 11.1231C11.4182 10.9932 11.242 10.915 11.0556 10.904L5.33358 10.332L18.5656 3.71699L12.3636 17.334Z"
        fill="currentColor"
      />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg
      className="h-5 w-5 shrink-0"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1.96875 17.2787L17.2464 2.00101M17.2464 2.00101L2.07112 2.02658M17.2464 2.00101L17.272 17.1763"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PublicationCard({
  publication,
  locale,
}: {
  publication: Publication
  locale: TypedLocale
}) {
  const image = resolveMedia(publication.imagem)
  const primaryArea = publication.areas?.find((area): area is Area => typeof area !== 'string')

  return (
    <Link
      href={`/${locale}/publicacoes/${publication.slug}`}
      className="group flex min-h-0 flex-col text-inherit no-underline lg:min-h-[41.5rem]"
    >
      {image?.url && (
        <div className="relative h-64 overflow-hidden rounded-[24px] sm:h-72 lg:h-[263px] lg:rounded-[30px]">
          <Image
            src={image.url}
            alt={image.alt || publication.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 1023px) 100vw, 33vw"
          />
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 lg:pt-5">
        <span className="text-[14px] leading-[22px] text-[#969696]">
          {formatPublicationDate(publication.createdAt)}
        </span>
        <span className="inline-flex min-h-8 items-center justify-center rounded-full border border-[#969696] bg-[#d9d9d9] px-5 py-1 text-[14px] leading-[22px] text-primary">
          {publication.type}
        </span>
      </div>

      <h2 className="mt-4 font-heading text-[1.625rem] leading-[1.9rem] font-light text-primary lg:min-h-[5.8rem]">
        {publication.title}
      </h2>

      <div className="mt-4 line-clamp-3 text-[15px] leading-[22px] text-[#969696] lg:mt-5 lg:text-base">
        <RichText data={publication.content} className="[&_p]:m-0 [&_*]:inline" />
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-4 lg:mt-auto lg:flex-row lg:items-center lg:pt-8">
        {primaryArea && (
          <span className="inline-flex min-h-8 items-center justify-center rounded-full border border-secondary px-5 py-1 text-[14px] leading-[22px] text-secondary">
            {primaryArea.title}
          </span>
        )}
        <span className="inline-flex items-center gap-3 font-heading text-base leading-[22px] font-bold text-primary transition-colors group-hover:text-secondary">
          Ler mais
          <ArrowIcon />
        </span>
      </div>
    </Link>
  )
}

export default async function AreaDeAtuacaoInternaPage({
  params,
}: {
  params: Promise<{ locale: TypedLocale; slug: string }>
}) {
  const payload = await getPayload({ config })
  const { locale, slug } = await params

  const [settings, areaResult, areasResult] = await Promise.all([
    payload.findGlobal({
      slug: 'settings',
      locale,
      depth: 10,
    }),
    payload.find({
      collection: 'areas',
      locale,
      depth: 2,
      limit: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    }),
    payload.find({
      collection: 'areas',
      locale,
      depth: 0,
      limit: 100,
      sort: 'title',
    }),
  ])

  const area = areaResult.docs[0] as Area | undefined

  if (!area) {
    notFound()
  }

  const relatedPublicationsResult = area.relations?.publications?.length
    ? await payload.find({
        collection: 'publications',
        locale,
        depth: 2,
        limit: 3,
        sort: '-createdAt',
        where: {
          id: {
            in: area.relations.publications
              .map((publication: string | Publication) =>
                typeof publication === 'string' ? publication : publication.id,
              )
              .filter(Boolean),
          },
        },
      })
    : { docs: [] }

  const heroIcon = resolveMedia(area.icon)
  const heroImage = resolveMedia(area.hero.image)
  const areas = areasResult.docs as Area[]
  const relatedPublications = relatedPublicationsResult.docs as Publication[]
  const heroButtonLabel = locale === 'en' ? 'Talk to a specialist' : 'Fale com um especialista'

  return (
    <>
      <main className="bg-[#f7f7f7]">
        <Navbar logo={settings.logo} logoDark={settings.logoDark} />

        <Container className="pt-14 md:pt-18 lg:pt-24">
          <section className="grid gap-8 lg:gap-10">
            <div className="flex justify-between xl:flex-row flex-col">
              <div className="flex flex-col gap-4 xl:grid xl:content-start xl:gap-30 lg:pt-1">
                {heroIcon?.url ? (
                  <div className="relative h-8 w-8 shrink-0 lg:h-9 lg:w-9">
                    <Image src={heroIcon.url} alt={heroIcon.alt || area.hero.subTitle} fill />
                  </div>
                ) : null}

                <p className="max-w-32 font-heading text-lg leading-6 font-medium text-secondary lg:max-w-40 lg:text-[1.55rem] lg:leading-[1.2]">
                  {area.title}
                </p>
              </div>

              <div className="max-w-[44.5rem] mt-10 lg:mt-0">
                <h1 className="max-w-[45.25rem] font-heading text-[2.6rem] leading-[0.98] font-extralight tracking-tight text-primary sm:text-5xl sm:leading-[0.98] lg:text-[3.75rem]">
                  {area.hero.subTitle}
                </h1>
                <div className="mt-5 max-w-[44.5rem] text-sm leading-[22px] text-[#969696] lg:mt-6 lg:text-base [&_p]:m-0 [&_p+p]:mt-[22px]">
                  <RichText data={area.hero.description} />
                </div>
              </div>

              <div className="flex justify-start mt-10 xl:items-start xl:justify-end xl:pt-51">
                <ButtonLink
                  title={heroButtonLabel}
                  href={`/${locale}/contato`}
                  variant="primary"
                  className="whitespace-nowrap font-normal font-heading leading-5.5"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M21.6814 1.65076C20.6009 1.56249 19.2566 1.5625 17.542 1.5625H12.4581C10.7434 1.5625 9.39911 1.56249 8.31868 1.65076C7.21849 1.74065 6.30961 1.92673 5.48694 2.34589C4.13453 3.03498 3.03498 4.13453 2.34589 5.48694C1.92673 6.30961 1.74065 7.2185 1.65076 8.31868C1.56249 9.39911 1.5625 10.7434 1.5625 12.4581V17.7854C1.5625 20.907 4.09301 23.4375 7.21458 23.4375H7.96676C8.27739 23.4375 8.48979 23.7513 8.37443 24.0396C7.5161 26.1855 9.98738 28.1254 11.868 26.7821L15.1314 24.4511L15.1929 24.4074C16.079 23.783 17.1349 23.4445 18.2189 23.4376L18.2943 23.4375H19.1639C21.0996 23.4378 22.2805 23.438 23.2724 23.1471C25.6214 22.4584 27.4584 20.6214 28.1471 18.2724C28.438 17.2805 28.4378 16.0998 28.4375 14.164V12.458C28.4375 10.7434 28.4375 9.39909 28.3493 8.31868C28.2594 7.21849 28.0733 6.30961 27.6541 5.48694C26.965 4.13453 25.8655 3.03498 24.513 2.34589C23.6904 1.92673 22.7815 1.74065 21.6814 1.65076ZM6.33818 4.01653C6.85246 3.75449 7.48713 3.59995 8.47135 3.51954C9.46653 3.43823 10.7344 3.4375 12.5 3.4375H17.5C19.2656 3.4375 20.5335 3.43823 21.5286 3.51954C22.5129 3.59995 23.1475 3.75449 23.6619 4.01653C24.6614 4.52585 25.4741 5.33856 25.9835 6.33818C26.2455 6.85246 26.4 7.48713 26.4805 8.47135C26.5618 9.46653 26.5625 10.7344 26.5625 12.5V13.9803C26.5625 16.1576 26.553 17.0454 26.3479 17.7448C25.8388 19.481 24.481 20.8388 22.7448 21.3479C22.0454 21.553 21.1576 21.5625 18.9803 21.5625H18.2943L18.2069 21.5626C16.7403 21.572 15.3116 22.0299 14.1128 22.8746L10.7782 25.2564C10.4214 25.5113 9.95246 25.1431 10.1153 24.736C10.7233 23.216 9.60389 21.5625 7.96676 21.5625H7.21458C5.12855 21.5625 3.4375 19.8715 3.4375 17.7854V12.5C3.4375 10.7344 3.43823 9.46653 3.51954 8.47135C3.59995 7.48713 3.75449 6.85246 4.01653 6.33818C4.52585 5.33856 5.33856 4.52585 6.33818 4.01653Z"
                        fill="white"
                      />
                      <path
                        d="M11.25 12.5C11.25 13.1904 10.6904 13.75 10 13.75C9.30965 13.75 8.75 13.1904 8.75 12.5C8.75 11.8097 9.30965 11.25 10 11.25C10.6904 11.25 11.25 11.8097 11.25 12.5Z"
                        fill="white"
                      />
                      <path
                        d="M16.25 12.5C16.25 13.1904 15.6904 13.75 15 13.75C14.3096 13.75 13.75 13.1904 13.75 12.5C13.75 11.8097 14.3096 11.25 15 11.25C15.6904 11.25 16.25 11.8097 16.25 12.5Z"
                        fill="white"
                      />
                      <path
                        d="M21.25 12.5C21.25 13.1904 20.6904 13.75 20 13.75C19.3096 13.75 18.75 13.1904 18.75 12.5C18.75 11.8097 19.3096 11.25 20 11.25C20.6904 11.25 21.25 11.8097 21.25 12.5Z"
                        fill="white"
                      />
                    </svg>
                  }
                />
              </div>
            </div>

            {heroImage?.url && (
              <div className="relative h-80 w-full overflow-hidden rounded-[24px] sm:h-112 lg:h-175 lg:rounded-[30px]">
                <Image
                  src={heroImage.url}
                  alt={heroImage.alt || area.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 767px) 100vw, 1460px"
                />
              </div>
            )}
          </section>

          <section className="max-w-178 pt-10 text-sm leading-5.5 text-[#969696] md:pt-12 lg:ml-80 lg:pt-14 lg:text-base [&_p]:m-0 [&_p+p]:mt-5.5 [&_ul]:my-5.5 [&_ul]:pl-5.5 [&_li+li]:mt-1">
            <div>
              <RichText data={area.contentSection.content} />
            </div>
          </section>

          {relatedPublications.length > 0 && (
            <section className="pt-16 lg:pt-24">
              <h2 className="mb-8 font-heading text-xl leading-7.5 font-medium text-primary lg:mb-10 lg:text-[1.55rem]">
                Publicações relacionadas
              </h2>

              <div className="grid gap-10 lg:grid-cols-3 lg:gap-5">
                {relatedPublications.map((publication) => (
                  <PublicationCard key={publication.id} publication={publication} locale={locale} />
                ))}
              </div>
            </section>
          )}
        </Container>

        <section className="pt-20 bg-[#F7F7F7] lg:h-100 h-auto pb-20 lg:pb-0">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left */}
              <div className="flex flex-col gap-16 lg:gap-0 lg:justify-between lg:h-full">
                <div>
                  <RichText
                    data={area.formSection.title}
                    className="font-heading max-w-98.5 text-[#969696] text-4xl sm:text-5xl font-extralight [&_strong]:text-primary [&_strong]:font-extralight"
                  />
                  <p className="text-[#969696] text-sm mt-6 leading-relaxed max-w-xs">
                    {area.formSection.description}
                  </p>
                </div>
              </div>

              {/* Right — form card */}
              <ContactPageForm
                buttonText={area.formSection.buttonText}
                areas={areas}
                showCompanyField={false}
              />
            </div>
          </Container>
        </section>
      </main>

      <Footer settings={settings} locale={locale} />
    </>
  )
}
