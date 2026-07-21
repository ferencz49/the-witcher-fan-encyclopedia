/**
* Imports
************************************/
import type { Route } from "../characters/+types/character";
import { get_character } from "~/models/character.server";
import { Separator } from "~/components/ui/separator";
import { useNavigate, Form } from "react-router";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { get_session_user } from "~/lib/session.server";
import { create_comment } from "~/models/comment.server";

/**
* Loader
************************************/

export async function loader({ params, request } : Route.LoaderArgs){
    const character = await get_character(Number(params.character_id))

    if(!character){
        throw new Response("List not found", { status: 404 });
    }

    const user = await get_session_user(request) 
    
    if(!user){
        return { character : character, user: null}
    }
    return { character : character, user: user}
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

export async function action({ request }: Route.ActionArgs ){
    const formData = await request.formData()
    const { intent, characterId, userId,...data} = Object.fromEntries(formData)
    console.log(data)
    if(intent === "create_comment"){
        try{
            await create_comment(data, Number(characterId), Number(userId))
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

export default function character({ loaderData, actionData }: Route.ComponentProps){
    const character = loaderData.character
    const user = loaderData.user
    return(
                <div className="flex flex-col flex-1 pl-20 pr-20">
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
                    <Form className="flex flex-col pt-20 pb-20" method="post">
                        <h2 className="text-2xl">Write a comment</h2>
                        <Input type="hidden" name="characterId" value={Number(character.id)}></Input>
                        <Input type="hidden" name="userId" value={Number(user?.id)}></Input>
                        <Input placeholder="title" name="title"></Input>
                        <textarea placeholder="text" name="text"></textarea>
                        {
                            user ?
                            <Button type="submit" name="intent" value="create_comment">Submit</Button> :
                            <label>To post a comment, please <Button variant="ghost"><a href="/signin">signin</a></Button></label>
                        }
                    </Form>
                    {actionData?.error ? (
                        <p className="text-red-500 text-sm">{actionData.error}</p>
                    ) : null}     
                    <Separator/>
                    <h2 className="text-2xl">Comments</h2>
                </div> 
    )
}