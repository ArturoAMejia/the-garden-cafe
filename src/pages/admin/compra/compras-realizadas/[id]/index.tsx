import { GetServerSideProps } from "next";
import React, { FC } from "react";

interface Props {
  detalle: ICompra;
}
const DetalleCompraPage: FC<Props> = ({ detalle }) => {
  return (
    <AdminLayout title={`Compra ${detalle.id}`}>
      <div>
        <div className="px-1 sm:flex-auto">
          <h1 className="mb-2 text-2xl font-semibold text-gray-900">
            Compra - {detalle.id}
          </h1>

          <div className="grid grid-cols-2 gap-2">
            <p className="text-xl font-bold">
              No Comprobante:{" "}
              <span className="text-lg font-medium capitalize">
                {detalle.comprobante?.numeracion}
              </span>
            </p>
            <p className="text-xl font-bold">
              Fecha de Compra:{" "}
              <span className="text-lg font-medium">
                {format(
                  new Date(detalle.fecha_compra),
                  "EEEE dd 'de' MMMM 'del' yyyy",
                  { locale: es }
                )}
              </span>
            </p>
            <p className="text-xl font-bold">
              Proveedor:{" "}
              <span className="text-lg font-medium capitalize">
                {detalle.proveedor?.persona?.nombre}{" "}
                {detalle.proveedor?.persona?.apellido_razon_social}
              </span>
            </p>
            <p className="text-xl font-bold">
              Motivo de Compra:{" "}
              <span className="text-lg font-medium capitalize">
                {detalle.comprobante?.descripcion}
              </span>
            </p>
          </div>
        </div>
      </div>
      <DetalleOrden
        detalles={detalle.detalle_compra}
        subtotal={detalle.subtotal}
        tax={detalle.impuesto}
        total={detalle.total}
      />
    </AdminLayout>
  );
};

export default DetalleCompraPage;

import { prisma } from "../../../../../database";
import { ICompra } from "../../../../../interfaces";
import es from "date-fns/locale/es";
import format from "date-fns/format";
import { AdminLayout } from "../../../../../components/Layout/AdminLayout";
import { DetalleOrden } from "../../../../../components";
export const getServerSideProps: GetServerSideProps = async ({
  query: { id },
}) => {
  await prisma.$connect();
  const detalle = await prisma.compra.findFirst({
    select: {
      id: true,
      id_comprobante: true,
      id_proveedor: true,
      proveedor: {
        select: {
          id: true,
          id_estado: true,
          cat_estado: true,
          id_persona: true,
          persona: true,
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
      fecha_compra: true,
      id_estado: true,
      cat_estado: true,
      detalle_compra: {
        select: {
          id_producto: true,
          producto: true,
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
