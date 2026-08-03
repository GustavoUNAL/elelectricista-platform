import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { GalleryItem } from '@/schemas/site'
import { cn } from '@/lib/cn'

type PortfolioCarouselProps = {
  items: GalleryItem[]
  categoryLabels: Record<string, string>
}

/** Coincide con `gap-5` (1.25rem) del carril. */
const SCROLL_GAP_PX = 20

const navBtnClass = cn(
  'inline-flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-full border border-border',
  'bg-bg-elevated/95 text-lg leading-none text-foreground shadow-md backdrop-blur-sm transition-colors',
  'hover:border-accent/40 hover:text-accent',
)

export function PortfolioCarousel({ items, categoryLabels }: PortfolioCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const interactionWrapRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)
  const reducedMotionRef = useRef(false)
  const loopRafRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const loopItems = useMemo(() => {
    if (items.length <= 1) return items
    return [
      ...items,
      ...items.map((item, i) => ({ ...item, id: `${item.id}-loop-${i}` })),
    ]
  }, [items])

  const firstIds = useMemo(() => new Set(items.slice(0, 3).map((i) => i.id)), [items])

  const enableLoop = items.length > 1

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotionRef.current = mq.matches
    const onChange = () => {
      reducedMotionRef.current = mq.matches
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const getStep = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return 0
    const slide = el.querySelector<HTMLElement>('[data-carousel-slide]')
    if (!slide) return 0
    return slide.offsetWidth + SCROLL_GAP_PX
  }, [])

  const normalizeLoopPosition = useCallback(() => {
    const el = scrollerRef.current
    if (!el || !enableLoop) return
    const half = el.scrollWidth / 2
    if (half <= 0) return
    if (el.scrollLeft >= half - 1) {
      el.scrollLeft -= half
    }
  }, [enableLoop])

  const syncActiveIndex = useCallback(() => {
    const el = scrollerRef.current
    if (!el || items.length === 0) return
    const step = getStep()
    if (step <= 0) return
    const raw = Math.round(el.scrollLeft / step)
    setActiveIndex(((raw % items.length) + items.length) % items.length)
  }, [getStep, items.length])

  const scrollByDir = useCallback(
    (dir: -1 | 1) => {
      const el = scrollerRef.current
      if (!el) return
      const step = getStep() || Math.min(el.clientWidth * 0.8, 400)
      el.scrollBy({ left: dir * step, behavior: 'smooth' })
    },
    [getStep],
  )

  useEffect(() => {
    const el = scrollerRef.current
    if (!el || !enableLoop) return

    const onScroll = () => {
      cancelAnimationFrame(loopRafRef.current)
      loopRafRef.current = requestAnimationFrame(() => {
        normalizeLoopPosition()
        syncActiveIndex()
      })
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(loopRafRef.current)
    }
  }, [enableLoop, normalizeLoopPosition, syncActiveIndex])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el || items.length <= 1) return

    const tick = () => {
      if (pausedRef.current || reducedMotionRef.current) return
      const step = getStep()
      if (step <= 0) return
      el.scrollBy({ left: step, behavior: 'smooth' })
    }

    const id = window.setInterval(tick, 4800)
    return () => window.clearInterval(id)
  }, [items.length, getStep])

  if (items.length === 0) {
    return (
      <p className="rounded-[var(--radius-lg)] border border-border bg-surface px-5 py-8 text-center text-sm text-muted">
        Pronto publicaremos fotos de obra en esta galería.
      </p>
    )
  }

  return (
    <div className="-mx-5 px-5 lg:mx-0 lg:px-0">
      <div
        ref={interactionWrapRef}
        className="flex min-w-0 items-stretch gap-2 sm:gap-3 lg:items-center"
        onPointerEnter={() => {
          pausedRef.current = true
        }}
        onPointerLeave={() => {
          pausedRef.current = false
        }}
        onFocus={() => {
          pausedRef.current = true
        }}
        onBlur={(e) => {
          const next = e.relatedTarget as Node | null
          if (next && interactionWrapRef.current?.contains(next)) return
          pausedRef.current = false
        }}
      >
        <button type="button" onClick={() => scrollByDir(-1)} className={navBtnClass} aria-label="Ver foto anterior">
          ‹
        </button>

        <div
          ref={scrollerRef}
          role="list"
          className={cn(
            'flex min-w-0 flex-1 snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-1',
            'scroll-pl-0 scroll-pr-0 [-ms-overflow-style:none] [scrollbar-width:none]',
            '[&::-webkit-scrollbar]:hidden',
          )}
          tabIndex={0}
          aria-label="Carrusel de trabajos realizados, avance automático"
        >
          {loopItems.map((item) => (
            <figure
              key={item.id}
              role="listitem"
              data-carousel-slide
              className={cn(
                'm-0 w-[min(22rem,calc(100vw-5.5rem))] shrink-0 snap-center',
                'sm:w-[min(24rem,calc(100vw-6rem))]',
                'lg:w-[min(38vw,400px)]',
              )}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.caption}
                    className="h-full w-full object-cover opacity-100 brightness-[1.06] contrast-[1.08] saturate-[1.1]"
                    loading={firstIds.has(item.id) ? 'eager' : 'lazy'}
                    fetchPriority={firstIds.has(item.id) ? 'high' : undefined}
                    decoding="async"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="text-sm font-semibold text-muted/50">Foto pendiente</span>
                  </div>
                )}
                <span className="absolute top-2 left-2 rounded-md bg-bg/90 px-2 py-0.5 text-xs font-medium text-foreground/90 shadow-sm backdrop-blur-sm">
                  {categoryLabels[item.category] ?? item.category}
                </span>
              </div>
              <figcaption className="mt-2.5 sm:mt-3">
                <p className="text-sm font-semibold leading-snug tracking-tight text-foreground">{item.title}</p>
                <p className="mt-1 text-sm leading-snug text-muted break-words">{item.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <button type="button" onClick={() => scrollByDir(1)} className={navBtnClass} aria-label="Ver foto siguiente">
          ›
        </button>
      </div>

      {items.length > 1 ? (
        <div className="mt-4 flex justify-center gap-1.5" aria-hidden>
          {items.map((item, i) => (
            <span
              key={item.id}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                i === activeIndex ? 'w-5 bg-accent' : 'w-1.5 bg-border',
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
