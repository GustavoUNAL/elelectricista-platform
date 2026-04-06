import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { FloatingQuoteCta } from '@/components/layout/FloatingQuoteCta'
import { useSiteContent } from '@/hooks/useSiteContent'

export function RootLayout() {
  const { data, isPending, isError } = useSiteContent()

  useEffect(() => {
    if (!data?.seo) return
    document.title = data.seo.title
    const el = document.querySelector('meta[name="description"]')
    if (el) el.setAttribute('content', data.seo.description)
  }, [data])

  if (isPending) {
    return (
      <div className="min-h-screen bg-bg">
        <div className="h-16 animate-pulse bg-bg-elevated" />
        <div className="container-app py-24">
          <div className="mb-6 h-10 max-w-md animate-pulse rounded-lg bg-surface" />
          <div className="h-24 max-w-2xl animate-pulse rounded-lg bg-surface" />
        </div>
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="container-app flex min-h-screen flex-col items-center justify-center text-center">
        <p className="text-lg text-muted">No se pudo cargar el contenido. Intenta de nuevo más tarde.</p>
      </div>
    )
  }

  return (
    <>
      <SiteHeader brandName={data.brand.name} />
      <div className="pb-16 sm:pb-20">
        <Outlet context={data} />
      </div>
      <SiteFooter content={data} />
      <FloatingQuoteCta content={data} />
    </>
  )
}
