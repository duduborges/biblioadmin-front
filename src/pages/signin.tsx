/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Label, TextInput } from "flowbite-react";
import React, { useState, useEffect, useRef, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface UserProps {
  id: number,
  nome: string,
  matricula: string,
  email: string,
  telefone: string,
  isBiblio: boolean,
  senha: string
}


function Signin() {
  const [reptpasswordRef, setReptpasswordRef] = useState('')
  const [novoUser, setNovoUser] = useState({
    id: 0,
    nome: '',
    matricula: '',
    email: '',
    telefone: '',
    isBiblio: false,
    senha: ''
  })
  const navigate = useNavigate()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNovoUser((prevAluno) => ({
      ...prevAluno,
      [name]: value,
    }));
  };
  const senha = novoUser.senha
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (senha == reptpasswordRef) {
      alert("As senhas não coincidem!")
    }
    try {
      const response = await axios.post('http://189.8.205.53:8010/biblio/estudante', novoUser);
      const id = response.data
      const dadosUser = await axios.get(`http://189.8.205.53:8010/biblio/estudante/id/${id}`)
      localStorage.setItem("nomeuser", dadosUser.data.nome)
      localStorage.setItem("idUser", dadosUser.data.idEstudante)
      localStorage.setItem("isBiblio", dadosUser.data.isBiblio)
      navigate("/")
    } catch (error) {
      console.error('Erro ao salvar o estudante:', error);
    }
  };

  return (
    <>
      <div className='varela-round-regular h-[100vh] flex justify-center items-center ' >
        <form onSubmit={handleSubmit} className=' border-2 border-black p-8 rounded-xl'>
          <h1 className='text-center mb-10 '>Cadastro Estudante</h1>
          <div className="flex flex-row">

            <div >
              <div className='flex flex-col'>
                <label className='inputMatricula'>
                  Nome
                </label>
                <input
                  id="nome"
                  name="nome"
                  value={novoUser.nome}
                  onChange={handleInputChange}
                  className='bg-gray-300 border-none rounded-lg border mb-8'
                  type="text"
                />
              </div>
              <div className='flex flex-col'>
                <label className='inputSenha'>
                  Matricula</label>
                <input
                  id="matricula"
                  name="matricula"
                  value={novoUser.matricula}
                  onChange={handleInputChange}
                  className='bg-gray-300 border-none rounded-xl border mb-8'
                  type="number"
                />
              </div>
              <div className='flex flex-col'>
                <label className='inputSenha'>
                  E-mail</label>
                <input
                  id="email"
                  name="email"
                  value={novoUser.email}
                  onChange={handleInputChange}
                  className='bg-gray-300 border-none rounded-xl border mb-4'
                  type="text"
                />
              </div>
            </div>

            <div className="pl-12">
              <div className='flex flex-col'>
                <label className='inputSenha'>
                  Telefone</label>
                <input
                  id="telefone"
                  name="telefone"
                  value={novoUser.telefone}
                  onChange={handleInputChange}
                  className='bg-gray-300 border-none rounded-xl border mb-8'
                  type="text"
                />
              </div>
              <div className='flex flex-col'>
                <label className='inputSenha'>
                  Senha</label>
                <input
                  id="senha"
                  name="senha"
                  value={novoUser.senha}
                  onChange={handleInputChange}
                  className='bg-gray-300 border-none rounded-xl border mb-8'
                  type="password"
                />
              </div>
              <div className='flex flex-col'>
                <label className='inputSenha'>
                  Repetir senha</label>
                <input
                  id="reptsenha"
                  name="reptsenha"
                  value={reptpasswordRef}
                  onChange={(e) => setReptpasswordRef(e.target.value)}
                  className='bg-gray-300 border-none rounded-xl border'
                  type="password"
                />
              </div>
            </div>
          </div>

          <div className='flex  justify-center mt-8'>
            <button className='botaoLogar p-2 border-none rounded-xl border' type="submit" >
              Cadastrar
            </button>
          </div>
          <p className='mt-5 flex  justify-center'>
            Já possui uma conta?
            <a className='ml-2 underline'> Faça login</a>
          </p>
        </form>
      </div>
    </>
  )
}
export { Signin }