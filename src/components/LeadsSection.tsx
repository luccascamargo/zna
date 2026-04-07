'use client'

import type { Home } from '@/payload-types'
import { useState } from 'react'
import { Container } from './Container'
import { RichText } from './RichText'
import { Button } from './ui/button'
import { MailIcon } from 'lucide-react'

interface LeadsSectionProps {
  data: Home['leadsSection']
}

export function LeadsSection({ data }: LeadsSectionProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) throw new Error()
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="bg-primary py-20">
      <Container>
        <div className="max-w-140.5 mx-auto">
          <RichText
            data={data.title}
            className="font-heading text-white text-4xl sm:text-5xl font-extralight [&_strong]:font-semibold"
          />
          <p className="text-white mt-6 text-sm sm:text-base leading-relaxed">{data.description}</p>

          {status === 'success' ? (
            <p className="mt-8 text-secondary font-medium">
              Obrigado! Em breve você receberá nossas atualizações.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mt-8">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={data.emailInputLabel}
                className="flex-1 bg-transparent border border-secondary rounded-[15px] px-5 py-[15px] text-white placeholder:text-secondary text-sm outline-none focus:border-white/60 transition-colors"
              />
              <Button
                type="submit"
                variant="green"
                disabled={status === 'loading'}
                className="shrink-0"
              >
                {data.buttonText}
                <MailIcon size={18} />
              </Button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-2 text-red-400 text-sm">Ocorreu um erro. Tente novamente.</p>
          )}
        </div>
      </Container>
    </section>
  )
}
