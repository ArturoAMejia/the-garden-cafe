import React, { FC } from "react";
import { GetServerSideProps } from "next";

import { AdminLayout } from "../../../../components/Layout/AdminLayout";
import { IVenta } from "../../../../interfaces";

import { prisma } from "../../../../database";
import format from "date-fns/format";
import es from "date-fns/locale/es";
import { DetallePedido } from "../../../../components";

interface Props {
  detalle: IVenta;
}
const DetalleVentaPage: FC<Props> = ({ detalle }) => {
  return (
    <AdminLayout title="Detalle Venta">
      <div className="px-1 sm:flex-auto">
        <h1 className="mb-2 text-2xl font-semibold text-gray-900">
          Venta - {detalle.id}
        </h1>

        <div className="grid grid-cols-2 gap-2">
          <p className="text-xl font-bold">
            No Comprobante:{" "}
            <span className="text-lg font-medium capitalize">
              {detalle.comprobante?.numeracion}
            </span>
          </p>
          <p className="text-xl font-bold">
            Fecha de Venta:{" "}
            <span className="text-lg font-medium">
              {format(
                new Date(detalle.fecha_venta),
                "EEEE dd 'de' MMMM 'del' yyyy",
                { locale: es }
              )}
            </span>
          </p>
          <p className="text-xl font-bold">
            Cliente:{" "}
            <span className="text-lg font-medium capitalize">
              {detalle.cliente?.persona?.nombre}{" "}
              {detalle.cliente?.persona?.apellido_razon_social}
            </span>
          </p>
          <p className="text-xl font-bold">
            Motivo de Venta:{" "}
            <span className="text-lg font-medium capitalize">
              {detalle.comprobante?.descripcion}
            </span>
          </p>
        </div>
      </div>
      <DetallePedido
        detalle={detalle.detalle_venta}
        subtotal={detalle.subtotal}
        impuesto={detalle.impuesto}
        total={detalle.total}
      />
    </AdminLayout>
  );
};

export default DetalleVentaPage;

export const getServerSideProps: GetServerSideProps = async ({
  query: { id },
}) => {
  await prisma.$connect();
  const detalle = await prisma.venta.findFirst({
    select: {
      id: true,
      id_comprobante: true,
      id_cliente: true,
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
      comprobante: true,
      id_trabajador: true,
      trabajador: {
        select: {
          id: true,
          id_estado: true,
          codigo_inss: true,
          id_estado_civil: true,
          estado_civil: true,
          id_persona: true,
          persona: true,
          fecha_ingreso: true,
        },
      },
      fecha_venta: true,
      id_estado: true,
      cat_estado: true,
      detalle_venta: {
        select: {
          id_producto: true,
          id_producto_elaborado: true,
          producto_elaborado: true,
          monto: true,
          cantidad: true,
          precio: true,
        },
      },
      descuento: true,
      impuesto: true,
      subtotal: true,
      total: true,
    },
    where: {
      id: Number(id),
    },
  });
  await prisma.$disconnect();

  return {
    props: {
      detalle: JSON.parse(JSON.stringify(detalle)),
    },
  };
};
