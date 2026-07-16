import { PrismaClient } from "../../generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL!,
});



let prisma: PrismaClient;

declare global {
  var prisma: PrismaClient;
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({adapter});
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({adapter});
  }
  prisma = global.prisma;
  prisma.$connect();
}

export { prisma };
