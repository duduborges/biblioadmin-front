import {useState, useEffect} from "react"
import axios from "axios"

interface LivroProps {
    id: number
    titulo: string,
    editora: string,
    autor: string,
    ano: string,
}

export default function Livro() {
const [livro, setLivro] = useState<LivroProps[]>([]);
        useEffect(() => {
            fetchLivros();
        }, []);

        const fetchLivros = async () => {
            try {
            const response = await axios.get('http://localhost:8010/biblio/livro');
            setLivro(response.data);
            } catch (error) {
            console.error('Erro ao buscar Livros:', error);
            }
        };
    return (
        <>

<ul>
        {livro.map((livros) => (
          <li key={livros.id}>
            {livros.titulo} - {livros.editora} {livros.autor} {livros.ano} KKKKKKKKKKKKKKKKK
          </li>
        ))}
      </ul>
        </>
    )
}