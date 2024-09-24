"use client"

import { CardFilm } from "../components/CardFilm";
import { CardSerie } from "../components/CardSerie";
import { BannerFilms } from "../components/BannerFilms";


import { Anton } from "next/font/google";

// ****Fonts
const antonFont = Anton({subsets:['latin'], weight:['400']});




export default function Home() {
  return (
    <div>
      <main className='max-[800px]:hidden w-full h-[70vh]' >
        <BannerFilms
          endpoint="trending/movie/week?language=en-US"
        />
      </main>
      <div className="shadow-sm sm:w-full bg-background hover:shadow-lg transition p-5 mt-5 bg-slate-100 dark:bg-gray-800 rounded">
        <h5 className={`lg:text-3xl max-[400px]:text-xl ${antonFont.className} text-slate-900 dark:text-white`}>Top  rated movies</h5>
        <CardFilm 
          endpoint="movie/top_rated?language=en-US"
          limite={5}
        />
      </div>
      <div className="shadow-sm bg-background hover:shadow-lg transition p-5 mt-5 bg-slate-100 dark:bg-gray-800 rounded">
        <h5 className={`text-3xl max-[400px]:text-xl ${antonFont.className} text-slate-900 dark:text-white`}>Popular movies</h5>
          <CardFilm
            endpoint="movie/popular?language=en-US" 
            limite={5}
          />
      </div>
      <div className="shadow-sm bg-background hover:shadow-lg transition p-5 mt-5 bg-slate-100 dark:bg-gray-800 rounded">
        <h5 className={`text-3xl max-[400px]:text-xl ${antonFont.className} text-slate-900 dark:text-white`}>Upcoming movies</h5>
          <CardFilm
            endpoint="movie/upcoming?language=en-US" 
            limite={5}
          />
      </div>
      <div className="shadow-sm bg-background hover:shadow-lg transition p-5 mt-5 bg-slate-100 dark:bg-gray-800 rounded">
        <h5 className={`text-3xl max-[400px]:text-xl ${antonFont.className} text-slate-900 dark:text-white`}>Popular Tv series</h5>
          <CardSerie 
            endpoint="tv/popular?language=en-US"
            limite={5}
          />
      </div>
      <div className="shadow-sm bg-background hover:shadow-lg transition p-5 mt-5 bg-slate-100 dark:bg-gray-800 rounded">
        <h5 className={`text-3xl max-[400px]:text-xl ${antonFont.className} text-slate-900 dark:text-white`}>Top rated Tv series</h5>
          <CardSerie
            endpoint="tv/top_rated?language=en-US" 
            limite={5}
          />
      </div>
      <div className="shadow-sm bg-background hover:shadow-lg transition p-5 mt-5 bg-slate-100 dark:bg-gray-800 rounded">
        <h5 className={`text-3xl max-[400px]:text-xl ${antonFont.className} text-slate-900 dark:text-white`}>On air Tv series</h5>
          <CardSerie 
            endpoint="tv/on_the_air?language=en-US"
            limite={5}
          />
      </div>
    </div>
  );
}