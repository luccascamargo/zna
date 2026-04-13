import { ExpertsDirectory } from '@/components/ExpertsDirectory'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import type { Specialist } from '@/payload-types'
import config from '@payload-config'
import { getPayload, TypedLocale } from 'payload'

export default async function AdvogadosPage({
  params,
}: {
  params: Promise<{ locale: TypedLocale }>
}) {
  const payload = await getPayload({ config })
  const { locale } = await params

  const [settings, expertsPage, specialistsResult] = await Promise.all([
    payload.findGlobal({
      slug: 'settings',
      locale,
      depth: 10,
    }),
    payload.findGlobal({
      slug: 'experts',
      locale,
      depth: 10,
    }),
    payload.find({
      collection: 'specialists',
      locale,
      depth: 1,
      limit: 100,
      sort: 'name',
    }),
  ])

  const specialists = specialistsResult.docs as Specialist[]

  return (
    <>
      <main className="bg-[#F7F7F7]">
        <Navbar logo={settings.logo} logoDark={settings.logoDark} />
        <ExpertsDirectory experts={specialists} expertsPage={expertsPage} locale={locale} />
      </main>

      <Footer settings={settings} locale={locale} />
    </>
  )
}
