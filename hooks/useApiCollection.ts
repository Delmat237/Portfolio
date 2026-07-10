'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { apiFetch } from '@/lib/api-client'

export function useApiCollection<T>(endpoint: string, fallback: T[]) {
  const [items, setItems] = useState<T[]>(fallback)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const fallbackRef = useRef(fallback)
  fallbackRef.current = fallback

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await apiFetch<T[]>(endpoint, { method: 'GET' })
      setItems(data)
    } catch {
      setItems(fallbackRef.current)
      setError('Données statiques utilisées (API indisponible)')
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return { items, setItems, loading, error, refresh }
}

export function useApiAdminCollection<T extends { id?: number }>(
  endpoint: string,
  fallback: T[]
) {
  const { items, setItems, loading, error, refresh } = useApiCollection<T>(endpoint, fallback)

  const createItem = useCallback(
    async (payload: Omit<T, 'id'>) => {
      const created = await apiFetch<T>(endpoint, {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      setItems((prev) => [...prev, created])
      return created
    },
    [endpoint, setItems]
  )

  const updateItem = useCallback(
    async (id: number, payload: Partial<T>) => {
      const updated = await apiFetch<T>(`${endpoint}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      })
      setItems((prev) => prev.map((item) => (item.id === id ? updated : item)))
      return updated
    },
    [endpoint, setItems]
  )

  const deleteItem = useCallback(
    async (id: number) => {
      await apiFetch(`${endpoint}/${id}`, { method: 'DELETE' })
      setItems((prev) => prev.filter((item) => item.id !== id))
    },
    [endpoint, setItems]
  )

  return { items, loading, error, refresh, createItem, updateItem, deleteItem }
}
