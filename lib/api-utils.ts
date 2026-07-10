import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { disconnectDb } from '@/lib/db'
import { isAdminRequest } from '@/lib/auth'

export function unauthorizedResponse() {
  return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
}

export function notFoundResponse() {
  return NextResponse.json({ error: 'Ressource introuvable' }, { status: 404 })
}

export function badRequestResponse(message: string) {
  return NextResponse.json({ error: message }, { status: 400 })
}

export function serverErrorResponse(error: unknown) {
  const prismaCode = (error as { code?: string })?.code
  const message = error instanceof Error ? error.message : String(error)
  console.error('[API]', prismaCode ?? 'ERROR', message)

  if (prismaCode === 'P2021') {
    return NextResponse.json(
      {
        error:
          'Tables absentes en base. Exécutez npm run db:push puis npm run db:seed avec DATABASE_URL.',
      },
      { status: 503 }
    )
  }

  if (prismaCode === 'P1001' || prismaCode === 'P1000') {
    return NextResponse.json(
      { error: 'Connexion base de données impossible. Vérifiez DATABASE_URL sur Vercel.' },
      { status: 503 }
    )
  }

  return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
}

export function requireAdmin(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return unauthorizedResponse()
  }
  return null
}

/** Exécute une mutation Prisma et ferme la connexion sur Vercel serverless. */
export async function runDb<T>(operation: () => Promise<T>): Promise<T> {
  try {
    return await operation()
  } finally {
    if (process.env.VERCEL === '1') {
      await disconnectDb().catch(() => undefined)
    }
  }
}

export function parseIdParam(raw: string): number | null {
  const id = Number(raw)
  if (!Number.isInteger(id) || id <= 0) return null
  return id
}
