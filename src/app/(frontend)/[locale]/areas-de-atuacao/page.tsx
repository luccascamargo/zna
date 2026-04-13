import config from '@payload-config'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { RichText } from '@/components/RichText'
import { AreaCard } from '@/components/AreaCard'
import { resolveMedia } from '@/utils/resolveMedia'
import { getPayload, TypedLocale } from 'payload'
import Image from 'next/image'
import type { Area } from '@/payload-types'

export default async function AreasDeAtuacaoPage({
  params,
}: {
  params: Promise<{ locale: TypedLocale }>
}) {
  const payload = await getPayload({ config })
  const { locale } = await params

  const [settings, servicePage, areasResult] = await Promise.all([
    payload.findGlobal({
      slug: 'settings',
      locale,
      depth: 10,
    }),
    payload.findGlobal({
      slug: 'serviceGlobal',
      locale,
      depth: 2,
    }),
    payload.find({
      collection: 'areas',
      locale,
      depth: 2,
      limit: 100,
      sort: 'title',
    }),
  ])

  const heroImage = resolveMedia(servicePage.image)
  const areas = areasResult.docs as Area[]

  return (
    <>
      <main className="bg-[#f7f7f7] pb-20 sm:pb-24 lg:pb-28">
        <Navbar logo={settings.logo} logoDark={settings.logoDark} />
        {heroImage?.url && (
          <section className="mx-auto w-full max-w-480 mt-14">
            <div className="relative aspect-[1660/395] min-h-[180px] overflow-hidden bg-[#dedede] sm:min-h-[260px] lg:min-h-[395px]">
              <Image
                src={heroImage.url}
                alt={heroImage.alt || 'Áreas de atuação'}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </section>
        )}

        <Container className="pt-10 sm:pt-14 lg:pt-[60px]">
          <section className="mb-12 grid gap-6 lg:mb-18 lg:grid-cols-[minmax(0,624px)_minmax(0,479px)] lg:items-start lg:justify-between">
            <RichText
              data={servicePage.title}
              className="font-heading text-[38px] leading-[1.02] text-[#969696] font-extralight [&_strong]:text-[#1e1e1e] sm:text-5xl lg:text-6xl lg:leading-15 [&_p]:m-0 [&_strong]:font-extralight [&_em]:not-italic [&_span]:text-[#969696]"
            />

            <RichText
              data={servicePage.description}
              className="max-w-[479px] text-sm leading-[22px] text-[#969696] sm:text-base [&_p]:m-0"
            />
          </section>

          <section>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {areas.map((area) => (
                <AreaCard key={area.id} area={area} locale={locale} />
              ))}
            </div>
          </section>
        </Container>
      </main>

      <Footer settings={settings} locale={locale} />
    </>
  )
}
