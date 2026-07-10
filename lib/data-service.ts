import defaultAssociations from '@/data/association'
import defaultCertifications from '@/data/certification'
import defaultCompetitions from '@/data/competition'
import defaultEducation from '@/data/education'
import defaultExperiences from '@/data/experience'
import defaultProjects from '@/data/project'
import type {
  Association,
  Certification,
  Competition,
  Education,
  Experience,
  Project,
} from '@/data/types'
import { disconnectDb, isDatabaseConfigured, prisma } from '@/lib/db'
import {
  toAssociation,
  toCertification,
  toCompetition,
  toEducation,
  toExperience,
  toProject,
} from '@/lib/mappers'

async function withFallback<T>(fetcher: () => Promise<T[]>, fallback: T[]): Promise<T[]> {
  if (!isDatabaseConfigured()) return fallback
  try {
    const rows = await fetcher()
    return rows.length > 0 ? rows : fallback
  } catch (error) {
    const code = (error as { code?: string })?.code
    console.error('Erreur lecture base de données, fallback statique:', code ?? error)
    return fallback
  } finally {
    if (process.env.VERCEL === '1') {
      await disconnectDb().catch(() => undefined)
    }
  }
}

export async function getProjects(): Promise<Project[]> {
  return withFallback(
    async () => {
      const rows = await prisma.project.findMany({ orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }] })
      return rows.map(toProject)
    },
    defaultProjects
  )
}

export async function getEducations(): Promise<Education[]> {
  return withFallback(
    async () => {
      const rows = await prisma.education.findMany({ orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }] })
      return rows.map(toEducation)
    },
    defaultEducation
  )
}

export async function getExperiences(): Promise<Experience[]> {
  return withFallback(
    async () => {
      const rows = await prisma.experience.findMany({ orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }] })
      return rows.map(toExperience)
    },
    defaultExperiences
  )
}

export async function getCompetitions(): Promise<Competition[]> {
  return withFallback(
    async () => {
      const rows = await prisma.competition.findMany({ orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }] })
      return rows.map(toCompetition)
    },
    defaultCompetitions
  )
}

export async function getAssociations(): Promise<Association[]> {
  return withFallback(
    async () => {
      const rows = await prisma.association.findMany({ orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }] })
      return rows.map(toAssociation)
    },
    defaultAssociations
  )
}

export async function getCertifications(): Promise<Certification[]> {
  return withFallback(
    async () => {
      const rows = await prisma.certification.findMany({ orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }] })
      return rows.map(toCertification)
    },
    defaultCertifications
  )
}
