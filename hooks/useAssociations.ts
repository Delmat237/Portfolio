'use client'

import defaultAssociations from '@/data/association'
import type { Association } from '@/data/types'

import { useApiAdminCollection, useApiCollection } from './useApiCollection'

export function useAssociations(): Association[] {
  const { items } = useApiCollection<Association>('/api/associations', defaultAssociations)
  return items
}

export function useAssociationsAdmin() {
  return useApiAdminCollection<Association>('/api/associations', defaultAssociations)
}
