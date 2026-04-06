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
    const n = JSON.parse(readFileSync(countFile, 'utf8')).count
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

  if (pathname === '/api/visits' && req.method === 'GET') {
    const count = readCount() + 1
    writeCount(count)
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    })
    res.end(JSON.stringify({ count }))
    return
  }

  staticHandler(req, res, () => {
    res.statusCode = 404
    res.end()
  })
})

const port = Number(process.env.PORT || 4173)
server.listen(port, '0.0.0.0', () => {
  console.log(`[elelectricista] http://0.0.0.0:${port} (dist + /api/visits)`)
})
