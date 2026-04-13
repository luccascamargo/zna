import { getPayload, TypedLocale } from 'payload'
import config from '@payload-config'
import { Navbar } from '@/components/Navbar'
import Link from 'next/link'

interface SearchPageProps {
  params: Promise<{ locale: TypedLocale }>
  searchParams: Promise<{ q?: string }>
}

/**
 * Converte o termo de busca num padrão regex accent-insensitive.
 * Ex: "tributario" → "tribut[aáàãâä]rio" → bate com "tributário"
 */
function toAccentInsensitive(query: string): string {
  return query
    .replace(/[aáàãâä]/gi, '[aáàãâä]')
    .replace(/[eéèêë]/gi, '[eéèêë]')
    .replace(/[iíìîï]/gi, '[iíìîï]')
    .replace(/[oóòõôö]/gi, '[oóòõôö]')
    .replace(/[uúùûü]/gi, '[uúùûü]')
    .replace(/[cç]/gi, '[cç]')
    .replace(/[nñ]/gi, '[nñ]')
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const { locale } = await params
  const { q } = await searchParams

  const payload = await getPayload({ config })

  const settings = await payload.findGlobal({ slug: 'settings', locale, depth: 1 })

  const query = q?.trim() ?? ''

  const regex = query ? new RegExp(toAccentInsensitive(query), 'i') : null

  const [allPublications, allAreas] = query
    ? await Promise.all([
        payload.find({
          collection: 'publications',
          locale,
          depth: 1,
          limit: 500,
          pagination: false,
        }),
        payload.find({ collection: 'areas', locale, depth: 1, limit: 500, pagination: false }),
      ])
    : [{ docs: [] }, { docs: [] }]

  const publications = {
    docs: regex
      ? allPublications.docs.filter((p) => regex.test(p.title) || regex.test(p.type ?? ''))
      : [],
  }

  const areas = {
    docs: regex ? allAreas.docs.filter((s) => regex.test(s.title)) : [],
  }

  const totalResults = publications.docs.length + areas.docs.length

  return (
    <div>
      <Navbar logo={settings.logo} logoDark={settings.logoDark} />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold text-[#202246] mb-2">
          {query ? `Resultados para "${query}"` : 'Busca'}
        </h1>

        {query && (
          <p className="text-[#969696] text-sm mb-8">
            {totalResults} {totalResults === 1 ? 'resultado encontrado' : 'resultados encontrados'}
          </p>
        )}

        {!query && <p className="text-[#969696]">Digite algo para buscar.</p>}

        {query && totalResults === 0 && (
          <p className="text-[#969696]">Nenhum resultado encontrado para "{query}".</p>
        )}

        {publications.docs.length > 0 && (
          <section className="mb-10">
            <h2 className="text-sm uppercase tracking-widest text-[#969696] mb-4">Publicações</h2>
            <ul className="flex flex-col gap-3">
              {publications.docs.map((pub) => (
                <li key={pub.id}>
                  <Link
                    href={`/${locale}/publicacoes/${pub.id}`}
                    className="block text-[#202246] hover:underline font-medium"
                  >
                    {pub.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {areas.docs.length > 0 && (
          <section>
            <h2 className="text-sm uppercase tracking-widest text-[#969696] mb-4">
              Áreas de atuação
            </h2>
            <ul className="flex flex-col gap-3">
              {areas.docs.map((area) => (
                <li key={area.id}>
                  <Link
                    href={`/${locale}/areas-de-atuacao/${area.slug}`}
                    className="block text-[#202246] hover:underline font-medium"
                  >
                    {area.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}
