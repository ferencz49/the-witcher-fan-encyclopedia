import type { Route } from "./+types/profile"
import { get_session_user } from "~/lib/session.server"
import { EditableText } from "~/components/editableText"
import { Separator } from "~/components/ui/separator"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { change_username, change_email, change_password } from "~/models/user.server"
import { Form } from "react-router"

export async function loader({ request }: Route.ActionArgs){
    try{
        return { user: await get_session_user(request) }
    } catch (error) {
        throw error
    }
}

export async function action({ request }: Route.ActionArgs){
    const formData = await request.formData()
    console.log(formData)

    let { intent, ...data} = Object.fromEntries(formData)

    if(intent === "change_username"){
        try{
            await change_username(data)
        } catch(error){
            if (error instanceof Error) { // si on a bien capturé une erreur
                return { error: error.message }; // on retourne (et pas throw) une réponse avec le message d'erreur
            } else {
                throw error; // sinon on laisse remonter l'erreur
            }
        }
        return null
    }

    if(intent === "change_email") {
        try{
            await change_email(data)
        } catch(error){
            if (error instanceof Error) { // si on a bien capturé une erreur
                return { error: error.message }; // on retourne (et pas throw) une réponse avec le message d'erreur
            } else {
                throw error; // sinon on laisse remonter l'erreur
            }
        }
        return null
    }

    if(intent === "change_password"){
            try{
            await change_password(data)
        } catch(error){
            if (error instanceof Error) { // si on a bien capturé une erreur
                return { error: error.message }; // on retourne (et pas throw) une réponse avec le message d'erreur
            } else {
                throw error; // sinon on laisse remonter l'erreur
            }
        }
        return null
    } 
}


export default function profile({ loaderData, actionData }: Route.ComponentProps){
    const user = loaderData.user
    return(
        <div className="flex flex-col flex-1 items-center justify-center bg-sky-200">
            <h1 className="text-3xl p-5">Profile</h1>    
            { user ?
                <div className="p-5 bg-stone-100 rounded-lg">
                    <label>Role : {user.role}</label>
                    <Separator></Separator>
                    <label>Email</label>
                    <EditableText inputName="email" actionName="intent" actionValue="change_email" value={user.email} hiddenValues={[{name: "userId", value: user.id.toString()}]}>{user.email}</EditableText>
                    <Separator></Separator>
                    <label>Username</label>
                    <EditableText inputName="username" actionName="intent" actionValue="change_username" value="" hiddenValues={[{name: "userId", value: user.id.toString()}]}>{user.username}</EditableText>
                    <Separator></Separator>
                    <Form method="post">
                        <label>Password</label>
                        <Input type="hidden" name="userId" value={user.id.toString()}></Input>
                        <Input placeholder="new password" name="password"></Input>
                        <Button type="submit" name="intent" value="change_password">Change password</Button>
                    </Form>
                    {actionData?.error ? (
                        <p className="text-red-500 text-sm">{actionData.error}</p>
                    ) : null}
                </div>
                : null
            } 
        </div>
    )
}