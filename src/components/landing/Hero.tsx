import { CalendarDaysIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { SlideShow } from "./SlideShow";

export const Hero = () => {
  return (
    <section className="bg-[#FFF9EA]">
      <div className="mx-auto max-w-screen-xl bg-[#FFF9EA] px-4 pt-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="lg:py-44">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              The Garden Cafe
            </h1>

            <p className="mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
              Desde el desayuno hasta la cena, en The Garden Cafe celebramos la
              belleza de los alimentos saludables en un ambiente inspirador y
              seguro.
            </p>
            <div className="flex">
              <div className="mt-6 sm:flex sm:justify-center lg:justify-start">
                <div className="">
                  <Link
                    className="mb-4 inline-flex w-full items-center justify-center whitespace-nowrap rounded-full border border-transparent bg-[#8CA862] px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-[#899F56]"
                    href="/menu"
                  >
                    <CheckBadgeIcon className="mr-2 h-5 w-5 text-black" />
                    Ordena en línea!
                  </Link>
                </div>
                <div className="mx-2">
                  <Link
                    className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full border border-transparent bg-[#388C04] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-[#8CA862]"
                    href="/reservaciones"
                  >
                    <CalendarDaysIcon className="mr-2 h-5 w-5 text-white" />
                    Reserva tu mesa!
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4 rounded-2xl px-6 pt-6 pb-2 shadow-2xl">
            <SlideShow />
          </div>
        </div>
      </div>
    </section>
  );
};
