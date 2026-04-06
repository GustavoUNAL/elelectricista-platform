import { z } from 'zod'

export const contactSchema = z.object({
  phoneDisplay: z.string(),
  phoneTel: z.string(),
  phoneSecondaryDisplay: z.string().optional(),
  phoneSecondaryTel: z.string().optional(),
  whatsappUrl: z.string().url(),
  whatsappPrefillMessage: z.string(),
  /** Texto del CTA principal a WhatsApp (hero, pie, flotante, catálogo). */
  whatsappCtaLabel: z.string(),
  city: z.string(),
  region: z.string(),
  schedule: z.string(),
})

export const serviceCardSchema = z.object({
  id: z.string(),
  title: z.string(),
  /** Subtítulo con efecto typewriter (junto al puntero destacado). */
  animatedLead: z.string().optional(),
  items: z.array(z.string()),
  foot: z.string().optional(),
})

export const galleryItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.enum(['electrico', 'solar', 'drywall', 'techo', 'general']),
  imageUrl: z.string().nullable(),
  caption: z.string(),
})

export const processStepSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  /** Si existe, se muestra un botón outline; el `href` lo resuelve la página (p. ej. WhatsApp). */
  ctaLabel: z.string().optional(),
})

export const siteContentSchema = z.object({
  brand: z.object({
    name: z.string(),
    typewriterLine: z.string(),
    tagline: z.string(),
  }),
  contact: contactSchema,
  seo: z.object({
    title: z.string(),
    description: z.string(),
  }),
  hero: z.object({
    kicker: z.string(),
    sub: z.string(),
    subSecondary: z.string(),
    ctaCallLabel: z.string(),
  }),
  mainServices: z.array(serviceCardSchema),
  construction: z.array(serviceCardSchema),
  differential: z.object({
    title: z.string(),
    subtitle: z.string(),
    bullets: z.array(z.string()),
    closing: z.string(),
  }),
  problems: z.object({
    title: z.string(),
    blocks: z.array(
      z.object({
        heading: z.string(),
        body: z.string(),
        bullets: z.array(z.string()),
        tip: z.string(),
      }),
    ),
  }),
  process: z.object({
    title: z.string(),
    steps: z.array(processStepSchema),
  }),
  portfolio: z.object({
    title: z.string(),
    intro: z.string(),
    items: z.array(galleryItemSchema),
  }),
  cta: z.object({
    title: z.string(),
    lead: z.string(),
    phoneLabel: z.string(),
    ctaCallLabel: z.string(),
  }),
  footer: z.object({
    lines: z.array(z.string()),
  }),
})

export type SiteContent = z.infer<typeof siteContentSchema>
export type ServiceCard = z.infer<typeof serviceCardSchema>
export type GalleryItem = z.infer<typeof galleryItemSchema>
export type ProcessStep = z.infer<typeof processStepSchema>
