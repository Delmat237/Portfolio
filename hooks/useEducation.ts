'use client'

import { useState, useEffect } from 'react'
import defaultEducation from '@/data/education'
import type { Education } from '@/data/types'

const STORAGE_KEY = 'educations'

export function useEducation(): Education[] {
  const [educations, setEducations] = useState<Education[]>(defaultEducation)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setEducations(JSON.parse(stored) as Education[])
      } catch {
        setEducations(defaultEducation)
      }
    }
  }, [])

  return educations
}

export function useEducationStorage() {
  const [educations, setEducations] = useState<Education[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setEducations(JSON.parse(stored) as Education[])
      } catch {
        setEducations(defaultEducation)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultEducation))
      }
    } else {
      setEducations(defaultEducation)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultEducation))
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded && educations.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(educations))
    }
  }, [educations, loaded])

  return { educations, setEducations, loaded }
}
