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

/**
* Order characters by likes (found how to do it here: https://www.prisma.io/docs/orm/reference/prisma-client-reference#sort-user-by-the-posts-count)
***********************************************/

export async function get_characters_by_most_liked(){
    return await prisma.character.findMany({
        orderBy: {
            likes:{
                _count: "desc"
            }
        },
        include:{
            likes: true
        }
    })
}