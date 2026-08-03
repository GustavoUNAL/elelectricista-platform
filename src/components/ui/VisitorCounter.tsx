import { useEffect, useState } from 'react'
import { getVisitCounterApiUrls } from '@/lib/visitCounterApi'
import { cn } from '@/lib/cn'

function parseVisitPayload(raw: string, contentType: string): { count: number } | null {
  const trimmed = raw.trimStart()
  if (trimmed.startsWith('<')) return null
  if (contentType.includes('text/html')) return null
  try {
    const data = JSON.parse(raw) as { count?: unknown }
    const n = Number(data.count)
    if (!Number.isFinite(n)) return null
    return { count: n }
  } catch {
    return null
  }
}

async function fetchVisitCount(signal: AbortSignal): Promise<number | null> {
  const urls = getVisitCounterApiUrls()
  for (const url of urls) {
    try {
      const r = await fetch(url, {
        cache: 'no-store',
        credentials: 'same-origin',
        signal,
        headers: { Accept: 'application/json' },
      })
      const raw = await r.text()
      const ct = r.headers.get('content-type') ?? ''
      if (!r.ok) continue
      const parsed = parseVisitPayload(raw, ct)
      if (parsed) return parsed.count
    } catch {
      /* siguiente URL */
    }
  }
  return null
}

export function VisitorCounter({
  className,
  variant = 'inline',
}: {
  className?: string
  variant?: 'inline' | 'panel'
}) {
  const [count, setCount] = useState<number | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    const ac = new AbortController()

    fetchVisitCount(ac.signal).then((n) => {
      if (cancelled) return
      if (n === null) {
        setError(true)
        setCount(null)
        return
      }
      setCount(n)
      setError(false)
    })

    return () => {
      cancelled = true
      ac.abort()
    }
  }, [])

  if (variant === 'panel') {
    return (
      <div className={cn('text-center', className)}>
        {error ? (
          <p className="text-pretty text-sm text-muted">
            No hubo respuesta JSON en <code className="text-foreground/90">/api/visits</code>. Comprueba en el
            servidor:{' '}
            <code className="text-foreground/90">curl -sS http://127.0.0.1:4174/api/visits</code>, PM2 con{' '}
            <code className="text-foreground/90">server/static-serve.mjs</code> (puerto 4174, no{' '}
            <code className="text-foreground/90">vite preview</code> en 4173) y nginx con{' '}
            <code className="text-foreground/90">proxy_pass</code> a ese puerto.
          </p>
        ) : count === null ? (
          <p className="font-mono text-4xl font-semibold tabular-nums text-muted/50">…</p>
        ) : (
          <p
            className="font-mono text-5xl font-semibold tracking-tight tabular-nums text-accent sm:text-6xl"
            aria-live="polite"
          >
            {count.toLocaleString('es-CO')}
          </p>
        )}
        {!error ? <p className="mt-3 text-sm text-muted">Visitas registradas</p> : null}
      </div>
    )
  }

  return (
    <div className={cn('text-center', className)}>
      <p className="text-xs text-muted sm:text-sm">
        {error ? (
          <span className="mx-auto block max-w-md text-pretty text-muted">
            No hubo respuesta JSON en <code className="text-foreground/90">/api/visits</code>. Comprueba en el
            servidor: <code className="text-foreground/90">curl -sS http://127.0.0.1:4174/api/visits</code>, PM2
            con <code className="text-foreground/90">server/static-serve.mjs</code> (puerto 4174, no{' '}
            <code className="text-foreground/90">vite preview</code> en 4173) y nginx con{' '}
            <code className="text-foreground/90">proxy_pass</code> a ese puerto.
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
