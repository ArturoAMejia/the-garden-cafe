import React, { FC } from "react";
import { GetServerSideProps } from "next";

import { AdminLayout } from "../../../components/Layout/AdminLayout";
import { AgregarMarca } from "../../../components";

import { prisma } from "./../../../database";
import { ICatEstado, IMarca } from "../../../interfaces";
import { MarcaTable } from "../../../components/tables/marca/MarcaTable";

interface Props {
  marcas: IMarca[];
  estados: ICatEstado[];
}

const MarcaInventario: FC<Props> = ({ marcas, estados }) => {
  return (
    <AdminLayout title="Marca de Productos">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="mb-2 text-xl font-semibold text-gray-900">
            Marca de Productos
          </h1>
          <p className="mb-4 text-sm text-gray-700">
            Añade una nueva marca dandole click al botón
          </p>
        </div>
        <div className="mt-4 mb-4 px-1 sm:mt-0 sm:ml-16 sm:flex-none">
          <AgregarMarca estados={estados} />
        </div>
      </div>

      <MarcaTable />
    </AdminLayout>
  );
};

export default MarcaInventario;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await prisma.$connect();

  const estados = await prisma.cat_estado.findMany();
  const marcas = await prisma.marca.findMany({
    select: {
      id: true,
      nombre: true,
      siglas: true,
      cat_estado: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  return {
    props: {
      estados: JSON.parse(JSON.stringify(estados)),
      marcas: JSON.parse(JSON.stringify(marcas)),
    },
  };
};
