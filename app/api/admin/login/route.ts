import { NextRequest, NextResponse } from 'next/server'

import {
  adminSessionCookie,
  createSessionToken,
  verifyAdminPassword,
} from '@/lib/auth'
import { badRequestResponse, serverErrorResponse } from '@/lib/api-utils'

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { password?: string }
    if (!body.password) {
      return badRequestResponse('Mot de passe requis')
    }

    if (!verifyAdminPassword(body.password)) {
      return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })
    }

    const token = createSessionToken()
    if (!token) {
      return NextResponse.json(
        { error: 'Configuration admin manquante (ADMIN_PASSWORD)' },
        { status: 500 }
      )
    }

    const response = NextResponse.json({ success: true })
    response.cookies.set(adminSessionCookie.name, token, adminSessionCookie.options)
    return response
  } catch (error) {
    return serverErrorResponse(error)
  }
}
