import React, { FC } from "react";
import { AdminLayout } from "../../../../components/Layout/AdminLayout";
import { AperturaCajaTable } from "../../../../components/tables/caja/AperturaCajaTable";
import { AbrirCaja } from "../../../../components/admin/caja/AbrirCaja";

interface Props {
  cajas: ICaja[];
}
const AperturaCajaIndex: FC<Props> = ({ cajas }) => {
  return (
    <AdminLayout title="Aperturas de Caja">
      <h1>Aperturas de caja</h1>
      <AbrirCaja cajas={cajas} />
      <AperturaCajaTable />
    </AdminLayout>
  );
};

export default AperturaCajaIndex;

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
