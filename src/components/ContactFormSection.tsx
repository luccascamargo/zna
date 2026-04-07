'use client'

import type { Area, Home, Setting } from '@/payload-types'
import { useState } from 'react'
import { Container } from './Container'
import { RichText } from './RichText'
import { Button } from './ui/button'
import { SendHorizonalIcon } from 'lucide-react'

interface ContactFormSectionProps {
  data: Home['formSection']
  settings: Setting
  areas: Area[]
}

const inputClass =
  'w-full bg-transparent border border-[#D0D0D0] rounded-[12px] px-4 py-3.5 text-sm text-primary placeholder:text-[#969696] outline-none focus:border-primary transition-colors'

export function ContactFormSection({ data, settings, areas }: ContactFormSectionProps) {
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

  function set(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="pt-20 bg-[#F7F7F7] h-100">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left */}
          <div className="flex flex-col gap-16 lg:gap-0 lg:justify-between lg:h-full">
            <div>
              <RichText
                data={data.title}
                className="font-heading max-w-98.5 text-[#969696] text-4xl sm:text-5xl font-extralight [&_strong]:text-primary [&_strong]:font-extralight"
              />
              <p className="text-[#969696] text-sm mt-6 leading-relaxed max-w-xs">
                {data.description}
              </p>
            </div>
          </div>

          {/* Right — form card */}
          <div className="bg-[#F7F7F7] rounded-[24px] shadow-xl p-8 z-10">
            {status === 'success' ? (
              <p className="text-secondary font-medium text-center py-12">
                Mensagem enviada! Entraremos em contato em breve.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    className={inputClass}
                    placeholder="Nome"
                    value={form.nome}
                    onChange={(e) => set('nome', e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    className={inputClass}
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    className={inputClass}
                    placeholder="Telefone"
                    value={form.telefone}
                    onChange={(e) => set('telefone', e.target.value)}
                  />
                  <input
                    className={inputClass}
                    placeholder="Cidade"
                    value={form.cidade}
                    onChange={(e) => set('cidade', e.target.value)}
                  />
                </div>
                <input
                  className={inputClass}
                  placeholder="Empresa"
                  value={form.empresa}
                  onChange={(e) => set('empresa', e.target.value)}
                />
                <div className="relative">
                  <select
                    className={`${inputClass} appearance-none pr-10`}
                    value={form.interesse}
                    onChange={(e) => set('interesse', e.target.value)}
                  >
                    <option value="" disabled>
                      Interesse
                    </option>
                    {areas.map((area) => (
                      <option key={area.id} value={area.id}>
                        {area.title}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#969696]"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <textarea
                  className={`${inputClass} resize-none h-24`}
                  placeholder="Mensagem"
                  value={form.mensagem}
                  onChange={(e) => set('mensagem', e.target.value)}
                />

                <div className="flex items-center justify-between gap-4 mt-2 flex-wrap">
                  <label className="flex items-center gap-2 text-xs text-[#969696] cursor-pointer">
                    <div
                      onClick={() => set('aceito', !form.aceito)}
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                        form.aceito ? 'border-primary bg-primary' : 'border-[#D0D0D0]'
                      }`}
                    >
                      {form.aceito && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    Eu aceito os termos de privacidade
                  </label>

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={status === 'loading' || !form.aceito}
                    className="shrink-0"
                  >
                    {data.buttonText}
                    <SendHorizonalIcon size={18} />
                  </Button>
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-xs">Ocorreu um erro. Tente novamente.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
