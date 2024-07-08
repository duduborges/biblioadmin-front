import { Table, Button, Label, Modal, TextInput } from "flowbite-react"
import Nav from "../../components/navbar"
import { useEffect, useState } from "react";
import axios from "axios";
import { ImPencil } from "react-icons/im";
import { IoTrashSharp } from "react-icons/io5";
interface LivroProps {
    id: number
    titulo: string,
    editora: string,
    autor: string,
    ano: string,
}
export default function CadastroLivro() {
    const [livro, setLivro] = useState<LivroProps[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [add, setAdd] = useState(true)
    const [novoLivro, setNovoLivro] = useState({
        titulo: '',
        autor: '',
        editora: '',
        ano: ''
    });

    function onCloseModal() {
        setAdd(true)
        setOpenModal(false);
    }

    const fetchLivros = async () => {
        try {
            const response = await axios.get('http://localhost:8010/biblio/livro');
            setLivro(response.data);
        } catch (error) {
            console.error('Erro ao buscar Livros:', error);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNovoLivro((prevVeiculo) => ({
            ...prevVeiculo,
            [name]: value,
        }));
    };
    const handleSubmit = async (event: React.MouseEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8010/biblio/livro', novoLivro);
            fetchLivros();
            setNovoLivro({
                titulo: '',
                autor: '',
                editora: '',
                ano: ''
            });
        } catch (error) {
            console.error('Erro ao criar o Livro:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8010/biblio/livro/id/${id}`);
            fetchLivros();
        } catch (error) {
            console.error('Erro ao excluir o Livro:', error);
        }
    };
    const handleUpdate = async (id: number, livroAtualizado: LivroProps) => {
        setOpenModal(true)
        setAdd(false)
        try {
            await axios.put(`http://localhost:8010/biblio/livro/${id}`, livroAtualizado);
            fetchLivros();
        } catch (error) {
            console.error('Erro ao atualizar o Livro:', error);
        }
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
                        {livro.map((livros, index) => (
                            <Table.Row key={index} className="bg-green-500 text-green-200 dark:border-gray-700 dark:bg-gray-800">

                                <Table.Cell className="whitespace-nowrap font-bold text-white dark:text-white">
                                    {livros.titulo}
                                </Table.Cell>
                                <Table.Cell>{livros.autor}</Table.Cell>
                                <Table.Cell>{livros.editora}</Table.Cell>
                                <Table.Cell>{livros.ano}</Table.Cell>
                                <Table.Cell className="flex gap-4 justify-start">
                                    <button onClick={() =>
                                        handleUpdate(livros.id, {
                                            ...livros,
                                            titulo: novoLivro.titulo,
                                            editora: novoLivro.editora,
                                            autor: novoLivro.autor,
                                            ano: novoLivro.ano,
                                        })
                                    } className="text-xl text-yellow-300 font-bold hover:underline dark:text-cyan-500">
                                        <ImPencil />
                                    </button>
                                    <button onClick={() => handleDelete(livros.id)} className="text-2xl text-red-500 font-bold hover:underline dark:text-cyan-500">
                                        <IoTrashSharp />
                                    </button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-2xl font-medium text-gray-900 dark:text-white">Cadastre o livro!</h3>
                        {add ? (
                            <>
                                <form onSubmit={handleSubmit} >

                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="titulo" value="Titulo" />
                                        </div>
                                        <TextInput
                                            id="titulo"
                                            value={novoLivro.titulo}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="Autor" value="Autor" />
                                        </div>
                                        <TextInput
                                            id="autor"
                                            value={novoLivro.autor}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="Autor" value="Editora" />
                                        </div>
                                        <TextInput
                                            id="editora"
                                            value={novoLivro.editora}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <div className="mb-2 block">
                                            <Label htmlFor="Autor" value="Ano" />
                                        </div>
                                        <TextInput
                                            id="ano"
                                            value={novoLivro.ano}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="w-full">
                                        <Button className="bg-green-500" type="submit">Adicionar livro</Button>
                                    </div>

                                </form>
                            </>
                        ) : (
                            <>
                                <form  >

                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="titulo" value="Titulo" />
                                        </div>
                                        <TextInput
                                            id="titulo"
                                            value={novoLivro.titulo}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="Autor" value="Autor" />
                                        </div>
                                        <TextInput
                                            id="autor"
                                            value={novoLivro.autor}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="Autor" value="Editora" />
                                        </div>
                                        <TextInput
                                            id="editora"
                                            value={novoLivro.editora}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <div className="mb-2 block">
                                            <Label htmlFor="Autor" value="Ano" />
                                        </div>
                                        <TextInput
                                            id="ano"
                                            value={novoLivro.ano}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="w-full">
                                        <Button className="bg-green-500" >Atualizar livro</Button>
                                    </div>

                                </form>
                            </>
                        )}

                    </div>
                </Modal.Body>
            </Modal >

        </>
    )
}