/**
* Beginnings are such delicate times
************************************/

/**
* Imports
************************************/

import type { Route } from "./+types/home";
import logo from '../assets/witcher-logo.png'
import { TriangleAlert } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Witcher fan encyclopedia" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

/**
* Template
************************************/

export default function Home() {
  return (
    // <div className="flex flex-col flex-1 items-center justify-center">
    //   <h1 className="text-4xl">Welcome on this fan-made The Witcher encyclopedia</h1>
    //   <h2 className="text-2xl">This website is a personal project made by Ferencz Roudet Abraham</h2>
    //   <h3 className="">For more informations about this project click on the link in the footer of the website</h3>
    //   <img src={logo} className="w-40"></img>    
    // </div>

    <div className="flex flex-col flex-1 items-center justify-center bg-black">
      <h1 className="flex text-4xl font-Dragon text-gray-300">ABCDEFGH</h1>
      <h1 className="flex pt-5 text-4xl font-RomanAntique text-gray-300">Witcher Fan Enyclopedia</h1>
      <h1 className="text-2xl text-gray-300">This website just go deployed, the development is in a very early stage.</h1>
    </div>
  );
}
