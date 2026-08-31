import type { Route } from "./+types/submit_new_character"

import { Form } from "react-router";
import { Input } from "~/components/ui/input";
import { Button  } from "~/components/ui/button";
import { Race } from "../../../generated/prisma/enums";
import { Gender } from "../../../generated/prisma/enums";

export async function loader(){
}

export async function action({ request }: Route.ActionArgs){
    const formData   = await request.formData()   
    const { intent, ...data } = Object.fromEntries(formData)
    console.log(data)
}

export default function submit_new_character(){
    return(
        <div className="flex flex-col flex-1 justify-center pl-20 pr-20 overflow-y-auto bg-black">
            <h1 className="flex justify-center text-3xl  font-RomanAntique text-gray-300">Submit a new character to the encyclopedia</h1>
            <Form method="POST" className="p-5 bg-stone-100 rounded-lg">
                <p className=" font-RomanAntique">Name : </p>
                <Input className="mb-5" name="name"></Input>

                <p className=" font-RomanAntique">Nickname : </p>
                <Input className="mb-5" name="nickname"></Input>

                <p className=" font-RomanAntique">Race : </p>
                <select className="mb-5" name="race">
                    <option value={Race.DWARF}>Dwarf</option>
                    <option value={Race.ELF}>Elf</option>
                    <option value={Race.GNOME}>Gnome</option>
                    <option value={Race.HALFLING}>Halfling</option>
                    <option value={Race.HIGHER_VAMPIRE}>Higher vampire</option>
                    <option value={Race.HUMAN}>Human</option>
                    <option value={Race.NYMPH}>Nymph</option>
                    <option value={Race.UNKNOWN}>Unknown / Other</option>
                </select>

                <p className=" font-RomanAntique">Gender : </p>
                <select className="mb-5" name="gender">
                    <option value={Gender.FEMALE}>Female</option>
                    <option value={Gender.MALE}>Male</option>
                    <option value={Gender.UNKNOWN}> Unknown / Other</option>
                </select>

                <p className=" font-RomanAntique">Profession : </p>
                <Input className="mb-5" name="profession"></Input>

                <p className=" font-RomanAntique">Description : </p>
                <Input className="mb-5" name="description"></Input>

                <Button type="submit" name="intent" value="create_submitted_character" size="sm" className="flex align-center hover:border-gray-300  font-RomanAntique">Submit</Button>
            </Form>
        </div>
    )
}