import React, { FC } from "react";
import { AdminLayout } from "../../../../components/Layout/AdminLayout";
import { NuevaCompraTable } from "../../../../components/tables/compra/nueva-compra/NuevaCompraTable";

import { prisma } from "../../../../database";

const NuevaCompraPage = () => {
  return (
    <AdminLayout title="Nueva Compra">
      <h1 className="mb-4 text-2xl font-bold">Nueva Compra</h1>
      <NuevaCompraTable/>
    </AdminLayout>
  );
};

export default NuevaCompraPage;

import { GetServerSideProps } from "next";
import { IOrdenCompra } from "../../../../interfaces";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await prisma.$connect();
  const ordenes = await prisma.orden_compra.findMany({
    select: {
      id: true,
      id_proveedor: true,
      proveedor: {
        select: {
          id: true,
          id_persona: true,
          persona: true,
          id_estado: true,
          cat_estado: true,
          sector_comercial: true,
          nacionalidad: true,
        },
      },
      id_tipo_orden_compra: true,
      tipo_orden_compra: true,
      id_comprobante: true,
      comprobante: true,
      id_estado: true,
      cat_estado: true,
      id_solicitud_compra: true,
      solicitud_compra: true,
      autorizado_por: true,
      trabajador: {
        select: {
          id: true,
          id_persona: true,
          persona: true,
          id_estado_civil: true,
          id_estado: true,
        },
      },
      num_orden: true,
      subtotal: true,
      descuento: true,
      impuesto: true,
      total: true,
      fecha_orden: true,
      detalle_orden_compra: {
        select: {
          id_producto: true,
          producto: true,
          monto: true,
          cantidad: true,
          precio_unitario: true,
        },
      },
    },
  });
  await prisma.$disconnect();

  return {
    props: {
      ordenes: JSON.parse(JSON.stringify(ordenes)),
    },
  };
};
