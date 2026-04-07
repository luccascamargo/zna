import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const { nome, email, telefone, cidade, empresa, interesse, mensagem, aceito } = body

  if (!nome || !email || !aceito) {
    return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 })
  }

  // TODO: implement email sending (e.g. Resend, Nodemailer)
  console.log('Contact form submission:', { nome, email, telefone, cidade, empresa, interesse, mensagem })

  return NextResponse.json({ ok: true })
}
