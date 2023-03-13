import React, { FC } from "react";
import { GetServerSideProps } from "next";
import { prisma } from "../../../../../database";
import { IOrdenCompra } from "../../../../../interfaces";
import { AdminLayout } from "../../../../../components/Layout/AdminLayout";
import { DetalleOrden, ResumenPedido } from "../../../../../components";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Props {
  detalle: IOrdenCompra;
}
const DetallePageOrden: FC<Props> = ({ detalle }) => {

  return (
    <AdminLayout title={`Detalle Orden Compra - ${detalle.id}`}>
      <div className="sm:flex-auto px-1">
        <h1 className="mb-2 text-2xl font-semibold text-gray-900">
          Orden de Compra - {detalle.id}
        </h1>

        <div className="grid grid-cols-2 gap-2">
          <p className="text-xl font-bold">
            No Comprobante:{" "}
            <span className="text-lg font-medium capitalize">
              {detalle.comprobante?.numeracion}
            </span>
          </p>
          <p className="text-xl font-bold">
            Fecha de Orden:{" "}
            <span className="text-lg font-medium">
              {format(
                new Date(detalle.fecha_orden),
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
            Motivo de Orden:{" "}
            <span className="text-lg font-medium capitalize">
              {detalle.comprobante?.descripcion}
            </span>
          </p>
        </div>
      </div>
      <DetalleOrden
        detalles={detalle.detalle_orden_compra}
        subtotal={detalle.subtotal}
        tax={detalle.impuesto}
        total={detalle.total}
      />
    </AdminLayout>
  );
};

export default DetallePageOrden;

export const getServerSideProps: GetServerSideProps = async ({ query: { id } }) => {
  await prisma.$connect();
  const detalle = await prisma.orden_compra.findFirst({
    select: {
      id: true,
      id_comprobante: true,
      comprobante: true,
      autorizado_por: true,
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
      fecha_orden: true,
      num_orden: true,
      id_estado: true,
      cat_estado: true,
      id_solicitud_compra: true,
      id_proveedor: true,
      proveedor: {
        select: {
          id: true,
          persona: true,
          id_persona: true,
          id_estado: true,
        },
      },
      id_tipo_orden_compra: true,
      tipo_orden_compra: true,
      detalle_orden_compra: {
        select: {
          id_producto: true,
          producto: true,
          monto: true,
          cantidad: true,
          precio_unitario: true,
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
