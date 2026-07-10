import { NextRequest, NextResponse } from 'next/server'

import {
  badRequestResponse,
  notFoundResponse,
  parseIdParam,
  requireAdmin,
  serverErrorResponse,
} from '@/lib/api-utils'
import { prisma } from '@/lib/db'
import { toAssociation } from '@/lib/mappers'

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
      images: string[]
      description: string
      roles: string[]
      duration: string
      link: string
    }>

    const existing = await prisma.association.findUnique({ where: { id } })
    if (!existing) return notFoundResponse()

    const row = await prisma.association.update({
      where: { id },
      data: {
        title: body.title ?? existing.title,
        images: body.images ?? existing.images,
        description: body.description ?? existing.description,
        roles: body.roles ?? existing.roles,
        duration: body.duration === undefined ? existing.duration : body.duration || null,
        link: body.link === undefined ? existing.link : body.link || null,
      },
    })

    return NextResponse.json(toAssociation(row))
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
    const existing = await prisma.association.findUnique({ where: { id } })
    if (!existing) return notFoundResponse()

    await prisma.association.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return serverErrorResponse(error)
  }
}
