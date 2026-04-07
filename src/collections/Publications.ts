import type { CollectionConfig } from 'payload'

export const Publications: CollectionConfig = {
  slug: 'publications',
  labels: {
    singular: 'Publicacão',
    plural: 'Publicacões',
  },
  admin: {
    useAsTitle: 'title',
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
  ],
}
