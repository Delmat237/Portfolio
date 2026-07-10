import { NextRequest, NextResponse } from 'next/server'

import {
  badRequestResponse,
  requireAdmin,
  serverErrorResponse,
} from '@/lib/api-utils'
import { getCertifications } from '@/lib/data-service'
import { prisma } from '@/lib/db'
import { toCertification } from '@/lib/mappers'

export async function GET() {
  try {
    const certifications = await getCertifications()
    return NextResponse.json(certifications)
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
      source?: string
      description?: string
      image?: string
      reference?: string
      file?: string
    }

    if (!body.title || !body.description || !body.image) {
      return badRequestResponse('Champs obligatoires manquants')
    }

    const row = await prisma.certification.create({
      data: {
        title: body.title,
        source: body.source ?? '',
        description: body.description,
        image: body.image,
        reference: body.reference ?? '#',
        file: body.file ?? '#',
      },
    })

    return NextResponse.json(toCertification(row), { status: 201 })
  } catch (error) {
    return serverErrorResponse(error)
  }
}
