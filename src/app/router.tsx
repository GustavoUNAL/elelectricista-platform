import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'
import { PageShell } from '@/app/PageShell'
import { LazyLandingPage, LazyServicesCatalogPage } from '@/app/lazy-routes'

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
])
