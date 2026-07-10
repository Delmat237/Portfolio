import { NextRequest, NextResponse } from 'next/server'

import {
  badRequestResponse,
  notFoundResponse,
  parseIdParam,
  requireAdmin,
  serverErrorResponse,
} from '@/lib/api-utils'
import { prisma } from '@/lib/db'
import { toCompetition } from '@/lib/mappers'

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
      position: string
      description: string
      date: string
      team: string
      technologies: string[]
      link: string
      image: string
    }>

    const existing = await prisma.competition.findUnique({ where: { id } })
    if (!existing) return notFoundResponse()

    const row = await prisma.competition.update({
      where: { id },
      data: {
        title: body.title ?? existing.title,
        position: body.position ?? existing.position,
        description: body.description ?? existing.description,
        date: body.date ?? existing.date,
        team: body.team ?? existing.team,
        technologies: body.technologies ?? existing.technologies,
        link: body.link ?? existing.link,
        image: body.image ?? existing.image,
      },
    })

    return NextResponse.json(toCompetition(row))
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
    const existing = await prisma.competition.findUnique({ where: { id } })
    if (!existing) return notFoundResponse()

    await prisma.competition.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return serverErrorResponse(error)
  }
}
