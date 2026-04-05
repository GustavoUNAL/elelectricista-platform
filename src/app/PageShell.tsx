import { Suspense } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
import type { SiteContent } from '@/schemas/site'

function PageFallback() {
  return (
    <div className="min-h-[50vh] bg-bg">
      <div className="container-app py-20">
        <div className="h-10 max-w-md animate-pulse rounded-lg bg-surface" />
        <div className="mt-6 h-40 max-w-2xl animate-pulse rounded-lg bg-surface" />
      </div>
    </div>
  )
}

export function PageShell() {
  const siteContent = useOutletContext<SiteContent>()
  return (
    <Suspense fallback={<PageFallback />}>
      <Outlet context={siteContent} />
    </Suspense>
  )
}
