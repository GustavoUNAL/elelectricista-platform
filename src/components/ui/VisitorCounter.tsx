import { useEffect, useState } from 'react'

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch('/api/visits', { cache: 'no-store' })
      .then((r) => {
        if (!r.ok) throw new Error('bad status')
        return r.json()
      })
      .then((data: { count?: number }) => {
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
          <span className="text-muted">Contador no disponible en este entorno.</span>
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
