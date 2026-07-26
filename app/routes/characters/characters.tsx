/**
* Imports
************************************/
import { Outlet } from "react-router"

import type { Route } from "./+types/characters"
import { get_characters_asc, get_characters_desc } from "~/models/character.server"

import { Button } from "~/components/ui/button"
import { NavLinkWithQuery } from "~/components/linkWithQuery"
import { Separator } from "~/components/ui/separator"
import { ArrowDownAZ, ArrowUpZA } from "lucide-react"
import { Form } from "react-router"

/**
* Loader
************************************/

export async function loader(){
    return { characters: await get_characters_asc()}
}

/**
* Action
************************************/

export async function action({ request }: Route.ActionArgs){
    const formData = await request.formData()
    const { intent } = Object.fromEntries(formData)

    if(intent === "get_characters_asc"){
        try{
            return { characters: await get_characters_asc() }
        } catch (error){
            if (error instanceof Error) { // si on a bien capturé une erreur
                return { error: error.message }; // on retourne (et pas throw) une réponse avec le message d'erreur
            } else {
                throw error; // sinon on laisse remonter l'erreur
            }
        }
    }

    if(intent === "get_characters_desc"){
        try{
            return { characters: await get_characters_desc() }
        } catch (error){
            if (error instanceof Error) { // si on a bien capturé une erreur
                return { error: error.message }; // on retourne (et pas throw) une réponse avec le message d'erreur
            } else {
                throw error; // sinon on laisse remonter l'erreur
            }
        }
    }
}

/**
* Template
************************************/

export default function characters({ loaderData, actionData } : Route.ComponentProps){
    const { characters } = actionData ? actionData : loaderData
    return(
        <>
            <div className="w-1/4 border-r-2 p-2 space-y-2 max-h-full overflow-y-auto bg-black">
                <div className="flex flex-row">
                    <h1 className="text-2xl text-gray-200 flex-1 font-RomanAntique">Characters</h1>
                    <Form method="post"><Button type="submit" name="intent" value="get_characters_asc"><ArrowDownAZ/></Button></Form>
                    <Form method="post"><Button type="submit" name="intent" value="get_characters_desc"><ArrowUpZA/></Button></Form>   
                </div>
                <Separator/>
                {
                    <ul>
                    {
                    characters ?characters.map((character) => ( 
                        <Button /*asChild*/ variant="link" size="sm" className="w-full justify-center hover:border-gray-300 text-gray-300 font-RomanAntique">
                            <NavLinkWithQuery children={character.name} to={"/characters/"+character.id}></NavLinkWithQuery>
                        </Button>

                    ))
                    : <p>No characters to display</p>
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