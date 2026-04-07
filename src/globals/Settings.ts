import { buttonField } from '@/fields/buttonField'
import type { GlobalConfig } from 'payload'

export const settings: GlobalConfig = {
  slug: 'settings',
  label: 'Configurações gerais',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Gerais',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'location',
              label: 'Localização',
              type: 'richText',
              required: true,
            },
            {
              name: 'locationTwo',
              label: 'Localização 2',
              type: 'richText',
              required: true,
            },
            {
              name: 'instagram',
              label: 'Instagram',
              type: 'text',
              required: true,
            },
            {
              name: 'facebook',
              label: 'Facebook',
              type: 'text',
              required: true,
            },
            {
              name: 'linkedin',
              label: 'LinkedIn',
              type: 'text',
              required: true,
            },
            {
              name: 'youtube',
              label: 'YouTube',
              type: 'text',
              required: true,
            },
            {
              name: 'selos',
              label: 'Selos',
              type: 'array',
              required: true,
              fields: [
                {
                  name: 'logo',
                  label: 'Logo',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
            buttonField('cta', 'CTA'),
          ],
        },
        {
          label: 'Políticas',
          fields: [
            {
              name: 'privacyPolicy',
              label: 'Política de Privacidade',
              type: 'richText',
              required: true,
            },
            {
              name: 'termsOfService',
              label: 'Termos de Serviço',
              type: 'richText',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
