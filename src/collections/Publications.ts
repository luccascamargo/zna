import type { CollectionConfig } from 'payload'

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export const Publications: CollectionConfig = {
  slug: 'publications',
  labels: {
    singular: 'Publicacão',
    plural: 'Publicacões',
  },
  admin: {
    useAsTitle: 'title',
    preview: (doc) => {
      if (!doc?.slug) return null
      return `${process.env.NEXT_PUBLIC_SERVER_URL}/pt/publicacoes/${doc.slug}`
    },
  },
  fields: [
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      required: true,
    },
    {
      name: 'imagem',
      label: 'Imagem',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'content',
      label: 'Conteúdo',
      type: 'richText',
      required: true,
    },
    {
      name: 'type',
      label: 'Tipo de publicação',
      type: 'text',
      required: true,
    },
    {
      name: 'areas',
      label: 'Áreas de Interesse',
      type: 'relationship',
      relationTo: 'areas',
      hasMany: true,
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      unique: true,
      required: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Gerado automaticamente a partir do título. Usado na URL final da publicação: /publicacoes/[slug]',
        components: {
          afterInput: ['@/components/PublicationLink#PublicationLink'],
        },
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            if (data?.title) return toSlug(data.title)
          },
        ],
      },
    },
  ],
}
