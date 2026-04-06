import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/cn'
import { EASE_SMOOTH } from '@/lib/motion-presets'
import { ThemeToggle } from '@/components/layout/ThemeToggle'

const nav = [
  { href: '/#problemas', label: 'Problemas' },
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#construccion', label: 'Construcción' },
  { href: '/#proceso', label: 'Proceso' },
  { href: '/#trabajos', label: 'Trabajos' },
  { href: '/servicios', label: 'Catálogo' },
  { href: '/#contacto', label: 'Contacto' },
]

export function SiteHeader({
  brandName,
}: {
  brandName: string
}) {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion() ?? false

  return (
    <>
      <motion.header
        className="sticky top-0 z-[100] flex h-16 min-w-0 items-center gap-2 border-b border-border bg-bg/85 px-3 backdrop-blur-md sm:gap-3 sm:px-5"
        initial={reduce ? false : { y: -12, opacity: 0.88 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.5, ease: EASE_SMOOTH }}
      >
        <Link
          to="/"
          className="min-w-0 flex-1 truncate text-sm font-bold tracking-tight text-foreground hover:text-accent hover:no-underline sm:text-base"
        >
          {brandName}
        </Link>
        <nav className="hidden min-w-0 items-center gap-6 md:flex" aria-label="Principal">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted hover:text-foreground hover:no-underline"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <ThemeToggle />
        <button
          type="button"
          className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-expanded={open}
          aria-controls="nav-mobile"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((o) => !o)}
        >
          <span
            className={cn(
              'block h-0.5 w-[22px] bg-foreground transition-transform',
              open && 'translate-y-2 rotate-45',
            )}
          />
          <span className={cn('block h-0.5 w-[22px] bg-foreground transition-opacity', open && 'opacity-0')} />
          <span
            className={cn(
              'block h-0.5 w-[22px] bg-foreground transition-transform',
              open && '-translate-y-2 -rotate-45',
            )}
          />
        </button>
      </motion.header>
      <div
        id="nav-mobile"
        className={cn(
          'fixed top-16 right-0 left-0 z-[99] flex flex-col gap-3 border-b border-border bg-bg-elevated px-5 py-4 md:hidden',
          !open && 'hidden',
        )}
      >
        {nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="py-2 font-medium text-foreground hover:text-accent"
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </>
  )
}
