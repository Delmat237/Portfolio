import { createHmac, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'

const SESSION_COOKIE = 'admin_session'
const SESSION_TTL_MS = 24 * 60 * 60 * 1000

function getAuthSecret(): string | null {
  return process.env.ADMIN_API_SECRET ?? process.env.ADMIN_PASSWORD ?? null
}

function signPayload(payload: string): string {
  const secret = getAuthSecret()
  if (!secret) throw new Error('Secret admin non configuré')
  return createHmac('sha256', secret).update(payload).digest('base64url')
}

export function createSessionToken(): string | null {
  const secret = getAuthSecret()
  if (!secret) return null

  const expiresAt = Date.now() + SESSION_TTL_MS
  const payload = Buffer.from(JSON.stringify({ exp: expiresAt })).toString('base64url')
  const signature = signPayload(payload)
  return `${payload}.${signature}`
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token || !getAuthSecret()) return false

  const [payload, signature] = token.split('.')
  if (!payload || !signature) return false

  const expected = signPayload(payload)
  try {
    const sigBuf = Buffer.from(signature)
    const expectedBuf = Buffer.from(expected)
    if (sigBuf.length !== expectedBuf.length) return false
    if (!timingSafeEqual(sigBuf, expectedBuf)) return false
  } catch {
    return false
  }

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { exp?: number }
    return typeof data.exp === 'number' && data.exp > Date.now()
  } catch {
    return false
  }
}

export function verifyAdminPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) return false

  try {
    const input = Buffer.from(password)
    const expected = Buffer.from(adminPassword)
    if (input.length !== expected.length) return false
    return timingSafeEqual(input, expected)
  } catch {
    return false
  }
}

export function isAdminRequest(request: NextRequest): boolean {
  const cookieToken = request.cookies.get(SESSION_COOKIE)?.value
  if (verifySessionToken(cookieToken)) return true

  const authHeader = request.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.slice(7)
    if (verifySessionToken(token)) return true
    const secret = getAuthSecret()
    if (secret) {
      try {
        const input = Buffer.from(token)
        const expected = Buffer.from(secret)
        if (input.length === expected.length && timingSafeEqual(input, expected)) {
          return true
        }
      } catch {
        return false
      }
    }
  }

  return false
}

export async function isAdminSession(): Promise<boolean> {
  const cookieStore = await cookies()
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value)
}

export const adminSessionCookie = {
  name: SESSION_COOKIE,
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_TTL_MS / 1000,
  },
}
