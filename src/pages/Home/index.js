import { useEffect, useState } from "react"
import api from "../../services/api";
import { Link } from "react-router-dom";
import './home.css';

export default function Home() {

    const [ filmes, setFilmes ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        getFilmes();
    }, []);

    async function getFilmes() {

        const response = await api.get("/movie/now_playing", {
            params: {
                api_key: "3c8b98e85d28027fb7558b271d6139d8",
                language: "pt-BR",
                page: 1
            }
        });

        if(response.data.results) {
            setFilmes(response.data.results);
        }

        setLoading(false);

    }

    if(loading) {
        
        return (
            <div className="loading">
                <h2>Carregando...</h2>
            </div>
        )

    }

    return (
        <div className="container">
            <div className="lista-filmes">
                {
                    filmes.map( filme => {

                        return (
                            <article key={filme.id}>
                                <strong>{filme.title}</strong>
                                <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                                <Link to={`filme/${filme.id}`}>Acessar</Link>
                            </article>
                        )

                    })
                }
            </div>
        </div>
    )

};