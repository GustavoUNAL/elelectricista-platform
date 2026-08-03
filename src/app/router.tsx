import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'
import { PageShell } from '@/app/PageShell'
import { LazyAdminPage, LazyLandingPage, LazyServicesCatalogPage } from '@/app/lazy-routes'

function AdminFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg">
      <div className="h-10 w-48 animate-pulse rounded-lg bg-surface" />
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        element: <PageShell />,
        children: [
          { index: true, element: <LazyLandingPage /> },
          { path: 'servicios', element: <LazyServicesCatalogPage /> },
        ],
      },
    ],
  },
  {
    path: 'admin',
    element: (
      <Suspense fallback={<AdminFallback />}>
        <LazyAdminPage />
      </Suspense>
    ),
  },
])
