import { motion, useReducedMotion } from 'motion/react'
import type { SiteContent } from '@/schemas/site'
import { VisitorCounter } from '@/components/ui/VisitorCounter'
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
          <motion.div
            className="mt-8 border-t border-border/50 pt-8"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: reduce ? 0 : 0.45, ease: EASE_SMOOTH }}
          >
            <div className="flex flex-col items-center gap-6 sm:gap-7">
              <VisitorCounter className="w-full max-w-md" />
              <img
                src="/250299CF-E5D2-46E6-8772-79F3C597F247.PNG"
                alt={`${brand.name} — ingeniería, instalaciones y remodelaciones`}
                className="h-auto w-full max-w-[10.5rem] object-contain sm:max-w-[12rem] lg:max-w-[13rem]"
                width={512}
                height={512}
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  )
}
