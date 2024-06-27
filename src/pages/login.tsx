import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const logar = async (matricula: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:8010/biblio/estudante/login', {
      matricula: matricula,
      password: password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
function Login() {
  const navigate = useNavigate()
  const [matricula, setMatricula] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await logar(matricula, password);
      if (response == true) {
        navigate('/')
      }
      else {
        alert("Matrícula ou senha incorretas")
      }
    } catch (error) {
      console.error('Erro ao se logar:', error);
    }
  };

  return (
    <div className='varela-round-regular h-[100vh] flex justify-center items-center ' >
      <form className=' border-2 border-black p-8 rounded-xl'>
      <h1 className='text-center mb-10 '>Login Estudante</h1>
        <div className='flex flex-col'>
          <label className='inputMatricula'>
            Matrícula
          </label>
          <input
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='flex  justify-center mt-8'>
        <button className='botaoLogar' type="button" onClick={handleLogin} >
          Logar
        </button>
        </div>
        <p className='mt-5'>
          Não possui cadastro?
          <a href='/signin' className='underline'>Te cadastra ai nego</a>
        </p>
      </form>
    </div>
  );

}

export default Login;