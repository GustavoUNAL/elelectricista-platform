import { useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import type { SiteContent, ServiceCard as ServiceCardType } from '@/schemas/site'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { Section } from '@/components/ui/Section'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { EASE_SMOOTH, revealUp, staggerContainer, staggerItem } from '@/lib/motion-presets'

type Group = { title: string; services: ServiceCardType[] }

const view = { once: true, margin: '-60px' as const, amount: 0.2 as const }

export function ServicesCatalogPage() {
  const data = useOutletContext<SiteContent>()
  const reduce = useReducedMotion() ?? false

  const groups: Group[] = useMemo(
    () => [
      { title: 'Servicios principales', services: data.mainServices },
      { title: 'Construcción y obra liviana', services: data.construction },
    ],
    [data],
  )

  const waHref = `${data.contact.whatsappUrl}?text=${encodeURIComponent(data.contact.whatsappPrefillMessage)}`

  const vUp = revealUp(reduce)
  const vStagger = staggerContainer(reduce, 0.08, 0.05)
  const vItem = staggerItem(reduce, 18)

  return (
    <main>
      <Section className="pt-12">
        <div className="container-app">
          <motion.nav
            className="mb-8 text-sm text-muted"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.4, ease: EASE_SMOOTH }}
          >
            <Link to="/" className="hover:text-accent">
              Inicio
            </Link>
            <span className="mx-2 text-border">/</span>
            <span className="text-foreground">Catálogo de servicios</span>
          </motion.nav>
          <motion.h1
            className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
            variants={vUp}
            initial="hidden"
            animate="show"
          >
            Catálogo de servicios
          </motion.h1>
          <motion.p
            className="mb-10 max-w-2xl text-lg text-muted"
            variants={revealUp(reduce, 12)}
            initial="hidden"
            animate="show"
          >
            Listado unificado para futuras integraciones: CRM, cotizador en línea o fichas descargables. Los datos provienen
            de la misma fuente validada que la página principal.
          </motion.p>
          {groups.map((group, groupIndex) => {
            const cardOffset = groups.slice(0, groupIndex).reduce((n, g) => n + g.services.length, 0)
            return (
              <motion.div
                key={group.title}
                className="mb-14 grid min-w-0 auto-rows-fr grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
                initial="hidden"
                whileInView="show"
                viewport={view}
                variants={vStagger}
              >
                <motion.h2
                  className="col-span-full mb-1 border-b border-border pb-2 text-xl font-bold text-foreground"
                  variants={vItem}
                >
                  {group.title}
                </motion.h2>
                {group.services.map((card, i) => (
                  <motion.div
                    key={card.id}
                    variants={vItem}
                    className="flex h-full min-h-0 min-w-0 flex-col"
                    whileHover={
                      reduce ? undefined : { y: -3, transition: { duration: 0.2, ease: EASE_SMOOTH } }
                    }
                  >
                    <ServiceCard
                      card={card}
                      typewriterDelayMs={card.animatedLead ? (cardOffset + i) * 420 : undefined}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )
          })}
          <motion.div
            className="flex flex-wrap gap-3 border-t border-border pt-10"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={view}
            transition={{ duration: reduce ? 0 : 0.45, ease: EASE_SMOOTH }}
          >
            <ButtonLink href={waHref} target="_blank" rel="noopener noreferrer">
              {data.contact.whatsappCtaLabel}
            </ButtonLink>
            <ButtonLink href="/#contacto" variant="outline">
              Volver al inicio
            </ButtonLink>
          </motion.div>
        </div>
      </Section>
    </main>
  )
}
