import React, { useRef, useEffect, useState } from 'react';
import { Lilita_One } from 'next/font/google';
import Link from 'next/link';
import useApi from '@/app/hooks/useApi';


// ***FONTS
const litiaFont = Lilita_One({subsets:['latin'], weight:['400']});


export function BannerFilms({ endpoint }: { endpoint: string }) {
  const { data, isLoading, error } = useApi(endpoint);
  const bannerRef = useRef<HTMLDivElement>(null);
  const [currentTitle, setCurrentTitle] = useState<string>('');
  const [currentId, setCurrentId] = useState<number | null>(null);


  const CambiarImagen = () => {
    if (data && data.length > 0) {
      const indiceAleatorio = Math.floor(Math.random() * data.length);
      const movie = data[indiceAleatorio];
      setCurrentTitle(movie.title);
      setCurrentId(movie.id);
      return movie.imagen;
    }
    return '';
  };

  useEffect(() => {
    if (!isLoading && !error && data.length > 0) {
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
  }, [data, isLoading, error]);

  if (isLoading) {
    return <div>Cargando imágenes...</div>;
  }
  if (error) {
    return <div>Error al cargar imágenes: {error}</div>;
  }

  return (
    <div ref={bannerRef} className="rounded w-full h-full relative">
        <div className="rounded top-0 left-0 w-full h-full bg-gradient-to-r from-[#000000] to-[#d4d3d33f] flex flex-col gap-5 justify-end items-start text-white font-bold p-7">
          {currentId && (
            <Link
              href={`/DetailsMovie/${currentId}`}
              className={`text-left ${litiaFont.className} font-black text-7xl w-[50rem]`}
            >
              {currentTitle}
            </Link>
          )}
        </div>
    </div>
  );
}
