import { useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Link } from 'react-router-dom'
import type { SiteContent, ServiceCard as ServiceCardType } from '@/schemas/site'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { Section } from '@/components/ui/Section'
import { ButtonLink } from '@/components/ui/ButtonLink'

type Group = { title: string; services: ServiceCardType[] }

export function ServicesCatalogPage() {
  const data = useOutletContext<SiteContent>()

  const groups: Group[] = useMemo(
    () => [
      { title: 'Servicios principales', services: data.mainServices },
      { title: 'Construcción y obra liviana', services: data.construction },
      { title: 'Servicios complementarios', services: data.complementary },
    ],
    [data],
  )

  const waHref = `${data.contact.whatsappUrl}?text=${encodeURIComponent(data.contact.whatsappPrefillMessage)}`

  return (
    <main>
      <Section className="pt-12">
        <div className="container-app">
          <nav className="mb-8 text-sm text-muted">
            <Link to="/" className="hover:text-accent">
              Inicio
            </Link>
            <span className="mx-2 text-border">/</span>
            <span className="text-foreground">Catálogo de servicios</span>
          </nav>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">Catálogo de servicios</h1>
          <p className="mb-10 max-w-2xl text-lg text-muted">
            Listado unificado para futuras integraciones: CRM, cotizador en línea o fichas descargables. Los datos provienen
            de la misma fuente validada que la página principal.
          </p>
          {groups.map((group) => (
            <div key={group.title} className="mb-14">
              <h2 className="mb-6 border-b border-border pb-2 text-xl font-bold text-foreground">{group.title}</h2>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {group.services.map((card) => (
                  <ServiceCard key={card.id} card={card} compact={group.title.includes('complementarios')} />
                ))}
              </div>
            </div>
          ))}
          <div className="flex flex-wrap gap-3 border-t border-border pt-10">
            <ButtonLink href={waHref} target="_blank" rel="noopener noreferrer">
              Cotizar por WhatsApp
            </ButtonLink>
            <ButtonLink href="/#contacto" variant="outline">
              Volver al inicio
            </ButtonLink>
          </div>
        </div>
      </Section>
    </main>
  )
}
