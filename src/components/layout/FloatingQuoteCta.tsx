import { motion, useReducedMotion } from 'motion/react'
import type { SiteContent } from '@/schemas/site'
import { cn } from '@/lib/cn'

export function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
    </svg>
  )
}

/** Botón flotante pequeño (cotización / WhatsApp), esquina inferior derecha, todas las vistas. */
export function FloatingQuoteCta({ content }: { content: SiteContent }) {
  const reduce = useReducedMotion() ?? false
  const waHref = `${content.contact.whatsappUrl}?text=${encodeURIComponent(content.contact.whatsappPrefillMessage)}`
  const label = content.contact.whatsappCtaLabel

  return (
    <div
      className={cn(
        'pointer-events-none fixed z-[110]',
        'bottom-0 right-0 flex justify-end',
        'p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pl-0 sm:p-4 sm:pb-[max(1rem,env(safe-area-inset-bottom))]',
      )}
    >
      <motion.a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${label} por WhatsApp`}
        title={label}
        initial={reduce ? false : { scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={
          reduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 24, delay: 0.2 }
        }
        whileHover={reduce ? undefined : { scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          'pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full sm:h-12 sm:w-12',
          'border border-accent/30 bg-accent text-on-accent shadow-[0_6px_24px_rgba(0,0,0,0.28),0_0_0_1px_rgba(255,255,255,0.08)]',
          'no-underline transition-colors duration-200',
          'hover:border-accent hover:bg-accent-hover',
        )}
      >
        <ChatIcon className="h-[1.15rem] w-[1.15rem] shrink-0 opacity-95 sm:h-5 sm:w-5" />
      </motion.a>
    </div>
  )
}
