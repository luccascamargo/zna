import type { GlobalConfig } from 'payload'

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export const Experts: GlobalConfig = {
  slug: 'experts',
  label: 'Pagina Especialistas',
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
      type: 'textarea',
      required: true,
    },
    {
      name: 'actuationArea',
      label: 'Área de Atuação',
      type: 'text',
      required: true,
    },
    {
      name: 'experts',
      label: 'Especialistas',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'image',
          label: 'Imagem',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'name',
          label: 'Nome',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Descrição',
          type: 'textarea',
          required: true,
        },
        {
          name: 'email',
          label: 'Email',
          type: 'text',
          required: true,
        },
        {
          name: 'instagram',
          label: 'Instagram',
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
          name: 'whatsapp',
          label: 'WhatsApp',
          type: 'text',
          required: true,
        },
        {
          name: 'actuation',
          label: 'Áreas de Atuação',
          type: 'array',
          required: true,
          validate: (value) => {
            if (!Array.isArray(value)) return true
            const labels = value.map((item) => item.label?.toLowerCase()).filter(Boolean)
            if (labels.length !== new Set(labels).size) {
              return 'Não pode haver áreas de atuação com nomes repetidos.'
            }
            return true
          },
          fields: [
            {
              name: 'label',
              label: 'Nome',
              type: 'text',
              required: true,
            },
            {
              name: 'slug',
              label: 'Slug',
              type: 'text',
              admin: {
                readOnly: true,
                description: 'Gerado automaticamente a partir do nome.',
              },
              hooks: {
                beforeChange: [
                  ({ siblingData }) => {
                    if (siblingData?.label) return toSlug(siblingData.label)
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
}
