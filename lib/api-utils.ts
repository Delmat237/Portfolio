import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

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
  console.error(error)
  return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
}

export function requireAdmin(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return unauthorizedResponse()
  }
  return null
}

export function parseIdParam(raw: string): number | null {
  const id = Number(raw)
  if (!Number.isInteger(id) || id <= 0) return null
  return id
}
