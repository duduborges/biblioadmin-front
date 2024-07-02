import { Button, Label, TextInput } from "flowbite-react";
import React, { useState, useEffect, useRef, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface UserProps{
  id: number,
  nome: string,
  matricula: string,
  email: string,
  telefone: string, 
}


function Signin() {
  const [users, setUsers] = useState<UserProps[]>([])
  const nomeRef = useRef<HTMLInputElement | null>(null)
  const matriculaRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const reptpasswordRef = useRef<HTMLInputElement | null>(null)
  const telefoneRef = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()
  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (!nomeRef.current?.value || !emailRef.current?.value || !passwordRef.current?.value) {
        alert("Preencha todos os campos")
        return
    }

    if (passwordRef.current?.value !== reptpasswordRef.current?.value) {
        alert("As senhas nao coincidem")
        return
    }

    try {
        const response = await axios.post("http://localhost:8010/biblio/estudante", {
            nome: nomeRef.current?.value,
            email: emailRef.current?.value,
            senha: passwordRef.current?.value,
            matricula: matriculaRef.current?.value,
            telefone: telefoneRef.current?.value,
        })
        alert("usuario criado com sucesso!")
         
        let nome = response.data.nome
        localStorage.setItem("nomeuser", nome)
        
        navigate("/")
    } catch (error) {
        alert("Ocorreu um erro ao criar o usuário")
    }
}

  return (
    <>
      <div className='varela-round-regular h-[100vh] flex justify-center items-center ' >
      <form  className=' border-2 border-black p-8 rounded-xl'>
      <h1 className='text-center mb-10 '>Cadastro Estudante</h1>
      <div className="flex flex-row">

      <div >
        <div className='flex flex-col'>
          <label className='inputMatricula'>
            Nome
          </label>
          <input
          ref={nomeRef}
          
          className='bg-gray-300 border-none rounded-lg border mb-8'
            type="text"
          />
        </div>
        <div className='flex flex-col'>
          <label className='inputSenha'>
            Matricula</label>
            <input
            ref={matriculaRef}
            className='bg-gray-300 border-none rounded-xl border mb-8'
            type="number"
          />
        </div>
        <div className='flex flex-col'>
          <label className='inputSenha'>
            E-mail</label>
            <input
             ref={emailRef}
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
             ref={telefoneRef}
            className='bg-gray-300 border-none rounded-xl border mb-8'
            type="text"
          />
        </div>
        <div className='flex flex-col'>
          <label className='inputSenha'>
            Senha</label>
            <input
             ref={passwordRef}
            className='bg-gray-300 border-none rounded-xl border mb-8'
            type="password"
          />
        </div>
        <div className='flex flex-col'>
          <label className='inputSenha'>
            Repetir senha</label>
            <input
             ref={reptpasswordRef}
            className='bg-gray-300 border-none rounded-xl border'
            type="password"
          />
        </div>
        </div>
      </div>

        <div className='flex  justify-center mt-8'>
        <button onClick={handleSubmit} className='botaoLogar p-2 border-none rounded-xl border' type="button" >
          Cadastrar
        </button>
        </div>
        <p className='mt-5 flex  justify-center'>
          Já possui uma conta?
          <a href='/login' className='ml-2 underline'> Faça login</a>
        </p>
      </form>
    </div>
    </>
  )
}
export { Signin }