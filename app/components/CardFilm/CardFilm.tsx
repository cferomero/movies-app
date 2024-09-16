"use client"

import useApi from "@/app/hooks/useApi"

import { Ubuntu } from 'next/font/google'
import { MoveRight } from "lucide-react"
// import Image from "next/image"

const ubuntu = Ubuntu({ subsets: ['latin'], weight: ['400']})


export function CardFilm ({endpoint,  limite}: {endpoint: string; limite?: number}) {
    const { movies, isLoading, error } = useApi(endpoint);
    const limiteMovies = limite ? movies.slice(0, limite) : movies;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-5 items-center mt-5">
            {isLoading ? (
                <div>Cargando...</div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : limiteMovies && limiteMovies.length > 0 ? (
                <>
                    {limiteMovies.map((movie: any) => (
                        <div
                            key={movie.title}
                            className="flex flex-col rounded items-center hover:shadow-lg hover:scale-110 transition-transform cursor-pointer relative"
                        >
                            <img className="bg-cover rounded-md w-full h-50 object-cover hover:scale-110 transition-transform" src={movie.imagen} alt={movie.title} />

                            {/* ***Hover */}
                            <div className="absolute rounded top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-90 transition-opacity duration-300 flex justify-start items-end text-white font-bold">
                                <a href="#" className={`absolute left-4 bottom-4 text-white font-black ${ubuntu.className} text-2xl`}>
                                    {movie.title}
                                </a>
                            </div>
                        </div>
                    ))}
                    <a href="#" className="border-2 border-[#b9b9b9] bg-[#cecccc] w-[80px] h-[80px] rounded-full ml-10 flex items-center justify-center font-black hover:scale-150 transition-all" title="See all">
                        <MoveRight />
                    </a>
                </>
            ) : (
                <div>No hay películas disponibles.</div>
            )}
        </div>
    );    
}