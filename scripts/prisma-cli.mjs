import { readFileSync, existsSync } from 'fs'
import { spawnSync } from 'child_process'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

import { applyDatabaseUrlEnv } from './normalize-database-url.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

function loadEnvFile(filename) {
  const path = resolve(root, filename)
  if (!existsSync(path)) return

  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (!(key in process.env)) {
      process.env[key] = value
    }
  }
}

loadEnvFile('.env')
loadEnvFile('.env.local')

if (!process.env.DATABASE_URL) {
  console.error(
    'DATABASE_URL manquant. Copiez .env.local.example vers .env.local et renseignez la connexion Supabase.'
  )
  process.exit(1)
}

if (!applyDatabaseUrlEnv()) {
  process.exit(1)
}

const args = process.argv.slice(2)
const result = spawnSync('npx', ['prisma', ...args], {
  cwd: root,
  stdio: 'inherit',
  env: process.env,
})

process.exit(result.status ?? 1)
