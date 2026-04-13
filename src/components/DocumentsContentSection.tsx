import { Container } from '@/components/Container'
import type { Document, File } from '@/payload-types'

type DocumentsSection = Document['transparencySection'] | Document['certificationSection']

function resolveFile(value: string | File) {
  if (!value || typeof value === 'string') return null
  return value
}

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
      <path
        d="M13.5 7.03125C13.966 7.03125 14.3437 7.40901 14.3437 7.875V13.713L16.2784 11.7784C16.6079 11.4489 17.1421 11.4489 17.4716 11.7784C17.8011 12.1079 17.8011 12.6421 17.4716 12.9716L14.0966 16.3466C13.9384 16.5049 13.7238 16.5938 13.5 16.5938C13.2762 16.5938 13.0616 16.5049 12.9034 16.3466L9.52838 12.9716C9.19887 12.6421 9.19887 12.1079 9.52838 11.7784C9.85788 11.4489 10.3921 11.4489 10.7216 11.7784L12.6562 13.713V7.875C12.6562 7.40901 13.034 7.03125 13.5 7.03125Z"
        fill="#202246"
      />
      <path
        d="M8.15625 19.125C8.15625 18.659 8.53401 18.2812 9 18.2812H18C18.466 18.2812 18.8438 18.659 18.8438 19.125C18.8438 19.591 18.466 19.9688 18 19.9688H9C8.53401 19.9688 8.15625 19.591 8.15625 19.125Z"
        fill="#202246"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.4354 1.40625C10.8385 1.40624 8.80334 1.40623 7.21541 1.61972C5.59009 1.83824 4.30757 2.29425 3.30091 3.30091C2.29425 4.30757 1.83824 5.59009 1.61972 7.21542C1.40623 8.80334 1.40624 10.8385 1.40625 13.4354V13.5646C1.40624 16.1615 1.40623 18.1967 1.61972 19.7846C1.83824 21.4099 2.29425 22.6925 3.30091 23.6991C4.30757 24.7058 5.59009 25.1618 7.21541 25.3803C8.80334 25.5938 10.8385 25.5938 13.4354 25.5938H13.5646C16.1615 25.5938 18.1967 25.5938 19.7846 25.3803C21.4099 25.1618 22.6925 24.7058 23.6991 23.6991C24.7058 22.6925 25.1618 21.4099 25.3803 19.7846C25.5938 18.1967 25.5938 16.1615 25.5938 13.5646V13.4354C25.5938 10.8385 25.5938 8.80334 25.3803 7.21542C25.1618 5.59009 24.7058 4.30757 23.6991 3.30091C22.6925 2.29425 21.4099 1.83824 19.7846 1.61972C18.1967 1.40623 16.1615 1.40624 13.5646 1.40625H13.4354ZM4.49415 4.49415C5.13501 3.85328 6.00207 3.48553 7.44028 3.29217C8.90276 3.09554 10.8245 3.09375 13.5 3.09375C16.1755 3.09375 18.0972 3.09554 19.5597 3.29217C20.9979 3.48553 21.8649 3.85328 22.5059 4.49415C23.1468 5.13501 23.5145 6.00207 23.7078 7.44028C23.9045 8.90276 23.9063 10.8245 23.9063 13.5C23.9063 16.1755 23.9045 18.0972 23.7078 19.5597C23.5145 20.9979 23.1468 21.8649 22.5059 22.5059C21.8649 23.1468 20.9979 23.5145 19.5597 23.7078C18.0972 23.9045 16.1755 23.9063 13.5 23.9063C10.8245 23.9063 8.90276 23.9045 7.44028 23.7078C6.00207 23.5145 5.13501 23.1468 4.49415 22.5059C3.85328 21.8649 3.48553 20.9979 3.29217 19.5597C3.09554 18.0972 3.09375 16.1755 3.09375 13.5C3.09375 10.8245 3.09554 8.90276 3.29217 7.44028C3.48553 6.00207 3.85328 5.13501 4.49415 4.49415Z"
        fill="#202246"
      />
    </svg>
  )
}

function DownloadsCard({ section }: { section: DocumentsSection }) {
  return (
    <div className="rounded-[30px] bg-white p-5 shadow-[0_12px_32px_rgba(32,34,70,0.04)] sm:p-8">
      <p className="max-w-130 text-sm leading-5.5 text-[#969696]">{section.description}</p>

      <div className="mt-4 space-y-3">
        {section.downloads.map((download) => {
          const file = resolveFile(download.file)

          return (
            <a
              key={download.id ?? download.title}
              href={file?.url ?? '#'}
              download={file?.filename ?? true}
              target={file?.url ? '_blank' : undefined}
              rel={file?.url ? 'noopener noreferrer' : undefined}
              className="group flex items-center justify-between gap-4 rounded-[10px] bg-[#F7F7F7] px-5 py-3 text-primary transition-all hover:bg-[#efefef]"
            >
              <span className="text-lg leading-6.25">{download.title}</span>
              <DownloadIcon />
            </a>
          )
        })}
      </div>
    </div>
  )
}

export function DocumentsContentSection({ data }: { data: Document }) {
  const sections = [
    {
      heading: data.transparencySection.title,
      content: data.transparencySection,
    },
    {
      heading: data.certificationSection.title,
      content: data.certificationSection,
    },
  ]

  return (
    <section className="bg-[#F7F7F7] pb-16 pt-10 sm:pb-20 sm:pt-14 lg:pb-28 lg:pt-24">
      <Container>
        <div className="mx-auto max-w-265">
          <div className="mx-auto max-w-140 text-center">
            <h1 className="font-heading text-4xl leading-none font-extralight text-primary sm:text-5xl lg:text-6xl lg:leading-none">
              {data.title}
            </h1>
            <p className="mx-auto mt-8 max-w-99 text-sm leading-5.5 text-[#969696] sm:text-base">
              {data.description}
            </p>
          </div>

          <div className="mt-20 space-y-8 sm:space-y-10 lg:mt-24">
            {sections.map((section) => (
              <div
                key={section.heading}
                className="grid gap-6 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-24"
              >
                <div className="pt-2">
                  <h2 className="font-heading text-2xl leading-tight font-light text-[#141414] sm:text-3xl">
                    {section.heading}
                  </h2>
                </div>

                <DownloadsCard section={section.content} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
