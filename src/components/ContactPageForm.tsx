'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import type { Area } from '@/payload-types'

interface ContactPageFormProps {
  buttonText: string
  areas: Area[]
  showCompanyField?: boolean
}

const inputClass =
  'h-[58px] rounded-[15px] border-[#d9d9d9] bg-transparent px-[25px] text-sm text-primary placeholder:text-[#b0b0b0] focus-visible:border-primary focus-visible:ring-0'

export function ContactPageForm({
  buttonText,
  areas,
  showCompanyField = true,
}: ContactPageFormProps) {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    cidade: '',
    empresa: '',
    interesse: '',
    mensagem: '',
    aceito: false,
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  function set(field: keyof typeof form, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          empresa: showCompanyField ? form.empresa : '',
        }),
      })

      if (!res.ok) throw new Error()

      setStatus('success')
      setForm({
        nome: '',
        email: '',
        telefone: '',
        cidade: '',
        empresa: '',
        interesse: '',
        mensagem: '',
        aceito: false,
      })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="rounded-[24px] bg-white p-6 shadow-[0_18px_60px_rgba(32,34,70,0.08)] sm:rounded-[30px] sm:p-8 lg:p-10">
      {status === 'success' ? (
        <p className="py-16 text-center text-base text-secondary">
          Mensagem enviada! Entraremos em contato em breve.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-[1.15rem]">
          <div className="grid gap-[1.15rem] md:grid-cols-2">
            <Input
              className={inputClass}
              placeholder="Nome"
              value={form.nome}
              onChange={(e) => set('nome', e.target.value)}
              required
            />
            <Input
              type="email"
              className={inputClass}
              placeholder="Email"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              required
            />
          </div>

          <div className="grid gap-[1.15rem] md:grid-cols-2">
            <Input
              className={inputClass}
              placeholder="Telefone"
              value={form.telefone}
              onChange={(e) => set('telefone', e.target.value)}
            />
            <Input
              className={inputClass}
              placeholder="Cidade"
              value={form.cidade}
              onChange={(e) => set('cidade', e.target.value)}
            />
          </div>

          {showCompanyField && (
            <Input
              className={inputClass}
              placeholder="Empresa"
              value={form.empresa}
              onChange={(e) => set('empresa', e.target.value)}
            />
          )}

          <Select value={form.interesse} onValueChange={(value) => set('interesse', value)}>
            <SelectTrigger
              className={`h-14.5! w-full rounded-[15px] border-[#d9d9d9] px-6.25 text-sm text-primary data-placeholder:text-[#b0b0b0] focus-visible:border-primary focus-visible:ring-0${form.interesse ? ' font-semibold' : ''}`}
            >
              <SelectValue placeholder="Área de interesse" />
            </SelectTrigger>
            <SelectContent>
              {areas.map((area) => (
                <SelectItem key={area.id} value={area.id}>
                  {area.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Textarea
            className="min-h-[100px] rounded-[15px] border-[#d9d9d9] px-6.25 py-3.75 text-sm text-primary placeholder:text-[#b0b0b0] focus-visible:border-primary focus-visible:ring-0"
            placeholder="Mensagem"
            value={form.mensagem}
            onChange={(e) => set('mensagem', e.target.value)}
          />

          <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-end sm:justify-between">
            <label className="flex cursor-pointer items-center gap-2.5 text-[10px] leading-3.5 text-[#969696]">
              <button
                type="button"
                onClick={() => set('aceito', !form.aceito)}
                className={`flex h-3.75 w-3.75 items-center justify-center rounded-full border transition-colors ${
                  form.aceito ? 'border-primary bg-primary' : 'border-[#cfcfcf] bg-white'
                }`}
                aria-pressed={form.aceito}
                aria-label="Aceitar termos de privacidade"
              >
                {form.aceito && <span className="h-1.25 w-1.25 rounded-full bg-white" />}
              </button>
              Eu aceito os termos de privacidade
            </label>

            <Button
              type="submit"
              variant="primary"
              disabled={status === 'loading' || !form.aceito}
              className="min-w-[12.5rem] justify-center self-start rounded-[15px] px-7.5 py-3.75 text-sm sm:self-auto"
            >
              {status === 'loading' ? 'Enviando...' : buttonText}
              <svg
                width="24"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  d="M20.6363 3.52199C20.5302 3.43374 20.4008 3.37781 20.264 3.36094C20.1273 3.34408 19.9886 3.367 19.8646 3.42699L4.86458 10.927C4.73436 10.9921 4.62872 11.0978 4.56366 11.228C4.4986 11.3582 4.47776 11.5059 4.50416 11.6488C4.53056 11.7916 4.60276 11.922 4.71032 12.0207C4.81787 12.1193 4.95406 12.18 5.09858 12.194L11.6366 12.849L12.2916 19.387C12.3056 19.5315 12.3662 19.6677 12.4649 19.7752C12.5636 19.8828 12.6939 19.955 12.8368 19.9814C12.9797 20.0078 13.1273 19.9869 13.2576 19.9219C13.3878 19.8568 13.4934 19.7512 13.5586 19.621L21.0586 4.62099C21.1185 4.49702 21.1415 4.35827 21.1246 4.22156C21.1078 4.08485 21.0518 3.95535 20.9636 3.84925C20.8753 3.74314 20.7585 3.66498 20.627 3.62408C20.4955 3.58317 20.355 3.58126 20.2225 3.61858L20.6363 3.52199ZM12.3636 17.334L11.7916 11.612C11.773 11.4261 11.6882 11.253 11.5532 11.1231C11.4182 10.9932 11.242 10.915 11.0556 10.904L5.33358 10.332L18.5656 3.71699L12.3636 17.334Z"
                  fill="currentColor"
                />
              </svg>
            </Button>
          </div>

          {status === 'error' && (
            <p className="text-xs text-red-500">Ocorreu um erro. Tente novamente.</p>
          )}
        </form>
      )}
    </div>
  )
}
