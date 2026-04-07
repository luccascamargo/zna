import React from 'react'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import localFont from 'next/font/local'
import { DM_Sans } from 'next/font/google'
import '../globals.css'

const lufga = localFont({
  src: [
    { path: '../../../../public/fonts/Lufga-Thin.otf', weight: '100', style: 'normal' },
    { path: '../../../../public/fonts/Lufga-ThinItalic.otf', weight: '100', style: 'italic' },
    { path: '../../../../public/fonts/Lufga-ExtraLight.otf', weight: '200', style: 'normal' },
    { path: '../../../../public/fonts/Lufga-ExtraLightItalic.otf', weight: '200', style: 'italic' },
    { path: '../../../../public/fonts/Lufga-Light.otf', weight: '300', style: 'normal' },
    { path: '../../../../public/fonts/Lufga-LightItalic.otf', weight: '300', style: 'italic' },
    { path: '../../../../public/fonts/Lufga-Regular.otf', weight: '400', style: 'normal' },
    { path: '../../../../public/fonts/Lufga-Italic.otf', weight: '400', style: 'italic' },
    { path: '../../../../public/fonts/Lufga-Medium.otf', weight: '500', style: 'normal' },
    { path: '../../../../public/fonts/Lufga-MediumItalic.otf', weight: '500', style: 'italic' },
    { path: '../../../../public/fonts/Lufga-SemiBold.otf', weight: '600', style: 'normal' },
    { path: '../../../../public/fonts/Lufga-SemiBoldItalic.otf', weight: '600', style: 'italic' },
    { path: '../../../../public/fonts/Lufga-Bold.otf', weight: '700', style: 'normal' },
    { path: '../../../../public/fonts/Lufga-BoldItalic.otf', weight: '700', style: 'italic' },
    { path: '../../../../public/fonts/Lufga-ExtraBold.otf', weight: '800', style: 'normal' },
    { path: '../../../../public/fonts/Lufga-ExtraBoldItalic.otf', weight: '800', style: 'italic' },
    { path: '../../../../public/fonts/Lufga-Black.otf', weight: '900', style: 'normal' },
    { path: '../../../../public/fonts/Lufga-BlackItalic.otf', weight: '900', style: 'italic' },
  ],
  variable: '--font-lufga',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata = {
  description: 'Soluções jurídicas estratégicas para decisões que constroem o futuro.',
  title: 'ZNA Advocacia',
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'pt' | 'en')) {
    notFound()
  }

  return (
    <html lang={locale} className={`${lufga.variable} ${dmSans.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
