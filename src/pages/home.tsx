/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Button, Navbar } from "flowbite-react";

import Nav from "../components/navbar";
import { useNavigate } from "react-router-dom";
import { funcao } from "../functio";

export default function Home() {
  const [logado, setLogado] = useState(true)
  const navigate = useNavigate()


  funcao()


  return (
    <>

      <Nav />

      <main className="h-[90vh] w-full  flex flex-col justify-center items-center ">
        <section>
          <h1 className="text-red-600 font-bold text-6xl">Bem vindo a biblioteca!</h1>
        </section>
      </main>

    </>

  )
}