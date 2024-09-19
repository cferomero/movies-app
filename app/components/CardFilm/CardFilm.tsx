"use client"

import useApi from "@/app/hooks/useApi"
import { Ubuntu } from 'next/font/google'
// import { MoveRight } from "lucide-react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"

// ***FONTS
const ubuntu = Ubuntu({ subsets: ['latin'], weight: ['400'] });


export function CardFilm({ endpoint, limite }: { endpoint: string; limite?: number }) {
    const { data, isLoading, error } = useApi(endpoint);
    const movies = data?.results || [];
    const limiteMovies = limite ? movies.slice(0, limite) : movies;
    const [showSkeleton, setShowSkeleton] = useState(true);


    // *** USEEFFECT PARA EL SKELETON
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSkeleton(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);


    // *** FUNCION PARA OBTENER EL ENLACE DE LA IMAGEN
    const getMovieImage = (movie: any) => {
        return movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : '/path-to-default-image.jpg';
    };


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 items-center mt-5">
            {isLoading || showSkeleton ? (
                [...Array(limite)].map((_, index) => (
                    <Skeleton key={index} className="w-full h-72" />
                ))
            ) : error ? (
                <div>Error: {error}</div>
            ) : limiteMovies && limiteMovies.length > 0 ? (
                <>
                    {limiteMovies.map((movie: any) => (
                        <div
                            key={movie.id}
                            className="flex flex-col rounded items-center hover:shadow-lg hover:scale-105 transition-transform cursor-pointer relative"
                        >
                            <img 
                                className="bg-cover rounded-md w-full h-50 object-cover hover:scale-110 transition-transform" 
                                src={getMovieImage(movie)} 
                                alt={movie.title} 
                            />

                            {/* HOVER Y TITULO */}
                            <div className="absolute rounded top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-90 transition-opacity duration-300 flex justify-start items-end text-white font-bold">
                                <Link 
                                    href={`/DetailsMovie/${movie.id}`}
                                    className={`absolute left-4 bottom-4 text-white font-black ${ubuntu.className} text-2xl`}
                                >
                                    {movie.title}
                                </Link>
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                null
            )}
        </div>
    );
}
