import { NextRequest, NextResponse } from 'next/server'

import {
  badRequestResponse,
  notFoundResponse,
  parseIdParam,
  requireAdmin,
  serverErrorResponse,
} from '@/lib/api-utils'
import { prisma } from '@/lib/db'
import { toCertification } from '@/lib/mappers'

type RouteContext = { params: Promise<{ id: string }> }

export async function PUT(request: NextRequest, context: RouteContext) {
  const authError = requireAdmin(request)
  if (authError) return authError

  const { id: rawId } = await context.params
  const id = parseIdParam(rawId)
  if (!id) return badRequestResponse('ID invalide')

  try {
    const body = (await request.json()) as Partial<{
      title: string
      source: string
      description: string
      image: string
      reference: string
      file: string
    }>

    const existing = await prisma.certification.findUnique({ where: { id } })
    if (!existing) return notFoundResponse()

    const row = await prisma.certification.update({
      where: { id },
      data: {
        title: body.title ?? existing.title,
        source: body.source ?? existing.source,
        description: body.description ?? existing.description,
        image: body.image ?? existing.image,
        reference: body.reference ?? existing.reference,
        file: body.file ?? existing.file,
      },
    })

    return NextResponse.json(toCertification(row))
  } catch (error) {
    return serverErrorResponse(error)
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const authError = requireAdmin(request)
  if (authError) return authError

  const { id: rawId } = await context.params
  const id = parseIdParam(rawId)
  if (!id) return badRequestResponse('ID invalide')

  try {
    const existing = await prisma.certification.findUnique({ where: { id } })
    if (!existing) return notFoundResponse()

    await prisma.certification.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return serverErrorResponse(error)
  }
}
