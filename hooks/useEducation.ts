'use client'

import defaultEducation from '@/data/education'
import type { Education } from '@/data/types'

import { useApiAdminCollection, useApiCollection } from './useApiCollection'

export function useEducation(): { educations: Education[]; loading: boolean } {
  const { items, loading } = useApiCollection<Education>('/api/educations', defaultEducation)
  return { educations: items, loading }
}

export function useEducationAdmin() {
  return useApiAdminCollection<Education>('/api/educations', defaultEducation)
}
