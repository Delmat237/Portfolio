import { NextRequest, NextResponse } from 'next/server'

import {
  badRequestResponse,
  notFoundResponse,
  parseIdParam,
  requireAdmin,
  serverErrorResponse,
} from '@/lib/api-utils'
import { prisma } from '@/lib/db'
import { toProject } from '@/lib/mappers'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(_request: NextRequest, context: RouteContext) {
  const { id: rawId } = await context.params
  const id = parseIdParam(rawId)
  if (!id) return badRequestResponse('ID invalide')

  try {
    const row = await prisma.project.findUnique({ where: { id } })
    if (!row) return notFoundResponse()
    return NextResponse.json(toProject(row))
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
    const body = (await request.json()) as {
      title?: string
      description?: string
      image?: string
      technologies?: string[]
      category?: string
      tag?: string
      github?: string
      status?: string
      demo?: string
    }

    const existing = await prisma.project.findUnique({ where: { id } })
    if (!existing) return notFoundResponse()

    const row = await prisma.project.update({
      where: { id },
      data: {
        title: body.title ?? existing.title,
        description: body.description ?? existing.description,
        image: body.image ?? existing.image,
        technologies: body.technologies ?? existing.technologies,
        category: body.category ?? existing.category,
        tag: body.tag === undefined ? existing.tag : body.tag || null,
        github: body.github ?? existing.github,
        status: body.status ?? existing.status,
        demo: body.demo ?? existing.demo,
      },
    })

    return NextResponse.json(toProject(row))
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
    const existing = await prisma.project.findUnique({ where: { id } })
    if (!existing) return notFoundResponse()

    await prisma.project.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return serverErrorResponse(error)
  }
}
