/**
* Imports
************************************/
import { Outlet } from "react-router"

import type { Route } from "./+types/characters"
import { get_characters_asc } from "~/models/character.server"

import { Button } from "~/components/ui/button"
import { NavLinkWithQuery } from "~/components/linkWithQuery"
import { Separator } from "~/components/ui/separator"

/**
* Loader
************************************/

export async function loader(){
    return { characters: await get_characters_asc()}
}

/**
* Template
************************************/

export default function characters({ loaderData } : Route.ComponentProps){
    const { characters } = loaderData
    return(
        <>
            <div className="w-1/4 border-r-2 p-2 space-y-2 max-h-full overflow-y-auto">
                <h1 className="text-2xl">Characters</h1>
                <Separator/>
                {
                    <ul>
                    {
                    characters.map((character) => ( 
                        <Button /*asChild*/ variant="link" size="sm" className="w-full justify-start hover:bg-slate-200">
                            <NavLinkWithQuery children={character.name} to={"/characters/"+character.id}></NavLinkWithQuery>
                        </Button>

                    ))
                    }
                    </ul>
                }
            </div>
                <div className="flex-1 flex max-h-full overflow-y-auto">
                <Outlet />
            </div>
        </>
    )
}