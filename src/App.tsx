import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/home"
import { Signin } from "./pages/signin"
import Login from "./pages/login"
import CadastroLivro from "./pages/livro/cadastroLivro"
import { Alunos } from "./pages/aluno/gerenciarAluno"
import MeusEmprestimos from "./pages/emprestimo/meusEmprestimos"
import { GerenciarEmprestimos } from "./pages/emprestimo/gerenciarEmprestimo"



const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signin',
    element: <Signin />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/meusEmprestimos',
    element: <MeusEmprestimos />
  },
  {
    path: '/cadastroLivro',
    element: <CadastroLivro />
  },
  {
    path: '/livro',
    element: <CadastroLivro />
  }, {
    path: '/aluno',
    element: <Alunos />
  },
  {
    path: '/gerenciarEmprestimo',
    element: <GerenciarEmprestimos />
  }
])

export { router }