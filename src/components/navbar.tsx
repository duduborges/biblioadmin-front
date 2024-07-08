
import { Button, Navbar } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
export default function Nav(){
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
  
  function deletar(){
    localStorage.removeItem("nomeuser");
    navigate("/")
  }
    

    return(
      <>
      
      {isblibliotecario? (
          <>
          <Navbar fluid rounded className='w-2/3 m-auto '>
      <Navbar.Brand >
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">BiblioAdmin</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <div className="flex md:order-2">
      {logado ? (
          <>
            <span className="mx-4 self-center whitespace-nowrap text-sm font-semibold dark:text-white">Bem vindo {nome}</span>
            <button className="py-2 px-5 font- rounded-lg text-white font-bold bg-red-600 hover:bg-red-400" onClick={deletar} >Sair</button>
          </>
          ) : (
            <>
            <button className="py-2 px-5 font- rounded-lg hover:text-white font-bold hover:scale-110 hover:transition-all bg-green-400 text-black" onClick={() => navigate("/login")} >Login</button>
          </>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/gerenciarEmprestimo">Emprestimos</Navbar.Link>
        <Navbar.Link href="/aluno">Alunos</Navbar.Link>
        <Navbar.Link href="/livro">Livros</Navbar.Link>
        <Navbar.Link href="/cadastroLivro">Cadastrar Livros</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
          </>
      ) :(
          <>
           <Navbar fluid rounded className='w-2/3 m-auto '>
      <Navbar.Brand >
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">BiblioAdmin</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <div className="flex md:order-2">
      {logado ? (
          <>
            <span className="mx-4 self-center whitespace-nowrap text-sm font-semibold dark:text-white">Bem vindo {nome}</span>
            <button className="py-2 px-5 font- rounded-lg text-white font-bold bg-red-600 hover:bg-red-400" onClick={deletar} >Sair</button>
          </>
          ) : (
            <>
            <button className="py-2 px-5 font- rounded-lg hover:text-white font-bold hover:scale-110 hover:transition-all bg-green-400 text-black" onClick={() => navigate("/login")} >Login</button>
          </>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
      <Navbar.Link href="/gerenciarEmprestimo">Emprestimo</Navbar.Link>
        <Navbar.Link href="/livro">Livros</Navbar.Link>
      </Navbar.Collapse>
   
   </Navbar>
    </>
    )
   
          }
          </>)

}