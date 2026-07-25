import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  NavLink,
  useRouteLoaderData
} from "react-router";

// UI
import { Button } from "./components/ui/button";
import { MessageCircleQuestionMark, PersonStanding, UserPlus, User, UserMinus, Star } from "lucide-react";

//IMG
import logo from './assets/witcher-logo.png'


import type { Route } from "./+types/root";
import "./app.css";

import { get_session_user } from "./lib/session.server";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader({ request }: Route.LoaderArgs){
  return await get_session_user(request)
}

export function Layout({ children }: { children: React.ReactNode }) {
  const loaderData = useRouteLoaderData("root")
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="h-screen flex flex-col">
          <nav className="flex flex-row bg-slate-600 text-white p-4 space-x-2">
          { /* liens de navigation */ }
          <div className="flex-1 mr-0"> {/* Left buttons */}
            <Button /*asChild*/ variant="link" className="text-secondary"><NavLink to=""><img src={logo} className="w-7" alt="" /></NavLink></Button>
            <Button /*asChild*/ variant="link" className="text-secondary"><NavLink to="/about"><MessageCircleQuestionMark className="mr-1 h-4 w-4" /> About this project</NavLink></Button>
            <Button /*asChild*/ variant="link" className="text-secondary"><NavLink to="/characters"><PersonStanding className="mr-1 h-4 w-4" /> Characters</NavLink></Button>
            <Button /*asChild*/ variant="link" className="text-secondary"><NavLink to="/most_liked_characters"><Star className="mr-1 h-4 w-4" /> Most liked characters</NavLink></Button>
          </div>
          <div> {/* Right buttons */}
            {loaderData ?
            <div>
              <Button /*asChild*/ variant="link" className="text-secondary"><NavLink to="/profile"><User className="mr-1 h-4 w-4" /> Profile</NavLink></Button>
              <Button /*asChild*/ variant="link" className="text-secondary"><NavLink to="/signout"><UserMinus className="mr-1 h-4 w-4" /> Signout</NavLink></Button>
            </div>
            :
              <div>
                <Button /*asChild*/ variant="link" className="text-secondary"><NavLink to="/signup"><UserPlus className="mr-1 h-4 w-4" /> Signup</NavLink></Button>
                <Button /*asChild*/ variant="link" className="text-secondary"><NavLink to="/signin"><User className="mr-1 h-4 w-4" /> Signin</NavLink></Button>
              </div>            
            }
              
          </div>
          </nav>
          <main className="flex-1 flex flex-row overflow-y-scroll">
            {children}
          </main>
          <footer className="bg-slate-500 text-white p-4 text-center">
            Made with love by a fan - 2026
          </footer>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
