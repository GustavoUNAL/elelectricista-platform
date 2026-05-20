/**
 * Fija el contador para que la próxima visita muestre el número indicado.
 * Uso: node scripts/seed-visits.mjs 100000
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, '..', 'data')
const VISITS_FILE = path.join(DATA_DIR, 'visits.json')

const display = Number(process.argv[2] ?? 100000)
if (!Number.isFinite(display) || display < 0) {
  console.error('Indica un número válido, p. ej.: node scripts/seed-visits.mjs 100000')
  process.exit(1)
}

const stored = Math.max(0, Math.trunc(display) - 1)
fs.mkdirSync(DATA_DIR, { recursive: true })
fs.writeFileSync(VISITS_FILE, JSON.stringify({ count: stored }))

console.log(`Listo: guardado count=${stored} → la próxima carga mostrará ${stored + 1}`)
