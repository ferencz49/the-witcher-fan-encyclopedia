import { prisma } from "~/lib/prisma.server";
import { object, string, create, assert, number } from "superstruct";
import { Prisma } from "../../generated/prisma/client";

const commentCreationValidation = object({
    title: string(),
    text: string(),

}) 

export async function create_comment(data: Record<string, FormDataEntryValue>, characterId: number, userId: number){
    const commentCreationData = create(data, commentCreationValidation)
    assert(commentCreationData, commentCreationValidation, 'Data is not valid') 

    try{
        const comment = await prisma.comment.create({
            data:{
                title: commentCreationData.title,
                text: commentCreationData.text,
                characterId: characterId,
                userId: userId
            }
        })
        return comment
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            throw e
        }
    }
}

export async function get_comments(characterid: number){
    try {
        return await prisma.comment.findMany({
            where:{
                characterId: characterid
            }
        })
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            throw e
        }
    }
}