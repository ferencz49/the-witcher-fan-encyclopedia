import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import type { Route } from "./+types/signup"
import { create_account } from "~/models/user.server"
import { redirect, useNavigate } from "react-router"


/**
* Action
*************************************/

export async function action({ request }: Route.ActionArgs){
    const formData = await request.formData()

    let { intent, ...data } =  Object.fromEntries(formData);

    if(intent === "create_account"){
        try{
            await create_account(data)
            return redirect("/signin")
        } catch(error){
            if (error instanceof Error) { // si on a bien capturé une erreur
                return { error: error.message }; // on retourne (et pas throw) une réponse avec le message d'erreur
            } else {
                throw error; // sinon on laisse remonter l'erreur
            }
        }
    }
}


/**
* ErrorBoundary
*************************************/

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
*************************************/

export default function signup({ actionData }: Route.ComponentProps){
    return(
        <>
            <div className="flex flex-col flex-1 items-center justify-center bg-sky-200">
                <h1 className="text-3xl p-5">Signup</h1>
                <form className="p-5 bg-stone-100 rounded-lg" method="post">
                    <label>Your email</label>
                    <Input name="email" required placeholder="Butcher.of@blaviken.com - feel free to invent an email here ;)" type="email"></Input>
                    <label>Your username</label>
                    <Input name="username" required type="text" placeholder="Gwynbleidd"></Input>
                    <label>Your password</label>
                    <Input name="password" required type="password"></Input>
                    <Button type="submit" name="intent" value="create_account">Submit</Button>
                </form>
                  {actionData?.error ? ( /*Ici j'avais un gros bug qui disait que error n'était pas défini dans actionData et il a disparu quand j'ai ajouté un redirect ?????? */
                        <p className="text-red-500 text-sm">{actionData.error}</p>
                    ) : null}
                <p className="p-5">Already have an account? <a href="/signin"><Button variant="ghost">Click here</Button></a></p>
            </div>
        </>
    )
}