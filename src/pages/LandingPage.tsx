import { useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import type { SiteContent } from '@/schemas/site'
import { useTypewriter } from '@/hooks/useTypewriter'
import { Section } from '@/components/ui/Section'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { ProcessSteps, type ProcessStepResolved } from '@/components/ui/ProcessSteps'
import { PortfolioCarousel } from '@/components/ui/PortfolioCarousel'
import { cn } from '@/lib/cn'
import {
  EASE_SMOOTH,
  revealBlur,
  revealScale,
  revealUp,
  staggerContainer,
  staggerItem,
} from '@/lib/motion-presets'

const categoryLabel: Record<string, string> = {
  electrico: 'Eléctrico',
  solar: 'Solar',
  drywall: 'Drywall',
  techo: 'Techo',
  general: 'General',
}

const view = { once: true, margin: '-70px' as const, amount: 0.25 as const }

export function LandingPage() {
  const data = useOutletContext<SiteContent>()
  const { display, done } = useTypewriter(data.brand.typewriterLine, 78)
  const reduce = useReducedMotion() ?? false

  const waHref = `${data.contact.whatsappUrl}?text=${encodeURIComponent(data.contact.whatsappPrefillMessage)}`

  const processStepsResolved: ProcessStepResolved[] = useMemo(
    () =>
      data.process.steps.map((step) => ({
        ...step,
        ...(step.ctaLabel ? { cta: { label: step.ctaLabel, href: waHref } } : {}),
      })),
    [data.process.steps, waHref],
  )

  const vUp = revealUp(reduce)
  const vUpSm = revealUp(reduce, 14)
  const vStagger = staggerContainer(reduce, 0.1, 0.07)
  const vItem = staggerItem(reduce, 14)
  const vItemLg = staggerItem(reduce, 22)
  const vScale = revealScale(reduce)
  const vBlur = revealBlur(reduce)

  return (
    <main>
      <section
        className="relative flex min-h-0 items-start overflow-hidden px-4 pt-4 pb-8 sm:min-h-[calc(100vh-4rem)] sm:items-center sm:px-5 sm:py-12 sm:pb-16"
        aria-labelledby="hero-title"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <motion.div
            className="absolute top-[10%] right-[-10%] h-[60vh] w-[80vw] rounded-full bg-blue/10 blur-3xl"
            animate={
              reduce
                ? { opacity: 0.45, scale: 1 }
                : { opacity: [0.35, 0.55, 0.35], scale: [1, 1.05, 1] }
            }
            transition={
              reduce ? { duration: 0 } : { duration: 10, repeat: Infinity, ease: 'easeInOut' }
            }
          />
          <motion.div
            className="absolute bottom-[5%] left-[-15%] h-[50vh] w-[70vw] rounded-full bg-accent/8 blur-3xl"
            animate={
              reduce
                ? { opacity: 0.35, scale: 1 }
                : { opacity: [0.25, 0.45, 0.25], scale: [1, 1.08, 1] }
            }
            transition={
              reduce ? { duration: 0 } : { duration: 12, repeat: Infinity, ease: 'easeInOut' }
            }
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg to-hero-end" />
        </div>
        <motion.div
          className="relative w-full min-w-0 max-w-[720px]"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.65, ease: EASE_SMOOTH, delay: reduce ? 0 : 0.08 }}
        >
          <motion.p
            className="mb-3 text-[0.7rem] font-semibold tracking-[0.12em] text-muted uppercase sm:text-xs"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.45, ease: EASE_SMOOTH, delay: reduce ? 0 : 0.12 }}
          >
            {data.hero.kicker}
          </motion.p>
          <h1
            id="hero-title"
            className="mb-4 min-h-[1.2em] break-words text-3xl leading-[1.12] font-semibold tracking-tight sm:min-h-[1.15em] sm:text-4xl md:text-5xl lg:text-6xl"
          >
            <span
              className={`typewriter-wrap font-mono font-semibold text-accent ${done ? 'typewriter-done' : ''}`}
              aria-live="polite"
            >
              <span className="break-all sm:break-normal">{display}</span>
              <span
                className="typewriter-cursor ml-1 inline-block h-[0.92em] w-[3px] translate-y-px rounded-sm bg-accent align-middle sm:h-[0.9em] md:w-1"
                aria-hidden
              />
            </span>
          </h1>
          <motion.p
            className="mb-4 text-base leading-snug font-semibold text-foreground sm:text-lg md:text-xl"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.5, ease: EASE_SMOOTH, delay: reduce ? 0 : 0.2 }}
          >
            {data.brand.tagline}
          </motion.p>
          <motion.div
            className="mb-6 max-w-[540px] space-y-2 text-[0.98rem] leading-relaxed text-muted sm:mb-8 sm:text-[1.05rem]"
            variants={vStagger}
            initial="hidden"
            animate="show"
          >
            <motion.p className="text-pretty" variants={vItem}>
              {data.hero.sub}
            </motion.p>
            <motion.p className="text-pretty" variants={vItem}>
              {data.hero.subSecondary}
            </motion.p>
          </motion.div>
          <motion.div
            className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            variants={vStagger}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={vItem} className="w-full sm:w-auto">
              <ButtonLink
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full justify-center sm:w-auto"
              >
                {data.contact.whatsappCtaLabel}
              </ButtonLink>
            </motion.div>
            <motion.div variants={vItem} className="w-full sm:w-auto">
              <ButtonLink
                href={`tel:${data.contact.phoneTel}`}
                variant="outline"
                className="w-full justify-center sm:w-auto"
              >
                {data.hero.ctaCallLabel}
              </ButtonLink>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <Section id="problemas" variant="alt">
        <div className="container-app">
          <motion.h2
            className="mb-8 text-2xl font-bold tracking-tight text-foreground sm:mb-10 md:mb-12 md:text-3xl"
            variants={vUp}
            initial="hidden"
            whileInView="show"
            viewport={view}
          >
            {data.problems.title}
          </motion.h2>
          <motion.div
            className={cn(
              'flex min-w-0 flex-col gap-6 sm:gap-8',
              'lg:grid lg:max-w-none lg:grid-cols-3 lg:items-stretch lg:gap-6',
            )}
            variants={staggerContainer(reduce, 0.08, 0.04)}
            initial="hidden"
            whileInView="show"
            viewport={view}
          >
            {data.problems.blocks.map((block) => (
              <motion.article
                key={block.heading}
                variants={vScale}
                className="flex min-h-0 min-w-0 flex-col rounded-[var(--radius-lg)] border border-border border-l-[3px] border-l-accent bg-surface p-4 sm:p-6"
              >
                <h3 className="text-base font-bold leading-snug tracking-tight text-foreground sm:text-lg lg:text-[1.05rem] lg:leading-snug xl:text-xl">
                  {block.heading}
                </h3>
                <p className="mt-2.5 text-sm font-semibold leading-snug text-accent sm:mt-3 sm:text-base lg:text-[0.95rem] xl:text-lg">
                  {block.tip}
                </p>
                <p className="mt-2.5 text-pretty text-sm leading-relaxed text-muted sm:mt-3 sm:text-[0.9375rem] lg:text-[0.8125rem] lg:leading-relaxed xl:text-[0.9375rem]">
                  {block.body}
                </p>
                <ul className="mt-3 list-outside list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted marker:text-accent sm:mt-4 sm:space-y-2 sm:pl-5 sm:text-[0.9375rem] lg:mt-4 lg:flex-1 lg:pl-4 lg:text-[0.8125rem] xl:pl-5 xl:text-[0.875rem]">
                  {block.bullets.map((b) => (
                    <li key={b} className="break-words py-0.5 pl-1 sm:pl-0.5">
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </Section>

      <Section id="servicios" variant="alt">
        <div className="container-app">
          <motion.h2
            className="mb-6 text-xl font-bold tracking-tight text-foreground sm:mb-8 sm:text-2xl md:text-3xl"
            variants={vUp}
            initial="hidden"
            whileInView="show"
            viewport={view}
          >
            Servicios principales
          </motion.h2>
          <motion.div
            className="flex flex-col gap-5 lg:flex-row lg:items-stretch lg:gap-5"
            variants={vStagger}
            initial="hidden"
            whileInView="show"
            viewport={view}
          >
            {data.mainServices.map((card, index) => (
              <motion.div
                key={card.id}
                variants={vItemLg}
                className="flex h-full w-full min-w-0 lg:w-0 lg:flex-1"
                whileHover={
                  reduce
                    ? undefined
                    : {
                        y: -4,
                        transition: { type: 'spring', stiffness: 400, damping: 22 },
                      }
                }
              >
                <ServiceCard card={card} typewriterDelayMs={index * 520} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      <Section id="construccion" variant="alt">
        <div className="container-app">
          <motion.div
            className="mb-6 sm:mb-8"
            variants={vUp}
            initial="hidden"
            whileInView="show"
            viewport={view}
          >
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl md:text-3xl">
              El Electricista
            </h2>
            <p className="mt-2 text-base text-muted sm:text-lg">Construcción y obra liviana</p>
          </motion.div>
          <motion.div
            className="flex flex-col gap-5 lg:flex-row lg:items-stretch lg:gap-5"
            variants={vStagger}
            initial="hidden"
            whileInView="show"
            viewport={view}
          >
            {data.construction.map((card, index) => {
              const typewriterBase = data.mainServices.length * 520
              return (
                <motion.div
                  key={card.id}
                  variants={vItemLg}
                  className="flex h-full w-full min-w-0 lg:w-0 lg:flex-1"
                  whileHover={
                    reduce
                      ? undefined
                      : {
                          y: -4,
                          transition: { type: 'spring', stiffness: 400, damping: 22 },
                        }
                  }
                >
                  <ServiceCard card={card} typewriterDelayMs={typewriterBase + index * 520} />
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </Section>

      <Section variant="highlight">
        <div className="container-narrow">
          <motion.h2
            className="mb-5 text-2xl font-bold tracking-tight text-foreground md:text-3xl"
            variants={vBlur}
            initial="hidden"
            whileInView="show"
            viewport={view}
          >
            {data.differential.title}
          </motion.h2>
          <motion.p
            className="mb-7 max-w-3xl text-base leading-relaxed text-muted sm:text-lg"
            variants={vUpSm}
            initial="hidden"
            whileInView="show"
            viewport={view}
          >
            {data.differential.subtitle}
          </motion.p>
          <motion.ul
            className="mb-6 space-y-3"
            variants={vStagger}
            initial="hidden"
            whileInView="show"
            viewport={view}
          >
            {data.differential.bullets.map((b) => (
              <motion.li
                key={b}
                variants={vItem}
                className="relative break-words pl-5 text-sm text-muted before:absolute before:top-1.5 before:left-0 before:h-2 before:w-2 before:rounded-sm before:bg-accent before:shadow-[0_0_10px_var(--color-accent-glow)] before:content-[''] sm:pl-6 sm:text-base sm:before:top-2"
              >
                {b}
              </motion.li>
            ))}
          </motion.ul>
          <motion.p
            className="text-lg font-semibold text-foreground"
            variants={revealUp(reduce, 10)}
            initial="hidden"
            whileInView="show"
            viewport={view}
          >
            {data.differential.closing}
          </motion.p>
        </div>
      </Section>

      <Section id="proceso">
        <div className="container-app">
          <motion.div
            className="mb-10 max-w-2xl"
            variants={vStagger}
            initial="hidden"
            whileInView="show"
            viewport={view}
          >
            <motion.h2
              className="mb-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl"
              variants={vItem}
            >
              {data.process.title}
            </motion.h2>
            <motion.div
              className="h-1 w-20 rounded-full bg-gradient-to-r from-accent via-blue/80 to-accent/40"
              variants={vItem}
              aria-hidden
            />
          </motion.div>
          <ProcessSteps steps={processStepsResolved} />
        </div>
      </Section>

      <Section id="trabajos" variant="alt">
        <div className="container-app">
          <motion.h2
            className="mb-5 text-xl font-bold tracking-tight text-foreground sm:text-2xl md:text-3xl"
            variants={vUp}
            initial="hidden"
            whileInView="show"
            viewport={view}
          >
            {data.portfolio.title}
          </motion.h2>
          <motion.p
            className="mb-8 max-w-6xl text-pretty text-sm leading-relaxed text-muted sm:mb-10 sm:text-base md:text-lg"
            variants={vUpSm}
            initial="hidden"
            whileInView="show"
            viewport={view}
          >
            {data.portfolio.intro}
          </motion.p>
          <motion.div
            variants={revealScale(reduce)}
            initial="hidden"
            whileInView="show"
            viewport={view}
          >
            <PortfolioCarousel items={data.portfolio.items} categoryLabels={categoryLabel} />
          </motion.div>
        </div>
      </Section>

      <Section id="contacto" variant="cta">
        <motion.div
          className="container-narrow w-full min-w-0 text-center"
          variants={vStagger}
          initial="hidden"
          whileInView="show"
          viewport={view}
        >
          <motion.h2
            className="mb-6 text-xl font-bold tracking-tight text-foreground sm:mb-8 sm:text-2xl md:text-3xl"
            variants={vItemLg}
          >
            {data.cta.title}
          </motion.h2>
          <motion.p className="-mt-2 mb-2 text-base text-muted sm:text-lg" variants={vItem}>
            {data.cta.lead}
          </motion.p>
          <motion.p className="mb-6 break-words text-lg font-bold sm:mb-7 sm:text-xl" variants={vItem}>
            <a href={waHref} className="text-accent hover:text-accent-hover hover:no-underline">
              {data.cta.phoneLabel}
            </a>
          </motion.p>
          <motion.div
            variants={vItem}
            className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:justify-center"
          >
            <ButtonLink
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full justify-center sm:w-auto sm:min-w-[12rem]"
            >
              {data.contact.whatsappCtaLabel}
            </ButtonLink>
            <ButtonLink
              href={`tel:${data.contact.phoneTel}`}
              variant="outline"
              className="w-full justify-center sm:w-auto sm:min-w-[12rem]"
            >
              {data.cta.ctaCallLabel}
            </ButtonLink>
          </motion.div>
        </motion.div>
      </Section>
    </main>
  )
}
