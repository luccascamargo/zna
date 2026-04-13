import { Navbar } from '@/components/Navbar'
import { getPayload, TypedLocale } from 'payload'
import config from '@payload-config'
import { Footer } from '@/components/Footer'
import { ContactFormSection } from '@/components/ContactFormSection'
import { Area } from '@/payload-types'
import { DocumentsContentSection } from '@/components/DocumentsContentSection'

export default async function Page({ params }: { params: Promise<{ locale: TypedLocale }> }) {
  const payload = await getPayload({ config })
  const { locale } = await params

  const [settings, documents, areasResult, home] = await Promise.all([
    payload.findGlobal({
      slug: 'settings',
      locale,
      depth: 10,
    }),
    payload.findGlobal({
      slug: 'documents',
      locale,
      depth: 2,
    }),
    payload.find({
      collection: 'areas',
      locale,
      depth: 0,
      limit: 100,
      sort: 'title',
    }),
    payload.findGlobal({
      slug: 'home',
      locale,
      depth: 2,
    }),
  ])

  const areas = areasResult.docs as Area[]

  return (
    <>
      <main className=" bg-[#f7f7f7]">
        <Navbar logo={settings.logo} logoDark={settings.logoDark} />

        <DocumentsContentSection data={documents} />
        <ContactFormSection data={home.formSection} settings={settings} areas={areas} />
        <Footer settings={settings} locale={locale} />
      </main>
    </>
  )
}
