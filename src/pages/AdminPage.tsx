import { Link } from 'react-router-dom'
import { VisitorCounter } from '@/components/ui/VisitorCounter'
import { ThemeToggle } from '@/components/layout/ThemeToggle'

export function AdminPage() {
  return (
    <main className="flex min-h-screen flex-col bg-bg">
      <header className="flex h-14 items-center justify-between border-b border-border px-4 sm:px-5">
        <p className="text-sm font-semibold tracking-tight text-foreground">Admin</p>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/"
            className="text-sm font-medium text-muted transition-colors hover:text-accent hover:no-underline"
          >
            Ir al sitio
          </Link>
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <section className="w-full max-w-md rounded-[var(--radius-lg)] border border-border bg-surface px-6 py-8 sm:px-8 sm:py-10">
          <h1 className="mb-2 text-center text-lg font-bold tracking-tight text-foreground sm:text-xl">
            Visitas al sitio
          </h1>
          <p className="mb-8 text-center text-sm text-muted">
            Panel interno. Solo accesible en <code className="text-foreground/90">/admin</code>.
          </p>
          <VisitorCounter className="w-full" variant="panel" />
        </section>
      </div>
    </main>
  )
}
