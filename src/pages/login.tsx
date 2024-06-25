import React, { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const logar = async (matricula: string, password:string) => {
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
      if(response == true){
        navigate('/')
      }
      else{
        alert("Matrícula ou senha incorretas")
      }
      } catch (error) {
        console.error('Erro ao se logar:', error);
      }
  };
  
  return (
    <div className='body'>
      <h1 className=''>Login Estudante</h1>
      <form>
        <label>
          Matrícula:
          <input
            type="number"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
          />
        </label>
        <label>
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleLogin}>
          Logar
        </button>
      </form>
    </div>
  );

}

export default Login;