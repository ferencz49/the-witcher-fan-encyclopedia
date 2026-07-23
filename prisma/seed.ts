import { PrismaClient } from "../generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL || "",
});

const prisma = new PrismaClient({ adapter });

async function main() {
    await prisma.character.deleteMany()
    await prisma.comment.deleteMany()

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

      await prisma.character.create({
        data:{
            name:"Ciri",
            nickname: ".",
            profession: "witcher",
            description: "Ciri is the main character of The Witcher."
        }
    })

    await prisma.character.create({
      data:{
        name: "Yarpen Zigrin",
        nickname:"",
        profession: "",
        description: ""
      }
    })

    await prisma.character.create({
      data:{
        name: "Milva",
        nickname:"",
        profession: "",
        description: ""
      }
    })

    await prisma.character.create({
      data:{
        name: "Emhyr var Emreis",
        nickname:"",
        profession: "",
        description: ""
      }
    })

    await prisma.character.create({
      data:{
        name: "Cahir Mawr Dyffryn aep Ceallach",
        nickname:"",
        profession: "",
        description: ""
      }
    })

    await prisma.character.create({
      data:{
        name: "Sabrina Glevissig",
        nickname:"",
        profession: "",
        description: ""
      }
    })   
    
    await prisma.character.create({
      data:{
        name: "Vesemir",
        nickname:"",
        profession: "",
        description: ""
      }
    })    

    await prisma.character.create({
      data:{
        name: "Lambert",
        nickname:"",
        profession: "",
        description: ""
      }
    })    

    await prisma.character.create({
      data:{
        name: "Eskel",
        nickname:"",
        profession: "",
        description: ""
      }
    })    

    await prisma.character.create({
      data:{
        name: "Istredd",
        nickname:"",
        profession: "",
        description: ""
      }
    })    

    await prisma.character.create({
      data:{
        name: "Emiel Regis Rohellec Terzieff-Godefroy",
        nickname:"",
        profession: "",
        description: ""
      }
    })    

    await prisma.character.create({
      data:{
        name: "Mousesack",
        nickname:"",
        profession: "",
        description: ""
      }
    })  

    await prisma.character.create({
      data:{
        name: "Leo Bonhart",
        nickname:"",
        profession: "",
        description: ""
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