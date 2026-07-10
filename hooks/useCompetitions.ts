'use client'

import defaultCompetitions from '@/data/competition'
import type { Competition } from '@/data/types'

import { useApiAdminCollection, useApiCollection } from './useApiCollection'

export function useCompetitions(): Competition[] {
  const { items } = useApiCollection<Competition>('/api/competitions', defaultCompetitions)
  return items
}

export function useCompetitionsAdmin() {
  return useApiAdminCollection<Competition>('/api/competitions', defaultCompetitions)
}
