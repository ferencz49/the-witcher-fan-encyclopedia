/**
* Imports
*************************************/

// Route
import type { Route } from "./+types/signout";

// Libs 
import { delete_session } from "~/lib/session.server"; 

/**
* Loader
*************************************/

export async function loader({ request }: Route.LoaderArgs){
    return await delete_session(request, "/signin")
}