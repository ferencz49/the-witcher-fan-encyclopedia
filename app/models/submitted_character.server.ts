import { prisma } from "~/lib/prisma.server";
import { Prisma } from "../../generated/prisma/client";
import { assert, number, object, string, create, size, enums } from 'superstruct'
import { Race } from "../../generated/prisma/enums";
import { Gender } from "../../generated/prisma/enums";

const create_submitted_character_validation = object({
    name: string(),
    nickname: string(),
    race: enums(["HUMAN", "ELF", "GNOME", "DWARF", "HALFLING", "NYMPH", "HIGHER_VAMPIRE", "UNKNOWN"]),
    gender: enums(["MALE", "FEMALE", "UNKNOWN"]),
    profession: string(),
    description: string()
})

export async function create_submitted_character(data: Record<string, FormDataEntryValue>){
    const creation_data = create(data, create_submitted_character_validation)
    assert(creation_data, create_submitted_character_validation)
    await prisma.submittedCharacter.create({
        data: creation_data
    })
}