/**
* Imports
************************************/
import type { Route } from "../characters/+types/character";
import { get_character } from "~/models/character.server";
import { Separator } from "~/components/ui/separator";
import { useNavigate, Form } from "react-router";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

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
                <div className="flex flex-col flex-1 pl-20">
                    <h1 className="text-3xl pt-4 pb-4">Name : { character.name }</h1>
                    <Separator/>
                    <h3 className="pt-4 pb-4">Nickname : { character.nickname }</h3>
                    <Separator/>
                    <h3 className="pt-4 pb-4">Profession : { character.profession }</h3>
                    <Separator/>
                    <h3 className="pt-4 pb-4">Race : { character.race }</h3>
                    <Separator/>                    
                    <h3 className="pt-4 pb-4">Gender : { character.gender }</h3>
                    <Separator/>     
                    <h3 className="pt-4 pb-4">Description : { character.description }</h3>
                    <Separator/>
                    <Form className="pt-20 pb-20" method="post">
                        <h2 className="text-2xl">Write a comment</h2>
                        <Input placeholder="title" name="title"></Input>
                        <Input placeholder="comment" name="text"></Input>
                        <Button type="submit" name="intent">Submit</Button>
                    </Form>     
                    <Separator/>
                    <h2 className="text-2xl">Comments</h2>
                </div> 
    )
}