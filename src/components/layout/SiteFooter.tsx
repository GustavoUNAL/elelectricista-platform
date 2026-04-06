import { motion, useReducedMotion } from 'motion/react'
import type { SiteContent } from '@/schemas/site'
import { EASE_SMOOTH } from '@/lib/motion-presets'

export function SiteFooter({ content }: { content: SiteContent }) {
  const reduce = useReducedMotion() ?? false
  const { contact, brand, footer } = content
  const phoneLinkClass =
    'break-words text-sm font-medium text-accent transition-colors hover:text-accent-hover hover:no-underline sm:text-base'

  const phones = [
    { tel: contact.phoneTel, label: contact.phoneDisplay },
    ...(contact.phoneSecondaryTel && contact.phoneSecondaryDisplay
      ? [{ tel: contact.phoneSecondaryTel, label: contact.phoneSecondaryDisplay }]
      : []),
  ]

  return (
    <motion.footer
      className="border-t border-border bg-footer-bg pt-12 pb-16"
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: reduce ? 0 : 0.5, ease: EASE_SMOOTH }}
    >
      <div className="container-app">
        <div className="min-w-0 space-y-5">
          <div>
            <p className="text-xl font-bold tracking-tight text-foreground">{brand.name}</p>
            <p className="mt-2 text-sm text-muted">
              {contact.city}, {contact.region}
            </p>
          </div>

          <ul className="space-y-2.5 text-sm">
            {phones.map((p) => (
              <li key={p.tel}>
                <a href={`tel:${p.tel}`} className={phoneLinkClass}>
                  {p.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="space-y-1.5 border-t border-border/60 pt-5 text-sm">
            {footer.lines.map((line, i) => (
              <p
                key={line}
                className={
                  i === footer.lines.length - 1
                    ? 'font-semibold tracking-tight text-accent'
                    : 'text-muted'
                }
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
