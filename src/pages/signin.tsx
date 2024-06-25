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
  const [, setUsers] = useState<UserProps[]>([])
  const nomeRef = useRef<HTMLInputElement | null>(null)
  const matriculaRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const reptpasswordRef = useRef<HTMLInputElement | null>(null)
  const telefoneRef = useRef<HTMLInputElement | null>(null)

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

        const { user } = response.data;


        setUsers(allUsers => [...allUsers, user])

    } catch (error) {
        alert("Ocorreu um erro ao criar o usuário")
    }
}

  return (
    <main className="flex justify-center ite " >
      <form onSubmit={handleSubmit} className="flex">
      <div>
          <div className="mb-2 block ">
            <Label  value="Seu nome" />
          </div>
          <TextInput id="email2" type="text" ref={nomeRef} placeholder="name@flowbite.com" required shadow />
        </div>
        <div>
          <div className="mb-2 block ">
            <Label  value="Seu email" />
          </div>
          <TextInput id="email2" type="email" ref={emailRef} placeholder="name@flowbite.com" required shadow />
        </div>
        <div>
          <div className="mb-2 block">
            <Label  value="Sua matricula" />
          </div>
          <TextInput id="email2" type="text" ref={matriculaRef} placeholder="name@flowbite.com" required shadow />
        </div>
        <div>
          <div className="mb-2 block">
            <Label  value="Seu telefone" />
          </div>
          <TextInput id="email2" type="text" ref={telefoneRef} placeholder="name@flowbite.com" required shadow />
        </div>
        <div>
          <div className="mb-2 block">
            <Label  value="Sua senha" />
          </div>
          <TextInput id="password2" type="password" ref={passwordRef} required shadow />
        </div>
        <div>
          <div className="mb-2 block">
            <Label  value="Reescreva sua senha" />
          </div>
          <TextInput id="password2" type="password" ref={reptpasswordRef} required shadow />
        </div>
        
       
        <Button type="submit">Register new account</Button>
      </form>
    </main>
  )
}
export { Signin }