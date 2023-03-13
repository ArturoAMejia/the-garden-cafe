import React, { FC } from "react";
import { GetServerSideProps } from "next";
import { AgregarCatProducto } from "../../../components";
import { AdminLayout } from "../../../components/Layout/AdminLayout";
import { CategoriaProductoTable } from "../../../components/tables/CategoriaProductoTable";

import { ICatEstado } from "../../../interfaces";
import { prisma } from "../../../database";

interface Props {
  estados: ICatEstado[];
}

const CategoriaInventario: FC<Props> = ({ estados }) => {
  return (
    <AdminLayout title="Categorias de Productos">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="mb-2 text-xl font-semibold text-gray-900">
            Categorías de Productos
          </h1>
          <p className="mb-4 text-sm text-gray-700">
            Añade una nueva categoría dandole click al botón
          </p>
        </div>

        <div className="mt-4 mb-4 px-1 sm:mt-0 sm:ml-16 sm:flex-none">
          <AgregarCatProducto estados={estados} />
        </div>
      </div>
      <CategoriaProductoTable />
    </AdminLayout>
  );
};

export default CategoriaInventario;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await prisma.$connect();
  const estados = await prisma.cat_estado.findMany();
  await prisma.$disconnect();
  return {
    props: {
      estados: JSON.parse(JSON.stringify(estados)),
    },
  };
};
