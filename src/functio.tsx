import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function funcao (){
    const [isblibliotecario, setIsblibliotecario] = useState(false)
  const [logado, setLogado] = useState(true)
  const biblio = localStorage.getItem("isBiblio")
  let nome = localStorage.getItem("nomeuser")
  const navigate = useNavigate()
    useEffect(() => {
        if(biblio == "true"){
          setIsblibliotecario(true)
         }else{
          setIsblibliotecario(false)
         }
        if(localStorage.getItem("nomeuser") == null){
          setLogado(false)
        }else{
          setLogado(true)
        }
      });
}
export {funcao}