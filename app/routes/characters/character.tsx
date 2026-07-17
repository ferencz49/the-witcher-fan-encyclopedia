/**
* Imports
************************************/
import type { Route } from "../characters/+types/character";
import { get_character } from "~/models/character.server";
import { Separator } from "~/components/ui/separator";
import { Button } from "@base-ui/react/button";
import { useNavigate } from "react-router";

/**
* Loader
************************************/

export async function loader({ params } : Route.LoaderArgs){
    const character = await get_character(Number(params.character_id))

    if(!character){
        throw new Response("List not found", { status: 404 });
    }
    
    return { character : character}
}

export function ErrorBoundary(){
let navigate = useNavigate();
  return (
    <div className="m-auto space-y-4">
      <h1 className="text-3xl text-center">This character doesn't exist</h1>
      <Button className="w-full" onClick={() => navigate(-1)}>Back</Button>
    </div>
  );
}


/**
* Template
************************************/

export default function character({ loaderData }: Route.ComponentProps){
    const character = loaderData.character
    return(
        <div>    
                <div className="pl-20">
                    <h1 className="text-3xl pt-4 pb-4">Name : { character.name }</h1>
                    <Separator/>
                    <h2 className="text-2xl pt-4 pb-4">Profession : { character.profession }</h2>
                    <Separator/>
                    <h2 className="text-2xl pt-4 pb-4">Race : { character.race }</h2>
                    <Separator/>                    
                    <h2 className="text-2xl pt-4 pb-4">Gender : { character.gender }</h2>
                    <Separator/>     
                    <h2 className="text-2xl pt-4 pb-4">Description : { character.description }</h2>
                    <Separator/>                                   
                </div> 
        </div>
    )
}