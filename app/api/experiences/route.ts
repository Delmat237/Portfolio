import { NextRequest, NextResponse } from 'next/server'

import {
  badRequestResponse,
  requireAdmin,
  runDb,
  serverErrorResponse,
} from '@/lib/api-utils'
import { getExperiences } from '@/lib/data-service'
import { prisma } from '@/lib/db'
import { toExperience } from '@/lib/mappers'

export async function GET() {
  try {
    const experiences = await getExperiences()
    return NextResponse.json(experiences)
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
      company?: string
      location?: string
      period?: string
      description?: string[]
    }

    if (!body.title || !body.company || !body.period) {
      return badRequestResponse('Champs obligatoires manquants')
    }

    const { title, company, period, location, description } = body

    const row = await runDb(() =>
      prisma.experience.create({
        data: {
          title,
          company,
          location: location ?? '',
          period,
          description: description ?? [],
        },
      })
    )

    return NextResponse.json(toExperience(row), { status: 201 })
  } catch (error) {
    return serverErrorResponse(error)
  }
}
