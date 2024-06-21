import { Button, Navbar } from 'flowbite-react'
import './App.css'

function App() {

  return (
    <>
    <div>
      <h1 className='color-red'>SISTEMA BIBLIOTECA</h1>
      <a className='tituloLogin'>Login</a>
      <a>Usuário</a>
      <div className='inputsLogin'>
        <input type="text" className='inputUsuario'/>
        <a>Senha</a>
        <input type="text" className='inputSenha'/>
      </div>
    </div>
    </>
  )
}

export default App
