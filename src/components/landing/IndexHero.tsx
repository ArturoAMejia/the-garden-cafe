import Image from "next/image";
import React from "react";

export const IndexHero = () => {
  return (
    <main className="flex flex-row bg-[#FFF9EA]">
      <div className="mx-auto w-full max-w-7xl pt-16 pb-20 text-center lg:py-48 lg:text-left">
        <div className="px-4 sm:px-8 lg:w-1/2 xl:pr-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            <span className="block xl:inline">The Garden Cafe</span>{" "}
            <span className="block text-4xl text-[#F7990C] xl:inline">
              Consciente, Local y Saludable
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
            Desde el desayuno hasta la cena, en The Garden Cafe celebramos la
            belleza de los alimentos saludables en un ambiente inspirador y
            seguro.
          </p>
          <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-full shadow">
              <a
                href="#"
                className="flex w-full items-center justify-center rounded-full border border-transparent bg-[#FFCB43] px-4 py-3 text-base font-medium text-black hover:bg-[#FDD567] md:py-4 md:px-10 md:text-lg"
              >
                Ordena en línea!
              </a>
            </div>
            <div className="mt-3 rounded-full shadow sm:mt-0 sm:ml-3">
              <a
                href="#"
                className="flex w-full items-center justify-center rounded-full border border-transparent bg-[#FFAC4B] px-8 py-3 text-base font-medium text-white 
                hover:bg-[#f5b56a] md:py-4 md:px-10 md:text-lg"
              >
                Reserva tu mesa!
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-64 w-full sm:h-72 md:h-96 lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
        <Image
          className="relative inset-0 h-full w-full object-center"
          src="/img/banner-index.jpeg"
          alt="banner-inicio"
        />
      </div>
    </main>
  );
};
