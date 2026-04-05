import type { ServiceCard as ServiceCardType } from '@/schemas/site'

export function ServiceCard({ card, compact }: { card: ServiceCardType; compact?: boolean }) {
  return (
    <article
      className={`rounded-[var(--radius-lg)] border border-border bg-surface p-6 ${compact ? 'pt-5' : ''}`}
    >
      <h3 className={`mb-4 font-bold text-foreground ${compact ? 'mb-3 text-base' : 'text-lg'}`}>
        {card.title}
      </h3>
      <ul className="list-disc space-y-1.5 pl-[1.15rem] text-muted">
        {card.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {card.foot ? (
        <p className="mt-5 border-t border-border pt-4 text-sm font-semibold text-accent">{card.foot}</p>
      ) : null}
    </article>
  )
}
