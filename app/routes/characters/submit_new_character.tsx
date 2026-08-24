//import { Route } from "./+types/submit_new_character"

import { Form } from "react-router";
import { Input } from "~/components/ui/input";
import { Button  } from "~/components/ui/button";
import { Race } from "../../../generated/prisma/enums";
import { Gender } from "../../../generated/prisma/enums";

export async function loader(){
}

export default function submit_new_character(){
    return(
        <div className="flex flex-col flex-1 pl-20 pr-20 overflow-y-auto bg-black">
            <h1 className="flex justify-center text-2xl text-gray-300 font-RomanAntique">Submit a new character to the encyclopedia</h1>
            <Form>
                <p className="text-gray-300 font-RomanAntique">Name : </p>
                <Input className="mb-5 focus:ring ring-offset-1 text-gray-300"></Input>

                <p className="text-gray-300 font-RomanAntique">Nickname : </p>
                <Input className="mb-5 focus:ring ring-offset-1 text-gray-300"></Input>

                <p className="text-gray-300 font-RomanAntique">Race : </p>
                <select className="mb-5 focus:ring ring-offset-1 text-gray-300">
                    <option value={Race.DWARF}>Dwarf</option>
                    <option value={Race.ELF}>Elf</option>
                    <option value={Race.GNOME}>Gnome</option>
                    <option value={Race.HALFLING}>Halfling</option>
                    <option value={Race.HIGHER_VAMPIRE}>Higher vampire</option>
                    <option value={Race.HUMAN}>Human</option>
                    <option value={Race.NYMPH}>Nymph</option>
                    <option value={Race.UNKNOWN}>Unknown / Other</option>
                </select>

                <p className="text-gray-300 font-RomanAntique">Gender : </p>
                <select className="mb-5 focus:ring ring-offset-1 text-gray-300">
                    <option value={Gender.FEMALE}>Female</option>
                    <option value={Gender.MALE}>Male</option>
                    <option value={Gender.UNKNOWN}> Unknown / Other</option>
                </select>

                <p className="text-gray-300 font-RomanAntique">Profession : </p>
                <Input className="mb-5 focus:ring ring-offset-1 text-gray-300"></Input>

                <p className="text-gray-300 font-RomanAntique">Description : </p>
                <Input className="mb-5 focus:ring ring-offset-1 text-gray-300"></Input>

                <Button size="sm" className="flex align-center hover:border-gray-300 text-gray-300 font-RomanAntique">Submit</Button>
            </Form>
        </div>
    )
}