"use client"

import { CardFilm } from "@/app/components/CardFilm";
import { CardSerie } from "@/app/components/CardSerie";
import { Anton } from "next/font/google";

// ****Fonts
const antonFont = Anton({subsets:['latin'], weight:['400']});


export default function UpComing() {
    return (
        <main>
            <div className="shadow-sm bg-background hover:shadow-lg transition p-5 mt-5 bg-slate-100 dark:bg-gray-800 rounded">
                <h5 className={`${antonFont.className}text-slate-900 dark:text-white text-center text-5xl tracking-widest`}> Próximamente </h5>
                <CardFilm 
                    endpoint="movie/upcoming?language=en-US"
                    limite={20}
                />
                <CardSerie 
                    endpoint="tv/on_the_air?language=en-US"
                    limite={20}
                />
            </div>
        </main>
    )
}