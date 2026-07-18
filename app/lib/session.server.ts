import { createCookieSessionStorage, redirect } from "react-router";
import { get_user } from "~/models/user.server";

/**
* Data stored
*************************************/

type SessionData = {
  userId: number;
};


let { getSession, commitSession, destroySession } = createCookieSessionStorage<SessionData>({
  cookie: {
    name: "__session", // on peut choisir un autre nom ici si on veut
    secrets: [process.env.SESSION_SECRET as string], // servira à chiffrer les données dans le cookie
    maxAge: 60 * 60 * 24 * 30, // durée de vie du cookie en secondes (ici, 30 jours)
    httpOnly: true, // inaccessible en JavaScript côté client
    sameSite: "lax", // envoi du cookie par le navigateur uniquement pour les requêtes issues de la même origine (sauf requêtes GET "top-level")
    secure: true, // utilisable uniquement en HTTPS (ou localhost)
  },
});


/**
* Create session
*************************************/

export async function create_session(request : Request, userId: number, redirectTo: string){
    let session = await getSession(request.headers.get("Cookie"));

    session.set("userId", userId);

    return redirect(redirectTo, {
    headers: {
        "Set-Cookie": await commitSession(session),
    },
    });

}

/**
* Delete session
*************************************/


export async function delete_session(request: Request, redirectTo: string){
  const session = await getSession(request.headers.get("Cookie")) // ne pas oublier getSession est une fonction ASYNC

  return redirect(redirectTo, {
  headers: {
    "Set-Cookie": await destroySession(session),
  },
});

}


/**
* Get session user
*************************************/

export async function get_session_user(request: Request){
  const session = await getSession(request.headers.get("Cookie"))
  let userId = session.get("userId");

  if(!userId){
    return null
  }

  const user = await get_user(userId)

  if(!user){
    throw await delete_session(request, "/")
  }

  let  { password, ...userWithoutPassword  } = user

  return userWithoutPassword
}

