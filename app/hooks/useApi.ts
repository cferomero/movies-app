import axios from "axios";
import { useState, useEffect } from "react";

// Constantes de la API
const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = '2ecdb96cd055bbbe260fb8a24b1ce59f';
const IMAGE_PATH = 'https://image.tmdb.org/t/p/original/';

const useApi = (endpoint: string, limite?: number) => {
    const [data, setData] = useState<any>(endpoint.startsWith('movie/') ? {} : []);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${API_URL}/${endpoint}`, {
                    params: {
                        api_key: API_KEY,
                    },
                });

                if (endpoint.startsWith('movie/')) {
                    setData(response.data);
                } else {
                    const limitedData = limite ? response.data.results.slice(0, limite) : response.data.results;
                    setData(
                        limitedData.map((movie: any) => ({
                            id: movie.id,
                            title: movie.title,
                            overview: movie.overview,
                            genres: movie.genres,
                            runtime: movie.runtime,
                            vote_average: movie.vote_average,
                            imagen: movie.poster_path
                            ? `${IMAGE_PATH}${movie.poster_path}`
                            : '/default-image.jpg',
                        })));
                }
            } catch (error: any) {
                console.error('Error al cargar los datos: ', error);
                setError(error.message || 'Ocurrió un error al cargar los datos');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [endpoint, limite]);

    return { data, isLoading, error };
};

export default useApi;

