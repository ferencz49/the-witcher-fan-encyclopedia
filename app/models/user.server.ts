import { prisma } from "~/lib/prisma.server";
import { Prisma } from "../../generated/prisma/client";
import { assert, number, object, string, create } from 'superstruct'
import bcrypt from 'bcryptjs';


/**
* Create an account
*************************************/

const create_user_data = object({
    email: string(),
    username: string(),
    password: string()
})

export async function create_account(data: Record<string, FormDataEntryValue>){
    data.password = await bcrypt.hash(data.password.toString(), 12);
    const createData = create(data, create_user_data)
    assert(createData,create_user_data, 'Values not good')
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