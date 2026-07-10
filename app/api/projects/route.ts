import { NextRequest, NextResponse } from 'next/server'

import {
  badRequestResponse,
  requireAdmin,
  serverErrorResponse,
} from '@/lib/api-utils'
import { getProjects } from '@/lib/data-service'
import { prisma } from '@/lib/db'
import { toProject } from '@/lib/mappers'

export async function GET() {
  try {
    const projects = await getProjects()
    return NextResponse.json(projects)
  } catch (error) {
    return serverErrorResponse(error)
  }
}

export async function POST(request: NextRequest) {
  const authError = requireAdmin(request)
  if (authError) return authError

  try {
    const body = (await request.json()) as {
      title?: string
      description?: string
      image?: string
      technologies?: string[]
      category?: string
      tag?: string
      github?: string
      status?: string
      demo?: string
    }

    if (!body.title || !body.description || !body.image || !body.category || !body.status) {
      return badRequestResponse('Champs obligatoires manquants')
    }

    const row = await prisma.project.create({
      data: {
        title: body.title,
        description: body.description,
        image: body.image,
        technologies: body.technologies ?? [],
        category: body.category,
        tag: body.tag ?? null,
        github: body.github ?? '#',
        status: body.status,
        demo: body.demo ?? '#',
      },
    })

    return NextResponse.json(toProject(row), { status: 201 })
  } catch (error) {
    return serverErrorResponse(error)
  }
}
