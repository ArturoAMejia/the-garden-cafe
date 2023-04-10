import { GetServerSideProps } from "next";
import { prisma } from "@/database";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { FC, useContext } from "react";
import { ISolicitudCompra } from "@/interfaces";
import { DetallePedido, FilterBar, ResumenPedido } from "@/components";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Props {
  detalle: ISolicitudCompra;
}
const DetalleSolicitudCompra: FC<Props> = ({ detalle }) => {
  return (
    <AdminLayout title={`Detalle Solicitud de Compra - ${detalle.id}`}>
      <div className="px-1 sm:flex-auto">
        <h1 className="mb-2 text-2xl font-semibold text-gray-900">
          Solicitud Nº - {detalle.id}
        </h1>

        <div className="grid grid-cols-2 gap-2">
          <p className="text-xl font-bold">
            Trabajador:{" "}
            <span className="text-lg font-medium capitalize">
              {detalle.trabajador?.persona?.nombre}{" "}
              {detalle.trabajador?.persona?.apellido_razon_social}
            </span>
          </p>
          <p className="text-xl font-bold">
            Fecha de Solicitud:{" "}
            <span className="text-lg font-medium">
              {format(
                new Date(detalle.fecha_solicitud),
                "EEEE dd 'de' MMMM 'del' yyyy",
                { locale: es }
              )}
            </span>
          </p>

          <p className="text-xl font-bold">
            Tipo de Orden de Compra:{" "}
            <span className="text-lg font-medium capitalize">
              {detalle.motivo}
            </span>
          </p>
        </div>
      </div>
      <DetallePedido
        detalle={detalle.detalle_solicitud_compra}
        subtotal={detalle.subtotal}
        impuesto={detalle.impuesto}
        total={detalle.total}
      />
    </AdminLayout>
  );
};

export default DetalleSolicitudCompra;

export const getServerSideProps: GetServerSideProps = async ({
  query: { id },
}) => {
  await prisma.$connect();

  const detalle = await prisma.solicitud_compra.findFirst({
    select: {
      id: true,
      id_estado: true,
      cat_estado: true,
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
      id_comprobante: true,
      descuento: true,
      impuesto: true,
      subtotal: true,
      total: true,
      comprobante: true,
      fecha_solicitud: true,
      fecha_vigencia: true,
      cantidad: true,
      motivo: true,
      detalle_solicitud_compra: {
        select: {
          id_producto: true,
          producto: true,
          monto: true,
          cantidad: true,
          precio_unitario: true,
        },
      },
    },
    where: {
      id: Number(id),
    },
  });

  return {
    props: {
      detalle: JSON.parse(JSON.stringify(detalle)),
    },
  };
};
