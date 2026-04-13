import Link from 'next/link'
import { cn } from '@/lib/utils'

interface PublicationsPaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
}

function pageUrl(baseUrl: string, page: number) {
  const sep = baseUrl.includes('?') ? '&' : '?'
  return `${baseUrl}${sep}page=${page}`
}

export function PublicationsPagination({ currentPage, totalPages, baseUrl }: PublicationsPaginationProps) {
  if (totalPages <= 1) return null

  const pages: (number | 'ellipsis')[] = []

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else {
    pages.push(1)
    if (currentPage > 3) pages.push('ellipsis')
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i)
    }
    if (currentPage < totalPages - 2) pages.push('ellipsis')
    pages.push(totalPages)
  }

  const navBtnClass = 'w-8 h-8 flex items-center justify-center rounded-full text-[#969696] hover:bg-[#F7F7F7] transition-colors'

  return (
    <div className="flex items-center justify-center gap-1 py-10">
      <Link
        href={pageUrl(baseUrl, currentPage - 1)}
        aria-disabled={currentPage <= 1}
        className={cn(navBtnClass, currentPage <= 1 && 'pointer-events-none opacity-30')}
      >
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </Link>

      {pages.map((p, i) =>
        p === 'ellipsis' ? (
          <span key={`e${i}`} className="w-8 h-8 flex items-center justify-center text-[#969696] text-sm">
            ...
          </span>
        ) : (
          <Link
            key={p}
            href={pageUrl(baseUrl, p)}
            className={cn(
              'w-8 h-8 flex items-center justify-center rounded-full text-sm transition-colors',
              p === currentPage
                ? 'bg-secondary text-white'
                : 'text-[#969696] hover:bg-[#F7F7F7]',
            )}
          >
            {p}
          </Link>
        ),
      )}

      <Link
        href={pageUrl(baseUrl, currentPage + 1)}
        aria-disabled={currentPage >= totalPages}
        className={cn(navBtnClass, currentPage >= totalPages && 'pointer-events-none opacity-30')}
      >
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M9 18l6-6-6-6" />
        </svg>
      </Link>
    </div>
  )
}
