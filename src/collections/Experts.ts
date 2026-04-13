import type { CollectionConfig } from 'payload'

export const ExpertsCollection: CollectionConfig = {
  slug: 'specialists',
  labels: {
    singular: 'Especialista',
    plural: 'Especialistas',
  },
  admin: {
    useAsTitle: 'name',
  },
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
      type: 'email',
      required: true,
    },
    {
      name: 'instagram',
      label: 'Instagram',
      type: 'text',
    },
    {
      name: 'linkedin',
      label: 'LinkedIn',
      type: 'text',
    },
    {
      name: 'whatsapp',
      label: 'WhatsApp',
      type: 'text',
    },
    {
      name: 'areas',
      label: 'Áreas de atuação',
      type: 'relationship',
      relationTo: 'areas',
      hasMany: true,
      required: true,
    },
  ],
}
