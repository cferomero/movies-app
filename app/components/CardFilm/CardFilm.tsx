"use client"

import useApi from "@/app/hooks/useApi";
import { Ubuntu } from 'next/font/google';
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import Image from "next/image";

// ***FONTS
const ubuntu = Ubuntu({ subsets: ['latin'], weight: ['400'] });

// Interfaces de la pelicula
interface MoviePoster {
    poster_path: string | null;
    backdrop_path: string | null;
}
interface MovieDetail {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path: string | null;
}

export function CardFilm({ endpoint, limite }: { endpoint: string; limite?: number }) {
    const { data, isLoading, error } = useApi<MovieDetail[]>(endpoint, limite);
    const movies = Array.isArray(data) ? data : [];
    const limiteMovies = limite ? movies.slice(0, limite) : movies;
    const [showSkeleton, setShowSkeleton] = useState(true);


    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSkeleton(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const getMovieImage = (movie: MoviePoster) => {
        const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : '/default-image.jpg';
        return imageUrl;
    };

    // Para cargar el skeleton, si hay error o si no hay elementos
    if (isLoading || showSkeleton) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 items-center mt-5">
                {[...Array(limite || 5)].map((_, index) => (
                    <Skeleton key={index} className="w-full h-96" />
                ))}
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (limiteMovies.length === 0) {
        return <div>No hay películas disponibles.</div>;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-center mt-5 bg-background">
            {limiteMovies.map((movie) => (
                <div
                    key={movie.id}
                    className="flex flex-col h-[50vh] rounded items-center hover:shadow-lg lg:hover:scale-105 transition-transform cursor-pointer relative"
                >
                    <div className="relative w-full h-[50vh]">
                        <Image
                            className="rounded-md w-full h-full object-cover hover:scale-110 transition-transform"
                            src={getMovieImage(movie)}
                            alt={movie.title || 'Imagen de película'}
                            layout="fill"
                            objectFit="cover"
                            priority
                        />
                    </div>

                    {/* HOVER Y TITULO */}
                    <div className="absolute rounded top-0 left-0 w-full h-full bg-black opacity-80 md:bg-transparent md:opacity-0 md:hover:opacity-90 lg:bg-black lg:hover:opacity-90 transition-opacity duration-300 flex justify-start items-end text-white font-bold">
                        <Link 
                            href={`/DetailsMovie/${movie.id}`}
                            className={`absolute left-4 bottom-4 text-white font-black ${ubuntu.className} text-2xl sm:text-1xl`}
                        >
                            {movie.title}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}
