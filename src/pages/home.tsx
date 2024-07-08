import { useEffect, useState } from "react";
import { Button, Navbar } from "flowbite-react";

import Nav from "../components/navbar";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [isblibliotecario, setIsblibliotecario] = useState(false)
    const [logado, setLogado] = useState(true)
    let nome = localStorage.getItem("nomeuser")
    const navigate = useNavigate()
    useEffect(() => {
      if(localStorage.getItem("nomeuser") == null){
        setLogado(false)
      }else{
        setLogado(true)
      }
    });
    
    function deletar(){
      localStorage.removeItem("nomeuser");
      navigate("/")
    }
    
    return (
        <>
          <Nav/>
        </>
      
    )
}