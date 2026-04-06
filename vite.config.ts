import { fileURLToPath, URL } from 'node:url'
import type { Plugin, PreviewServer, ViteDevServer } from 'vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/** Contador en memoria para `npm run dev` y `vite preview` (en producción: `server/static-serve.mjs`). */
function visitCounterPlugin(): Plugin {
  let count = 0
  const attach = (server: ViteDevServer | PreviewServer) => {
    server.middlewares.use((req, res, next) => {
      const pathname = (req.url ?? '').split('?')[0].replace(/\/$/, '') || '/'
      if (pathname !== '/api/visits') {
        next()
        return
      }
      count += 1
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.setHeader('Cache-Control', 'no-store')
      res.end(JSON.stringify({ count }))
    })
  }
  return {
    name: 'visit-counter',
    configureServer(server) {
      attach(server)
    },
    configurePreviewServer(server) {
      attach(server)
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), visitCounterPlugin()],
  /** `vite preview` queda en 4173; en el VPS el sitio real debe ser `node server/static-serve.mjs` (p. ej. 4174 vía PM2). */
  preview: {
    port: 4173,
    strictPort: false,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
