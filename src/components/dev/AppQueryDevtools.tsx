import { lazy, Suspense, useState } from 'react'
import { cn } from '@/lib/cn'

const DevtoolsPanel = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/react-query-devtools').then((d) => ({
        default: d.ReactQueryDevtoolsPanel,
      })),
    )
  : () => null

/**
 * Solo en desarrollo: panel embebido (sin botón flotante de TanStack / goober).
 * Abre con un control al estilo de la app.
 */
export function AppQueryDevtools() {
  const [open, setOpen] = useState(false)

  if (!import.meta.env.DEV) return null

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={cn(
            'fixed bottom-4 left-4 z-[100000]',
            'inline-flex items-center justify-center rounded-[var(--radius-lg)] border-2 border-border',
            'bg-bg-elevated/95 px-3.5 py-2 text-xs font-semibold tracking-wide text-muted uppercase backdrop-blur-sm',
            'transition-all duration-200 hover:border-accent hover:text-accent',
            'shadow-[0_4px_24px_rgba(0,0,0,0.25)]',
          )}
          aria-label="Abrir panel de consultas (React Query, solo desarrollo)"
        >
          Consultas
        </button>
      )}

      {open && (
        <>
          <button
            type="button"
            aria-label="Cerrar panel de consultas"
            className="fixed inset-0 z-[100000] bg-[#0c0f14]/55 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
          <Suspense fallback={null}>
            <DevtoolsPanel
              onClose={() => setOpen(false)}
              style={{
                position: 'fixed',
                left: 0,
                right: 0,
                bottom: 0,
                height: 'min(440px, 52vh)',
                width: '100%',
                maxWidth: '100%',
                zIndex: 100001,
                borderTopLeftRadius: 'var(--radius-lg)',
                borderTopRightRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                boxShadow: '0 -16px 48px rgba(0, 0, 0, 0.45)',
              }}
            />
          </Suspense>
        </>
      )}
    </>
  )
}
