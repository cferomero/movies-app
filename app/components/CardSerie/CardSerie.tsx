"use client"

import useSerie from "@/app/hooks/useSerie";
import { Ubuntu } from "next/font/google";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import Image from "next/image";


// ***FONTS
const ubuntu = Ubuntu({ subsets: ['latin'], weight: ['400'] });


// Interfaces de la Serie
interface TvSeriePoster {
    poster_path: string | null;
}
interface TvSerieDetail {
    id: number;
    name: string;
    poster_path: string | null;
}


export function CardSerie ({endpoint, limite}: {endpoint: string; limite?: number}) {
    const {data, isLoading, error} = useSerie<TvSerieDetail[]>(endpoint, limite);
    const series = Array.isArray(data) ? data : [];
    const limiteSeries = limite ? series.slice(0, limite) : series;
    const [showSkeleton, setShowSkeleton] = useState(true);


    // *** Aqui estoy usando el useEffect
    // *** para el eskeleton
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSkeleton(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);


    // *** Aqui estoy usando una funcion
    // *** para el poster de la serie
    const getSeriePoster = (serie: TvSeriePoster) => {
        const imageUrl = serie.poster_path ? `https://image.tmdb.org/t/p/original/${serie.poster_path}` : '/path-to-default-image.jpg';
        return imageUrl
    }


    // *** Mostra el Skeleton, error o en caso que no haya elementos disponibles
    if(isLoading || showSkeleton) {
        return (
            <div>
                {[...Array(limite || 5)].map((_,index) => (
                    <Skeleton key={index} className="w-full h-96" />
                ))}
            </div>
        )
    }
    if(error) {
      return <div>Error: {error}</div>  
    }
    if(limiteSeries.length === 0) {
        return <div>No hay series disponibles</div>
    }
    

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-center mt-5">
            {limiteSeries.map((serie) => (
                <div
                    key={serie.id}
                    className="flex flex-col rounded shadow-md items-center hover:shadow-lg hover:scale-105 transition-transform cursor-pointer relative"
                >
                    {/* Poster de la serie */}
                    <div className="relative w-full h-96">
                        <Image 
                            className="rounded-md w-full h-full object-cover hover:scale-110 transition-transform"
                            src={getSeriePoster(serie)}
                            alt={serie.name || 'Imagen de serie'}
                            layout="fill"
                            objectFit="cover"
                            priority
                        />
                    </div>
                    {/* HOVER Y TITULO DE LA SERIE */}
                    <div className="absolute rounded top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-90 transition-opacity duration-300 flex justify-start items-end text-white font-bold">
                        {/* Titulo de la serie */}
                        <Link
                            href={`/DetailsSerie/${serie.id}`}
                            className={`absolute left-4 bottom-4 text-white font-black ${ubuntu.className} text-2xl`}
                        >
                            {serie.name}
                        </Link>
                    </div>
                </div>
            ))}

        </div>
    )
}