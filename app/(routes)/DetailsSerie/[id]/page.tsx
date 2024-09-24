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


// *** Interface para los detalles de la serie
interface TvSerieDetails {
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


export default function DetailsSerie() {
    const { id } = useParams();
    const bannerRef = useRef<HTMLDivElement>(null);
    const { data: serie, isLoading, error} = useSerie<TvSerieDetails>(`tv/${id}`);

    // Aqui estoy añadiendole las
    // propiedades de la imagen al fondo del contenedor
    // useEffect(() => {
    //     if(!isLoading && !error && serie && serie.backdrop_path) {
    //         const bannerElement = bannerRef.current;
    //         const backdropPath = `https://image.tmdb.org/t/p/original/${serie.backdrop_path}`;
    //         if(bannerElement) {
    //             bannerElement.style.backgroundImage = `url(${backdropPath})`;
    //             bannerElement.style.backgroundSize = 'cover';
    //             bannerElement.style.backgroundPosition = 'center';
    //             bannerElement.style.backgroundRepeat = 'no-repeat';
    //         }
    //     }
    // }, [isLoading, error, serie])
    useEffect(() => {
        if (!isLoading && !error && serie) {
            const bannerElement = bannerRef.current;
    
            // Detectar si la pantalla es menor de 768px (dispositivo móvil)
            const isMobile = window.innerWidth < 740;
            const imagePath = isMobile
                ? `https://image.tmdb.org/t/p/original/${serie.poster_path}`  // Cambiar a poster en móviles
                : `https://image.tmdb.org/t/p/original/${serie.backdrop_path}`;  // Usar el backdrop en pantallas grandes
    
            if (bannerElement) {
                bannerElement.style.backgroundImage = `url(${imagePath})`;
                bannerElement.style.backgroundSize = 'cover';
                bannerElement.style.backgroundPosition = 'center';
                bannerElement.style.backgroundRepeat = 'no-repeat';
                bannerElement.style.height = '100%'; // Asegura que ocupe todo el contenedor
            }
    
            // Escuchar cambios de tamaño de pantalla
            const handleResize = () => {
                const isMobile = window.innerWidth < 740;
                const newImagePath = isMobile
                    ? `https://image.tmdb.org/t/p/original/${serie.poster_path}`
                    : `https://image.tmdb.org/t/p/original/${serie.backdrop_path}`;
                if (bannerElement) {
                    bannerElement.style.backgroundImage = `url(${newImagePath})`;
                }
            };
    
            // Añadir un event listener para detectar cuando cambie el tamaño de la pantalla
            window.addEventListener('resize', handleResize);
    
            // Limpiar el event listener al desmontar el componente
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [isLoading, error, serie]);
    



    
    // Si esta cargando, si da error o si no retorna ninguna pelicula
    if(isLoading) return <div> Cargando información...</div>
    if(error) return <div>Error al cargar la información: {error}</div>
    if(!serie || Object.keys(serie).length === 0) {
        return <div>No se encontró ninguna información del programa...</div>
    }


    return (
        <main ref={bannerRef} className="absolute top-0 left-0 right-0 bottom-0 w-full h-screen">
            <section className="w-full h-full bg-[#000000b4] flex flex-col p-10 justify-center items-start gap-6">
                {/* Puntuacion, cantidad de temporadas y episodios de la serie */}
                <section className="w-[30vw] sm:w-[80vw] flex gap-10 justify-start items-center">
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
                        serie.genres.map((genero) => (
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
                {/* Titulo de la serie */}
                <h3 className={`text-white ${litiaFont.className} text-9xl w-[50vw] sm:text-6xl sm:w-[80vw]`}>
                    {serie.name}
                </h3>
                {/* La descripcion de la serie */}
                <p className={`text-white w-[50vw] text-left ${ralewayFont.className} lg:text-xl sm:text-sm sm:text-justify`}>
                    {serie.overview}
                </p>
            </section>
        </main>
    )
}