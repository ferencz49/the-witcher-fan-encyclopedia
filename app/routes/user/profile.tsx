import type { Route } from "./+types/profile"
import { get_session_user } from "~/lib/session.server"
import { EditableText } from "~/components/editableText"
import { Separator } from "~/components/ui/separator"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"

export async function loader({ request }: Route.ActionArgs){
    
    try{
        return { user: await get_session_user(request) }
    } catch (error) {
        throw error
    }
}

export async function action(){

}

export default function profile({ loaderData }: Route.ComponentProps){
    const user = loaderData.user
    return(
        <div className="flex flex-col flex-1 items-center justify-center bg-sky-200">
            <h1 className="text-3xl p-5">Profile</h1>    
            { user ?
                <div className="p-5 bg-stone-100 rounded-lg">
                    <label>Email</label>
                    <EditableText inputName="email" actionName="intent" actionValue="change_email" value={user.email} >{user.email}</EditableText>
                    <label>Username</label>
                    <EditableText inputName="username" actionName="intent" actionValue="change_username" value={user.username} >{user.username}</EditableText>
                    <Separator></Separator>
                    <label>Password</label>
                    <Input></Input>
                    <Button>Change password</Button>
                </div>
                : null
            } 
        </div>
    )
}