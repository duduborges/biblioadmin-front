import { useState, useEffect } from "react"
import axios from "axios"
import { Table } from "flowbite-react";
import Nav from "../../components/navbar";

interface LivroProps {
  id: number
  titulo: string,
  editora: string,
  autor: string,
  ano: string,
}

export default function Livro() {
  const [livro, setLivro] = useState<LivroProps[]>([]);
  const fetchLivros = async () => {
    try {
      const response = await axios.get('http://localhost:8010/biblio/livro');
      setLivro(response.data);
    } catch (error) {
      console.error('Erro ao buscar Livros:', error);
    }
  };
  useEffect(() => {
    fetchLivros();
  }, []);


  return (
    <>
      <Nav />
      <div className="w-11/12 m-auto pt-3 ">

        <Table className="" >
          <Table.Head className="bg-cyan-200">
            <Table.HeadCell>Título</Table.HeadCell>
            <Table.HeadCell>Autor</Table.HeadCell>
            <Table.HeadCell>Editora</Table.HeadCell>
            <Table.HeadCell>Ano</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {livro.map((livros, index) => (
              <Table.Row key={index} className="bg-cyan-200 dark:border-gray-700 dark:bg-gray-800">

                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {livros.titulo}
                </Table.Cell>
                <Table.Cell>{livros.autor}</Table.Cell>
                <Table.Cell>{livros.editora}</Table.Cell>
                <Table.Cell>{livros.ano}</Table.Cell>
                
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

    </>
  )
}