import { Navbar } from '@/components/Navbar'
import { LatestPublicationHero } from '@/components/LatestPublicationHero'
import { PublicationsFilter } from '@/components/PublicationsFilter'
import { PublicationsListing } from '@/components/PublicationsListing'
import { PublicationsPagination } from '@/components/PublicationsPagination'
import { Container } from '@/components/Container'
import { getPayload, TypedLocale } from 'payload'
import config from '@payload-config'
import { Suspense } from 'react'
import type { Where } from 'payload'
import type { Area } from '@/payload-types'
import { Footer } from '@/components/Footer'

const LIMIT = 9

export default async function Publicacoes({
  params,
  searchParams,
}: {
  params: Promise<{ locale: TypedLocale }>
  searchParams: Promise<{ q?: string; area?: string; type?: string; page?: string }>
}) {
  const payload = await getPayload({ config })
  const [{ locale }, { q, area, type, page: pageStr }] = await Promise.all([params, searchParams])

  const currentPage = Math.max(1, parseInt(pageStr ?? '1', 10))

  let areaId: string | undefined
  if (area) {
    const areaDoc = await payload.find({
      collection: 'areas',
      where: { slug: { equals: area } },
      limit: 1,
      depth: 0,
    })
    areaId = areaDoc.docs[0]?.id
  }

  const conditions: Where[] = []
  if (q) conditions.push({ title: { like: q } })
  if (areaId) conditions.push({ areas: { in: [areaId] } })
  if (type) conditions.push({ type: { equals: type } })
  const where: Where = conditions.length > 0 ? { and: conditions } : {}

  const [settings, latestResult, filteredResult, areasResult, allTypesResult] = await Promise.all([
    payload.findGlobal({ slug: 'settings', locale, depth: 10 }),
    payload.find({ collection: 'publications', locale, depth: 2, limit: 1, sort: '-createdAt' }),
    payload.find({
      collection: 'publications',
      locale,
      depth: 2,
      limit: LIMIT,
      page: currentPage,
      sort: '-createdAt',
      where,
    }),
    payload.find({ collection: 'areas', locale, depth: 0, limit: 100, sort: 'title' }),
    payload.find({
      collection: 'publications',
      locale,
      depth: 0,
      limit: 1000,
      pagination: false,
      select: { type: true } as Record<string, true>,
    }),
  ])

  const latestPublication = latestResult.docs[0]
  const publications = filteredResult.docs
  const totalPages = filteredResult.totalPages
  const areas = areasResult.docs as Area[]
  const types = [...new Set(allTypesResult.docs.map((p) => p.type).filter(Boolean))].sort()

  const filterParams = new URLSearchParams()
  if (q) filterParams.set('q', q)
  if (area) filterParams.set('area', area)
  if (type) filterParams.set('type', type)
  const qs = filterParams.toString()
  const baseUrl = `/${locale}/publicacoes${qs ? `?${qs}` : ''}`

  return (
    <>
      <Navbar logo={settings.logo} logoDark={settings.logoDark} />

      {latestPublication && (
        <LatestPublicationHero publication={latestPublication} locale={locale} />
      )}

      <section className="bg-white py-12">
        <Container>
          <p className="text-primary font-heading text-xl font-light mb-6">
            Sobre o que você quer ler?
          </p>
          <Suspense>
            <PublicationsFilter areas={areas} types={types} />
          </Suspense>

          <PublicationsListing publications={publications} locale={locale} />

          <PublicationsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl={baseUrl}
          />
        </Container>
      </section>

      <Footer locale={locale} settings={settings} />
    </>
  )
}
