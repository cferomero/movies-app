"use client"

import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { Lilita_One, Rubik, Raleway } from 'next/font/google';
import { Play, TvMinimalPlay, Star } from "lucide-react";
import useSerie from "@/app/hooks/useSerie";

// ***FONTS
const litiaFont = Lilita_One({ subsets: ['latin'], weight: ['400'] });
const rubikFont = Rubik({subsets: ['latin'], weight: ['700']});
const ralewayFont = Raleway({subsets:['latin'], weight:['500']});


export default function DetailsSerie() {
    const { id } = useParams();
    const bannerRef = useRef<HTMLDivElement>(null);
    const { data: serie, isLoading, error} = useSerie(`tv/${id}`);


    // Aqui estoy añadiendole las
    // propiedades de la imagen al fondo del contenedor
    useEffect(() => {
        if(!isLoading && !error && serie && serie.backdrop_path) {
            const bannerElement = bannerRef.current;
            const backdropPath = `https://image.tmdb.org/t/p/original/${serie.backdrop_path}`;
            if(bannerElement) {
                bannerElement.style.backgroundImage = `url(${backdropPath})`;
                bannerElement.style.backgroundSize = 'cover';
                bannerElement.style.backgroundPosition = 'center';
                bannerElement.style.backgroundRepeat = 'no-repeat';
            }
        }
    }, [isLoading, error, serie])

    if(isLoading) return <div> Cargando información...</div>
    if(error) return <div>Error al cargar la información: {error}</div>
    if(!serie || Object.keys(serie).length === 0) {
        return <div>No se encontró ninguna información del programa...</div>
    }


    return (
        <main ref={bannerRef} className="absolute top-0 left-0 right-0 bottom-0 w-full h-screen">
            <section className="w-full h-full bg-[#000000b4] flex flex-col p-10 justify-center items-start gap-6">
                <section className="w-[30vw] flex gap-10 justify-start items-center">
                    <p className={`text-[#ecf0f1] ${rubikFont.className} text-sm flex items-center gap-1`}>
                        <Play strokeWidth={2} />
                        {/* Condicional para validar si es en plural o en singular */}
                        {serie.number_of_seasons} {serie.number_of_seasons === 1 ? 'temporada' : 'temporadas'}
                    </p>
                    <p className={`text-[#ecf0f1] ${rubikFont.className} text-sm flex items-center gap-1`}>
                        <TvMinimalPlay strokeWidth={2} />
                        {serie.number_of_episodes} {serie.number_of_episodes === 1 ? 'episodio' : 'episodios'}
                    </p>
                    <p className={`text-[#ecf0f1] ${rubikFont.className} text-sm flex items-center gap-1`}>
                        <Star strokeWidth={2} />
                        Puntuación: {serie.vote_average}
                    </p>
                </section>

                {/* Aqui estoy mapeando el objeto de los generos */}
                <section className="flex gap-4">
                    {serie.genres && serie.genres.length > 0 ? (
                        serie.genres.map((genero: any) => (
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
                    {serie.name}
                </h3>
                <p className={`text-white w-[50vw] text-left ${ralewayFont.className} text-xl`}>
                    {serie.overview}
                </p>
            </section>
        </main>
    )
}