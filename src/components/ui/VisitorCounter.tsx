import { useEffect, useState } from 'react'
import { getVisitCounterApiUrl } from '@/lib/visitCounterApi'

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    const url = getVisitCounterApiUrl()

    fetch(url, { cache: 'no-store', credentials: 'same-origin' })
      .then(async (r) => {
        const ct = r.headers.get('content-type') ?? ''
        const raw = await r.text()
        if (!r.ok) throw new Error('bad status')
        if (ct.includes('text/html') || raw.trimStart().startsWith('<')) {
          throw new Error('not json')
        }
        let data: { count?: unknown }
        try {
          data = JSON.parse(raw) as { count?: unknown }
        } catch {
          throw new Error('parse')
        }
        return data
      })
      .then((data) => {
        if (cancelled) return
        const n = data.count
        setCount(typeof n === 'number' && Number.isFinite(n) ? n : null)
        setError(false)
      })
      .catch(() => {
        if (!cancelled) {
          setError(true)
          setCount(null)
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="mt-8 border-t border-border/50 pt-6 text-center">
      <p className="text-xs text-muted sm:text-sm">
        {error ? (
          <span className="mx-auto block max-w-lg text-pretty text-muted">
            El contador necesita JSON en <code className="text-foreground/90">/api/visits</code>. En el servidor debe
            correr <code className="text-foreground/90">node server/static-serve.mjs</code> (PM2) o nginx debe hacer{' '}
            <code className="text-foreground/90">proxy_pass</code> de esa ruta al mismo Node — no solo archivos de{' '}
            <code className="text-foreground/90">dist</code>. Ejemplo en{' '}
            <code className="text-foreground/90">deploy/nginx-snippet.conf</code>.
          </span>
        ) : count === null ? (
          <span className="text-muted/80">Visitas: …</span>
        ) : (
          <>
            Visitas al sitio:{' '}
            <span className="font-mono font-semibold tabular-nums text-accent" aria-live="polite">
              {count.toLocaleString('es-CO')}
            </span>
          </>
        )}
      </p>
    </div>
  )
}
