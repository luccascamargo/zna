import type { GlobalConfig } from 'payload'

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Pagina de Contato',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'content',
          label: 'conteudo',
          fields: [
            {
              name: 'title',
              type: 'richText',
              label: 'Título',
              required: true,
            },
            {
              name: 'description',
              type: 'richText',
              label: 'Descrição',
              required: true,
            },
          ],
        },
        {
          name: 'form',
          label: 'Formulário',
          fields: [
            {
              name: 'buttonText',
              type: 'text',
              label: 'Texto do Botão',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
