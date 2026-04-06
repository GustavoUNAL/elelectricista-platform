import { motion, useReducedMotion } from 'motion/react'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/cn'

/** Interruptor tipo “luces”: encendido = modo claro, apagado = modo oscuro. */
function SwitchIcon({ on, className }: { on: boolean; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 36 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="1"
        y="1"
        width="34"
        height="20"
        rx="10"
        className={on ? 'stroke-accent' : 'stroke-muted'}
        strokeWidth="2"
        fill="none"
      />
      <motion.g
        initial={false}
        animate={{ x: on ? 14 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
      >
        <circle
          cx="11"
          cy="11"
          r="7"
          fill="currentColor"
          className={on ? 'text-accent' : 'text-muted'}
        />
      </motion.g>
    </svg>
  )
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const reduce = useReducedMotion() ?? false
  const isLight = theme === 'light'

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-md border-0 bg-transparent p-1',
        'text-foreground transition-opacity hover:opacity-90',
        'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:outline-none',
        className,
      )}
      aria-label={isLight ? 'Apagar modo claro (modo oscuro)' : 'Encender modo claro'}
      title={isLight ? 'Modo oscuro' : 'Modo claro'}
      aria-pressed={isLight}
      whileTap={reduce ? undefined : { scale: 0.94 }}
    >
      <SwitchIcon on={isLight} className="h-5 w-[2.35rem]" />
    </motion.button>
  )
}
