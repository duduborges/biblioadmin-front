import { useEffect, useState } from "react";
import Nav from "../components/navbar";
import axios from "axios";
import { Table } from "flowbite-react";

interface emprestimoProps {
    livro: {
        titulo: string,
        autor: string,
        editora: string,
        ano: string,
        idLivro: number
    },
    estudante: {
        nome: string,
        matricula: number,
        email: string,
        telefone: string,
        senha: string,
        isBiblio: boolean,
        idEstudante: number
    }
    dataEmprestimo: string,
    dataEntrega: string,
    devolucao: string,
    idEmprestimo: number
}

export default function GerenciarEmprestimo() {
    const [emprestimo, setEmprestimo] = useState<emprestimoProps | null>(null);
    const IdEmprestimo = localStorage.getItem("idUser")

    const fetchLivros = async () => {
        try {
            const response = await axios.get(`http://localhost:8010/biblio/emprestimo/id/${IdEmprestimo}`);
            setEmprestimo(response.data);
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
            <Nav />

            <div className="w-11/12 m-auto pt-3 ">

                <Table className="" >
                    <Table.Head className="bg-cyan-200">
                        <Table.HeadCell>Livro</Table.HeadCell>
                        <Table.HeadCell>Data do emprestimo</Table.HeadCell>
                        <Table.HeadCell>Data de entrega</Table.HeadCell>
                        <Table.HeadCell>Devolução</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {emprestimo && (
                            <Table.Row className="bg-cyan-200 dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {emprestimo.livro.titulo}
                                </Table.Cell>
                                <Table.Cell>{emprestimo.dataEmprestimo}</Table.Cell>
                                <Table.Cell>{emprestimo.dataEntrega}</Table.Cell>
                                <Table.Cell>{emprestimo.devolucao}</Table.Cell>
                                <Table.Cell>
                                    <a href="" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                        Edit
                                    </a>
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </div>
        </>
    )
}
