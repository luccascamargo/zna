import type { GlobalConfig } from 'payload'

export const Documents: GlobalConfig = {
  slug: 'documents',
  label: 'Pagina de documentos',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Conteudo',
          fields: [
            {
              name: 'title',
              label: 'Título',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              label: 'Descrição',
              type: 'text',
              required: true,
            },
            {
              name: 'transparencySection',
              label: 'Transparência',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  label: 'Título',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  label: 'Descrição',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'downloads',
                  label: 'Downloads',
                  type: 'array',
                  required: true,
                  fields: [
                    {
                      name: 'title',
                      label: 'Título',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'file',
                      label: 'Arquivo',
                      type: 'upload',
                      relationTo: 'files',
                      required: true,
                    },
                  ],
                },
              ],
            },
            {
              name: 'certificationSection',
              label: 'Certificação',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  label: 'Título',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  label: 'Descrição',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'downloads',
                  label: 'Downloads',
                  type: 'array',
                  required: true,
                  fields: [
                    {
                      name: 'title',
                      label: 'Título',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'file',
                      label: 'Arquivo',
                      type: 'upload',
                      relationTo: 'files',
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Formulário',
          fields: [
            {
              name: 'buttonText',
              label: 'Texto do botão',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
