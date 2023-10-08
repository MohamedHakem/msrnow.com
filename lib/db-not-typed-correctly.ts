// import { PrismaClient } from '@prisma/client'; // for non-edge (server)
import { PrismaClient } from '@prisma/client/edge'; // for edge runtime (Vercel, etc)
import { withAccelerate } from '@prisma/extension-accelerate';

type PrismaClientWithAccelerate = PrismaClient & {
  $extends: (fn: (client: PrismaClient) => void) => void;
};
declare global {
  var prisma: PrismaClientWithAccelerate;
}

export const db = globalThis.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db; // in dev mode
