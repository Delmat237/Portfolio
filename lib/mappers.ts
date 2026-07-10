import type {
  Association,
  Certification,
  Competition,
  Education,
  Experience,
  Project,
} from '@/data/types'
import type {
  Association as PrismaAssociation,
  Certification as PrismaCertification,
  Competition as PrismaCompetition,
  Education as PrismaEducation,
  Experience as PrismaExperience,
  Project as PrismaProject,
} from '@prisma/client'

export function toProject(row: PrismaProject): Project {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    image: row.image,
    technologies: row.technologies,
    category: row.category,
    tag: row.tag ?? undefined,
    github: row.github,
    status: row.status,
    demo: row.demo,
  }
}

export function toEducation(row: PrismaEducation): Education {
  return {
    id: row.id,
    title: row.title,
    institution: row.institution,
    location: row.location,
    period: row.period,
    description: row.description,
    status: row.status,
    grade: row.grade,
    skills: row.skills,
  }
}

export function toExperience(row: PrismaExperience): Experience {
  return {
    id: row.id,
    title: row.title,
    company: row.company,
    location: row.location,
    period: row.period,
    description: row.description,
  }
}

export function toCompetition(row: PrismaCompetition): Competition {
  return {
    id: row.id,
    title: row.title,
    position: row.position,
    description: row.description,
    date: row.date,
    team: row.team,
    technologies: row.technologies,
    link: row.link,
    image: row.image,
  }
}

export function toAssociation(row: PrismaAssociation): Association {
  return {
    id: row.id,
    title: row.title,
    images: row.images,
    description: row.description,
    roles: row.roles,
    duration: row.duration ?? undefined,
    link: row.link ?? undefined,
  }
}

export function toCertification(row: PrismaCertification): Certification {
  return {
    id: row.id,
    title: row.title,
    source: row.source,
    description: row.description,
    image: row.image,
    reference: row.reference,
    file: row.file,
  }
}
