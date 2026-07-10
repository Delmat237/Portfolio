import { NextRequest, NextResponse } from 'next/server'

import {
  badRequestResponse,
  requireAdmin,
  serverErrorResponse,
} from '@/lib/api-utils'
import { getAssociations } from '@/lib/data-service'
import { prisma } from '@/lib/db'
import { toAssociation } from '@/lib/mappers'

export async function GET() {
  try {
    const associations = await getAssociations()
    return NextResponse.json(associations)
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
      images?: string[]
      description?: string
      roles?: string[]
      duration?: string
      link?: string
    }

    if (!body.title || !body.description) {
      return badRequestResponse('Champs obligatoires manquants')
    }

    const row = await prisma.association.create({
      data: {
        title: body.title,
        images: body.images ?? [],
        description: body.description,
        roles: body.roles ?? [],
        duration: body.duration ?? null,
        link: body.link ?? null,
      },
    })

    return NextResponse.json(toAssociation(row), { status: 201 })
  } catch (error) {
    return serverErrorResponse(error)
  }
}
