import { prisma } from "~/lib/prisma.server";
import { assert, number, object, string } from 'superstruct'

/**
* Create an account
*************************************/

const create_user_data = object({
    email: string(),
    username: string(),
    password: string()
})

export async function create_account(data: Record<string, FormDataEntryValue>){
    assert(data,create_user_data, 'Values not good')
    return await prisma.user.create({
        data
    })
}