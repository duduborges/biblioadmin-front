/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { Button, Label, Spinner, Table, TextInput } from "flowbite-react"
import React, { useEffect, useState } from "react";
import Nav from "../../components/navbar";
import { Modal } from "flowbite-react";
import { IoTrashSharp } from "react-icons/io5";
import { ImPencil } from "react-icons/im";
import { Toast } from "flowbite-react";
import { HiX } from "react-icons/hi";
import { HiCheck } from "react-icons/hi2";

interface AlunoProps {
    idEstudante: number,
    matricula: number,
    email: string,
    isBiblio: boolean
    nome: string,
    telefone: string
    senha: string
}

function Alunos() {
    const [aluno, setAluno] = useState<AlunoProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [, setAdd] = useState(true);
    const [isDeleted, setIsDeleted] = useState(true);
    const [isUpdated, setIsUpdated] = useState(true);
    const [pagina, setPagina] = useState(1)
    const [novoAluno, setNovoAluno] = useState({
        idEstudante: 0,
        matricula: 0,
        email: '',
        isBiblio: false,
        nome: '',
        telefone: '',
        senha: ''
    });



    function onCloseModal() {
        setAdd(true);
        setOpenModal(false);
        setNovoAluno({
            idEstudante: 0,
            matricula: 0,
            email: '',
            isBiblio: false,
            nome: '',
            telefone: '',
            senha: ''
        });
    }


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNovoAluno((prevAluno) => ({
            ...prevAluno,
            [name]: value,
        }))
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {

            await axios.put(`http://189.8.205.53:8010/biblio/estudante`, novoAluno,);

            fetchAlunos();
            onCloseModal();
            setIsUpdated(false)
        } catch (error) {
            console.error('Erro ao salvar o estudante:', error);
        }

    }

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://189.8.205.53:8010/biblio/estudante/${id}`);
            fetchAlunos();
            setIsDeleted(false)
        } catch (error) {
            console.error('Erro ao excluir o estudante:', error);
        }
        console.log(id)
    }

    const handleUpdate = async (estudante: AlunoProps) => {
        const response = await axios.get(`http://189.8.205.53:8010/biblio/estudante/id/${estudante.idEstudante}`);
        setOpenModal(true);
        setAdd(false);
        setNovoAluno({
            idEstudante: estudante.idEstudante,
            matricula: estudante.matricula,
            email: estudante.email,
            nome: estudante.nome,
            telefone: estudante.telefone,
            isBiblio: response.data.isBiblio,
            senha: response.data.senha
        })
    }


    const fetchAlunos = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://189.8.205.53:8010/biblio/estudante/pag/${pagina}`);
            setAluno(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Erro ao buscar o estudante:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAlunos();
    }, [pagina]);


    return (
        <>
            <Nav />
            <div className="w-11/12 m-auto pt-3 ">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Spinner size="xl" />
                    </div>
                ) : (
                    <>
                        <Table className="" >
                            <Table.Head className="bg-cyan-200 text-lg">
                                <Table.HeadCell>Matricula</Table.HeadCell>
                                <Table.HeadCell>Nome</Table.HeadCell>
                                <Table.HeadCell>Email</Table.HeadCell>
                                <Table.HeadCell>Telefone</Table.HeadCell>
                                <Table.HeadCell className=" text-center">
                                    gerenciar
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {aluno.map((alunos, index) => (
                                    <Table.Row key={index} className="bg-blue-400 hover:scale-[1.01] transition-all duration-300 hover:bg-blue-600 text-green-200 dark:border-gray-700 dark:bg-gray-800">

                                        <Table.Cell className="font-bold text-white dark:border-gray-700 dark:bg-gray-800">
                                            {alunos.matricula}
                                        </Table.Cell>
                                        <Table.Cell>{alunos.nome}</Table.Cell>
                                        <Table.Cell>{alunos.email}</Table.Cell>
                                        <Table.Cell>{alunos.telefone}</Table.Cell>
                                        <Table.Cell className="flex justify-center gap-8">
                                            <button onClick={() => handleUpdate(alunos)} className="text-xl text-white font-bold hover:underline dark:text-cyan-500">
                                                <ImPencil />
                                            </button>
                                            <button onClick={() => handleDelete(alunos.idEstudante)} className="text-2xl text-gray font-bold hover:underline dark:text-cyan-500">
                                                <IoTrashSharp />
                                            </button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </>)}
                <div className="w-full bg-black h-[1px] mt-2"></div>
                <div className="flex flex-row items-center gap-3 mt-2 pb-4 justify-center ">
                    <button className="bg-cyan-300 p-2 rounded-lg text-white font-bold" onClick={() => setPagina(pagina - 1)}>Pagina anterior</button>
                    <p className="text-cyan-200 bg-slate-400 w-8 text-center flex justify-center items-center h-8 rounded-full">{pagina}</p>
                    <button className="bg-cyan-300 p-2 rounded-lg text-white font-bold" onClick={() => setPagina(pagina + 1)}>Proxima pagina</button>
                </div>
            </div>

            {(!isDeleted ? (
                <>
                    <Toast className="absolute z-10 toasti">
                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                            <HiX className="h-5 w-5" />
                        </div>
                        <div className="ml-3 text-sm font-normal">Livro deletado.</div>
                        <Toast.Toggle onDismiss={() => setIsDeleted(true)} />
                    </Toast>
                </>
            ) : null)
            }
            {
                (!isUpdated ? (
                    <>
                        <Toast className="absolute z-10 toasti">
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-center dark:bg-green-800 dark:text-green-200">
                                <HiCheck className="h-5 w-5" />
                            </div>
                            <div className="ml-3 text-sm font-normal">{"Estudante atualizado com sucesso"}</div>
                            <Toast.Toggle onDismiss={() => setIsUpdated(true)} />
                        </Toast>
                    </>
                ) : null)
            }

            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-2xl font-medium text-gray-900 dark:text-white">Atualize o Estudante!</h3>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <div className="mt-1 block">
                                    <Label htmlFor="nome" value="Nome" />
                                </div>
                                <TextInput
                                    id="nome"
                                    name="nome"
                                    value={novoAluno.nome}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <div className="mt-1 block">
                                    <Label htmlFor="matricula" value="Matricula" />
                                </div>
                                <TextInput
                                    id="matricula"
                                    name="nomatriculame"
                                    value={novoAluno.matricula}
                                    onChange={handleInputChange}
                                    disabled
                                />
                            </div>
                            <div>
                                <div className="block mt-4">
                                    <Label htmlFor="email" value="Email" />
                                </div>
                                <TextInput
                                    id="email "
                                    name="email"
                                    value={novoAluno.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mt-4 block mb-4">
                                <div className=" block">
                                    <Label htmlFor="telefone" value="Telefone" />
                                </div>
                                <TextInput
                                    id="telefone"
                                    name="telefone"
                                    value={novoAluno.telefone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <Button className="bg-green-500" type="submit">
                                    {'Atualizar Estudante'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
export { Alunos }