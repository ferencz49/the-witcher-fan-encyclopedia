//import { Route } from "./+types/submit_new_character"

import { Form } from "react-router";
import { Input } from "~/components/ui/input";
import { Button  } from "~/components/ui/button";

export default function submit_new_character(){
    return(
        <div className="flex flex-col flex-1 pl-20 pr-20 overflow-y-auto bg-black">
            <h1 className="flex justify-center text-2xl text-gray-300 font-RomanAntique">Submit a new character to the encyclopedia</h1>
            <Form>
                <p className="text-gray-300 font-RomanAntique">Name : </p>
                <Input></Input>
                <p className="text-gray-300 font-RomanAntique">Nickname : </p>
                <Input></Input>
                <p className="text-gray-300 font-RomanAntique">Race : </p>
                <Input></Input>
                <p className="text-gray-300 font-RomanAntique">Gender : </p>
                <Input ></Input>
                <p className="text-gray-300 font-RomanAntique">Profession : </p>
                <Input ></Input>
                <p className="text-gray-300 font-RomanAntique">Description : </p>
                <Input></Input>
                <Button size="sm" className="flex justify-center hover:border-gray-300 text-gray-300 font-RomanAntique">Submit</Button>
            </Form>
        </div>
    )
}