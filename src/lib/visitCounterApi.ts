/** Rutas a probar (primera que responda JSON válido gana). */
export function getVisitCounterApiUrls(): string[] {
  const override = import.meta.env.VITE_VISIT_COUNTER_URL?.trim()
  if (override) return [override]

  const rawBase = import.meta.env.BASE_URL ?? '/'
  const prefix = rawBase === '/' ? '' : rawBase.replace(/\/$/, '')
  const withBase = `${prefix ? `/${prefix.replace(/^\//, '')}` : ''}/api/visits`.replace(/\/{2,}/g, '/')

  const origin = window.location.origin
  const urls = [`${origin}${withBase}`, `${origin}/api/visits`]
  return [...new Set(urls)]
}
