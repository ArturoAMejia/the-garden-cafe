import React from "react";

export const IndexHero = () => {
  return (
    <main className="flex flex-row bg-[#FFF9EA]">
      <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
        <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            <span className="block xl:inline">The Garden Cafe</span>{" "}
            <span className="block text-[#F7990C] text-4xl xl:inline">
              Consciente, Local y Saludable
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
            Desde el desayuno hasta la cena, en The Garden Cafe celebramos la
            belleza de los alimentos saludables en un ambiente inspirador y
            seguro.
          </p>
          <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-full shadow">
              <a
                href="#"
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-full text-black bg-[#FFCB43] hover:bg-[#FDD567] md:py-4 md:text-lg md:px-10"
              >
                Ordena en línea!
              </a>
            </div>
            <div className="mt-3 rounded-full shadow sm:mt-0 sm:ml-3">
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-[#FFAC4B] 
                hover:bg-[#f5b56a] md:py-4 md:text-lg md:px-10"
              >
                Reserva tu mesa!
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full h-64 sm:h-72 md:h-96 lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
        <img
          className="relative inset-0 w-full h-full object-center"
          src="/img/banner-index.jpeg"
          alt="banner-inicio"
        />
      </div>
    </main>
  );
};
