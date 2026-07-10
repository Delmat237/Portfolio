'use client'

import defaultCertifications from '@/data/certification'
import type { Certification } from '@/data/types'

import { useApiAdminCollection, useApiCollection } from './useApiCollection'

export function useCertifications(): Certification[] {
  const { items } = useApiCollection<Certification>('/api/certifications', defaultCertifications)
  return items
}

export function useCertificationsAdmin() {
  return useApiAdminCollection<Certification>('/api/certifications', defaultCertifications)
}
