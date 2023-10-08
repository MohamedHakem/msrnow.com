import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

function createPrisma() {
  return new PrismaClient().$extends(withAccelerate());
}
const globalForPrisma = global as unknown as { prisma: ReturnType<typeof createPrisma> };
const db = globalForPrisma.prisma || createPrisma();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

export { db };
