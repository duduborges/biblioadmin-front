
import { Button, Navbar } from "flowbite-react";
import { useNavigate } from "react-router";
export default function Nav(){
    const navigate = useNavigate()
    return(
        <Navbar fluid rounded className='w-2/3 m-auto '>
        <Navbar.Brand >
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">BiblioAdmin</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <div className="flex md:order-2">
          <Button onClick={() => navigate("/login")} >Login</Button>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="#">Emprestimos</Navbar.Link>
          <Navbar.Link href="#">Alunos</Navbar.Link>
          <Navbar.Link href="#">Livros</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    )
}