import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/home"
import { Signin } from "./pages/signin"
import Login from "./pages/login"
import Livro from "./pages/livro/livro"
import CadastroLivro from "./pages/livro/cadastroLivro"
import GerenciarEmprestimo from "./pages/gerenciarEmprestimo"
import { Alunos } from "./alunos"



const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path:'/signin',
    element: <Signin/>
  },
  {
    path:'/login',
    element: <Login/>
  },
  {
    path:'/gerenciarEmprestimo',
    element: <GerenciarEmprestimo/>
  },
  {
    path:'/cadastroLivro',
    element: <CadastroLivro/>
  },
  {
    path:'/livro',
    element: <Livro/>
  }, {
    path:'/aluno',
    element: <Alunos/>
  }
])

export { router }