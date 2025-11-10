import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive relative overflow-hidden",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_16px_-4px_rgba(0,0,0,0.4)] hover:translate-y-[-1px] active:translate-y-[0px] before:absolute before:inset-0 before:bg-gradient-to-t before:from-black/10 before:to-transparent after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/20 after:via-transparent after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity',
        destructive:
          'bg-destructive text-destructive-foreground shadow-[0_4px_12px_-2px_rgba(239,68,68,0.3)] hover:shadow-[0_6px_16px_-4px_rgba(239,68,68,0.4)] hover:translate-y-[-1px] active:translate-y-[0px] after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/20 after:via-transparent after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity',
        outline:
          'border border-input bg-background hover:bg-accent/10 hover:text-accent-foreground hover:border-accent shadow-[0_2px_8px_-2px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)] after:absolute after:inset-0 after:bg-gradient-to-br after:from-accent/10 after:via-transparent after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity',
        secondary:
          'bg-secondary text-secondary-foreground shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_16px_-4px_rgba(0,0,0,0.4)] hover:translate-y-[-1px] active:translate-y-[0px] after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/15 after:via-transparent after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity',
        ghost:
          'hover:bg-accent/10 hover:text-accent after:absolute after:inset-0 after:bg-gradient-to-br after:from-accent/10 after:via-transparent after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
