import { PrismaClient } from '@prisma/client'

import { getDatabaseUrl, isDatabaseConfigured } from '@/lib/database-url'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  const url = getDatabaseUrl()
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    ...(url ? { datasources: { db: { url } } } : {}),
  })
}

export const prisma =
  globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export { isDatabaseConfigured }

/** Ferme la connexion Prisma (recommandé sur Vercel serverless après mutations). */
export async function disconnectDb(): Promise<void> {
  await prisma.$disconnect()
}
