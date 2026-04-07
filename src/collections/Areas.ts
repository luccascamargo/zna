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

export const Areas: CollectionConfig = {
  slug: 'areas',
  labels: {
    singular: 'Área de Interesse',
    plural: 'Áreas de Interesse',
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'icon',
      label: 'Ícone',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      unique: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
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
