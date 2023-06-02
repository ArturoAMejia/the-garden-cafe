import { FC, useEffect } from "react";
import { GetServerSideProps } from "next";
import { prisma } from "@/database";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { IOrdenCompra, ISolicitudCompra } from "@/interfaces";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { AppState } from "@/store/store";
import { cargarSolicitud } from "@/store/slices/compra";
import { useObtenerIngredientesQuery } from "@/store/slices/inventario";

import { RecepcionOrdenCompraProducto } from "@/components/tables/compra/recepcion-orden-compra/RecepcionOrdenCompraTable";
import { CrearRecepcionOrdenCompra } from "@/components/admin/compra/recepcion-orden-compra/CrearRecepcionOrdenCompra";

interface Props {
  detalle: IOrdenCompra;
  recepcion?: any;
  detalle_recepcion?: any;
}
const DetalleSolicitudCompra: FC<Props> = ({
  detalle,
  recepcion,
  detalle_recepcion,
}) => {
  console.log(detalle_recepcion);

  const { productos } = useAppSelector((state: AppState) => state.compra);
  const dispatch = useAppDispatch();

  const { data: prod, isLoading } = useObtenerIngredientesQuery();

  useEffect(() => {
    dispatch(
      cargarSolicitud(
        detalle.detalle_orden_compra.map((producto) => ({
          id: producto.id_producto,
          nombre: producto.producto.nombre,
          descripcion: producto.producto.descripcion,
          unidad_medida: producto.producto.unidad_medida.nombre,
          precio: producto.precio_unitario,
          cantidad: producto.cantidad,
        }))
      )
    );
  }, [dispatch, detalle.detalle_orden_compra]);

  return (
    <AdminLayout title={`Detalle Solicitud de Compra - ${detalle.id}`}>
      <div className="sm:flex sm:items-center">
        <div className="px-1 sm:flex-auto">
          <h1 className="mb-2 text-2xl font-semibold text-gray-900">
            Orden Nº - {detalle.id}
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
              Tipo de Orden de Compra:{" "}
              <span className="text-lg font-medium capitalize">
                {detalle.tipo_orden_compra.nombre}
              </span>
            </p>
            {/* <p className="text-xl font-bold">
              Observación:{" "}
              <span className="text-lg font-medium capitalize">
                {detalle.observacion}
              </span>
            </p> */}
            <p className="text-xl font-bold">
              Estado:{" "}
              <span className="text-lg font-medium capitalize">
                {detalle.cat_estado.nombre}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4 md:flex-row">
        <div className="w-full">
          <RecepcionOrdenCompraProducto
            productos={productos}
            detalle_recepcion={detalle_recepcion}
            id_estado_solicitud={detalle.id_estado}
          />
        </div>
      </div>
      {detalle.id_estado === 13 ? (
        <CrearRecepcionOrdenCompra orden_compra={detalle} />
      ) : (
        ""
      )}
    </AdminLayout>
  );
};

export default DetalleSolicitudCompra;

export const getServerSideProps: GetServerSideProps = async ({
  query: { id },
}) => {
  await prisma.$connect();

  const detalle = await prisma.orden_compra.findFirst({
    select: {
      id: true,
      id_estado: true,
      cat_estado: true,
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
      id_comprobante: true,
      descuento: true,
      impuesto: true,
      subtotal: true,
      total: true,
      comprobante: true,
      fecha_orden: true,
      id_tipo_orden_compra: true,
      tipo_orden_compra: true,
      detalle_orden_compra: {
        select: {
          id_producto: true,
          producto: {
            select: {
              id: true,
              nombre: true,
              descripcion: true,
              unidad_medida: true,
            },
          },
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

  let recepcion = null;
  let detalle_recepcion = null;
  if (detalle.id_estado === 17) {
    recepcion = await prisma.recepcion_compra.findFirst({
      where: {
        id_orden_compra: Number(id),
      },
    });

    detalle_recepcion = await prisma.detalle_recepcion_compra.findMany({
      select: {
        id_producto: true,
        producto: {
          select: {
            id: true,
            nombre: true,
            descripcion: true,
            unidad_medida: {
              select: {
                nombre: true,
              },
            },
          },
        },
        cantidad_recibida: true,
        cantidad_solicitada: true,
      },
    });
  }

  return {
    props: {
      detalle: JSON.parse(JSON.stringify(detalle)),
      recepcion: JSON?.parse(JSON.stringify(recepcion)),
      detalle_recepcion: JSON?.parse(JSON.stringify(detalle_recepcion)),
    },
  };
};
