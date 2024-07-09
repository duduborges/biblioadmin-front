import { Table, Button, Label, Modal, TextInput, Toast } from "flowbite-react";
import Nav from "../../components/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { ImPencil } from "react-icons/im";
import { IoTrashSharp } from "react-icons/io5";
import { HiCheck, HiX } from "react-icons/hi";

interface LivroProps {
    idLivro: number;
    titulo: string;
    editora: string;
    autor: string;
    ano: string;
}

export default function CadastroLivro() {
    const [livro, setLivro] = useState<LivroProps[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [add, setAdd] = useState(true);
    const [isDeleted, setIsDeleted] = useState(true)
    const [isUpdated, setIsUpdated] = useState(true)
    const [novoLivro, setNovoLivro] = useState({
        idLivro: 0,
        titulo: '',
        autor: '',
        editora: '',
        ano: ''
    });

    function onCloseModal() {
        setAdd(true);
        setOpenModal(false);
        setNovoLivro({
            idLivro: 0,
            titulo: '',
            autor: '',
            editora: '',
            ano: ''
        });
    }

    const fetchLivros = async () => {
        try {
            const response = await axios.get('http://localhost:8010/biblio/livro');
            setLivro(response.data);
            // console.log(response.data)
        } catch (error) {
            console.error('Erro ao buscar Livros:', error);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNovoLivro((prevLivro) => ({
            ...prevLivro,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (add) {
                await axios.post('http://localhost:8010/biblio/livro', novoLivro);
            } else {
                await axios.put("http://localhost:8010/biblio/livro", novoLivro,);
            }
            fetchLivros();
            onCloseModal();
            setIsUpdated(false)
        } catch (error) {
            console.error('Erro ao salvar o Livro:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8010/biblio/livro/id/${id}`);
            fetchLivros();
            setIsDeleted(false)
        } catch (error) {
            console.error('Erro ao excluir o Livro:', error);
        }
    };

    const handleUpdate = (livro: LivroProps) => {
        setOpenModal(true);
        setAdd(false);
        setNovoLivro({
            idLivro: livro.idLivro,
            titulo: livro.titulo,
            autor: livro.autor,
            editora: livro.editora,
            ano: livro.ano
        });
        console.error(novoLivro)
    };

    useEffect(() => {
        fetchLivros();
    }, []);

    return (
        <>
            <Nav />
            <div className="w-11/12 m-auto py-3 ">
                <div className="w-full justify-end flex ">
                    <Button onClick={() => setOpenModal(true)} className="bg-green-500 text-white shadow-xl rounded-t-xl rounded-b-none ">Adicionar livro</Button>
                </div>
                <Table className="" >
                    <Table.Head className="bg-cyan-200">
                        <Table.HeadCell>Título</Table.HeadCell>
                        <Table.HeadCell>Autor</Table.HeadCell>
                        <Table.HeadCell>Editora</Table.HeadCell>
                        <Table.HeadCell>Ano</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="">Edit</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {livro.map((livros) => (
                            <Table.Row key={livros.idLivro} className="bg-green-500 text-green-200 dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-bold text-white dark:text-white">
                                    {livros.titulo}
                                </Table.Cell>
                                <Table.Cell>{livros.autor}</Table.Cell>
                                <Table.Cell>{livros.editora}</Table.Cell>
                                <Table.Cell>{livros.ano}</Table.Cell>
                                <Table.Cell className="flex gap-4 justify-start">
                                    <button onClick={() => handleUpdate(livros)} className="text-xl text-yellow-300 font-bold hover:underline dark:text-cyan-500">
                                        <ImPencil />
                                    </button>
                                    <button onClick={() => handleDelete(livros.idLivro)} className="text-2xl text-red-500 font-bold hover:underline dark:text-cyan-500">
                                        <IoTrashSharp />
                                    </button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
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
            ) : null)}
            {(!isUpdated ? (
                <>
                    <Toast className="absolute z-10 toasti">
                        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                            <HiCheck className="h-5 w-5" />
                        </div>
                        <div className="ml-3 text-sm font-normal">{add ? "Livro adicionado com sucesso!" : "Livro atualizado com sucesso"}</div>
                        <Toast.Toggle onDismiss={() => setIsUpdated(true)} />
                    </Toast>
                </>
            ) : null)}
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-2xl font-medium text-gray-900 dark:text-white">Cadastre o livro!</h3>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <div className="mt-1 block">
                                    <Label htmlFor="titulo" value="Titulo" />
                                </div>
                                <TextInput
                                    id="titulo"
                                    name="titulo"
                                    value={novoLivro.titulo}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <div className="mb-1 block mt-4">
                                    <Label htmlFor="autor" value="Autor" />
                                </div>
                                <TextInput
                                    id="autor"
                                    name="autor"
                                    value={novoLivro.autor}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <div className="mb-1 block mt-4">
                                    <Label htmlFor="editora" value="Editora" />
                                </div>
                                <TextInput
                                    id="editora"
                                    name="editora"
                                    value={novoLivro.editora}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <div className="mb-1 block mt-4">
                                    <Label htmlFor="ano" value="Ano" />
                                </div>
                                <TextInput
                                    id="ano"
                                    name="ano"
                                    value={novoLivro.ano}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mt-4 block mb-1">
                                <Button className="bg-green-500" type="submit">
                                    {add ? 'Adicionar livro' : 'Atualizar livro'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
