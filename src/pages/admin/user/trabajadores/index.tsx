import React, { FC } from "react";
import { AdminLayout } from "../../../../components/Layout/AdminLayout";

interface Props {
  estado_civil: IEstadoCivil[];
  grupos: IGrupoUsuario[];
}

const TrabajadoresPage: FC<Props> = ({ estado_civil, grupos }) => {
  return (
    <AdminLayout title="Trabajadores">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="mb-4 px-1 text-xl font-semibold text-gray-900">
            Trabajadores
          </h1>
        </div>
        <div className="mt-4 mb-4 px-1 sm:mt-0 sm:ml-16 sm:flex-none">
          <AgregarTrabajadores grupos={grupos} estado_civil={estado_civil} />
        </div>
      </div>
      <TrabajadorTable />
    </AdminLayout>
  );
};

export default TrabajadoresPage;

import { GetServerSideProps } from "next";
import { prisma } from "./../../../../database";

import {
  ICargo,
  IEstadoCivil,
  IGrupoUsuario,
  ITrabajador,
} from "../../../../interfaces";
import AgregarTrabajadores from "../../../../components/admin/user/trabajadores/AgregarTrabajadores";
import { TrabajadorTable } from "../../../../components/tables/user/TrabajadoresTable";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await prisma.$connect();
  const grupos = await prisma.grupo_usuario.findMany();
  const estado_civil = await prisma.cat_estado_civil.findMany();

  await prisma.$disconnect();

  return {
    props: {
      grupos: JSON.parse(JSON.stringify(grupos)),
      estado_civil: JSON.parse(JSON.stringify(estado_civil)),
    },
  };
};
