import React, { FC } from "react";
import { AdminLayout } from "../../../components/Layout/AdminLayout";
import { VentasTable } from "../../../components/tables/ventas/VentasTable";

interface Props {
  ventas: IVenta[];
}
const VentaIndex: FC<Props> = ({ ventas }) => {
  return (
    <AdminLayout title="Ventas Realizadas">
        <h1 className="mb-4 text-2xl font-bold">Ventas Realizadas</h1>

      <VentasTable ventas={ventas} />
    </AdminLayout>
  );
};

export default VentaIndex;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from "next";
import { prisma } from "../../../database";
import { IVenta } from "../../../interfaces";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const ventas = await prisma.venta.findMany({
    select: {
      id: true,
      cliente: {
        select: {
          id: true,
          id_estado: true,
          cat_estado: true,
          id_persona: true,
          persona: true,
          tipo_cliente: true,
        },
      },
      id_trabajador: true,
      trabajador: {
        select: {
          id: true,
          id_persona: true,
          persona: true,
          id_estado_civil: true,
          id_estado: true,
        },
      },
      id_pedido: true,
      pedido: true,
      id_comprobante: true,
      comprobante: true,
      id_moneda: true,
      moneda: true,
      id_cat_forma_pago: true,
      cat_forma_pago: true,
      id_estado: true,
      cat_estado: true,
      tipo_venta: true,
      fecha_venta: true,
      subtotal: true,
      descuento: true,
      impuesto: true,
      total: true,
      detalle_venta: true,
    },
  });

  return {
    props: {
      ventas: JSON.parse(JSON.stringify(ventas)),
    },
  };
};
