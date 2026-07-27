/**
* Imports
************************************/

// React
import { useEffect } from "react";
import { useNavigate, Form } from "react-router";

// Route
import type { Route } from "../characters/+types/character";

// Models
import { get_character } from "~/models/character.server";
import { create_comment, get_comments } from "~/models/comment.server";
import { add_like_to_character, has_user_liked_this_character, remove_like_from_character } from "~/models/like.server";

// Lib
import { get_session_user } from "~/lib/session.server";

// Ui
import { Separator } from "~/components/ui/separator";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Toaster } from "~/components/ui/sonner";
import { toast } from "sonner";
import { MessageSquare, Star, StarCheck } from "lucide-react";

/**
* Loader
************************************/

export async function loader({ params, request } : Route.LoaderArgs){
    const character = await get_character(Number(params.character_id))

    if(!character){
        throw new Response("List not found", { status: 404 });
    }
    const comments = await get_comments(character.id)

    const user = await get_session_user(request) 
    // console.log(comments)
    
    if(!user){
        return { character : character, comments: comments , user: null, hasUserLiked: null}
    }

    const like = await has_user_liked_this_character(character.id, user.id)

    if(!like){
        return { character : character, comments: comments , user: user, hasUserLiked: false}
    }

    return { character : character, comments: comments , user: user, hasUserLiked: true}
}

/**
* ErrorBoundary
************************************/

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
* Action
************************************/

export async function action({ request }: Route.ActionArgs ){
    const formData = await request.formData()
    const { intent, characterId, userId,...data} = Object.fromEntries(formData)
    console.log(data)
    if(intent === "create_comment"){
        try{
            const comment = await create_comment(data, Number(characterId), Number(userId))
            return { comment : comment, like: null ,error: null}
        } catch (error){
            if (error instanceof Error) { // si on a bien capturé une erreur
                return { error: error.message }; // on retourne (et pas throw) une réponse avec le message d'erreur
            } else {
                throw error; // sinon on laisse remonter l'erreur
            }
        }
    } 

    if(intent === "add_like"){
        try{
            const like = await add_like_to_character(Number(characterId), Number(userId))
            return { comment : null, like: like, error: null}
        } catch (error){
            if (error instanceof Error) { // si on a bien capturé une erreur
                return { error: error.message }; // on retourne (et pas throw) une réponse avec le message d'erreur
            } else {
                throw error; // sinon on laisse remonter l'erreur
            }
        }
    }

    if(intent === "remove_like"){
        try{
            const like = await remove_like_from_character(Number(characterId), Number(userId))
            return { comment : null, like: like, error: null}
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
    const comments = loaderData.comments

    useEffect(() => {
        if (actionData?.comment) {
            toast("Comment created.");
        }
    }, [actionData]);
    
    return(
                <div className="flex flex-col flex-1 pl-20 pr-20 overflow-y-auto bg-black">
                    <Toaster></Toaster>
                    {/* Informations about the character */}
                    <div className="flex flex-row">
                        <h1 className="flex-1 text-3xl pt-4 pb-4 text-gray-300 font-RomanAntique">Name : { character.name }</h1>
                        <h3 className=" text-3xl pt-4 text-gray-300">{character.likes.length}</h3>
                        <Form method="post">
                            {
                                loaderData.hasUserLiked ? 
                                <div>
                                    <Input type="hidden" name="characterId" value={Number(character.id)}></Input>
                                    <Input type="hidden" name="userId" value={Number(user?.id)}></Input>
                                    <Button className="mt-4" type="submit" name="intent" value="remove_like"><StarCheck/></Button>
                                </div> 
                                :
                                <div>
                                    <Input type="hidden" name="characterId" value={Number(character.id)}></Input>
                                    <Input type="hidden" name="userId" value={Number(user?.id)}></Input>
                                    <Button className="mt-4" type="submit" name="intent" value="add_like"><Star/></Button> 
                                </div>
                            }

                        </Form>
                    </div>
                    <Separator/>
                    <h3 className="text-2xl pt-4 pb-4 text-gray-300 font-RomanAntique">Nickname : { character.nickname }</h3>
                    <Separator/>
                    <h3 className="text-2xl pt-4 pb-4 text-gray-300 font-RomanAntique">Profession : { character.profession }</h3>
                    <Separator/>
                    <h3 className="text-2xl pt-4 pb-4 text-gray-300 font-RomanAntique">Race : { character.race }</h3>
                    <Separator/>                    
                    <h3 className="text-2xl pt-4 pb-4 text-gray-300 font-RomanAntique">Gender : { character.gender }</h3>
                    <Separator/>     
                    <h3 className="text-2xl     pt-4 pb-4 text-gray-300 font-RomanAntique">Description : { character.description }</h3>
                    <Separator/>
                    {/* Write a comment form */}
                    <Form className="flex flex-col pt-20 pb-10" method="post">
                        <h2 className="text-2xl text-gray-300">Write a comment</h2>
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
                    {/* Comments for this character */}
                    <h2 className="text-2xl flex flex-row justify-between text-gray-300">Comments<MessageSquare/></h2>
                    <div>
                    {
                        comments && comments.length > 0 ? 
                        comments.map((comment) => (
                            <div className="mt-5 mb-5 p-2 bg-emerald-950 rounded-sm">
                                <div className="flex flex-row">
                                    <p className="font-semibold flex-1 text-gray-300">{comment.title}</p>
                                    <p className="pr-5 text-gray-300">{comment.user!.username}</p> {/* ici réflechir à comment faire pour retirer le ! */}
                                    <p className="text-gray-300">{comment.createdAt.toDateString()}</p>
                                </div>
                                <p className="text-gray-700">{comment.text}</p>
                            </div>
                        ))
                        : <p>No comments for this character</p>
                    }
                    </div>
                </div> 
    )
}