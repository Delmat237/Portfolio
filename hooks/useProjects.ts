'use client'

import defaultProjects from '@/data/project'
import type { Project } from '@/data/types'

import { useApiAdminCollection, useApiCollection } from './useApiCollection'

export function useProjects(): { projects: Project[]; loading: boolean } {
  const { items, loading } = useApiCollection<Project>('/api/projects', defaultProjects)
  return { projects: items, loading }
}

export function useProjectsAdmin() {
  return useApiAdminCollection<Project>('/api/projects', defaultProjects)
}
