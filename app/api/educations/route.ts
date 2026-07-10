import { NextRequest, NextResponse } from 'next/server'

import {
  badRequestResponse,
  requireAdmin,
  serverErrorResponse,
} from '@/lib/api-utils'
import { getEducations } from '@/lib/data-service'
import { prisma } from '@/lib/db'
import { toEducation } from '@/lib/mappers'

export async function GET() {
  try {
    const educations = await getEducations()
    return NextResponse.json(educations)
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
      institution?: string
      location?: string
      period?: string
      description?: string
      status?: string
      grade?: string
      skills?: string[]
    }

    if (!body.title || !body.institution || !body.period || !body.status) {
      return badRequestResponse('Champs obligatoires manquants')
    }

    const row = await prisma.education.create({
      data: {
        title: body.title,
        institution: body.institution,
        location: body.location ?? '',
        period: body.period,
        description: body.description ?? '',
        status: body.status,
        grade: body.grade ?? '',
        skills: body.skills ?? [],
      },
    })

    return NextResponse.json(toEducation(row), { status: 201 })
  } catch (error) {
    return serverErrorResponse(error)
  }
}
