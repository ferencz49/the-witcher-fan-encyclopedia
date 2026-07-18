import { prisma } from "~/lib/prisma.server";
import { Prisma } from "../../generated/prisma/client";
import { assert, number, object, string, create } from 'superstruct'
import bcrypt from 'bcryptjs';
import { compare } from "bcryptjs";


/**
* Create an account
*************************************/

const create_user_validation = object({
    email: string(),
    username: string(),
    password: string()
})

export async function create_account(data: Record<string, FormDataEntryValue>){
    data.password = await bcrypt.hash(data.password.toString(), 12);
    const createData = create(data, create_user_validation)
    assert(createData,create_user_validation, 'Values not good')
    try{
        return await prisma.user.create({
            data:{ // si data n'accepte pas un paramètre qu'il devrait accepter, regenerer le client
                username: createData.username,
                email: createData.email,
                password: createData.password
            }
        })
    } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === "P2002") {
        console.log(
            "There is a unique constraint violation, a new user cannot be created with this email",
        );
        }
    }
    throw e;
    }
}

/**
* Signin
*************************************/

const signin_validation = object({
    email: string(),
    password: string()
})

export async function signin_user(data: Record<string, FormDataEntryValue>){
    const signinData = create(data, signin_validation)
    assert(signinData, signin_validation, 'Values not good')

    try{
        const user = await prisma.user.findUnique({
            where:{
                email: signinData.email
            }
        })

        if(!user){
            return null
        }

        const passwords_match = await bcrypt.compare(signinData.password, user.password)

        if(!passwords_match){
            return null
        }

        return user

    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            throw e
        }
    }

}