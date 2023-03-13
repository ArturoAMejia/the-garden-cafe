import React, { FC } from "react";
import { AdminLayout } from "../../../../components/Layout/AdminLayout";
import { CierreCajaTable } from "../../../../components/tables/caja/CierreCajaTable";
import { CerrarCaja } from "../../../../components/admin/caja/CerrarCaja";

interface Props {
  cajas: ICaja[];
}

const CierreCajaPage: FC<Props> = ({ cajas }) => {
  return (
    <AdminLayout title="Cierre de Cajas">
      <h1>CierreCajaPage</h1>
      <CerrarCaja cajas={cajas} />
      <CierreCajaTable />
    </AdminLayout>
  );
};

export default CierreCajaPage;
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from "next";
import { prisma } from "../../../../database";
import { ICaja } from "../../../../interfaces";
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cajas = await prisma.caja.findMany();

  return {
    props: {
      cajas: JSON.parse(JSON.stringify(cajas)),
    },
  };
};
