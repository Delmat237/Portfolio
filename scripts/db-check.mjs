import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { lookup } from 'dns/promises'
import net from 'net'

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

function testTcp(host, port, timeoutMs = 8000) {
  return new Promise((resolve) => {
    const socket = net.connect({ host, port })
    const timer = setTimeout(() => {
      socket.destroy()
      resolve(false)
    }, timeoutMs)

    socket.on('connect', () => {
      clearTimeout(timer)
      socket.end()
      resolve(true)
    })

    socket.on('error', () => {
      clearTimeout(timer)
      resolve(false)
    })
  })
}

loadEnvFile('.env')
loadEnvFile('.env.local')

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL manquant dans .env.local')
  process.exit(1)
}

if (!applyDatabaseUrlEnv()) {
  process.exit(1)
}

const url = new URL(process.env.DATABASE_URL)
const host = url.hostname
const port = Number(url.port || 5432)

console.log(`\n🔍 Test connexion PostgreSQL`)
console.log(`   Hôte : ${host}`)
console.log(`   Port : ${port}`)
console.log(`   SSL  : ${url.searchParams.get('sslmode') ?? 'non défini'}\n`)

try {
  const addresses = await lookup(host, { all: true })
  console.log('✅ DNS résolu :')
  for (const addr of addresses) {
    console.log(`   - ${addr.address} (${addr.family})`)
  }
} catch {
  console.error('❌ DNS : impossible de résoudre', host)
  printHelp()
  process.exit(1)
}

const reachable = await testTcp(host, port)
if (reachable) {
  console.log(`\n✅ Port ${port} accessible — lancez : npm run db:push`)
  process.exit(0)
}

console.error(`\n❌ Port ${port} inaccessible sur ${host}`)
printHelp()
process.exit(1)

function printHelp() {
  console.log(`
Causes fréquentes (P1001) :

1. Projet Supabase en pause
   → https://supabase.com/dashboard → ouvrez le projet → « Restore project »

2. Mauvaise URL de connexion
   → Settings → Database → Connection string → URI
   → Copiez la chaîne « Direct connection » ou « Session pooler » (port 5432)

3. Réseau bloque le port 5432
   → Essayez le « Session pooler » (host *.pooler.supabase.com)
   → Ou un autre réseau (partage de connexion 4G)

4. sslmode manquant
   → Ajoutez ?sslmode=require à la fin de DATABASE_URL
   → (npm run db:push l’ajoute automatiquement désormais)

Exemple Session pooler Supabase :
DATABASE_URL=postgresql://postgres.VOTRE_REF:VOTRE_MDP@aws-0-REGION.pooler.supabase.com:5432/postgres?sslmode=require
`)
}
