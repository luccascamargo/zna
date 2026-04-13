'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'
import { routing } from '@/i18n/routing'

function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm7.08 4.879a18.81 18.81 0 01-3.321.989 14.138 14.138 0 00-2.302-4.487A8.755 8.755 0 0117.08 4.88zm-4.25 7.846a20.84 20.84 0 00-5.661 0 12.982 12.982 0 01-.003-5.441C8.1 7.41 9.041 7.5 10 7.5c.959 0 1.9-.089 2.832-.216a12.983 12.983 0 01-.002 5.441zm-.324-6.664c-1.664.215-3.35.215-5.014 0A12.891 12.891 0 0110 1.58a12.888 12.888 0 012.506 4.481zM8.54 1.381a14.135 14.135 0 00-2.3 4.486 18.83 18.83 0 01-3.32-.988A8.75 8.75 0 018.54 1.38zM1.25 10c0-1.457.364-2.83.996-4.04 1.195.491 2.422.878 3.683 1.131a14.234 14.234 0 00.001 5.828c-1.26.251-2.491.635-3.684 1.125A8.714 8.714 0 011.25 10zm1.67 5.121a18.83 18.83 0 013.32-.989 14.14 14.14 0 002.301 4.487A8.75 8.75 0 012.92 15.12zm4.574-1.182a19.558 19.558 0 015.012 0A12.909 12.909 0 0110 18.42a12.888 12.888 0 01-2.506-4.481zm3.963 4.68a14.14 14.14 0 002.302-4.486c1.135.222 2.244.562 3.321.988a8.756 8.756 0 01-5.622 3.498zm2.612-5.703c.402-1.921.403-3.905.001-5.826a20.03 20.03 0 003.684-1.131 8.704 8.704 0 010 8.082 20.145 20.145 0 00-3.685-1.125z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function LocaleSwitcher({ dark = true }: { dark?: boolean }) {
  const pathname = usePathname()
  const params = useParams()
  const router = useRouter()
  const currentLocale = params.locale as string

  function getLocalePath(locale: string) {
    const segments = pathname.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    router.push(getLocalePath(e.target.value))
  }

  return (
    <div className={`relative flex items-center justify-center p-2 rounded-full ${dark ? 'bg-white text-black' : 'bg-primary text-primary-foreground'}`}>
      <GlobeIcon className="pointer-events-none" />
      <select
        value={currentLocale}
        onChange={handleChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
      >
        {routing.locales.map((locale) => (
          <option key={locale} value={locale}>
            {locale}
          </option>
        ))}
      </select>
    </div>
  )
}
