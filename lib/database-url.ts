/**
 * Valide et normalise DATABASE_URL pour PostgreSQL (Supabase / Vercel).
 * - Ajoute sslmode=require si absent (obligatoire sur Supabase)
 * - Ajoute connection_limit=1 pour serverless si absent
 */
export function getDatabaseUrl(): string | null {
  const raw = process.env.DATABASE_URL?.trim()
  if (!raw) return null

  try {
    const url = new URL(raw)

    if (url.password.includes('@') || url.password.includes('#')) {
      console.error(
        '[database-url] Le mot de passe DATABASE_URL contient @ ou # non encodés. ' +
          'Encodez-les : @ → %40, # → %23'
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
    console.error('[database-url] DATABASE_URL invalide (URL mal formée)')
    return null
  }
}

export function isDatabaseConfigured(): boolean {
  return getDatabaseUrl() !== null
}
