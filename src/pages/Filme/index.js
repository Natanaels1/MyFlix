import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";
import './filme.css';

export default function Filme() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [ filme, setFilme ] = useState({});
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        getDetalhesFilme();
    }, []);

    async function getDetalhesFilme() {

        await api.get(`/movie/${id}`, {
            params: {
                api_key: "3c8b98e85d28027fb7558b271d6139d8",
                language: "pt-BR"
            }
        })
        .then( res => {
            setFilme(res.data);
            setLoading(false);
        })
        .catch( err => {
            navigate("/", { replace: true });
            setLoading(false);
            return;
        });

    }

    function salvarFilme() {

        const minhaLista = localStorage.getItem("@myFlix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some( filmeSalvo => filmeSalvo.id === filme.id );

        if(hasFilme) {
            //alert("Esse filme já está na sua lista.");
            toast.error("Esse filme já está na sua lista.");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@myFlix", JSON.stringify(filmesSalvos));
        //alert("Filme salvo.");
        toast.success("Filme salvo");

    }

    if(loading) {

        return (
            <div className="filme-loading">
                <h1>Carregando...</h1>
            </div>
        );

    };

    return (
        <div className="filme-info">

            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <span>{filme.overview}</span>
            <strong>Avaliação {Math.floor(filme.vote_average)} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>
                    Salvar
                </button>
                <a href={`https://youtube.com/results?search_query=${filme.title} trailer`} target="blank" rel="externo" >
                    Trailer
                </a>
            </div>

        </div>
    )

}