import { prisma } from "~/lib/prisma.server";

export async function get_characters(){
    return await prisma.character.findMany()
}