import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function Section({
  id,
  className,
  children,
  variant = 'default',
}: {
  id?: string
  className?: string
  children: ReactNode
  variant?: 'default' | 'alt' | 'highlight' | 'cta'
}) {
  return (
    <section
      id={id}
      className={cn(
        'py-16',
        variant === 'alt' && 'bg-bg-elevated',
        variant === 'highlight' && 'border-y border-border',
        variant === 'cta' &&
          'border-t border-border bg-gradient-to-b from-bg to-[#0e1218] py-[4.5rem]',
        className,
      )}
    >
      {children}
    </section>
  )
}
