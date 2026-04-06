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

  const gridForGroup = (count: number) =>
    count >= 4
      ? 'grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 xl:gap-6'
      : 'grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6'

  return (
    <main>
      <Section className="pt-10 pb-16 sm:pt-14 sm:pb-20">
        <div className="container-app">
          <header className="mb-10 min-w-0 sm:mb-12 lg:mb-14">
            <motion.nav
              className="mb-6 text-sm text-muted"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.4, ease: EASE_SMOOTH }}
            >
              <Link to="/" className="transition-colors hover:text-accent">
                Inicio
              </Link>
              <span className="mx-2 text-border">/</span>
              <span className="text-foreground">Catálogo de servicios</span>
            </motion.nav>
            <motion.h1
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.25rem] lg:leading-tight"
              variants={vUp}
              initial="hidden"
              animate="show"
            >
              Catálogo de servicios
            </motion.h1>
          </header>

          <div className="flex min-w-0 flex-col gap-14 sm:gap-16 lg:gap-20">
            {groups.map((group, groupIndex) => {
              const cardOffset = groups.slice(0, groupIndex).reduce((n, g) => n + g.services.length, 0)
              const headingId = `catalog-group-${groupIndex}`
              return (
                <motion.section
                  key={group.title}
                  id={groupIndex === 0 ? 'catalogo-principal' : 'catalogo-construccion'}
                  className="min-w-0 scroll-mt-24"
                  aria-labelledby={headingId}
                  initial="hidden"
                  whileInView="show"
                  viewport={view}
                  variants={vStagger}
                >
                  <motion.h2
                    id={headingId}
                    className="mb-6 border-b border-border pb-3 text-xl font-bold tracking-tight text-foreground sm:mb-7 sm:text-2xl lg:mb-8"
                    variants={vItem}
                  >
                    {group.title}
                  </motion.h2>
                  <div
                    className={`grid min-w-0 auto-rows-fr ${gridForGroup(group.services.length)}`}
                  >
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
                  </div>
                </motion.section>
              )
            })}
          </div>

          <motion.div
            className="mt-14 flex flex-col gap-3 border-t border-border pt-10 sm:mt-16 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4 sm:pt-12 lg:mt-20"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={view}
            transition={{ duration: reduce ? 0 : 0.45, ease: EASE_SMOOTH }}
          >
            <ButtonLink
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full justify-center sm:w-auto sm:min-w-[12rem]"
            >
              {data.contact.whatsappCtaLabel}
            </ButtonLink>
            <ButtonLink href="/#contacto" variant="outline" className="w-full justify-center sm:w-auto sm:min-w-[12rem]">
              Volver al inicio
            </ButtonLink>
          </motion.div>
        </div>
      </Section>
    </main>
  )
}
