"use client"

import { CardFilm } from "./components/CardFilm";
import { CardSerie } from "./components/CardSerie";
import { BannerFilms } from "./components/BannerFilms";


import { Anton } from "next/font/google";

// ****Fonts
const antonFont = Anton({subsets:['latin'], weight:['400']});




export default function Home() {

  return (
    <div>
      <main className='w-full h-[70vh]' >
        <BannerFilms
          endpoint="trending/movie/week?language=en-US"
        />
      </main>
      <div className="shadow-sm bg-background hover:shadow-lg transition p-5 mt-5 bg-slate-100 rounded">
        <h5 className={`text-3xl ${antonFont.className}`}>Top  rated movies</h5>
        <CardFilm 
          endpoint="movie/top_rated?language=en-US"
          limite={5}
        />
      </div>
      <div className="shadow-sm bg-background hover:shadow-lg transition p-5 mt-5 bg-slate-100 rounded">
        <h5 className={`text-3xl ${antonFont.className}`}>Popular movies</h5>
          <CardFilm
            endpoint="movie/popular?language=en-US" 
            limite={5}
          />
      </div>
      <div className="shadow-sm bg-background hover:shadow-lg transition p-5 mt-5 bg-slate-100 rounded">
        <h5 className={`text-3xl ${antonFont.className}`}>Upcoming movies</h5>
          <CardFilm
            endpoint="movie/upcoming?language=en-US" 
            limite={5}
          />
      </div>
      <div className="shadow-sm bg-background hover:shadow-lg transition p-5 mt-5 bg-slate-100 rounded">
        <h5 className={`text-3xl ${antonFont.className}`}>Popular Tv series</h5>
          <CardSerie 
            endpoint="tv/popular?language=en-US"
            limite={5}
          />
      </div>
      <div className="shadow-sm bg-background hover:shadow-lg transition p-5 mt-5 bg-slate-100 rounded">
        <h5 className={`text-3xl ${antonFont.className}`}>Top rated Tv series</h5>
          <CardSerie
            endpoint="tv/top_rated?language=en-US" 
            limite={5}
          />
      </div>
      <div className="shadow-sm bg-background hover:shadow-lg transition p-5 mt-5 bg-slate-100 rounded">
        <h5 className={`text-3xl ${antonFont.className}`}>On air Tv series</h5>
          <CardSerie 
            endpoint="tv/on_the_air?language=en-US"
            limite={5}
          />
      </div>
    </div>
  );
}