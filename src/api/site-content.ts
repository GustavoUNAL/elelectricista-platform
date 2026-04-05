import { SITE_SEED } from '@/data/site'
import { siteContentSchema, type SiteContent } from '@/schemas/site'

const LATENCY_MS = 120

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
}

export async function fetchSiteContent(): Promise<SiteContent> {
  await delay(LATENCY_MS)
  return siteContentSchema.parse(SITE_SEED)
}
