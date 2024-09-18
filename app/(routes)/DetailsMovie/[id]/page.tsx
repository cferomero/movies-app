"use client"

import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { Lilita_One } from 'next/font/google';
import useApi from "@/app/hooks/useApi";


// ***FONTS
const litiaFont = Lilita_One({subsets:['latin'], weight:['400']});


export default function DetailsMovie() {
    const { id } = useParams();
    const bannerRef = useRef<HTMLDivElement>(null);
    const { data: movie, isLoading, error } = useApi(`movie/${id}`);

    useEffect(() => {
        if(!isLoading && !error && movie && movie.poster_path) {
            const bannerElement = bannerRef.current;
            const posterPath = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
            if(bannerElement) {
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
            <section className="w-full h-full bg-[#000000b4] flex flex-col p-10 justify-end items-start gap-6">
                <h3 
                    className={`text-white ${litiaFont.className} text-9xl`}
                >
                    {movie.title}
                </h3>
                <p className="text-white">Descripción: {movie.overview}</p>
            </section>
        </main>
    );
}
