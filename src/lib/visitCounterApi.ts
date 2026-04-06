/** URL del endpoint de visitas: override en build o relativo al origen (respeta `base` de Vite). */
export function getVisitCounterApiUrl(): string {
  const override = import.meta.env.VITE_VISIT_COUNTER_URL?.trim()
  if (override) return override

  const base = import.meta.env.BASE_URL || '/'
  const originBase = base.endsWith('/') ? base : `${base}/`
  return new URL('api/visits', `${window.location.origin}${originBase}`).href
}
