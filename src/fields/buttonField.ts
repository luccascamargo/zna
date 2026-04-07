import type { GroupField } from 'payload'

export function buttonField(name: string, label?: string): GroupField {
  return {
    name,
    type: 'group',
    label: label ?? 'Botão',
    fields: [
      {
        name: 'title',
        type: 'text',
        label: 'Título',
        required: true,
      },
      {
        name: 'type',
        type: 'radio',
        label: 'Tipo de link',
        defaultValue: 'internal',
        options: [
          { label: 'Interno', value: 'internal' },
          { label: 'Externo', value: 'external' },
        ],
      },
      {
        name: 'href',
        type: 'text',
        label: 'Link',
        required: true,
      },
      {
        name: 'newTab',
        type: 'checkbox',
        label: 'Abrir em nova aba',
        defaultValue: false,
      },
    ],
  }
}
