import { readFileSync } from 'fs'
import { spawnSync } from 'child_process'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

import { applyDatabaseUrlEnv } from './normalize-database-url.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const sqlPath = resolve(root, 'prisma/sql/enable-rls.sql')

function loadEnvFile(filename) {
  const path = resolve(root, filename)
  try {
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
      if (!(key in process.env)) process.env[key] = value
    }
  } catch {
    // fichier absent
  }
}

loadEnvFile('.env')
loadEnvFile('.env.local')

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL manquant. Impossible de sécuriser les tables.')
  process.exit(1)
}

if (!applyDatabaseUrlEnv()) process.exit(1)

console.log('🔒 Activation du RLS sur les tables portfolio…')

const result = spawnSync(
  'npx',
  ['prisma', 'db', 'execute', '--file', sqlPath, '--schema', 'prisma/schema.prisma'],
  { cwd: root, stdio: 'inherit', env: process.env }
)

if (result.status === 0) {
  console.log('✅ RLS activé + privilèges anon/authenticated retirés.')
  console.log('   Vérifiez dans Supabase → Advisors que l’alerte a disparu.')
} else {
  console.error('❌ Échec. Alternative : collez prisma/sql/enable-rls.sql dans Supabase → SQL Editor.')
}

process.exit(result.status ?? 1)
