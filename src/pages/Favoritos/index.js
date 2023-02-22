import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./favoritos.css";

export default function Favoritos() {

    const [ filmes, setFilmes ] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem('@myFlix');
        setFilmes(JSON.parse(minhaLista) || []);
    }, []);

    function removeFilme(id) {

        let filtroFiles = filmes.filter( item => {
            return item.id !== id;
        });

        setFilmes(filtroFiles);
        localStorage.setItem('@myFlix', JSON.stringify(filtroFiles));
        toast.success("Removido");

    }

    return (
        <div className="meus-filmes">
            <h1>Meus filmes</h1>

            {
                filmes.length === 0 && <h2 className="nenhum-salvo" >Você não tem nenhum filme salvo.</h2>
            }

            <ul>
                {
                    filmes.map( filme => {

                        return (
                            <li key={filme.id}>
                                <span>{filme.title}</span>
                                <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
                                <div>
                                    <Link to={`/filme/${filme.id}`}>
                                        Ver detalhes
                                    </Link>
                                    <button onClick={() => removeFilme(filme.id)}>
                                        Remover
                                    </button>
                                </div>
                            </li>
                        )

                    })
                }
            </ul>
        </div>
    )

};