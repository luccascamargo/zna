import { getPayload, TypedLocale } from 'payload'
import config from '@payload-config'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { PublicationsSection } from '@/components/PublicationsSection'
import { LeadsSection } from '@/components/LeadsSection'
import { BannerSection } from '@/components/BannerSection'
import { ActuationSection } from '@/components/ActuationSection'
import { ContactFormSection } from '@/components/ContactFormSection'
import { Footer } from '@/components/Footer'

export default async function HomePage({ params }: { params: Promise<{ locale: TypedLocale }> }) {
  const payload = await getPayload({ config })
  const { locale } = await params

  const home = await payload.findGlobal({
    slug: 'home',
    locale,
    depth: 10,
  })

  const settings = await payload.findGlobal({
    slug: 'settings',
    locale,
    depth: 10,
  })

  const publications = await payload.find({
    collection: 'publications',
    locale,
    depth: 10,
  })

  const areas = await payload.find({
    collection: 'areas',
    locale,
    depth: 2,
  })

  return (
    <div>
      <Hero logo={settings.logo} home={home} />
      <PublicationsSection
        data={home.publicationsSection}
        publications={publications.docs}
        locale={locale}
      />
      <LeadsSection data={home.leadsSection} />
      <BannerSection data={home.bannerSection} />
      <ActuationSection data={home.actuationSection} areas={areas.docs} locale={locale} />
      <ContactFormSection data={home.formSection} settings={settings} areas={areas.docs} />
      <Footer settings={settings} locale={locale} />
    </div>
  )
}
