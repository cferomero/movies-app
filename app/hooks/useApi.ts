import axios from "axios";
import { useState, useEffect } from "react";

// Constantes de la API
const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = '2ecdb96cd055bbbe260fb8a24b1ce59f';

// Interface de los datos de la API
interface Movie {
    id: number;
    title: string;
    overview: string;
    genres: { id: number; name: string }[];
    runtime: number;
    vote_average: number;
    poster_path: string | null;
    backdrop_path: string | null;
}

// Tipo de respuesta de la API
type ApiResponse<T> = T extends Movie[] ? Movie[] : Movie;

function useApi<T>(endpoint: string, limite?: number) {
    const [data, setData] = useState<ApiResponse<T> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${API_URL}/${endpoint}`, {
                    params: { 
                        api_key: API_KEY 
                    },
                });
                

                if (response.data.results && Array.isArray(response.data.results)) {
                    const limitedData = limite ? response.data.results.slice(0, limite) : response.data.results;
                    setData(limitedData as ApiResponse<T>);
                } else {
                    setData(response.data as ApiResponse<T>);
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error('Error al cargar los datos:', error);
                    setError(error.message || 'Ocurrió un error al cargar los datos');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [endpoint, limite]);

    return { data, isLoading, error };
}

export default useApi;
