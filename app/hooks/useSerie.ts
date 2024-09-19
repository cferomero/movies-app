import axios from "axios";
import { useState, useEffect } from "react";


// Constantes de la API
const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = '2ecdb96cd055bbbe260fb8a24b1ce59f';
const IMAGE_PATH = 'https://image.tmdb.org/t/p/original/';


const useSerie = (endpoint: string, limite?: number) => {
    const [data, setData] = useState<any>(endpoint.startsWith('tv/') ? {} : []);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    // Aqui hago la peticion
    // a la API con USEEFFECT
    useEffect(() => {
        const fetchSerie = async() => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${API_URL}/${endpoint}`,{
                    params: {
                        api_key: API_KEY,
                    },
                });

                // Aqui estoy validando si estoy
                // seleccionando una serie especifica
                if (endpoint.startsWith('tv/')) {
                    setData(response.data);
                } else {
                    const limitedSeries = limite ? response.data.results.slice(0, limite) : response.data.results;
                    setData(
                        limitedSeries.map((serie: any) => ({
                            id: serie.id,
                            name: serie.name,
                            overview: serie.overview,
                            genres: serie.genres,
                            number_of_seasons: serie.number_of_seasons,
                            number_of_episodes: serie.number_of_episodes,
                            vote_average: serie.vote_average,
                            poster: serie.poster_path
                            ? `${IMAGE_PATH}${serie.poster_path}`
                            : '/default-image.jpg',
                            backdrop_path: serie.backdrop_path
                            ? `${IMAGE_PATH}${serie.backdrop_path}`
                            : '/default-image.jpg',
                        }))
                    );                
                }
            } catch (error: any) {
                console.error('Error al cargar los datos: ', error);
                setError(error.message || 'Ocurrió un error al cargar los datos');
            } finally {
                setIsLoading(false);
            }
        };

        fetchSerie();
    }, [endpoint, limite]);

    return { data, isLoading, error };

};


export default useSerie;