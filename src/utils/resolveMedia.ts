import type { Media } from '@/payload-types'

export function resolveMedia(value: string | Media | null | undefined): Media | null {
  if (!value || typeof value === 'string') return null
  return value
}
