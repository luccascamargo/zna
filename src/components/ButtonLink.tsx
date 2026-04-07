import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import type { VariantProps } from 'class-variance-authority'
import type { ReactNode } from 'react'

interface ButtonLinkProps extends VariantProps<typeof buttonVariants> {
  title: string
  href: string
  type?: ('internal' | 'external') | null
  newTab?: boolean | null
  className?: string
  icon?: ReactNode
}

export function ButtonLink({
  title,
  href,
  type = 'internal',
  newTab,
  variant,
  className,
  icon,
}: ButtonLinkProps) {
  const content = (
    <>
      {title}
      {icon}
    </>
  )

  if (type === 'external') {
    return (
      <Button asChild variant={variant} className={className}>
        <a href={href} target={newTab ? '_blank' : undefined} rel="noopener noreferrer">
          {content}
        </a>
      </Button>
    )
  }

  return (
    <Button asChild variant={variant} className={className}>
      <Link href={href} target={newTab ? '_blank' : undefined}>
        {content}
      </Link>
    </Button>
  )
}
