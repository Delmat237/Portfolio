import { NextRequest, NextResponse } from 'next/server'

import {
  badRequestResponse,
  notFoundResponse,
  parseIdParam,
  requireAdmin,
  serverErrorResponse,
} from '@/lib/api-utils'
import { prisma } from '@/lib/db'
import { toExperience } from '@/lib/mappers'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(_request: NextRequest, context: RouteContext) {
  const { id: rawId } = await context.params
  const id = parseIdParam(rawId)
  if (!id) return badRequestResponse('ID invalide')

  try {
    const row = await prisma.experience.findUnique({ where: { id } })
    if (!row) return notFoundResponse()
    return NextResponse.json(toExperience(row))
  } catch (error) {
    return serverErrorResponse(error)
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const authError = requireAdmin(request)
  if (authError) return authError

  const { id: rawId } = await context.params
  const id = parseIdParam(rawId)
  if (!id) return badRequestResponse('ID invalide')

  try {
    const body = (await request.json()) as Partial<{
      title: string
      company: string
      location: string
      period: string
      description: string[]
    }>

    const existing = await prisma.experience.findUnique({ where: { id } })
    if (!existing) return notFoundResponse()

    const row = await prisma.experience.update({
      where: { id },
      data: {
        title: body.title ?? existing.title,
        company: body.company ?? existing.company,
        location: body.location ?? existing.location,
        period: body.period ?? existing.period,
        description: body.description ?? existing.description,
      },
    })

    return NextResponse.json(toExperience(row))
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
    const existing = await prisma.experience.findUnique({ where: { id } })
    if (!existing) return notFoundResponse()

    await prisma.experience.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return serverErrorResponse(error)
  }
}
