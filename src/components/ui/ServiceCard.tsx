import { useEffect, useState } from 'react'
import type { ServiceCard as ServiceCardType } from '@/schemas/site'
import { useTypewriter } from '@/hooks/useTypewriter'
import { cn } from '@/lib/cn'

function ServiceCardTypewriterLead({
  text,
  compact,
  startDelayMs,
}: {
  text: string
  compact?: boolean
  startDelayMs?: number
}) {
  const [ready, setReady] = useState(!startDelayMs)
  useEffect(() => {
    if (!startDelayMs) return
    const t = window.setTimeout(() => setReady(true), startDelayMs)
    return () => window.clearTimeout(t)
  }, [startDelayMs])

  if (!ready) {
    return (
      <div
        className={cn(
          'mt-4 min-h-[2.75rem] border-t border-border/60 pt-3 sm:min-h-[2.5rem]',
          compact && 'mt-3 min-h-[2.5rem] pt-2.5',
        )}
        aria-hidden
      />
    )
  }

  return <TypewriterLeadInner text={text} compact={compact} />
}

function TypewriterLeadInner({ text, compact }: { text: string; compact?: boolean }) {
  const { display, done } = useTypewriter(text, 72)
  return (
    <p
      className={cn(
        'mt-4 border-t border-border/60 pt-3 text-xs leading-snug sm:text-[0.8125rem]',
        compact && 'mt-3 pt-2.5',
      )}
    >
      <span
        className={cn(
          'typewriter-wrap font-mono font-semibold text-accent',
          done && 'typewriter-done',
        )}
        aria-live="polite"
      >
        <span className="break-words">{display}</span>
        <span
          className="typewriter-cursor ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-px rounded-sm bg-accent align-middle sm:w-0.5"
          aria-hidden
        />
      </span>
    </p>
  )
}

export function ServiceCard({
  card,
  compact,
  typewriterDelayMs,
}: {
  card: ServiceCardType
  compact?: boolean
  typewriterDelayMs?: number
}) {
  return (
    <article
      className={cn(
        'flex h-full min-w-0 flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface',
        'p-5 sm:p-6',
        compact && 'pt-5',
      )}
    >
      <h3
        className={cn(
          'shrink-0 break-words font-bold text-foreground',
          compact ? 'mb-2 text-base' : 'mb-3 text-base sm:text-lg',
        )}
      >
        {card.title}
      </h3>
      <ul
        className={cn(
          'min-h-0 flex-1 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted sm:pl-[1.15rem] sm:text-[0.9375rem]',
        )}
      >
        {card.items.map((item) => (
          <li key={item} className="break-words">
            {item}
          </li>
        ))}
      </ul>
      {card.animatedLead || card.foot ? (
        <div className="mt-auto w-full shrink-0">
          {card.animatedLead ? (
            <ServiceCardTypewriterLead
              text={card.animatedLead}
              compact={compact}
              startDelayMs={typewriterDelayMs}
            />
          ) : null}
          {card.foot ? (
            <p
              className={cn(
                'border-t border-border text-sm font-semibold text-accent',
                card.animatedLead ? 'mt-3 pt-3' : 'mt-5 pt-4',
              )}
            >
              {card.foot}
            </p>
          ) : null}
        </div>
      ) : null}
    </article>
  )
}
