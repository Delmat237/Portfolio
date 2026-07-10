import defaultAssociations from '../data/association'
import defaultCertifications from '../data/certification'
import defaultCompetitions from '../data/competition'
import defaultEducation from '../data/education'
import defaultExperiences from '../data/experience'
import defaultProjects from '../data/project'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const counts = await Promise.all([
    prisma.project.count(),
    prisma.education.count(),
    prisma.experience.count(),
    prisma.competition.count(),
    prisma.association.count(),
    prisma.certification.count(),
  ])

  const total = counts.reduce((sum, count) => sum + count, 0)
  if (total > 0) {
    console.log('Base déjà peuplée, seed ignoré.')
    return
  }

  console.log('Peuplement initial depuis data/*.ts…')

  await prisma.project.createMany({
    data: defaultProjects.map((item, index) => ({
      title: item.title,
      description: item.description,
      image: item.image,
      technologies: item.technologies,
      category: item.category,
      tag: item.tag ?? null,
      github: item.github,
      status: item.status,
      demo: item.demo,
      sortOrder: index,
    })),
  })

  await prisma.education.createMany({
    data: defaultEducation.map((item, index) => ({
      title: item.title,
      institution: item.institution,
      location: item.location,
      period: item.period,
      description: item.description,
      status: item.status,
      grade: item.grade,
      skills: item.skills,
      sortOrder: index,
    })),
  })

  await prisma.experience.createMany({
    data: defaultExperiences.map((item, index) => ({
      title: item.title,
      company: item.company,
      location: item.location,
      period: item.period,
      description: item.description,
      sortOrder: index,
    })),
  })

  await prisma.competition.createMany({
    data: defaultCompetitions.map((item, index) => ({
      title: item.title,
      position: item.position,
      description: item.description,
      date: item.date,
      team: item.team,
      technologies: item.technologies,
      link: item.link,
      image: item.image,
      sortOrder: index,
    })),
  })

  await prisma.association.createMany({
    data: defaultAssociations.map((item, index) => ({
      title: item.title,
      images: item.images,
      description: item.description,
      roles: item.roles,
      duration: item.duration ?? null,
      link: item.link ?? null,
      sortOrder: index,
    })),
  })

  await prisma.certification.createMany({
    data: defaultCertifications.map((item, index) => ({
      title: item.title,
      source: item.source,
      description: item.description,
      image: item.image,
      reference: item.reference,
      file: item.file,
      sortOrder: index,
    })),
  })

  console.log('Seed terminé avec succès.')
}

main()
  .catch((error) => {
    console.error('Erreur seed:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
