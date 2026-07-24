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

/**
* Get characters in reversed alphabetical order
***********************************************/

export async function get_characters_desc(){
    return await prisma.character.findMany({
        orderBy: {
            name: "desc"
        }
    })
}

/**
* Get one character
*************************************/

export async function get_character(characterId : number){
    return await prisma.character.findUnique({
        where: {
            id: characterId
        },
        include:{
            likes:true
        }
    })
}