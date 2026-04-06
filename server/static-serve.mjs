import http from 'node:http'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sirv from 'sirv'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..', 'dist')
const dataDir = join(__dirname, '..', 'data')
const countFile = join(dataDir, 'visits.json')

function readCount() {
  try {
    const raw = JSON.parse(readFileSync(countFile, 'utf8'))
    const n = Number(raw.count)
    return Number.isFinite(n) ? n : 0
  } catch {
    return 0
  }
}

function writeCount(n) {
  mkdirSync(dataDir, { recursive: true })
  writeFileSync(countFile, JSON.stringify({ count: n }))
}

const staticHandler = sirv(root, {
  single: true,
  gzip: true,
  brotli: true,
  dev: false,
})

const server = http.createServer((req, res) => {
  const pathname = (req.url ?? '').split('?')[0].replace(/\/$/, '') || '/'

  if (pathname === '/api/visits') {
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Max-Age': '86400',
      })
      res.end()
      return
    }
    if (req.method === 'GET') {
      const count = readCount() + 1
      writeCount(count)
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      })
      res.end(JSON.stringify({ count }))
      return
    }
    res.statusCode = 405
    res.end()
    return
  }

  staticHandler(req, res, () => {
    res.statusCode = 404
    res.end()
  })
})

/** 4174 por defecto: el 4173 lo usa `vite preview` y devuelve HTML para /api/visits. */
const port = Number(process.env.PORT || 4174)
server.listen(port, '0.0.0.0', () => {
  console.log(
    `[elelectricista] static-serve OK — puerto ${port} (JSON en GET /api/visits + dist). NO es vite preview.`,
  )
})
