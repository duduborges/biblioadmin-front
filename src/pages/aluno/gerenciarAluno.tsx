import axios from "axios";
import { Button, Label, Table, TextInput } from "flowbite-react"
import React, { useEffect, useState } from "react";
import Nav from "../../components/navbar";
import { Modal } from "flowbite-react";

interface AlunoProps {
    IdEstudante: number,
    matricula: number,
    email: string,
    nome: string,
    telefone: string
}

function Alunos() {

    const [aluno, setAluno] = useState<AlunoProps[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [add, setAdd] = useState(true);
    const [isDeleted, setIsDeleted] = useState(true);
    const [isUpdated, setIsUpdated] = useState(true);

    const [novoAluno, setNovoAluno] = useState({
        idEstudante: 0,
        matricula: 0,
        email: '',
        nome: '',
        telefone: ''
    });

    function onCloseModal() {
        setAdd(true);
        setOpenModal(false);
        setNovoAluno({
            idEstudante: 0,
            matricula: 0,
            email: '',
            nome: '',
            telefone: ''
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
            if (add) {
                await axios.post('http://189.8.205.53:8010/biblio/livro', novoAluno);
            } else {
                await axios.put("http://189.8.205.53:8010/biblio/livro", novoAluno,);
            }
            fetchAlunos();
            onCloseModal();
            setIsUpdated(false)
        } catch (error) {
            console.error('Erro ao salvar o estudante:', error);
        }

    }

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://189.8.205.53:8010/biblio/estudante/id/${id}`);
            fetchAlunos();
            setIsDeleted(false)
        } catch (error) {
            console.error('Erro ao excluir o estudante:', error);
        }
    }

    const handleUpdate = (estudante: AlunoProps) => {
        setOpenModal(true);
        setAdd(false);
        setNovoAluno({
            idEstudante: estudante.IdEstudante,
            matricula: estudante.matricula,
            email: estudante.email,
            nome: estudante.nome,
            telefone: estudante.telefone
        })
    }


    const fetchAlunos = async () => {
        try {
            const response = await axios.get(`http://189.8.205.53:8010/biblio/estudante`);
            setAluno(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Erro ao buscar o estudante:', error);
        }
    };

    useEffect(() => {
        fetchAlunos();
    }, []);


    return (
        <>
            <Nav />
            <div className="w-11/12 m-auto pt-3 ">
                <Table className="" >
                    <Table.Head className="bg-cyan-200 text-lg">
                        <Table.HeadCell>Matricula</Table.HeadCell>
                        <Table.HeadCell>Nome</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Telefone</Table.HeadCell>
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

                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-2xl font-medium text-gray-900 dark:text-white">Cadastre o Estudante!</h3>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="titulo" value="Titulo" />
                                </div>
                                <TextInput
                                    id="titulo"
                                    name="titulo"
                                    value={novoAluno.nome}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="matricula" value="Matricula" />
                                </div>
                                <TextInput
                                    id="matricula"
                                    name="autor"
                                    value={novoAluno.matricula}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="editora" value="Editora" />
                                </div>
                                <TextInput
                                    id="editora"
                                    name="editora"
                                    value={novoAluno.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <div className="mb-2 block">
                                    <Label htmlFor="ano" value="Ano" />
                                </div>
                                <TextInput
                                    id="ano"
                                    name="ano"
                                    value={novoAluno.telefone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <Button className="bg-green-500" type="submit">
                                    {add ? 'Adicionar livro' : 'Atualizar livro'}
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