"use client"

import { CardSerie } from "@/app/components/CardSerie";
import { Anton } from "next/font/google";

// ****Fonts
const antonFont = Anton({subsets:['latin'], weight:['400']});


export default function SeriesPage() {
    return (
        <main>
            <div className="shadow-sm bg-background hover:shadow-lg transition p-5 mt-5 bg-slate-100 dark:bg-gray-800 rounded">
                <h5 className={`text-3xl ${antonFont.className}text-slate-900 dark:text-white text-center text-5xl tracking-widest`}>Series</h5>
                <CardSerie 
                    endpoint="tv/top_rated?language=en-US"
                    limite={20}
                />
                <CardSerie 
                    endpoint="tv/popular?language=en-US"
                    limite={20}
                />
            </div>
        </main>
    )
}