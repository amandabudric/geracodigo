import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const swPath = resolve(__dirname, '..', 'public', 'sw.js')

const version = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')
const content = readFileSync(swPath, 'utf-8')
const updated = content.replace(
  /var CACHE_VERSION = '[^']*'/,
  `var CACHE_VERSION = '${version}'`
)

if (updated !== content) {
  writeFileSync(swPath, updated, 'utf-8')
  console.log(`sw.js CACHE_VERSION → ${version}`)
} else {
  console.log('sw.js CACHE_VERSION unchanged')
}
