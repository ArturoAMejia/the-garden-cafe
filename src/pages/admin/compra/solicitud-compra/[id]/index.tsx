import { FC, useEffect } from "react";
import { GetServerSideProps } from "next";
import { prisma } from "@/database";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { ISolicitudCompra } from "@/interfaces";
import { format } from "date-fns";
import { es, id } from "date-fns/locale";
import { ResumenSolicitudCompra } from "@/components/admin/compra/solicitud-compra/ResumenSolicitudCompra";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { AppState } from "@/store/store";
import {
  añadirProductoSolicitud,
  cargarSolicitud,
} from "@/store/slices/compra";
import { ResumenSolicitud } from "@/components/admin/compra/solicitud-compra/ResumenSolicitud";
import { AceptarOrden, FilterBar } from "@/components";
import { useObtenerIngredientesQuery } from "@/store/slices/inventario";
import { AceptarSolicitudCompra } from "@/components/admin/compra/solicitud-compra/AceptarSolicitudCompra";
import { useSession } from "next-auth/react";

interface Props {
  detalle: ISolicitudCompra;
}
const DetalleSolicitudCompra: FC<Props> = ({ detalle }) => {
  const { productos } = useAppSelector((state: AppState) => state.compra);
  const dispatch = useAppDispatch();

  const { data: session } = useSession();

  const { data: prod, isLoading } = useObtenerIngredientesQuery();

  useEffect(() => {
    dispatch(
      cargarSolicitud(
        detalle.detalle_solicitud_compra.map((producto) => ({
          id: producto.id_producto,
          nombre: producto.producto.nombre,
          descripcion: producto.producto.descripcion,
          unidad_medida: producto.producto.unidad_medida.nombre,
          precio: producto.precio_unitario,
          cantidad: producto.cantidad,
        }))
      )
    );
  }, [dispatch, detalle.detalle_solicitud_compra]);

  return (
    <AdminLayout title={`Detalle Solicitud de Compra - ${detalle.id}`}>
      <div className="sm:flex sm:items-center">
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
                {detalle.tipo_orden_compra.nombre}
              </span>
            </p>
            <p className="text-xl font-bold">
              Observación:{" "}
              <span className="text-lg font-medium capitalize">
                {detalle.observacion}
              </span>
            </p>
            <p className="text-xl font-bold">
              Estado:{" "}
              <span className="text-lg font-medium capitalize">
                {detalle.cat_estado.nombre}
              </span>
            </p>
          </div>
        </div>
        {/* // TODO Mostrar unicamente a los roles asignados  */}
        {detalle.id_estado !== 14 ? (
          detalle.id_estado !== 7 ? (
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              {isLoading ? (
                <>Cargando...</>
              ) : (
                <FilterBar
                  isIngredient={true}
                  isPlate={false}
                  productos={prod!}
                  añadirProductoOrden={añadirProductoSolicitud}
                />
              )}
            </div>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>

      <div className="mt-4 flex flex-col gap-4 md:flex-row">
        <div className="w-full">
          <ResumenSolicitudCompra
            productos={productos}
            id_estado_solicitud={detalle.id_estado}
          />
          {session?.user.id_rol === 1 ||
          session?.user.id_rol === 2 ||
          session?.user.id_rol === 8 ? (
            detalle.id_estado === 14 ? (
              <AceptarOrden solicitud_compra={detalle} />
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
        {detalle.id_estado !== 7 ? (
          <div className="w-96">
            <ResumenSolicitud editar_solicitud={true} detalle={detalle} />
          </div>
        ) : (
          ""
        )}
      </div>
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
      id_tipo_orden_compra: true,
      observacion: true,
      tipo_orden_compra: true,
      fecha_vigencia: true,
      cantidad: true,
      motivo: true,
      detalle_solicitud_compra: {
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

  return {
    props: {
      detalle: JSON.parse(JSON.stringify(detalle)),
    },
  };
};
