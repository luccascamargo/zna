import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'group/button inline-flex shrink-0 items-center justify-center gap-2.5 rounded-[15px] border px-[30px] py-[15px] text-base font-medium whitespace-nowrap transition-all outline-none select-none cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        green:
          'bg-secondary text-secondary-foreground border-secondary hover:bg-transparent hover:text-secondary',
        primary:
          'bg-primary text-primary-foreground border-primary hover:bg-transparent hover:text-primary',
        white:
          'bg-white text-primary border-white hover:bg-transparent hover:text-white hover:border-white',
        default:
          'bg-primary text-primary-foreground border-primary hover:bg-transparent hover:text-primary',
        outline: 'border-border bg-background hover:bg-muted hover:text-foreground',
        ghost: 'border-transparent hover:bg-muted hover:text-foreground',
        link: 'border-transparent text-primary underline-offset-4 hover:underline px-0 py-0',
      },
      size: {
        default: '',
        sm: 'px-4 py-2 text-sm',
        lg: 'px-10 py-5 text-lg',
        icon: 'p-3',
        'icon-sm': 'p-2',
        carousel: 'p-2',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant = 'primary',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
