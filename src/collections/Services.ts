import { buttonField } from '@/fields/buttonField'
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

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Serviço',
    plural: 'Serviços',
  },
  admin: {
    description: 'Lista de serviços oferecidos pela ZNA. (Areas de atuação)',
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Título',
      admin: {
        description: 'Título do serviço. Também servirá como slug. (URL amigável)',
      },
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
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
              name: 'icon',
              label: 'Ícone',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
        {
          name: 'Content',
          label: 'Conteudo',
          fields: [
            {
              name: 'image',
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
          ],
        },
        {
          name: 'FormSection',
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
              type: 'richText',
              required: true,
            },
            {
              name: 'buttonText',
              label: 'Texto do Botão',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
