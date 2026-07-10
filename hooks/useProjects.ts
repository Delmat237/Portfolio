'use client'

import { useState, useEffect } from 'react'
import defaultProjects from '@/data/project'
import type { Project } from '@/data/types'

const STORAGE_KEY = 'projects'

export function useProjects(): Project[] {
  const [projects, setProjects] = useState<Project[]>(defaultProjects)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setProjects(JSON.parse(stored) as Project[])
      } catch {
        setProjects(defaultProjects)
      }
    }
  }, [])

  return projects
}

export function useProjectsStorage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setProjects(JSON.parse(stored) as Project[])
      } catch {
        setProjects(defaultProjects)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProjects))
      }
    } else {
      setProjects(defaultProjects)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProjects))
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded && projects.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
    }
  }, [projects, loaded])

  return { projects, setProjects, loaded }
}
