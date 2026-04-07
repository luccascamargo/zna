import { buttonField } from '@/fields/buttonField'
import type { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'Página Sobre',
  fields: [
    {
      name: 'backgroundImage',
      label: 'Imagem de Fundo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'compromisso',
          label: 'Compromisso',
          fields: [
            {
              name: 'title',
              label: 'Título',
              type: 'richText',
              required: true,
            },
            {
              name: 'stats',
              label: 'Estatísticas',
              type: 'array',
              required: true,
              fields: [
                {
                  name: 'stat',
                  label: 'Estatística',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'description',
              label: 'Descrição',
              type: 'richText',
              required: true,
            },
            {
              name: 'descriptionItems',
              label: 'Itens da Descrição',
              type: 'array',
              required: true,
              fields: [
                {
                  name: 'item',
                  label: 'Item',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          name: 'jornada',
          label: 'Jornada',
          fields: [
            {
              name: 'title',
              label: 'Título',
              type: 'richText',
              required: true,
            },
            {
              name: 'mission',
              label: 'Missão',
              type: 'group',
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
              ],
            },
            {
              name: 'vision',
              label: 'Visão',
              type: 'group',
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
              ],
            },
            {
              name: 'values',
              label: 'Valores',
              type: 'group',
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
              ],
            },
          ],
        },
        {
          name: 'history',
          label: 'História',
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
              name: 'image',
              label: 'Imagem',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'social',
              label: 'Responsabilidade social',
              type: 'group',
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
                  name: 'image',
                  label: 'Imagem',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                buttonField('cta', 'CTA'),
              ],
            },
          ],
        },
        {
          name: 'awards',
          label: 'Premiações',
          fields: [
            {
              name: 'title',
              label: 'Título',
              type: 'richText',
              required: true,
            },
            {
              name: 'items',
              label: 'Itens',
              type: 'array',
              required: true,
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
                  name: 'image',
                  label: 'Imagem',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
