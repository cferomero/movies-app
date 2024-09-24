"use client"

import { CardFilm } from "@/app/components/CardFilm";
import { Anton } from "next/font/google";

// ****Fonts
const antonFont = Anton({subsets:['latin'], weight:['400']});

export default function MoviesPage() {
    return (
        <main>
            <div className="shadow-sm bg-background hover:shadow-lg transition p-5 mt-5 bg-slate-100 dark:bg-gray-800 rounded">
                <h5 className={`text-3xl ${antonFont.className}text-slate-900 dark:text-white text-center text-5xl tracking-widest`}>Películas</h5>
                <CardFilm
                    endpoint="movie/top_rated?language=en-US"
                    limite={20}
                />
                <CardFilm 
                    endpoint="movie/popular?language=en-US"
                    limite={20}
                />
                <CardFilm 
                    endpoint="movie/upcoming?language=en-US"
                    limite={20}
                />
            </div>
        </main>
    )
}