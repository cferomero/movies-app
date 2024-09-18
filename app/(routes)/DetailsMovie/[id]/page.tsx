"use client"

import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { Lilita_One, Rubik, Raleway } from 'next/font/google';
import { Clock, Star } from "lucide-react";
import useApi from "@/app/hooks/useApi";

// ***FONTS
const litiaFont = Lilita_One({ subsets: ['latin'], weight: ['400'] });
const rubikFont = Rubik({subsets: ['latin'], weight: ['700']});
const ralewayFont = Raleway({subsets:['latin'], weight:['500']});


export default function DetailsMovie() {
    const { id } = useParams();
    const bannerRef = useRef<HTMLDivElement>(null);
    const { data: movie, isLoading, error } = useApi(`movie/${id}`);

    useEffect(() => {
        if (!isLoading && !error && movie && movie.poster_path) {
            const bannerElement = bannerRef.current;
            const posterPath = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
            if (bannerElement) {
                bannerElement.style.backgroundImage = `url(${posterPath})`;
                bannerElement.style.backgroundSize = 'cover';
                bannerElement.style.backgroundPosition = 'center';
                bannerElement.style.backgroundRepeat = 'no-repeat';
            }
        }
    }, [isLoading, error, movie])

    if (isLoading) return <div>Cargando detalles...</div>;
    if (error) return <div>Error al cargar detalles: {error}</div>;

    if (!movie || Object.keys(movie).length === 0) {
        return <div>No se encontraron detalles.</div>;
    }

    return (
        <main ref={bannerRef} className="absolute top-0 left-0 right-0 bottom-0 w-full h-screen">
            <section className="w-full h-full bg-[#000000b4] flex flex-col p-10 justify-center items-start gap-6">
                <section className="w-[30vw] flex gap-10 justify-start items-center">
                    <p className={`text-[#ecf0f1] ${rubikFont.className} text-sm flex items-center gap-1`}>
                        <Clock strokeWidth={2} />
                        {movie.runtime} minutos
                    </p>
                    <p className={`text-[#ecf0f1] ${rubikFont.className} text-sm flex items-center gap-1`}>
                        <Star strokeWidth={2} />
                        Puntuación: {movie.vote_average}
                    </p>
                </section>
                {/* Mapeando los generos de cada pelicula */}
                <section className="flex gap-4">
                    {movie.genres && movie.genres.length > 0 ? (
                        movie.genres.map((genero: any) => (
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
                <h3 className={`text-white ${litiaFont.className} text-9xl w-[50vw]`}>
                    {movie.title}
                </h3>
                <p className={`text-white w-[50vw] text-left ${ralewayFont.className} text-xl`}>
                    {movie.overview}
                </p>
            </section>
        </main>
    );
}

