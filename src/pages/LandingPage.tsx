import { useOutletContext } from 'react-router-dom'
import { motion } from 'motion/react'
import type { SiteContent } from '@/schemas/site'
import { useTypewriter } from '@/hooks/useTypewriter'
import { Section } from '@/components/ui/Section'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { ServiceCard } from '@/components/ui/ServiceCard'

const categoryLabel: Record<string, string> = {
  electrico: 'Eléctrico',
  solar: 'Solar',
  drywall: 'Drywall',
  techo: 'Techo',
  general: 'General',
}

export function LandingPage() {
  const data = useOutletContext<SiteContent>()
  const { display, done } = useTypewriter(data.brand.typewriterLine, 85)

  const waHref = `${data.contact.whatsappUrl}?text=${encodeURIComponent(data.contact.whatsappPrefillMessage)}`

  return (
    <main>
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden px-5 py-12 pb-16" aria-labelledby="hero-title">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <motion.div
            className="absolute top-[10%] right-[-10%] h-[60vh] w-[80vw] rounded-full bg-blue/10 blur-3xl"
            animate={{ opacity: [0.35, 0.55, 0.35] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[5%] left-[-15%] h-[50vh] w-[70vw] rounded-full bg-accent/8 blur-3xl"
            animate={{ opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg to-[#0a0c10]" />
        </div>
        <div className="relative max-w-[720px]">
          <p className="mb-3 text-xs font-semibold tracking-[0.12em] text-muted uppercase">{data.hero.kicker}</p>
          <h1 id="hero-title" className="mb-4 min-h-[3.2em] text-2xl leading-tight font-semibold sm:text-3xl md:text-4xl">
            <span className={`typewriter-wrap font-mono font-semibold text-accent ${done ? 'typewriter-done' : ''}`} aria-live="polite">
              <span>{display}</span>
              <span className="typewriter-cursor ml-0.5 inline-block h-[1.1em] w-0.5 translate-y-px bg-accent align-middle" aria-hidden />
            </span>
          </h1>
          <p className="mb-4 text-lg leading-snug font-semibold text-foreground sm:text-xl">{data.brand.tagline}</p>
          <p className="mb-8 max-w-[540px] text-[1.05rem] text-muted">{data.hero.sub}</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={waHref} target="_blank" rel="noopener noreferrer">
              {data.hero.ctaWhatsappLabel}
            </ButtonLink>
            <ButtonLink href={`tel:${data.contact.phoneTel}`} variant="outline">
              {data.hero.ctaCallLabel}
            </ButtonLink>
          </div>
        </div>
      </section>

      <Section id="servicios" variant="alt">
        <div className="container-app">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground md:text-3xl">Servicios principales</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {data.mainServices.map((card) => (
              <ServiceCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </Section>

      <Section id="construccion">
        <div className="container-app">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Construcción y obra liviana
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {data.construction.map((card) => (
              <ServiceCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </Section>

      <Section variant="alt">
        <div className="container-app">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Servicios complementarios
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {data.complementary.map((card) => (
              <ServiceCard key={card.id} card={card} compact />
            ))}
          </div>
        </div>
      </Section>

      <Section variant="highlight">
        <div className="container-narrow">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {data.differential.title}
          </h2>
          <h3 className="-mt-4 mb-5 text-lg font-semibold text-muted">{data.differential.subtitle}</h3>
          <ul className="mb-6 space-y-3">
            {data.differential.bullets.map((b) => (
              <li key={b} className="relative pl-6 text-muted before:absolute before:top-2 before:left-0 before:h-2 before:w-2 before:rounded-sm before:bg-accent before:shadow-[0_0_10px_var(--color-accent-glow)] before:content-['']">
                {b}
              </li>
            ))}
          </ul>
          <p className="text-lg font-semibold text-foreground">{data.differential.closing}</p>
        </div>
      </Section>

      <Section variant="alt">
        <div className="container-app">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground md:text-3xl">{data.problems.title}</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {data.problems.items.map((item) => (
              <li
                key={item}
                className="rounded-[var(--radius-lg)] border border-border border-l-[3px] border-l-blue bg-surface px-4 py-4 text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 font-semibold text-accent">{data.problems.foot}</p>
        </div>
      </Section>

      <Section id="proceso">
        <div className="container-app">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground md:text-3xl">{data.process.title}</h2>
          <ol className="grid gap-4 md:grid-cols-5">
            {data.process.steps.map((step, i) => (
              <li
                key={step}
                className="flex flex-col gap-2 rounded-[var(--radius-lg)] border border-border bg-surface p-4 text-sm font-medium text-muted"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent-dim font-mono text-sm font-semibold text-accent">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section id="trabajos" variant="alt">
        <div className="container-app">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground md:text-3xl">{data.portfolio.title}</h2>
          <p className="-mt-4 mb-8 max-w-3xl text-muted">{data.portfolio.intro}</p>
          <div className="grid gap-5 sm:grid-cols-3" role="list">
            {data.portfolio.items.map((item) => (
              <figure key={item.id} className="m-0" role="listitem">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] border border-dashed border-border bg-gradient-to-br from-surface to-[#1c2533]">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-sm font-semibold text-muted/50">Tu foto</span>
                    </div>
                  )}
                  <span className="absolute top-2 left-2 rounded bg-bg/80 px-2 py-0.5 text-xs font-medium text-muted backdrop-blur-sm">
                    {categoryLabel[item.category] ?? item.category}
                  </span>
                </div>
                <figcaption className="mt-2 text-sm text-muted">{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Section>

      <Section id="contacto" variant="cta">
        <div className="container-narrow text-center">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground md:text-3xl">{data.cta.title}</h2>
          <p className="-mt-4 mb-2 text-lg text-muted">{data.cta.lead}</p>
          <p className="mb-7 text-xl font-bold">
            <a href={waHref} className="text-accent hover:text-[#ffb83d] hover:no-underline">
              {data.cta.phoneLabel}
            </a>
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <ButtonLink href={waHref} target="_blank" rel="noopener noreferrer">
              {data.cta.ctaWhatsappLabel}
            </ButtonLink>
            <ButtonLink href={`tel:${data.contact.phoneTel}`} variant="outline">
              {data.cta.ctaCallLabel}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </main>
  )
}
