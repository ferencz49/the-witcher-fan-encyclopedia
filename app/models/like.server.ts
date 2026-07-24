import { prisma } from "~/lib/prisma.server";

/**
* Add a like to a character
*************************************/

export async function add_like_to_character(characterId: number, userId: number){
    return await prisma.like.create({
        data: {
            characterId: characterId,
            userId: userId
        }
    })
}

/**
* Remove a like from a character
*************************************/

export async function remove_like_from_character(characterId: number, userId: number){
    return await prisma.like.delete({
        where:{
            characterId_userId: {
                characterId: characterId,
                userId: userId
            }
        }
    })
}

/**
* Has a user liked this character
*************************************/

export async function has_user_liked_this_character(characterId: number, userId: number){
    return await prisma.like.findUnique({
        where:{
            characterId_userId: {
                characterId: characterId,
                userId: userId
            }
        }
    })
}