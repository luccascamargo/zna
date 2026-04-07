import type { GlobalConfig } from 'payload'

export const ServiceGlobal: GlobalConfig = {
  slug: 'serviceGlobal',
  label: 'Pagina de Serviços',
  fields: [
    { name: 'title', type: 'richText', label: 'Title', required: true },
    { name: 'description', type: 'richText', label: 'Description', required: true },
    { name: 'image', type: 'upload', label: 'Image', relationTo: 'media', required: true },
  ],
}
