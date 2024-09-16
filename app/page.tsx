"use client"

import { CardFilm } from "./components/CardFilm";
import { BannerFilms } from "./components/BannerFilms";

import { Anton } from "next/font/google";

// ****Fonts
const antonFont = Anton({subsets:['latin'], weight:['400']});




export default function Home() {

  return (
    <div>
      <div className='w-full h-[70vh]' >
        <BannerFilms
          endpoint="trending/movie/week?language=en-US"
        />
      </div>
      <div className="shadow-sm bg-background hover:shadow-lg transition p-5 mt-5 bg-slate-100 rounded">
        <h5 className={`text-3xl ${antonFont.className}`}>Top  rated</h5>
        <CardFilm 
          endpoint="movie/top_rated?language=en-US"
          limite={6}
        />
      </div>
      <div className="shadow-sm bg-background hover:shadow-lg transition p-5 mt-5 bg-slate-100 rounded">
        <h5 className={`text-3xl ${antonFont.className}`}>Popular</h5>
          <CardFilm
            endpoint="movie/popular?language=en-US" 
            limite={6}
          />
      </div>
      <div className="shadow-sm bg-background hover:shadow-lg transition p-5 mt-5 bg-slate-100 rounded">
        <h5 className={`text-3xl ${antonFont.className}`}>Próximamente</h5>
          <CardFilm
            endpoint="movie/upcoming?language=en-US" 
            limite={6}
          />
      </div>
    </div>
  );
}