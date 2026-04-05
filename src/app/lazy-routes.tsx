import { lazy } from 'react'

export const LazyLandingPage = lazy(async () => {
  const m = await import('@/pages/LandingPage')
  return { default: m.LandingPage }
})

export const LazyServicesCatalogPage = lazy(async () => {
  const m = await import('@/pages/ServicesCatalogPage')
  return { default: m.ServicesCatalogPage }
})
