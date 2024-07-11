/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, Button, Label, Modal, TextInput, Toast, Spinner } from "flowbite-react";
import Nav from "../../components/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { ImPencil } from "react-icons/im";
import { IoTrashSharp } from "react-icons/io5";
import { HiCheck, HiX } from "react-icons/hi";

interface EmprestimoProps {
    idEmprestimo: number;
    livro: {
        idLivro: number;
        titulo: string;
        autor: string;
        editora: string;
        ano: string;
    };
    estudante: {
        idEstudante: number;
        nome: string;
    };
    dataEmprestimo: string;
    dataEntrega: string;
    devolucao: string;
}
function GerenciarEmprestimos() {
    const [emprestimos, setEmprestimos] = useState<EmprestimoProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [isBibliotecario, setIsBibliotecario] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [add, setAdd] = useState(true);
    const [isDeleted, setIsDeleted] = useState(true);
    const biblio = localStorage.getItem("isBiblio");
    const [isUpdated, setIsUpdated] = useState(true);
    const [novoEmprestimo, setNovoEmprestimo] = useState<EmprestimoProps>({
        idEmprestimo: 0,
        livro: {
            idLivro: 0,
            titulo: '',
            autor: '',
            editora: '',
            ano: ''
        },
        estudante: {
            idEstudante: 0,
            nome: ''
        },
        dataEmprestimo: '',
        dataEntrega: '',
        devolucao: ''
    });

    useEffect(() => {
        if (biblio === "true") {
            setIsBibliotecario(true);
        } else {
            setIsBibliotecario(false);
        }
    }, [biblio]);

    function onCloseModal() {
        setAdd(true);
        setOpenModal(false);
        setNovoEmprestimo({
            idEmprestimo: 0,
            livro: {
                idLivro: 0,
                titulo: '',
                autor: '',
                editora: '',
                ano: ''
            },
            estudante: {
                idEstudante: 0,
                nome: ''
            },
            dataEmprestimo: '',
            dataEntrega: '',
            devolucao: ''
        });
    }

    const fetchEmprestimos = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://189.8.205.53:8010/biblio/emprestimo');
            setEmprestimos(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Erro ao buscar empréstimos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === 'idLivro' || name === 'idEstudante') {
            setNovoEmprestimo((prevEmprestimo) => ({
                ...prevEmprestimo,
                [name === 'idLivro' ? 'livro' : 'estudante']: {
                    ...prevEmprestimo[name === 'idLivro' ? 'livro' : 'estudante'],
                    [name === 'idLivro' ? 'idLivro' : 'idEstudante']: Number(value),
                }
            }));
        } else {
            setNovoEmprestimo((prevEmprestimo) => ({
                ...prevEmprestimo,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (add) {
                await axios.post('http://189.8.205.53:8010/biblio/emprestimo', novoEmprestimo);
            } else {
                await axios.put("http://189.8.205.53:8010/biblio/emprestimo", novoEmprestimo);
            }
            fetchEmprestimos();
            onCloseModal();
            setIsUpdated(false);
        } catch (error) {
            console.error('Erro ao salvar o empréstimo:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://189.8.205.53:8010/biblio/emprestimo/id/${id}`);
            fetchEmprestimos();
            setIsDeleted(false);
        } catch (error) {
            console.error('Erro ao excluir o empréstimo:', error);
        }
    };

    const handleUpdate = (emprestimo: EmprestimoProps) => {
        setOpenModal(true);
        setAdd(false);
        setNovoEmprestimo({
            idEmprestimo: emprestimo.idEmprestimo,
            livro: {
                idLivro: emprestimo.livro.idLivro,
                titulo: emprestimo.livro.titulo,
                autor: emprestimo.livro.autor,
                editora: emprestimo.livro.editora,
                ano: emprestimo.livro.ano
            },
            estudante: {
                idEstudante: emprestimo.estudante.idEstudante,
                nome: emprestimo.estudante.nome
            },
            dataEmprestimo: emprestimo.dataEmprestimo,
            dataEntrega: emprestimo.dataEntrega,
            devolucao: emprestimo.devolucao
        });
    };

    useEffect(() => {
        fetchEmprestimos();
    }, []);

    return (
        <>
            <Nav />
            {isBibliotecario ? (
                <>
                    <div className="w-11/12 m-auto py-3">
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <Spinner size="xl" />
                            </div>
                        ) : (
                            <>
                                <div className="w-full justify-end flex">
                                    <button onClick={() => setOpenModal(true)} className="py-2 px-5 rounded-t-lg text-white font-bold bg-blue-400 hover:bg-blue-600">Adicionar Empréstimo</button>
                                </div>
                                <Table>
                                    <Table.Head className="bg-cyan-200 text-lg">
                                        <Table.HeadCell>Livro</Table.HeadCell>
                                        <Table.HeadCell>Estudante</Table.HeadCell>
                                        <Table.HeadCell>Data do Empréstimo</Table.HeadCell>
                                        <Table.HeadCell>Data de Entrega</Table.HeadCell>
                                        <Table.HeadCell>Devolução</Table.HeadCell>
                                        <Table.HeadCell className="text-center">
                                            <span>Gerenciar</span>
                                        </Table.HeadCell>
                                    </Table.Head>
                                    <Table.Body className="divide-y">
                                        {emprestimos.map((emprestimo) => (
                                            <Table.Row key={emprestimo.idEmprestimo} className="bg-blue-400 hover:scale-[1.01] hover:bg-blue-600 text-green-200 dark:border-gray-700 dark:bg-gray-800 transition-all duration-300">
                                                <Table.Cell className="whitespace-nowrap font-bold text-white dark:text-white">
                                                    {emprestimo.livro.titulo}
                                                </Table.Cell>
                                                <Table.Cell>{emprestimo.estudante.nome}</Table.Cell>
                                                <Table.Cell>{emprestimo.dataEmprestimo}</Table.Cell>
                                                <Table.Cell>{emprestimo.dataEntrega}</Table.Cell>
                                                <Table.Cell>{emprestimo.devolucao}</Table.Cell>
                                                <Table.Cell className="flex gap-4 justify-center">
                                                    <button onClick={() => handleUpdate(emprestimo)} className="text-xl text-white font-bold hover:underline dark:text-cyan-500">
                                                        <ImPencil />
                                                    </button>
                                                    <button onClick={() => handleDelete(emprestimo.idEmprestimo)} className="text-2xl text-gray font-bold hover:underline dark:text-cyan-500">
                                                        <IoTrashSharp />
                                                    </button>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table>
                            </>
                        )}
                    </div>
                    {(!isDeleted ? (
                        <Toast className="absolute z-10 toasti">
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                                <HiX className="h-5 w-5" />
                            </div>
                            <div className="ml-3 text-sm font-normal">Empréstimo deletado.</div>
                            <Toast.Toggle onDismiss={() => setIsDeleted(true)} />
                        </Toast>
                    ) : null)}
                    {(!isUpdated ? (
                        <Toast className="absolute z-10 toasti">
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                                <HiCheck className="h-5 w-5" />
                            </div>
                            <div className="ml-3 text-sm font-normal">Empréstimo atualizado.</div>
                            <Toast.Toggle onDismiss={() => setIsUpdated(true)} />
                        </Toast>
                    ) : null)}
                </>
            ) : (
                <>
                    <div className="w-11/12 m-auto py-3">
                        <Table>
                            <Table.Head className="bg-cyan-200 text-lg">
                                <Table.HeadCell>Livro</Table.HeadCell>
                                <Table.HeadCell>Estudante</Table.HeadCell>
                                <Table.HeadCell>Data do Empréstimo</Table.HeadCell>
                                <Table.HeadCell>Data de Entrega</Table.HeadCell>
                                <Table.HeadCell>Devolução</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {emprestimos.map((emprestimo) => (
                                    <Table.Row key={emprestimo.idEmprestimo} className="bg-blue-400 hover:bg-blue-600 text-green-200 dark:border-gray-700 dark:bg-gray-800 transition-all duration-300">
                                        <Table.Cell className="whitespace-nowrap font-bold text-white dark:text-white">
                                            {emprestimo.livro.titulo}
                                        </Table.Cell>
                                        <Table.Cell>{emprestimo.estudante.nome}</Table.Cell>
                                        <Table.Cell>{emprestimo.dataEmprestimo}</Table.Cell>
                                        <Table.Cell>{emprestimo.dataEntrega}</Table.Cell>
                                        <Table.Cell>{emprestimo.devolucao}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </>
            )}
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-2xl font-medium text-gray-900 dark:text-white">Cadastre o Empréstimo!</h3>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <div className="mt-1 block">
                                    <Label htmlFor="idLivro" value="ID do Livro" />
                                </div>
                                <TextInput
                                    id="idLivro"
                                    name="idLivro"
                                    type="text"
                                    value={novoEmprestimo.livro.idLivro}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <div className="mb-1 block mt-4">
                                    <Label htmlFor="idEstudante" value="ID do Estudante" />
                                </div>
                                <TextInput
                                    id="idEstudante"
                                    name="idEstudante"
                                    type="text"
                                    value={novoEmprestimo.estudante.idEstudante}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <div className="mb-1 block mt-4">
                                    <Label htmlFor="dataEmprestimo" value="Data do Empréstimo" />
                                </div>
                                <TextInput
                                    id="dataEmprestimo"
                                    name="dataEmprestimo"
                                    type="date"
                                    value={novoEmprestimo.dataEmprestimo}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <div className="mb-1 block mt-4">
                                    <Label htmlFor="dataEntrega" value="Data de Entrega" />
                                </div>
                                <TextInput
                                    id="dataEntrega"
                                    name="dataEntrega"
                                    type="date"
                                    value={novoEmprestimo.dataEntrega}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <div className="mb-1 block mt-4">
                                    <Label htmlFor="devolucao" value="Devolução" />
                                </div>
                                <TextInput
                                    id="devolucao"
                                    name="devolucao"
                                    value={novoEmprestimo.devolucao}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <Button className="bg-blue-400" type="submit">
                                {add ? 'Adicionar Empréstimo' : 'Atualizar Empréstimo'}
                            </Button>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
export { GerenciarEmprestimos }