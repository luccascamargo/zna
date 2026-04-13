'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useRef } from 'react'
import type { Area } from '@/payload-types'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface PublicationsFilterProps {
  areas: Area[]
  types: string[]
}

export function PublicationsFilter({ areas, types }: PublicationsFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function buildUrl(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString())
    for (const [key, value] of Object.entries(updates)) {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    }
    params.delete('page')
    const qs = params.toString()
    return qs ? `${pathname}?${qs}` : pathname
  }

  function handleKeyword(value: string) {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      router.push(buildUrl({ q: value }))
    }, 400)
  }

  function handleSelect(key: string, value: string) {
    router.push(buildUrl({ [key]: value === '_all' ? '' : value }))
  }

  const triggerClass =
    'w-full h-auto data-[size=default]:h-auto rounded-full border-[#E5E5E5] px-5 py-3 text-sm text-[#969696] data-placeholder:text-[#969696] focus:ring-0 focus-visible:ring-0 focus-visible:border-[#969696]'

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
      <Input
        type="text"
        placeholder="Palavra chave"
        defaultValue={searchParams.get('q') ?? ''}
        onChange={(e) => handleKeyword(e.target.value)}
        className="h-auto rounded-full border-[#E5E5E5] px-5 py-3 text-sm text-[#969696] placeholder:text-[#969696] focus-visible:ring-0 focus-visible:border-[#969696]"
      />

      <Select
        value={searchParams.get('area') ?? '_all'}
        onValueChange={(v) => handleSelect('area', v)}
      >
        <SelectTrigger className={triggerClass}>
          <SelectValue placeholder="Escolha a área de interesse" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="_all">Todas as áreas</SelectItem>
          {areas.map((area) => (
            <SelectItem key={area.id} value={area.slug}>
              {area.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={searchParams.get('type') ?? '_all'}
        onValueChange={(v) => handleSelect('type', v)}
      >
        <SelectTrigger className={triggerClass}>
          <SelectValue placeholder="Tipo de publicação" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="_all">Todos os tipos</SelectItem>
          {types.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
