import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'outline'

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  className,
  ...props
}: ComponentProps<'a'> & { variant?: Variant }) {
  return (
    <a
      href={href}
      className={cn(
        'inline-flex items-center justify-center rounded-[var(--radius-lg)] border-2 px-5 py-3.5 text-center text-[0.95rem] font-semibold transition-all duration-200',
        variant === 'primary' &&
          'border-transparent bg-accent text-[#1a1205] shadow-[0_0_0_0_var(--color-accent-glow)] hover:bg-[#ffb83d] hover:shadow-[0_0_28px_var(--color-accent-glow)] hover:no-underline',
        variant === 'outline' &&
          'border-border bg-transparent text-foreground hover:border-accent hover:text-accent hover:no-underline',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  )
}
