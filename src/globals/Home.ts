import type { GlobalConfig } from 'payload'
import { buttonField } from '@/fields/buttonField'

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Pagina Home',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'hero',
          fields: [
            {
              name: 'background',
              label: 'Imagem de fundo',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'title',
              type: 'richText',
              required: true,
            },
            {
              name: 'description',
              type: 'text',
              required: true,
            },
            buttonField('cta1', 'Botao de ação'),
            buttonField('cta2', 'Botao de ação'),
          ],
        },
        {
          name: 'publicationsSection',
          label: 'Seção de Publicações',
          fields: [
            {
              name: 'title',
              type: 'richText',
              required: true,
            },
            {
              name: 'description',
              type: 'text',
              required: true,
            },
            buttonField('cta', 'Botao de ação'),
          ],
        },
        {
          name: 'leadsSection',
          label: 'Seção de Leads',
          fields: [
            {
              name: 'title',
              type: 'richText',
              required: true,
            },
            {
              name: 'description',
              type: 'text',
              required: true,
            },
            {
              name: 'emailInputLabel',
              label: 'Texto do campo de email',
              type: 'text',
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
        {
          name: 'bannerSection',
          label: 'Seção de Banner',
          fields: [
            {
              name: 'background',
              label: 'Imagem de fundo',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'backgroundDescription',
              label: 'Descrição do banner',
              type: 'text',
              required: true,
            },
            {
              name: 'title',
              label: 'Titulo',
              type: 'richText',
              required: true,
            },
            {
              name: 'description',
              label: 'Descrição',
              type: 'text',
              required: true,
            },
            {
              name: 'textItems',
              label: 'Itens de texto',
              type: 'array',
              required: true,
              fields: [
                {
                  name: 'title',
                  label: 'Titulo',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  label: 'Descrição',
                  type: 'text',
                  required: true,
                },
              ],
            },
            buttonField('cta', 'Botao de ação'),
          ],
        },
        {
          name: 'actuationSection',
          label: 'Seção de Atuação',
          fields: [
            {
              name: 'title',
              label: 'Titulo',
              type: 'richText',
              required: true,
            },
            {
              name: 'description',
              label: 'Descrição',
              type: 'text',
              required: true,
            },
            buttonField('cta', 'Botao de ação'),
          ],
        },
        {
          name: 'formSection',
          label: 'Seção de Formulário',
          fields: [
            {
              name: 'title',
              label: 'Titulo',
              type: 'richText',
              required: true,
            },
            {
              name: 'description',
              label: 'Descrição',
              type: 'text',
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
