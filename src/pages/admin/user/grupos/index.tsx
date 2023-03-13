import React, { FC, useState } from "react";
import { AdminLayout } from "../../../../components/Layout/AdminLayout";

interface Props {
  // TODO Cambiar el any por su respectivo tipo de interfaz
  grupos: any;
}

const GruposPage: FC<Props> = ({ grupos }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <AdminLayout title="Grupos">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="mb-4 px-1 text-xl font-semibold text-gray-900">
            Grupos
          </h1>
        </div>
        <div className="mt-4 mb-4 px-1 sm:mt-0 sm:ml-16 sm:flex-none">
          <AgregarGrupo />
        </div>
      </div>
      <GrupoTable />
    </AdminLayout>
  );
};

export default GruposPage;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from "next";
import { prisma } from "./../../../../database";

import { AgregarGrupo } from "../../../../components/admin/user/grupo/AgregarGrupo";
import { GrupoTable } from "../../../../components/tables/user/GrupoTable";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await prisma.$connect();
  const grupos = await prisma.grupo_usuario.findMany();
  await prisma.$disconnect();

  return {
    props: {
      grupos: JSON.parse(JSON.stringify(grupos)),
    },
  };
};
