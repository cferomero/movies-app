"use client"

import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { Lilita_One, Rubik, Raleway } from 'next/font/google';
import { Clock, Star } from "lucide-react";
import useApi from "@/app/hooks/useApi";

// ***FONTS
const litiaFont = Lilita_One({ subsets: ['latin'], weight: ['400'] });
const rubikFont = Rubik({ subsets: ['latin'], weight: ['700'] });
const ralewayFont = Raleway({ subsets: ['latin'], weight: ['500'] });

// *** Interface para los detalles de la película
interface MovieDetail {
    id: number;
    title: string;
    overview: string;
    genres: { id: number; name: string }[];
    runtime: number;
    vote_average: number;
    poster_path: string | null;
    backdrop_path: string | null;
}

export default function DetailsMovie() {
    const { id } = useParams();
    const bannerRef = useRef<HTMLDivElement>(null);
    const { data: movie, isLoading, error } = useApi<MovieDetail>(`movie/${id}`);

    // useEffect(() => {
    //     if (!isLoading && !error && movie && movie.backdrop_path) {
    //         const bannerElement = bannerRef.current;
    //         const posterPath = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
    //         if (bannerElement) {
    //             bannerElement.style.backgroundImage = `url(${posterPath})`;
    //             bannerElement.style.backgroundSize = 'cover';
    //             bannerElement.style.backgroundPosition = 'center';
    //             bannerElement.style.backgroundRepeat = 'no-repeat';
    //         }
    //     }
    // }, [isLoading, error, movie]);
    useEffect(() => {
        if(!isLoading && !error && movie) {
            const bannerElement = bannerRef.current;
            // Detectar el talaño del dispositivo
            const isMoblie = window.innerWidth < 740;
            const imagenPath = isMoblie
                ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                : `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
            
            if(bannerElement) {
                bannerElement.style.backgroundImage = `url(${imagenPath})`;
                bannerElement.style.backgroundSize = 'cover';
                bannerElement.style.backgroundPosition = 'center';
                bannerElement.style.backgroundRepeat = 'no-repeat';
                bannerElement.style.height = '100%';
            }

            // evento para realizar los cambios en pantalla
            const handleResize = () => {
                const isMobile = window.innerWidth < 740;
                const newImagePath = isMobile
                    ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                    : `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;

                if(bannerElement) {
                    bannerElement.style.backgroundImage = `url(${newImagePath})`;
                }
            };

            // Nuevo Event listener par detectar el cambio
            window.addEventListener('resize', handleResize);
            // remover el evento al salir del componente
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [isLoading, error, movie]);

    // Si esta cargando, si da error o si no retorna ninguna pelicula
    if (isLoading) return <div>Cargando detalles...</div>;
    if (error) return <div>Error al cargar detalles: {error}</div>;
    if (!movie || Object.keys(movie).length === 0) {
        return <div>No se encontraron detalles.</div>;
    }

    return (
        <main ref={bannerRef} className="absolute top-0 left-0 right-0 bottom-0 w-full h-screen">
            <section className="w-full h-full bg-[#000000b4] flex flex-col p-10 justify-center items-start gap-6">
                {/* Datos de la pelicula */}
                <section className="w-[30vw] sm:w-[50vw] flex gap-10 justify-start items-center">
                    <p className={`text-[#ecf0f1] ${rubikFont.className} text-sm flex items-center gap-1`}>
                        <Clock strokeWidth={2} />
                        {movie.runtime} minutos
                    </p>
                    <p className={`text-[#ecf0f1] ${rubikFont.className} text-sm flex items-center gap-1`}>
                        <Star strokeWidth={2} />
                        Puntuación: {movie.vote_average}
                    </p>
                </section>

                {/* Mapeo de los géneros */}
                <section className="flex gap-4">
                    {movie.genres && movie.genres.length > 0 ? (
                        movie.genres.map((genero) => (
                            <small 
                                key={genero.id} 
                                className={`text-[#ecf0f1] ${rubikFont.className} tracking-wider text-sm bg-gray-600 border border-gray-600 p-2 rounded-full`}
                            >
                                {genero.name}
                            </small>
                        ))
                    ) : (
                        <small className={`text-[#ecf0f1] ${rubikFont.className}`}>
                            Sin géneros disponibles
                        </small>
                    )}
                </section>

                {/* Título de la película */}
                <h3 className={`text-white ${litiaFont.className} text-9xl w-[50vw] sm:text-6xl sm:w-[80vw]`}>
                    {movie.title}
                </h3>

                {/* Descripción de la película */}
                <p className={`text-white w-[50vw] text-left ${ralewayFont.className} lg:text-xl sm:text-sm sm:text-justify`}>
                    {movie.overview}
                </p>
            </section>
        </main>
    );
}
