import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email } = await req.json()

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
  }

  // TODO: implement email sending (e.g. Resend, Nodemailer)
  console.log('Newsletter subscription:', email)

  return NextResponse.json({ ok: true })
}
