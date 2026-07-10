/**
 * Normalise DATABASE_URL pour Supabase (sslmode=require, etc.)
 */
export function normalizeDatabaseUrl(raw) {
  const trimmed = raw?.trim()
  if (!trimmed) return null

  try {
    const url = new URL(trimmed)

    if (url.password.includes('@') || url.password.includes('#')) {
      console.warn(
        '⚠️  Mot de passe avec @ ou # : encodez-les (@ → %40, # → %23) dans DATABASE_URL.'
      )
    }

    if (!url.searchParams.has('sslmode')) {
      url.searchParams.set('sslmode', 'require')
    }

    if (process.env.VERCEL === '1' && !url.searchParams.has('connection_limit')) {
      url.searchParams.set('connection_limit', '1')
    }

    return url.toString()
  } catch {
    console.error('DATABASE_URL invalide (URL mal formée).')
    return null
  }
}

export function applyDatabaseUrlEnv() {
  const normalized = normalizeDatabaseUrl(process.env.DATABASE_URL)
  if (!normalized) return false
  process.env.DATABASE_URL = normalized
  return true
}
