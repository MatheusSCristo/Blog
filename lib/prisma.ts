import { PrismaClient } from '@prisma/client';
import { PrismaClientExtends } from '@prisma/client/scripts/default-index.js';
import { withAccelerate } from '@prisma/extension-accelerate'

let prisma:PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  let globalWithPrisma = global as typeof globalThis & {
    prisma:PrismaClient;
  };
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient();
  }
  prisma = globalWithPrisma.prisma;
}

export default prisma;