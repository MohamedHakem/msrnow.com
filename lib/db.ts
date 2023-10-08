import { PrismaClient } from '@prisma/client'; // non-edge runtime
// import { PrismaClient } from '@prisma/client/edge'; // edge runtime
// import { withAccelerate } from '@prisma/extension-accelerate'; // edge runtime

// function createPrisma() {
//   return new PrismaClient().$extends(withAccelerate());
// }
// const globalForPrisma = global as unknown as { prisma: ReturnType<typeof createPrisma> };
// const db = globalForPrisma.prisma || createPrisma();
// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

// export { db };

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;
