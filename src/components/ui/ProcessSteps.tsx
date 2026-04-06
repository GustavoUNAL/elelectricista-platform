import { motion } from 'motion/react'
import type { ProcessStep } from '@/schemas/site'
import { cn } from '@/lib/cn'

export type ProcessStepResolved = ProcessStep & {
  cta?: { label: string; href: string }
}

const stepStyles = [
  {
    ring: 'hover:shadow-[0_0_32px_-10px_var(--color-accent-glow)]',
    badge: 'bg-accent-dim text-accent ring-1 ring-inset ring-accent/20',
    bar: 'from-accent to-accent-hover',
  },
  {
    ring: 'hover:shadow-[0_0_32px_-12px_rgba(61,139,253,0.4)]',
    badge: 'bg-blue/12 text-blue ring-1 ring-inset ring-blue/25',
    bar: 'from-blue to-blue-highlight',
  },
  {
    ring: 'hover:shadow-[0_0_28px_-10px_var(--color-accent-glow)]',
    badge: 'bg-accent-dim/90 text-accent ring-1 ring-inset ring-accent/15',
    bar: 'from-accent via-blue/70 to-blue',
  },
  {
    ring: 'hover:shadow-[0_0_32px_-12px_rgba(61,139,253,0.35)]',
    badge: 'bg-blue/10 text-blue ring-1 ring-inset ring-blue/20',
    bar: 'from-blue to-accent',
  },
  {
    ring: 'hover:shadow-[0_0_36px_-8px_var(--color-accent-glow)]',
    badge: 'bg-accent-dim text-accent ring-1 ring-inset ring-accent/25',
    bar: 'from-accent-hover via-accent to-accent-deep',
  },
] as const

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 400, damping: 30 },
  },
}

function StepCircle({ n, completed }: { n: number; completed: boolean }) {
  return (
    <div
      className={cn(
        'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold tabular-nums',
        completed
          ? 'bg-foreground text-bg shadow-sm'
          : 'border-2 border-foreground bg-bg text-foreground',
      )}
    >
      {n}
    </div>
  )
}

/** Stepper vertical estilo timeline (móvil / tablet). */
function ProcessStepsMobile({ steps }: { steps: ProcessStepResolved[] }) {
  const last = steps.length - 1
  return (
    <motion.ol
      className="relative min-w-0 space-y-0 lg:hidden"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      variants={container}
    >
      {steps.map((step, i) => {
        const n = i + 1
        const completed = i < last
        return (
          <motion.li
            key={`${step.title}-${i}`}
            variants={item}
            className="flex gap-4 pb-11 last:pb-0"
          >
            <div className="flex w-11 shrink-0 flex-col items-center self-stretch">
              <StepCircle n={n} completed={completed} />
              {i < last ? (
                <div
                  className="mt-0 min-h-[2.25rem] w-0 flex-1 border-l-2 border-dashed border-muted/45"
                  aria-hidden
                />
              ) : null}
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <h3 className="text-base font-bold leading-snug tracking-tight text-foreground">{step.title}</h3>
              {step.description ? (
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">{step.description}</p>
              ) : null}
              {step.cta ? (
                <a
                  href={step.cta.href}
                  target={step.cta.href.startsWith('http') ? '_blank' : undefined}
                  rel={step.cta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={cn(
                    'mt-4 inline-flex items-center gap-1.5 rounded-full border border-foreground/70 bg-transparent',
                    'px-4 py-2.5 text-sm font-semibold text-foreground no-underline transition-colors',
                    'hover:border-foreground hover:bg-foreground/5 active:scale-[0.99]',
                  )}
                >
                  {step.cta.label}
                  <span className="text-base leading-none opacity-80" aria-hidden>
                    ›
                  </span>
                </a>
              ) : null}
            </div>
          </motion.li>
        )
      })}
    </motion.ol>
  )
}

/** Tarjetas en columnas (escritorio). */
function ProcessStepsDesktop({ steps }: { steps: ProcessStepResolved[] }) {
  return (
    <motion.ol
      className="hidden min-w-0 gap-4 lg:grid lg:grid-cols-5 lg:gap-4"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      variants={container}
    >
      {steps.map((step, i) => {
        const style = stepStyles[i % stepStyles.length]
        const n = i + 1
        return (
          <motion.li key={`${step.title}-${i}`} variants={item} className="flex min-h-full min-w-0">
            <div
              className={`flex w-full min-w-0 flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-gradient-to-b from-surface via-surface to-surface-deep transition-all duration-300 hover:-translate-y-1 hover:border-border/80 ${style.ring}`}
            >
              <div className={`h-1.5 w-full shrink-0 bg-gradient-to-r ${style.bar}`} aria-hidden />
              <div className="flex flex-1 flex-col p-5 pt-5 sm:p-6 sm:pt-5">
                <span
                  className={`mb-3 inline-flex h-[2.85rem] w-[2.85rem] items-center justify-center rounded-xl font-mono text-xl font-bold tabular-nums ${style.badge}`}
                >
                  {n}
                </span>
                <p className="break-words text-[0.98rem] font-semibold leading-snug tracking-tight text-foreground sm:text-base">
                  {step.title}
                </p>
                {step.description ? (
                  <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-muted">{step.description}</p>
                ) : (
                  <div className="flex-1" />
                )}
                {step.cta ? (
                  <a
                    href={step.cta.href}
                    target={step.cta.href.startsWith('http') ? '_blank' : undefined}
                    rel={step.cta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={cn(
                      'mt-4 inline-flex w-fit items-center gap-1 rounded-full border border-border px-3 py-2 text-xs font-semibold',
                      'text-foreground no-underline transition-colors hover:border-accent hover:text-accent',
                    )}
                  >
                    {step.cta.label} ›
                  </a>
                ) : null}
                <span className="mt-4 border-t border-border/60 pt-3 font-mono text-[0.65rem] font-medium tracking-[0.18em] text-muted/45 uppercase">
                  Paso {String(n).padStart(2, '0')}
                </span>
              </div>
            </div>
          </motion.li>
        )
      })}
    </motion.ol>
  )
}

export function ProcessSteps({ steps }: { steps: ProcessStepResolved[] }) {
  return (
    <>
      <ProcessStepsMobile steps={steps} />
      <ProcessStepsDesktop steps={steps} />
    </>
  )
}
