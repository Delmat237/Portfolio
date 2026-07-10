import { NextRequest, NextResponse } from 'next/server'

import {
  badRequestResponse,
  requireAdmin,
  serverErrorResponse,
} from '@/lib/api-utils'
import { getCompetitions } from '@/lib/data-service'
import { prisma } from '@/lib/db'
import { toCompetition } from '@/lib/mappers'

export async function GET() {
  try {
    const competitions = await getCompetitions()
    return NextResponse.json(competitions)
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
      position?: string
      description?: string
      date?: string
      team?: string
      technologies?: string[]
      link?: string
      image?: string
    }

    if (!body.title || !body.description || !body.image) {
      return badRequestResponse('Champs obligatoires manquants')
    }

    const row = await prisma.competition.create({
      data: {
        title: body.title,
        position: body.position ?? '',
        description: body.description,
        date: body.date ?? '',
        team: body.team ?? '',
        technologies: body.technologies ?? [],
        link: body.link ?? '#',
        image: body.image,
      },
    })

    return NextResponse.json(toCompetition(row), { status: 201 })
  } catch (error) {
    return serverErrorResponse(error)
  }
}
