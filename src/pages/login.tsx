import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate()
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    axios.post("http://localhost:8010/biblio/estudante/login", {matricula: matricula, senha: senha})
    .then(function (response) {
      let nome = response.data.nome
      localStorage.setItem("nomeuser", nome)
      localStorage.setItem("idUser", response.data.idEstudante)
      localStorage.setItem("isBiblio", response.data.isBiblio)
      navigate('/')
  })
  .catch(function (error) {
      console.log(error);
      alert("Usuario ou senha incorreto")
  });
    
  };

  return (
    <div className='varela-round-regular h-[100vh] flex justify-center items-center ' >
      <form onSubmit={handleLogin} className=' border-2 border-black p-8 rounded-xl'>
      <h1 className='text-center mb-10 '>Login Estudante</h1>
        <div className='flex flex-col'>
          <label className='inputMatricula'>
            Matrícula
          </label>
          <input
          required
          className='bg-gray-300 border-none rounded-lg border mb-8'
            type="number"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
          />
        </div>
        <div className='flex flex-col'>
          <label className='inputSenha'>
            Senha</label>
            <input
            
            className='bg-gray-300 border-none rounded-xl border'
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <div className='flex  justify-center mt-8'>
        <button className='botaoLogar border-none rounded-xl border p-2' type="button" onClick={handleLogin} >
          Logar
        </button>
        </div>
        <p className='mt-5'>
          Não possui cadastro?
          <a href='/signin' className='underline ml-2'>Cadastrar-se</a>
        </p>
      </form>
    </div>
  );

}

export default Login;