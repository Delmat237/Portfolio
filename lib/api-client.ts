'use client'

type ApiError = { error?: string }

async function parseJson<T>(response: Response): Promise<T> {
  const data = (await response.json()) as T & ApiError
  if (!response.ok) {
    throw new Error(data.error ?? `Erreur HTTP ${response.status}`)
  }
  return data
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const headers = new Headers(init?.headers)
  if (init?.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(path, {
    ...init,
    credentials: 'include',
    headers,
  })
  return parseJson<T>(response)
}

export async function apiUpload(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch('/api/upload', {
    method: 'POST',
    credentials: 'include',
    body: formData,
  })

  const data = await parseJson<{ url: string }>(response)
  return data.url
}

export async function loginAdmin(password: string): Promise<void> {
  await apiFetch('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ password }),
  })
}

export async function logoutAdmin(): Promise<void> {
  await apiFetch('/api/admin/logout', { method: 'POST' })
}

export async function checkAdminSession(): Promise<boolean> {
  try {
    const data = await apiFetch<{ authenticated: boolean }>('/api/admin/me')
    return data.authenticated
  } catch {
    return false
  }
}
