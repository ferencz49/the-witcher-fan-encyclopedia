import type { Route } from "./+types/signout";
import { delete_session } from "~/lib/session.server"; 

export async function loader({ request }: Route.LoaderArgs){
    return await delete_session(request, "/signin")
}