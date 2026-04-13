import config from '@payload-config'
import { AwardsCarousel } from './AwardsCarousel'
import { AreaCard } from '@/components/AreaCard'
import { ButtonLink } from '@/components/ButtonLink'
import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { RichText } from '@/components/RichText'
import type { Area } from '@/payload-types'
import { resolveMedia } from '@/utils/resolveMedia'
import Image from 'next/image'
import { getPayload, TypedLocale } from 'payload'

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 6L9 17L4 12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M28 12V5C28 4.45 27.55 4 27 4H20C19.45 4 19 4.45 19 5V12C19 12.55 19.45 13 20 13H27C27.55 13 28 12.55 28 12ZM27 2C28.66 2 30 3.34 30 5V12C30 13.66 28.66 15 27 15H20C18.34 15 17 13.66 17 12V5C17 3.34 18.34 2 20 2H27Z"
        fill="currentColor"
      />
      <path
        d="M28 27V20C28 19.45 27.55 19 27 19H20C19.45 19 19 19.45 19 20V27C19 27.55 19.45 28 20 28H27C27.55 28 28 27.55 28 27ZM27 17C28.66 17 30 18.34 30 20V27C30 28.66 28.66 30 27 30H20C18.34 30 17 28.66 17 27V20C17 18.34 18.34 17 20 17H27Z"
        fill="currentColor"
      />
      <path
        d="M12 13C12.55 13 13 12.55 13 12V5C13 4.45 12.55 4 12 4H5C4.45 4 4 4.45 4 5V12C4 12.55 4.45 13 5 13H12ZM12 2C13.66 2 15 3.34 15 5V12C15 13.66 13.66 15 12 15H5C3.34 15 2 13.66 2 12V5C2 3.34 3.34 2 5 2H12Z"
        fill="currentColor"
      />
      <path
        d="M12 28C12.55 28 13 27.55 13 27V20C13 19.45 12.55 19 12 19H5C4.45 19 4 19.45 4 20V27C4 27.55 4.45 28 5 28H12ZM12 17C13.66 17 15 18.34 15 20V27C15 28.66 13.66 30 12 30H5C3.34 30 2 28.66 2 27V20C2 18.34 3.34 17 5 17H12Z"
        fill="currentColor"
      />
    </svg>
  )
}

function TeamIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 21V19C21.9993 18.1137 21.7044 17.2526 21.1614 16.5523C20.6184 15.852 19.8544 15.3559 19 15.141"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 3.14102C16.8564 3.36032 17.623 3.85642 18.1661 4.5573C18.7092 5.25818 19.0037 6.12054 19.0037 7.00852C19.0037 7.89649 18.7092 8.75885 18.1661 9.45973C17.623 10.1606 16.8564 10.6567 16 10.876"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ArrowUpRightIcon() {
  return (
    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" aria-hidden="true">
      <path
        d="M8 18.5L18.5 8M18.5 8H8M18.5 8V18.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default async function SobrePage({ params }: { params: Promise<{ locale: TypedLocale }> }) {
  const payload = await getPayload({ config })
  const { locale } = await params

  const [settings, about, home, areasResult] = await Promise.all([
    payload.findGlobal({
      slug: 'settings',
      locale,
      depth: 10,
    }),
    payload.findGlobal({
      slug: 'about',
      locale,
      depth: 10,
    }),
    payload.findGlobal({
      slug: 'home',
      locale,
      depth: 10,
    }),
    payload.find({
      collection: 'areas',
      locale,
      depth: 2,
      limit: 8,
      sort: 'title',
    }),
  ])

  const heroImage = resolveMedia(about.backgroundImage)
  const historyImage = resolveMedia(about.history.image)
  const socialImage = resolveMedia(about.history.social.image)
  const areas = areasResult.docs as Area[]
  const stats = about.compromisso.stats ?? []
  const awards = about.awards.items ?? []
  const checklist = about.compromisso.descriptionItems ?? []
  const localePrefix = `/${locale}`

  return (
    <>
      <main className="bg-[#f7f7f7]">
        <section className="relative overflow-hidden bg-primary">
          {heroImage?.url && (
            <>
              <div className="absolute inset-0">
                <Image
                  src={heroImage.url}
                  alt={heroImage.alt || 'Quem somos'}
                  fill
                  priority
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              <div className="absolute inset-0 bg-[rgba(32,34,70,0.45)]" />
            </>
          )}

          <div className="relative z-10">
            <Navbar logo={settings.logo} logoDark={settings.logoDark} fixed />
            <Container className="min-h-90 pb-20 pt-32 sm:min-h-144 sm:pb-28 sm:pt-36 lg:min-h-128 lg:pb-24 lg:pt-44">
              <div />
            </Container>
          </div>
        </section>

        <Container className="py-16 sm:py-20 lg:py-24">
          <section className="grid gap-12 lg:grid-cols-2  lg:gap-x-16">
            <div>
              <RichText
                data={about.compromisso.title}
                className="max-w-152 font-heading text-[2.6rem] leading-[0.98] font-extralight text-primary sm:text-5xl lg:text-[3.75rem] [&_p]:m-0 [&_strong]:font-extralight [&_strong]:text-[#969696]"
              />

              <div className="mt-8 space-y-7">
                {stats.map((item, index) => (
                  <div
                    key={`${item.stat}-${index}`}
                    className="flex justify-between flex-col items-start sm:flex-row sm:items-end pb-4 border-b border-b-[#969696]"
                  >
                    <p className="font-heading text-2xl font-thin text-[#969696] sm:text-4xl xl:text-5xl">
                      {item.stat}
                    </p>
                    <p className="text-sm leading-5.5 text-[#969696] sm:text-base">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-1 max-w-auto lg:max-w-130 lg:ml-auto">
              <RichText
                data={about.compromisso.description}
                className="text-sm leading-5.5 text-[#969696] sm:text-base [&_p]:m-0 [&_p+p]:mt-5.5"
              />

              {checklist.length > 0 && (
                <ul className="mt-7 space-y-4">
                  {checklist.map((item, index) => (
                    <li
                      key={`${item.item}-${index}`}
                      className="flex items-start gap-3 text-primary"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_50_2869)">
                          <path
                            d="M20.8883 8.66749C20.7307 8.509 20.6417 8.29489 20.6406 8.07139V5.70274C20.6398 5.08138 20.3926 4.4857 19.9533 4.04634C19.5139 3.60697 18.9182 3.35978 18.2969 3.35899H15.9282C15.7047 3.35788 15.4906 3.26893 15.3321 3.11134L13.6578 1.43704C13.2176 0.998011 12.6213 0.751465 11.9996 0.751465C11.3778 0.751465 10.7815 0.998011 10.3413 1.43704L8.667 3.11134C8.50851 3.26893 8.29441 3.35788 8.0709 3.35899H5.70225C5.0809 3.35978 4.48521 3.60697 4.04585 4.04634C3.60648 4.4857 3.3593 5.08138 3.3585 5.70274V8.07139C3.3574 8.29489 3.26845 8.509 3.11085 8.66749L1.43655 10.3418C0.997523 10.782 0.750977 11.3783 0.750977 12C0.750977 12.6218 0.997523 13.2181 1.43655 13.6583L3.11085 15.3326C3.26845 15.4911 3.3574 15.7052 3.3585 15.9287V18.2973C3.3593 18.9187 3.60648 19.5144 4.04585 19.9537C4.48521 20.3931 5.0809 20.6403 5.70225 20.6411H8.0709C8.29441 20.6422 8.50851 20.7311 8.667 20.8887L10.3413 22.563C10.7815 23.002 11.3779 23.2486 11.9996 23.2486C12.6213 23.2486 13.2176 23.002 13.6578 22.563L15.3321 20.8887C15.4906 20.7311 15.7047 20.6422 15.9282 20.6411H18.2969C18.9182 20.6403 19.5139 20.3931 19.9533 19.9537C20.3926 19.5144 20.6398 18.9187 20.6406 18.2973V15.9287C20.6417 15.7052 20.7307 15.4911 20.8883 15.3326L22.5626 13.6583C23.0016 13.2181 23.2481 12.6218 23.2481 12C23.2481 11.3783 23.0016 10.782 22.5626 10.3418L20.8883 8.66749ZM21.5021 12.5975L19.8278 14.2719C19.3895 14.7122 19.1426 15.3075 19.1406 15.9287V18.2973C19.1406 18.5211 19.0517 18.7357 18.8934 18.8939C18.7352 19.0521 18.5206 19.141 18.2969 19.1411H15.9282C15.307 19.1431 14.7117 19.39 14.2715 19.8282L12.5972 21.5025C12.4382 21.6602 12.2234 21.7486 11.9996 21.7486C11.7757 21.7486 11.5609 21.6602 11.402 21.5025L9.72765 19.8282C9.28741 19.39 8.69208 19.1431 8.0709 19.1411H5.70225C5.47849 19.141 5.2639 19.0521 5.10568 18.8939C4.94745 18.7357 4.85854 18.5211 4.8585 18.2973V15.9287C4.8565 15.3075 4.60965 14.7122 4.1715 14.2719L2.49705 12.5976C2.33877 12.439 2.24988 12.2241 2.24988 12C2.24988 11.776 2.33877 11.561 2.49705 11.4024L4.1715 9.72814C4.60965 9.28785 4.8565 8.69254 4.8585 8.07139V5.70274C4.85854 5.47898 4.94745 5.26439 5.10568 5.10616C5.2639 4.94794 5.47849 4.85903 5.70225 4.85899H8.0709C8.69205 4.85699 9.28736 4.61014 9.72765 4.17199L11.402 2.49754C11.5609 2.33992 11.7757 2.25147 11.9996 2.25147C12.2234 2.25147 12.4382 2.33992 12.5972 2.49754L14.2715 4.17199C14.7117 4.61014 15.3071 4.85699 15.9282 4.85899H18.2969C18.5206 4.85903 18.7352 4.94794 18.8934 5.10616C19.0517 5.26439 19.1406 5.47898 19.1406 5.70274V8.07139C19.1426 8.69257 19.3895 9.2879 19.8278 9.72814L21.5021 11.4024C21.6603 11.561 21.7492 11.776 21.7492 12C21.7492 12.2241 21.6603 12.4389 21.5021 12.5975Z"
                            fill="#202246"
                          />
                          <path
                            d="M14.4693 9.4703L10.9991 12.939L9.52982 11.4698C9.38837 11.3332 9.19892 11.2576 9.00227 11.2593C8.80562 11.261 8.61751 11.3399 8.47846 11.4789C8.3394 11.618 8.26053 11.8061 8.25882 12.0027C8.25711 12.1994 8.3327 12.3888 8.46932 12.5303L10.4696 14.5298C10.6102 14.6704 10.8009 14.7494 10.9998 14.7494C11.1987 14.7494 11.3894 14.6704 11.5301 14.5298L15.5306 10.5308C15.6022 10.4616 15.6593 10.3789 15.6986 10.2874C15.738 10.1958 15.7586 10.0974 15.7595 9.99785C15.7604 9.89827 15.7414 9.79951 15.7037 9.70733C15.666 9.61516 15.6103 9.53142 15.5399 9.461C15.4694 9.39058 15.3857 9.33489 15.2935 9.29718C15.2014 9.25947 15.1026 9.2405 15.003 9.24136C14.9034 9.24223 14.805 9.26292 14.7135 9.30222C14.622 9.34153 14.5385 9.39867 14.4693 9.4703Z"
                            fill="#202246"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_50_2869">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <span className="text-base leading-[25px] text-primary">{item.item}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8">
                <ButtonLink
                  title={locale === 'en' ? 'Meet the team' : 'Conheça a equipe'}
                  href={`${localePrefix}/advogados`}
                  variant="primary"
                  className="w-fit font-normal"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 9.29032C13.5514 9.29032 14.9216 8.47587 15.7313 7.2391C17.5286 8.30903 18.8827 10.1237 19.3346 12.3163L21.5355 11.8332C20.9171 8.832 19.0031 6.36852 16.482 5.01213C16.4914 4.89097 16.5 4.76903 16.5 4.64516C16.5 2.08374 14.4814 0 12 0C9.51863 0 7.5 2.08374 7.5 4.64516C7.5 7.20658 9.51863 9.29032 12 9.29032ZM12 2.32258C13.2409 2.32258 14.25 3.36426 14.25 4.64516C14.25 5.92606 13.2409 6.96774 12 6.96774C10.7591 6.96774 9.75 5.92606 9.75 4.64516C9.75 3.36426 10.7591 2.32258 12 2.32258ZM4.5195 14.3237C4.51312 14.1941 4.5 14.0655 4.5 13.9355C4.5 11.8641 5.28263 9.91781 6.70312 8.45458L5.11425 6.81019C3.267 8.71239 2.25 11.2428 2.25 13.9355C2.25 14.2657 2.26912 14.5935 2.30063 14.9195C0.929625 15.7161 0 17.2308 0 18.9677C0 21.5292 2.01863 23.6129 4.5 23.6129C6.98138 23.6129 9 21.5292 9 18.9677C9 16.4129 6.99188 14.3346 4.5195 14.3237ZM4.5 21.2903C3.25912 21.2903 2.25 20.2486 2.25 18.9677C2.25 17.6868 3.25912 16.6452 4.5 16.6452C5.74088 16.6452 6.75 17.6868 6.75 18.9677C6.75 20.2486 5.74088 21.2903 4.5 21.2903ZM19.5 14.3226C17.0186 14.3226 15 16.4063 15 18.9677C15 19.6359 15.1399 20.2699 15.387 20.8448C14.3554 21.3844 13.2004 21.6774 12 21.6774C11.4818 21.6774 10.962 21.6217 10.4561 21.5121L9.9945 23.7855C10.6519 23.9276 11.3269 24 12 24C13.722 24 15.3675 23.5293 16.8094 22.6823C17.5609 23.2637 18.4905 23.6129 19.5 23.6129C21.9814 23.6129 24 21.5292 24 18.9677C24 16.4063 21.9814 14.3226 19.5 14.3226ZM19.5 21.2903C18.2591 21.2903 17.25 20.2486 17.25 18.9677C17.25 17.6868 18.2591 16.6452 19.5 16.6452C20.7409 16.6452 21.75 17.6868 21.75 18.9677C21.75 20.2486 20.7409 21.2903 19.5 21.2903Z"
                        fill="white"
                      />
                    </svg>
                  }
                />
              </div>
            </div>
          </section>

          <section className="pt-20 sm:pt-24 lg:pt-28">
            <div className="flex justify-between gap-10 lg:gap-30.75 flex-col xl:flex-row">
              <RichText
                data={about.jornada.title}
                className="xl:min-w-105.5 2xl:min-w-133.25 font-heading text-[2.4rem] leading-[0.98] font-extralight text-primary sm:text-5xl lg:text-[3.75rem] [&_p]:m-0"
              />

              <div className="grid gap-8 md:grid-cols-3 xl:gap-4">
                <div>
                  <RichText
                    data={about.jornada.mission.title}
                    className="font-heading text-[1.25rem] leading-[25px] font-light text-primary [&_p]:m-0"
                  />
                  <RichText
                    data={about.jornada.mission.description}
                    className="mt-4 text-sm leading-[22px] text-[#969696] sm:text-base [&_p]:m-0 [&_ul]:pl-5 [&_li+li]:mt-1"
                  />
                </div>

                <div>
                  <RichText
                    data={about.jornada.vision.title}
                    className="font-heading text-[1.25rem] leading-[25px] font-light text-primary [&_p]:m-0"
                  />
                  <RichText
                    data={about.jornada.vision.description}
                    className="mt-4 text-sm leading-[22px] text-[#969696] sm:text-base [&_p]:m-0 [&_ul]:pl-5 [&_li+li]:mt-1"
                  />
                </div>

                <div>
                  <RichText
                    data={about.jornada.values.title}
                    className="font-heading text-[1.25rem] leading-[25px] font-light text-primary [&_p]:m-0"
                  />
                  <RichText
                    data={about.jornada.values.description}
                    className="mt-4 text-sm leading-[22px] text-[#969696] sm:text-base [&_p]:m-0 [&_ul]:pl-5 [&_ul]:list-disc [&_li+li]:mt-1"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="pt-20 sm:pt-24 lg:pt-28">
            <div className="mx-auto max-w-[36rem] text-center">
              <RichText
                data={home.actuationSection.title}
                className="font-heading text-primary text-4xl sm:text-5xl font-extralight [&_strong]:font-semibold"
              />
              <p className="mx-auto mt-4 max-w-[32.5rem] text-sm leading-[22px] text-[#969696] sm:text-base">
                {home.actuationSection.description}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {areas.map((area) => (
                <AreaCard key={area.id} area={area} locale={locale} />
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <ButtonLink
                title={locale === 'en' ? 'See all practice areas' : 'Confira todas as áreas'}
                href={`${localePrefix}/areas-de-atuacao`}
                variant="green"
                className="w-fit"
                icon={<GridIcon />}
              />
            </div>
          </section>

          <section className="pt-20 sm:pt-24 lg:pt-28">
            <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-2">
              <RichText
                data={about.history.title}
                className="font-heading text-[2.4rem] leading-[0.98] font-extralight text-[#969696] sm:text-5xl lg:text-[3.75rem] [&_p]:m-0"
              />
              <RichText
                data={about.history.description}
                className="max-w-auto lg:max-w-[37rem] lg:ml-auto text-sm leading-[22px] text-[#969696] sm:text-base [&_p]:m-0 [&_p+p]:mt-[22px]"
              />
            </div>

            <div className="rounded-b-[24px] mt-10 rounded-t-[30px] bg-secondary pb-10 text-center text-white lg:rounded-b-[30px] lg:pb-16">
              {historyImage?.url && (
                <div className="relative h-72 overflow-hidden rounded-[30px] sm:h-112 lg:h-143.5">
                  <Image
                    src={historyImage.url}
                    alt={historyImage.alt || 'Nossa história'}
                    fill
                    className="object-cover rounded-t-[30px]"
                    sizes="(max-width: 1023px) 100vw, 1460px"
                  />
                </div>
              )}
              <RichText
                data={about.history.social.title}
                className="font-heading mt-32! text-[2.2rem] leading-[0.98] font-extralight text-white sm:text-5xl lg:text-[3.75rem]"
              />

              {socialImage?.url && (
                <div className="relative mx-auto mt-8 h-48 max-w-[26rem] overflow-hidden rounded-[24px] sm:h-64 lg:mt-10 lg:h-[20.75rem] lg:max-w-[47.5rem] lg:rounded-[30px]">
                  <Image
                    src={socialImage.url}
                    alt={socialImage.alt || 'Responsabilidade social'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1023px) 100vw, 760px"
                  />
                </div>
              )}

              <RichText
                data={about.history.social.description}
                className="mx-auto mt-6 max-w-[34.5rem] text-sm leading-[22px] text-white/90 sm:text-base [&_p]:m-0 [&_p+p]:mt-[22px]"
              />

              <div className="mt-8 flex justify-center">
                <ButtonLink
                  {...about.history.social.cta}
                  variant="white"
                  className="w-fit group"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="27"
                      height="27"
                      viewBox="0 0 27 27"
                      fill="none"
                      className="transition-all group-hover:[&_path]:fill-white"
                    >
                      <path
                        d="M26.6476 6.51332C26.2841 6.27106 25.793 6.36925 25.5507 6.73269L23.1452 10.3407C23.0182 10.3326 23.7049 10.3353 13.0781 10.3353C12.7759 10.3353 12.5001 10.5074 12.3674 10.7788L10.7635 14.0593C10.4982 14.602 9.89825 14.9012 9.30542 14.7872C8.48261 14.629 8.00552 13.7638 8.30874 12.9842L10.975 6.12847L14.698 3.89487C14.7973 3.83533 14.8822 3.75465 14.947 3.65867L16.5818 1.23307C16.8259 0.870783 16.7301 0.37925 16.3678 0.135144C16.0056 -0.109014 15.514 -0.0132489 15.2698 0.349033L13.7333 2.62888L9.92894 4.91131C9.77844 5.00159 9.66226 5.13933 9.59867 5.30286L9.17949 6.38069C9.1248 6.38043 6.44597 6.38048 6.38084 6.38048C6.14053 6.38048 5.9133 6.48969 5.76317 6.67732L2.67839 10.533L0.358993 12.0456C-0.00687554 12.2843 -0.110129 12.7743 0.128545 13.1402C0.367325 13.5063 0.857487 13.6092 1.22325 13.3706L3.64901 11.7887C3.71941 11.7428 3.78201 11.6859 3.83458 11.6203L6.76111 7.96239H8.5644L6.8343 12.4109C6.17238 14.1129 7.21641 15.9964 9.00668 16.3407C10.2997 16.5894 11.6067 15.9367 12.1848 14.7541L13.5719 11.9172H22.9921C23.4283 11.9172 23.7832 12.272 23.7832 12.7081C23.7832 13.1442 23.4283 13.4991 22.9921 13.4991H20.8828C20.4459 13.4991 20.0918 13.8532 20.0918 14.29C20.0918 14.7269 20.4459 15.081 20.8828 15.081H22.9921C23.4283 15.081 23.7832 15.4359 23.7832 15.872C23.7832 16.3081 23.4283 16.6629 22.9921 16.6629H20.8828C20.4459 16.6629 20.0918 17.017 20.0918 17.4539C20.0918 17.8907 20.4459 18.2448 20.8828 18.2448H22.4648C22.901 18.2448 23.2558 18.5997 23.2558 19.0358C23.2558 19.4719 22.901 19.8267 22.4648 19.8267H20.8828C20.4459 19.8267 20.0918 20.1809 20.0918 20.6177C20.0918 21.0546 20.4459 21.4087 20.8828 21.4087H21.9375C22.3736 21.4087 22.7285 21.7635 22.7285 22.1996C22.7285 22.6357 22.3736 22.9906 21.9375 22.9906H18.7734V22.1996C18.7734 20.8912 17.7089 19.8267 16.4004 19.8267C15.7931 19.8267 15.2386 20.0563 14.8184 20.4329C13.9159 19.624 12.5558 19.6249 11.6543 20.4329C11.2342 20.0563 10.6797 19.8267 10.0723 19.8267C9.46499 19.8267 8.91049 20.0563 8.49031 20.4329C8.07012 20.0563 7.51562 19.8267 6.90829 19.8267C5.5998 19.8267 4.53526 20.8912 4.53526 22.1996V22.9906H0.791148C0.354299 22.9906 0.000138092 23.3447 0.000138092 23.7815C0.000138092 24.2184 0.354299 24.5725 0.791148 24.5725H4.53526C4.53526 26.722 6.9876 27.7388 8.49031 26.392C8.91049 26.7685 9.46499 26.9981 10.0723 26.9981C10.6797 26.9981 11.2342 26.7685 11.6543 26.392C12.0745 26.7685 12.629 26.9981 13.2364 26.9981C13.8437 26.9981 14.3982 26.7685 14.8184 26.392C16.3199 27.7377 18.7734 26.7239 18.7734 24.5725H21.9375C23.246 24.5725 24.3105 23.508 24.3105 22.1996C24.3105 21.7221 24.1682 21.2773 23.9244 20.9046C24.9011 20.1402 25.1232 18.7674 24.4518 17.7408C25.5355 16.8926 25.6762 15.3132 24.759 14.29C25.6157 13.3344 25.5606 11.8709 24.6186 10.9826L26.8671 7.61013C27.1094 7.24669 27.0112 6.75563 26.6476 6.51332ZM6.90823 25.4162C6.47207 25.4162 6.11722 25.0613 6.11722 24.6252V22.1996C6.11722 21.7635 6.47207 21.4087 6.90823 21.4087C7.3444 21.4087 7.69924 21.7635 7.69924 22.1996V24.6252C7.69924 25.0614 7.3444 25.4162 6.90823 25.4162ZM10.0723 25.4162C9.63611 25.4162 9.28126 25.0613 9.28126 24.6252V22.1996C9.28126 21.7635 9.63611 21.4087 10.0723 21.4087C10.5084 21.4087 10.8633 21.7635 10.8633 22.1996V24.6252C10.8633 25.0614 10.5084 25.4162 10.0723 25.4162ZM13.2363 25.4162C12.8001 25.4162 12.4453 25.0613 12.4453 24.6252V22.1996C12.4453 21.7635 12.8001 21.4087 13.2363 21.4087C13.6725 21.4087 14.0273 21.7635 14.0273 22.1996V24.6252C14.0273 25.0614 13.6725 25.4162 13.2363 25.4162ZM17.1914 24.6252C17.1914 25.0613 16.8365 25.4162 16.4003 25.4162C15.9642 25.4162 15.6093 25.0613 15.6093 24.6252V22.1996C15.6093 21.7635 15.9642 21.4087 16.4003 21.4087C16.8365 21.4087 17.1914 21.7635 17.1914 22.1996V24.6252Z"
                        fill="#202246"
                      />
                    </svg>
                  }
                />
              </div>
            </div>
          </section>
        </Container>

        <section className="mt-20 sm:mt-24 lg:mt-28 py-10 lg:pt-0 bg-primary lg:bg-[linear-gradient(to_top,#202246_90%,#F7F7F7_10%)]">
          <Container>
            <div className="flex justify-between gap-9">
              <AwardsCarousel awards={awards} awardsTitle={about.awards.title} />
            </div>
          </Container>
        </section>
      </main>

      <Footer settings={settings} locale={locale} />
    </>
  )
}
