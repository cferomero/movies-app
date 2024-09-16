import React, { useRef, useEffect, useState } from 'react';
import { Lilita_One, Nanum_Gothic } from 'next/font/google';
import useApi from '@/app/hooks/useApi';


// ***FONTS
const litiaFont = Lilita_One({subsets:['latin'], weight:['400']});
const nanumFont = Nanum_Gothic({subsets:['latin'], weight:['400']});



export function BannerFilms({ endpoint }: { endpoint: string }) {
  const { movies, isLoading, error } = useApi(endpoint);
  const bannerRef = useRef<HTMLDivElement>(null);
  const [currentTitle, setCurrentTitle] = useState<string>('');
  const [currentOverview, setCurrentOverview] = useState<string>('');


  const CambiarImagen = () => {
    if (movies && movies.length > 0) {
      const indiceAleatorio = Math.floor(Math.random() * movies.length);
      const movie = movies[indiceAleatorio];
      setCurrentTitle(movie.title);
      setCurrentOverview(movie.overview);
      return movie.imagen;
    }
    return '';
  };

  useEffect(() => {
    if (!isLoading && !error && movies.length > 0) {
      const bannerElement = bannerRef.current;
      const imagenInicial = CambiarImagen();
      if (bannerElement && imagenInicial) {
        bannerElement.style.backgroundImage = `url(${imagenInicial})`;
        bannerElement.style.backgroundSize = 'cover';  
        bannerElement.style.backgroundPosition = 'center';
        bannerElement.style.backgroundRepeat = 'no-repeat';
      }

      const intervalId = setInterval(() => {
        const randomImage = CambiarImagen();
        if (bannerElement && randomImage) {
          bannerElement.style.backgroundImage = `url(${randomImage})`;
          bannerElement.style.backgroundSize = 'cover';
          bannerElement.style.backgroundPosition = 'center';
          bannerElement.style.backgroundRepeat = 'no-repeat';
        }
      }, 20000);

      return () => clearInterval(intervalId);
    }
  }, [movies, isLoading, error]);

  if (isLoading) {
    return <div>Cargando imágenes...</div>;
  }
  if (error) {
    return <div>Error al cargar imágenes: {error}</div>;
  }

  return (
    <div ref={bannerRef} className="rounded w-full h-full relative">
        <div className="rounded top-0 left-0 w-full h-full bg-gradient-to-r from-[#000000] to-[#d4d3d33f] flex flex-col gap-5 justify-end items-start text-white font-bold p-7">
            <h3 className={`text-left ${litiaFont.className} font-black text-7xl w-[50rem]`}>
                {currentTitle}
            </h3>
            {/* <p className={`text-white ${nanumFont.className} text-sm w-[30rem] text-left leading-relaxed`}> 
                {currentOverview}
            </p> */}
        </div>
    </div>
  );
}
