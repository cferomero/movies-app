// Aqui va la peticion de la API y reutlizarla en todos los componentes

import axios from "axios";
import { useState, useEffect } from "react";


// *****KEYS DE LA API
// https://api.themoviedb.org/3/discover/movie?api_key=2ecdb96cd055bbbe260fb8a24b1ce59f --Ejemplo de api en la url
const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = '2ecdb96cd055bbbe260fb8a24b1ce59f';
const IMAGE_PATH = 'https://image.tmdb.org/t/p/original/';


const useApi = (endpoint: string, limite?: number) => {
    const [ movies, setMovies] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true);
            setError(null);
            try{
                const response = await axios.get(`${API_URL}/${endpoint}`, {
                    params: {
                        api_key: API_KEY,
                    },
                });
                // num limite de data a la peticion
                const limitedMovies = limite ? response.data.results.slice(0, limite) :response.data.results;

                setMovies(limitedMovies.map((movie: any) => ({
                    imagen: `${IMAGE_PATH}${movie.poster_path}`,
                    title: movie.title,
                    overview: movie.overview,
                })));

            } catch (error: any) {
                console.error('Error al cargar las peliculas: ', error);
                setError(error.message || 'Ocurrió un error al cargar las peliculas');
            } finally {
                setIsLoading(false);
            }
        };


        fetchMovies();
    }, [endpoint, limite]);


    return { movies, isLoading, error }
}

export default useApi;