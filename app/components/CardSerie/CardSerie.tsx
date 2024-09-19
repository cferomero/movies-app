"use client"

import useSerie from "@/app/hooks/useSerie";
import { Ubuntu } from "next/font/google";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

// ***FONTS
const ubuntu = Ubuntu({ subsets: ['latin'], weight: ['400'] });


export function CardSerie ({endpoint, limite}: {endpoint: string; limite?: number}) {
    const {data, isLoading, error} =useSerie(endpoint);
    const series = data?.results || [];
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
    const getSeriePoster = (serie: any) => {
        return serie.poster_path ? `https://image.tmdb.org/t/p/original/${serie.poster_path}` : '/path-to-default-image.jpg';
    }


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 items-center mt-5">
            {isLoading || showSkeleton ? (
                [...Array(limite)].map((_, index) => (
                    <Skeleton key={index} className="w-full h-72" />
                ))
            ) : error ? (
                <div>Error: {error}</div>
            ) : limiteSeries && limiteSeries.length > 0 ? (
                <>
                    {limiteSeries.map((serie: any) => (
                        <div
                            key={serie.id}
                            className="flex flex-col rounded shadow-md items-center hover:shadow-lg hover:scale-105 transition-transform cursor-pointer relative"
                        >
                            <img
                                className="bg-cover rounded-md w-full h-50 object-cover hover:scale-110 transition-transform"
                                src={getSeriePoster(serie)}
                                alt={serie.name} 
                            />


                            {/* HOVER Y TITULO DE LA SERIE */}
                            <div className="absolute rounded top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-90 transition-opacity duration-300 flex justify-start items-end text-white font-bold">
                                <Link
                                    href={`/DetailsSerie/${serie.id}`}
                                    className={`absolute left-4 bottom-4 text-white font-black ${ubuntu.className} text-2xl`}
                                >
                                    {serie.name}
                                </Link>
                            </div>
                        </div>
                    ))}
                </>
            ) :(
                null
            )}

        </div>
    )
}