/**
 * Producción: sirve `dist/` (SPA) y GET/OPTIONS `/api/visits` con contador en disco.
 * Solo módulos nativos de Node (http, fs, path). La API se resuelve antes que estáticos.
 */

import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.resolve(__dirname, '..', 'dist')
const DATA_DIR = path.resolve(__dirname, '..', 'data')
const VISITS_FILE = path.join(DATA_DIR, 'visits.json')
const DEFAULT_PORT = 4174

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json',
}

function apiCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
  }
}

function parsePathname(reqUrl) {
  try {
    const { pathname } = new URL(reqUrl || '/', 'http://127.0.0.1')
    if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1)
    return pathname || '/'
  } catch {
    return '/'
  }
}

function readVisits() {
  try {
    if (!fs.existsSync(VISITS_FILE)) return 0
    const raw = JSON.parse(fs.readFileSync(VISITS_FILE, 'utf8'))
    const n = Number(raw.count)
    return Number.isFinite(n) ? Math.trunc(n) : 0
  } catch {
    return 0
  }
}

function writeVisits(count) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
  fs.writeFileSync(VISITS_FILE, JSON.stringify({ count }))
}

/**
 * @returns {boolean} true si la petición fue manejada (incl. 405).
 */
function handleApiVisits(req, res, pathname) {
  if (pathname !== '/api/visits') return false

  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      ...apiCorsHeaders(),
      'Content-Length': '0',
    })
    res.end()
    return true
  }

  if (req.method === 'GET') {
    let count
    try {
      count = readVisits() + 1
      writeVisits(count)
    } catch {
      res.writeHead(500, {
        ...apiCorsHeaders(),
        'Content-Type': 'application/json; charset=utf-8',
      })
      res.end(JSON.stringify({ error: 'No se pudo leer o escribir visits.json' }))
      return true
    }

    const body = JSON.stringify({ count: Number(count) })
    res.writeHead(200, {
      ...apiCorsHeaders(),
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'Content-Length': Buffer.byteLength(body, 'utf8'),
    })
    res.end(body)
    return true
  }

  res.writeHead(405, {
    ...apiCorsHeaders(),
    Allow: 'GET, OPTIONS',
    'Content-Type': 'text/plain; charset=utf-8',
  })
  res.end('Method Not Allowed')
  return true
}

/** Une pathname de URL a un archivo bajo DIST sin path traversal. */
function safePathUnderDist(urlPathname) {
  const rel = urlPathname === '/' ? 'index.html' : urlPathname.slice(1)
  if (!rel || rel.includes('\0')) return null

  const segments = rel.split(/[/\\]/).filter(Boolean)
  if (segments.some((s) => s === '..')) return null

  const resolved = path.resolve(DIST, ...segments)
  const root = path.resolve(DIST)
  const rootPrefix = root.endsWith(path.sep) ? root : root + path.sep
  if (resolved !== root && !resolved.startsWith(rootPrefix)) return null

  return resolved
}

/** Archivo a servir, o index.html del SPA si no hay recurso. */
function resolveStaticFile(urlPathname) {
  let file = safePathUnderDist(urlPathname)
  if (!file) return null

  try {
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      file = path.join(file, 'index.html')
    }
    if (fs.existsSync(file) && fs.statSync(file).isFile()) return file
  } catch {
    return null
  }

  const fallback = path.join(DIST, 'index.html')
  try {
    if (fs.existsSync(fallback) && fs.statSync(fallback).isFile()) return fallback
  } catch {
    return null
  }
  return null
}

function sendStatic(req, res, urlPathname) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Method Not Allowed')
    return
  }

  let filePath
  try {
    filePath = resolveStaticFile(urlPathname)
  } catch {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Internal Server Error')
    return
  }

  if (!filePath) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Not Found')
    return
  }

  let st
  try {
    st = fs.statSync(filePath)
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Not Found')
    return
  }

  const ext = path.extname(filePath).toLowerCase()
  const contentType = MIME[ext] || 'application/octet-stream'
  const headers = {
    'Content-Type': contentType,
    'Content-Length': String(st.size),
  }

  if (req.method === 'HEAD') {
    res.writeHead(200, headers)
    res.end()
    return
  }

  res.writeHead(200, headers)
  const stream = fs.createReadStream(filePath)
  stream.on('error', () => {
    if (!res.writableEnded) res.destroy()
  })
  stream.pipe(res)
}

const server = http.createServer((req, res) => {
  const pathname = parsePathname(req.url)

  try {
    if (handleApiVisits(req, res, pathname)) return
    sendStatic(req, res, pathname)
  } catch {
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    }
    if (!res.writableEnded) res.end('Internal Server Error')
  }
})

server.on('clientError', (_err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})

const port = Number(process.env.PORT || DEFAULT_PORT)
server.listen(port, '0.0.0.0', () => {
  console.log(`[static-serve] listening ${port} | dist=${DIST} | visits=${VISITS_FILE}`)
})
