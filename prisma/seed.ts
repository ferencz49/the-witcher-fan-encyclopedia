import { PrismaClient } from "../generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL || "",
});

const prisma = new PrismaClient({ adapter });

async function main() {
    await prisma.character.deleteMany()

    await prisma.character.create({
        data:{
            name:"Geralt",
            nickname: "Butcher of Blaviken",
            profession: "witcher",
            description: "Geralt is a witcher. He was trained by the school of the wolf."
        }
    })

    await prisma.character.create({
        data:{
            name:"Yennefer",
            nickname: "Yen",
            profession: "mage",
            description: "Yennefer is a powerful mage."
        }
    })
}

main()
  .catch((e) => {
    console.error("❌ Erreur pendant le seeding :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });