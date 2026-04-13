'use client'

import { useFormFields } from '@payloadcms/ui'

export const PublicationLink = () => {
  const slug = useFormFields(([fields]) => fields?.slug?.value as string)

  if (!slug) return null

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/pt/publicacoes/${slug}`

  return (
    <div style={{ marginTop: '0.5rem' }}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.8rem',
          color: 'var(--theme-elevation-450)',
          textDecoration: 'none',
        }}
      >
        Abrir publicação no site ↗
      </a>
    </div>
  )
}
