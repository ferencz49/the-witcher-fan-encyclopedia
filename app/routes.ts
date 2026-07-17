import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/about", "./routes/about.tsx"),
    route("/characters", "./routes/characters/characters.tsx",[
        index("./routes/characters/character.index.tsx"),
        route(":character_id", "./routes/characters/character.tsx")
    ]),
    route("/signup", "./routes/auth/signup.tsx")
] satisfies RouteConfig;
