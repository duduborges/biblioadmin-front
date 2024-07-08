import axios from "axios";
import { Table } from "flowbite-react"
import { useEffect, useState } from "react";
import Nav from "./components/navbar";

interface alunosProp {
    IdEstudante: number, 
    matricula: number,
    email: string,
    nome: string, 
    telefone: string
}

function Alunos() {
    const [aluno, setAluno] = useState<alunosProp[]>([]);
  

    const fetchLivros = async () => {
        try {
            const response = await axios.get(`http://localhost:8010/biblio/estudante`);
            setAluno(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Erro ao buscar emprestimos:', error);
        }
    };
    useEffect(() => {
        fetchLivros();
    }, []);
    return (
        <>
        <Nav/>
            <div className="w-11/12 m-auto pt-3 ">

                <Table className="" >
                    <Table.Head className="bg-cyan-200">
                        <Table.HeadCell>Matricula</Table.HeadCell>
                        <Table.HeadCell>Nome</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Telefone</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {aluno.map((alunos, index) => (
                            <Table.Row key={index} className="bg-cyan-200 dark:border-gray-700 dark:bg-gray-800">

                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {alunos.matricula}
                                </Table.Cell>
                                <Table.Cell>{alunos.nome}</Table.Cell>
                                <Table.Cell>{alunos.email}</Table.Cell>
                                <Table.Cell>{alunos.telefone}</Table.Cell>

                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </>
    )
}
export { Alunos }