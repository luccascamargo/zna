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
    singular: 'Área de Atuação',
    plural: 'Áreas de Atuação',
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
      required: true,
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
    {
      type: 'tabs',
      tabs: [
        {
          name: 'hero',
          label: 'Hero',
          fields: [
            {
              name: 'subTitle',
              label: 'Subtítulo',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              label: 'Descrição',
              type: 'richText',
              required: true,
            },
            {
              name: 'image',
              label: 'Imagem de destaque',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
        {
          name: 'contentSection',
          label: 'Conteúdo',
          fields: [
            {
              name: 'content',
              label: 'Conteúdo',
              type: 'richText',
              required: true,
            },
          ],
        },
        {
          name: 'formSection',
          label: 'Formulário',
          fields: [
            {
              name: 'title',
              label: 'Título',
              type: 'richText',
              required: true,
            },
            {
              name: 'description',
              label: 'Descrição',
              type: 'textarea',
              required: true,
            },
            {
              name: 'buttonText',
              label: 'Texto do botão',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'relations',
          label: 'Relacionamentos',
          fields: [
            {
              name: 'publications',
              label: 'Publicações relacionadas',
              type: 'relationship',
              relationTo: 'publications',
              hasMany: true,
            },
            {
              name: 'experts',
              label: 'Especialistas relacionados',
              type: 'relationship',
              relationTo: 'specialists',
              hasMany: true,
            },
          ],
        },
      ],
    },
  ],
}
