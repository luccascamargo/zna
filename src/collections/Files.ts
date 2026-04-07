import type { CollectionConfig } from 'payload'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export const Files: CollectionConfig = {
  slug: 'files',
  labels: {
    singular: 'Arquivo',
    plural: 'Arquivos',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
