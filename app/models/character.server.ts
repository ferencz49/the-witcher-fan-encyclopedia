import { prisma } from "~/lib/prisma.server";

/**
* Get characters in alphabetical order
*************************************/

export async function get_characters_asc(){
    return await prisma.character.findMany({
        orderBy: {
            name: "asc"
        }
    })
}