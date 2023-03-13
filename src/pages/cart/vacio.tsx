import React from "react";
import Layout from "../../components/Layout/Layout";

const CarritoVacio = () => {
  return (
    <Layout title="Carrito Vacío" pageDescription="Pagina del carrito vacio">
      <div className="bg-[#FFF9EA] pt-4 h-max">
        <div className="max-w-2xl mx-auto pt-4 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Carrito de Compras
          </h1>
          <h2 className="text-3xl mt-4 font-semibold">No hay items en el carrito</h2>
        </div>
      </div>
    </Layout>
  );
};

export default CarritoVacio;
