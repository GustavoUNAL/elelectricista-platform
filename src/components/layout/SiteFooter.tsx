import type { SiteContent } from '@/schemas/site'

export function SiteFooter({ content }: { content: SiteContent }) {
  const { contact, brand, footer } = content

  return (
    <footer className="border-t border-border bg-[#080a0d] py-10">
      <div className="container-app grid gap-5">
        <div className="text-lg font-bold">{brand.name}</div>
        <ul className="space-y-1.5 text-sm text-muted">
          <li>
            {contact.city}, {contact.region}
          </li>
          <li>
            <a href={`tel:${contact.phoneTel}`} className="text-foreground hover:text-accent">
              {contact.phoneDisplay}
            </a>
          </li>
          {footer.lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p className="max-w-lg text-sm leading-relaxed text-muted">{brand.shortDescription}</p>
      </div>
    </footer>
  )
}
