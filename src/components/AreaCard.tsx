import type { Area, Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { resolveMedia } from '@/utils/resolveMedia'

interface AreaCardProps {
  area: Area
  locale: string
}

export function AreaCard({ area, locale }: AreaCardProps) {
  const icon = resolveMedia(area.icon)

  return (
    <Link
      href={`/${locale}/areas-de-atuacao/${area.slug}`}
      className="group relative flex flex-col justify-between bg-white hover:bg-[#202246] rounded-[20px] p-6 aspect-square transition-colors duration-300"
    >
      {/* Icon */}
      {icon?.url && (
        <div className="w-10 h-10 relative">
          <Image
            src={icon.url}
            alt={icon.alt}
            fill
            className="object-contain group-hover:brightness-0 group-hover:invert transition-[filter] duration-300"
          />
        </div>
      )}

      {/* Bottom row */}
      <div className="flex items-end justify-between gap-2">
        <span className="font-heading text-[#141414] group-hover:text-white text-2xl font-light leading-tight transition-colors duration-300 max-w-[50%]">
          {area.title}
        </span>

        {/* Button */}
        <div className="shrink-0 w-9 h-9 bg-[#D9D9D9] rounded-full border border-[#C8C8C8] group-hover:border-secondary group-hover:bg-secondary flex items-center justify-center transition-all duration-300">
          {/* Plus → Arrow on hover */}
          <svg
            className="text-white group-hover:hidden"
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          <svg
            className="text-white hidden group-hover:block"
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
