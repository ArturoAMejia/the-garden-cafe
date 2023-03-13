import { FC } from "react";

import { GetStaticProps } from "next";
import Image from "next/image";

import { prisma } from "./../database";
import { IMenu } from "../interfaces";

import { Fade, Slide } from "react-awesome-reveal";
import { Hero } from "../components/landing/Hero";
import { ProductCard } from "../components/landing/ProductCard";
import Layout from "../components/Layout/Layout";

interface Props {
  productos: IMenu[];
}

const Home: FC<Props> = ({ productos }) => {

  return (
    <Layout title="Inicio" pageDescription="Pagina de Inicio">
      <Fade>
        <Hero />
      </Fade>
      <Slide>
        <div className="bg-[#FFF9EA]">
          <div className="max-w-7xl  py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Alimentación & vida consciente
              </h2>
              <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                Creemos que cada cuerpo y cada ser humano tiene necesidades y
                elecciones alimenticias únicas. Como restaurante capacitamos a
                nuestro equipo constantemente para respetar tu elección y apoyar
                tus hábitos de alimentación.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      <ProductCard productos={productos} />
      <div className="relative py-16 bg-[#FFF9EA]">
        <div
          className="hidden absolute top-0 inset-x-0 h-1/2 bg-[#FFF9EA] lg:block"
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto bg-[#FFF9EA] lg:bg-transparent lg:px-8">
          <div className="lg:grid lg:grid-cols-12">
            <div className="relative z-10 lg:col-start-1 lg:row-start-1 lg:col-span-4 lg:py-16 lg:bg-transparent">
              <div
                className="absolute inset-x-0 h-1/2 bg-[#FFF9EA] lg:hidden"
                aria-hidden="true"
              />
              <div className="max-w-md mx-auto px-4 sm:max-w-3xl sm:px-6 lg:max-w-none lg:p-0">
                <div className="aspect-w-10 aspect-h-6 sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1">
                  <Image
                    width={600}
                    height={800}
                    className="relative object-cover object-center rounded-3xl shadow-2xl"
                    src="/img/work-with-us.jpeg"
                    alt="trabaja con nosotros"
                  />
                </div>
              </div>
            </div>

            <div className="relative bg-[#388C04] text-black lg:col-start-3 lg:row-start-1 lg:col-span-10 lg:rounded-3xl lg:grid lg:grid-cols-10 lg:items-center shadow-2xl">
              <div
                className="hidden absolute inset-0 overflow-hidden rounded-3xl lg:block"
                aria-hidden="true"
              >
                <svg
                  className="absolute bottom-full left-full transform translate-y-1/3 -translate-x-2/3 xl:bottom-auto xl:top-0 xl:translate-y-0"
                  width={404}
                  height={384}
                  fill="none"
                  viewBox="0 0 404 384"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern
                      id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <rect
                        x={0}
                        y={0}
                        width={4}
                        height={4}
                        className="text-[#]"
                        fill="currentColor"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width={404}
                    height={384}
                    fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
                  />
                </svg>
                <svg
                  className="absolute top-full transform -translate-y-1/3 -translate-x-1/3 xl:-translate-y-1/2"
                  width={404}
                  height={384}
                  fill="none"
                  viewBox="0 0 404 384"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern
                      id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <rect
                        x={0}
                        y={0}
                        width={4}
                        height={4}
                        className="text-indigo-500"
                        fill="currentColor"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width={404}
                    height={384}
                    fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
                  />
                </svg>
              </div>
              <div className="relative max-w-md mx-auto py-12 px-4 space-y-6 sm:max-w-3xl sm:py-16 sm:px-6 lg:max-w-none lg:p-0 lg:col-start-4 lg:col-span-6">
                <h2
                  className="text-3xl font-extrabold text-white"
                  id="join-heading"
                >
                  Trabaja con The Garden Cafe
                </h2>
                <p className="text-lg text-white">
                  Conoce un poco más sobre nuestra empresa y mantente informado
                  sobre los puestos de trabajo en The Garden Cafe.
                </p>
                <a
                  className="block w-full py-3 px-5 text-center bg-[#FFAC4B] border border-transparent rounded-full shadow-md text-base font-medium text-white hover:bg-[#f5b56a] sm:inline-block sm:w-auto"
                  href="#"
                >
                  Ver más
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (ctx) => {
  await prisma.$connect();
  const productos = await prisma.producto.findMany({
    select: {
      id: true,
      nombre: true,
      imagen: true,
      categoria_producto: true,
      unidad_medida: {
        select: {
          siglas: true,
        },
      },
      precio_producto: {
        select: {
          precio_venta: true,
        },
      },
    },
    where: {
      id_estado: 5,
    },
    take: 4,
  });
  // TODO Crear cada precio para cada producto
  const precio_producto = await prisma.precio_producto.findMany({
    select: {
      precio_venta: true,
    },
  });

  await prisma.$disconnect();

  return {
    props: {
      productos: JSON.parse(JSON.stringify(productos)),
      precio_producto: JSON.parse(JSON.stringify(precio_producto)),
    },
  };
};
