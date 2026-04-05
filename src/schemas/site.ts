import { z } from 'zod'

export const contactSchema = z.object({
  phoneDisplay: z.string(),
  phoneTel: z.string(),
  whatsappUrl: z.string().url(),
  whatsappPrefillMessage: z.string(),
  city: z.string(),
  region: z.string(),
  schedule: z.string(),
})

export const serviceCardSchema = z.object({
  id: z.string(),
  title: z.string(),
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

export const siteContentSchema = z.object({
  brand: z.object({
    name: z.string(),
    typewriterLine: z.string(),
    tagline: z.string(),
    shortDescription: z.string(),
  }),
  contact: contactSchema,
  seo: z.object({
    title: z.string(),
    description: z.string(),
  }),
  hero: z.object({
    kicker: z.string(),
    sub: z.string(),
    ctaWhatsappLabel: z.string(),
    ctaCallLabel: z.string(),
  }),
  mainServices: z.array(serviceCardSchema),
  construction: z.array(serviceCardSchema),
  complementary: z.array(serviceCardSchema),
  differential: z.object({
    title: z.string(),
    subtitle: z.string(),
    bullets: z.array(z.string()),
    closing: z.string(),
  }),
  problems: z.object({
    title: z.string(),
    items: z.array(z.string()),
    foot: z.string(),
  }),
  process: z.object({
    title: z.string(),
    steps: z.array(z.string()),
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
    ctaWhatsappLabel: z.string(),
    ctaCallLabel: z.string(),
  }),
  footer: z.object({
    lines: z.array(z.string()),
  }),
})

export type SiteContent = z.infer<typeof siteContentSchema>
export type ServiceCard = z.infer<typeof serviceCardSchema>
export type GalleryItem = z.infer<typeof galleryItemSchema>
