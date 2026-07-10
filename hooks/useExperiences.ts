'use client'

import defaultExperiences from '@/data/experience'
import type { Experience } from '@/data/types'

import { useApiAdminCollection, useApiCollection } from './useApiCollection'

export function useExperiences(): Experience[] {
  const { items } = useApiCollection<Experience>('/api/experiences', defaultExperiences)
  return items
}

export function useExperiencesAdmin() {
  return useApiAdminCollection<Experience>('/api/experiences', defaultExperiences)
}
