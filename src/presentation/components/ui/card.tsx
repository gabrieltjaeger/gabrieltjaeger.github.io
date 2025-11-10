import * as React from 'react'

import { cn } from '@/lib/utils'

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-border py-6 shadow-[0_8px_16px_-4px_rgba(0,0,0,0.3),0_4px_8px_-2px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_24px_-6px_rgba(0,0,0,0.4),0_8px_12px_-4px_rgba(0,0,0,0.3)] transition-all duration-300 relative before:absolute before:inset-0 before:rounded-xl before:border before:border-accent/5 before:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-br after:from-accent/5 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:pointer-events-none after:duration-300 overflow-hidden',
        className,
      )}
      style={{ transform: 'translateZ(0)' }}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className,
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-6', className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  )
}

export {
    Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
}

