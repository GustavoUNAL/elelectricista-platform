import type { Variants } from 'motion/react'

/** Curva suave tipo expo-out para entradas de sección. */
export const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const

export function revealUp(reduce: boolean, y = 22): Variants {
  return {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.52, ease: EASE_SMOOTH },
    },
  }
}

export function revealScale(reduce: boolean): Variants {
  return {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 18, scale: reduce ? 1 : 0.94 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: reduce ? 0 : 0.48, ease: EASE_SMOOTH },
    },
  }
}

export function staggerContainer(reduce: boolean, stagger = 0.09, delayChildren = 0.06): Variants {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: reduce ? 0 : delayChildren,
      },
    },
  }
}

export function staggerItem(reduce: boolean, y = 16): Variants {
  return {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.42, ease: EASE_SMOOTH },
    },
  }
}

/** Entrada con ligero blur (solo si no reduce motion). */
export function revealBlur(reduce: boolean): Variants {
  return {
    hidden: {
      opacity: reduce ? 1 : 0,
      y: reduce ? 0 : 14,
      filter: reduce ? 'blur(0px)' : 'blur(10px)',
    },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: reduce ? 0 : 0.55, ease: EASE_SMOOTH },
    },
  }
}
