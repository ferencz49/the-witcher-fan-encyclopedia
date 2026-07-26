/**
* Imports
************************************/
import { get_characters_by_most_liked } from "~/models/character.server"
import type { Route } from "./+types/most_liked";
import { Star } from "lucide-react";
import { NavLinkWithQuery } from "~/components/linkWithQuery";

/**
* Loader
************************************/

export async function loader(){
    const characters = await get_characters_by_most_liked()

    if(!characters){
        throw new Response("Characters not found", { status: 404 });
    }

    return { characters: characters}
}


/**
* Template
************************************/

export default function most_liked_characters({ loaderData }: Route.ComponentProps){
    const characters = loaderData.characters
    return(
        <div className="flex flex-col flex-1 items-center justify-center-safe overflow-y-auto bg-black">
            <h1 className="">Most liked characters</h1>
            <ul className="p-5 bg-stone-100 rounded-lg">
            {
                characters.map((character, index) =>(
                    <li className="flex flex-row justify-between">
                        <p className="font-RomanAntique">{index + 1 + "."}</p>
                            <NavLinkWithQuery className="pl-2 flex-1 hover hover:bg-slate-200 font-RomanAntique" to={"/characters/" + character.id}>{character.name + " "}</NavLinkWithQuery>
                        <p className="pl-2 font-RomanAntique    ">{character.likes.length}</p>
                        <Star/>
                    </li>
                ))
            }
            </ul>
        </div>
    )
}