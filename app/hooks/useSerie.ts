import axios from "axios";
import { useState, useEffect } from "react";


// Constantes de la API
const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = '2ecdb96cd055bbbe260fb8a24b1ce59f';

// Interface de datos de la API
interface TvSerie {
    id: number;
    name: string;
    overview: string;
    genres: {id: number; name: string}[];
    number_of_seasons: number;
    number_of_episodes: number;
    vote_average: number;
    poster_path: string | null;
    backdrop_path: string | null;
}
// Tipo respuesta de la API
type ApiResponse<T> = T extends TvSerie[] ? TvSerie[] : TvSerie;

function useSerie<T> (endpoint: string, limite?: number) {
    const [data, setData] = useState<ApiResponse<T> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
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
                if (response.data.results && Array.isArray(response.data.results)) {
                    const limitedData = limite ? response.data.results.slice(0, limite) : response.data.results;
                    setData(limitedData as ApiResponse<T>);
                } else {
                    setData(response.data as ApiResponse<T>);                
                }
            } catch (error: unknown) {
                if(error instanceof Error){
                    console.error('Error al cargar los datos: ', error);
                    setError(error.message || 'Ocurrió un error al cargar los datos');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchSerie();
    }, [endpoint, limite]);

    return { data, isLoading, error };

};


export default useSerie;