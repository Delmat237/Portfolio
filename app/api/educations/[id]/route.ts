import { NextRequest, NextResponse } from 'next/server'

import {
  badRequestResponse,
  notFoundResponse,
  parseIdParam,
  requireAdmin,
  serverErrorResponse,
} from '@/lib/api-utils'
import { prisma } from '@/lib/db'
import { toEducation } from '@/lib/mappers'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(_request: NextRequest, context: RouteContext) {
  const { id: rawId } = await context.params
  const id = parseIdParam(rawId)
  if (!id) return badRequestResponse('ID invalide')

  try {
    const row = await prisma.education.findUnique({ where: { id } })
    if (!row) return notFoundResponse()
    return NextResponse.json(toEducation(row))
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
      institution: string
      location: string
      period: string
      description: string
      status: string
      grade: string
      skills: string[]
    }>

    const existing = await prisma.education.findUnique({ where: { id } })
    if (!existing) return notFoundResponse()

    const row = await prisma.education.update({
      where: { id },
      data: {
        title: body.title ?? existing.title,
        institution: body.institution ?? existing.institution,
        location: body.location ?? existing.location,
        period: body.period ?? existing.period,
        description: body.description ?? existing.description,
        status: body.status ?? existing.status,
        grade: body.grade ?? existing.grade,
        skills: body.skills ?? existing.skills,
      },
    })

    return NextResponse.json(toEducation(row))
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
    const existing = await prisma.education.findUnique({ where: { id } })
    if (!existing) return notFoundResponse()

    await prisma.education.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return serverErrorResponse(error)
  }
}
