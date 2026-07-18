import { Form, redirect } from "react-router";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import  type { Route } from "./+types/signup";
import { signin_user } from "~/models/user.server";
import { create_session } from "~/lib/session.server";

export async function action({ request }: Route.ActionArgs){
    const formData = await request.formData()

    let { intent, ...data } =  Object.fromEntries(formData);

    if(intent === "signin"){
        try{
            const user = await signin_user(data)

            if(!user){
                throw new Error("Email or password incorrect")
            }

            return create_session(request, user.id, "/")

        } catch (error){
            if (error instanceof Error) { // si on a bien capturé une erreur
                return { error: error.message }; // on retourne (et pas throw) une réponse avec le message d'erreur
            } else {
                throw error; // sinon on laisse remonter l'erreur
            }
        }
    }
}

export default function signin({ actionData }: Route.ComponentProps){
    return(
        <div className="flex flex-col flex-1 items-center justify-center bg-sky-200">
            <h1 className="text-3xl p-5">Signin</h1>
            <Form className="p-5 bg-stone-100 rounded-lg" method="post">
                <label>Your email</label>
                <Input name="email"></Input>
                <label>Your password</label>
                <Input name="password" type="password"></Input>
                <Button name="intent" value="signin" type="submit">Submit</Button>
            </Form>
            {actionData?.error ? ( /*Ici j'avais un gros bug qui disait que error n'était pas défini dans actionData et il a disparu quand j'ai ajouté un redirect ?????? */
                <p className="text-red-500 text-sm">{actionData.error}</p>
            ) : null}
            <p className="p-5">Don't have an account? <a href="/signup"><Button variant="ghost">Click here</Button></a></p>
        </div>
    )
}