import { FC, useContext } from "react";
import {  useAppSelector } from "@/hooks/hooks";
import {
  useActualizarSolicitudCompraMutation,
  useCrearSolicitudCompraMutation,
  useObtenerTiposSolicitudCompraQuery,
} from "@/store/slices/compra";
import { AppState } from "@/store/store";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormData = {
  fecha_vigencia: Date;
  motivo: string;
  observacion: string;
  id_tipo_orden_compra: number;
};

interface Props {
  editar_solicitud: boolean;
  detalle?: any;
}
export const ResumenSolicitud: FC<Props> = ({ editar_solicitud, detalle }) => {
  const { data: session } = useSession();

  const trabajador_id = Number(session?.user?.id_trabajador);

  const { productos, total, impuesto, subtotal } = useAppSelector(
    (state: AppState) => state.compra
  );
  const { register, handleSubmit, reset } = useForm<FormData>();

  const { data: tipo_solicitud, isLoading } =
    useObtenerTiposSolicitudCompraQuery();

  const [crearSolicitudCompra] = useCrearSolicitudCompraMutation();

  const [actualizarSolicitud] = useActualizarSolicitudCompraMutation();

  const onCrearSolicitudCompra = async ({
    fecha_vigencia,
    id_tipo_orden_compra,
    motivo,
    observacion,
  }: FormData) => {
    if (editar_solicitud) {
      actualizarSolicitud({
        id: detalle.id,
        fecha_vigencia,
        motivo,
        productos,
        id_comprobante: detalle.id_comprobante,
        id_trabajador: trabajador_id,
        impuesto,
        id_tipo_orden_compra,
        subtotal,
        observacion,
        total,
      })
        .unwrap()
        .then((res) => {
          toast.success("Solicitud de Compra actualizada correctamente.");
          reset();
        })
        .catch((error) => toast.error(error.data.message));
    } else {
      crearSolicitudCompra({
        fecha_vigencia,
        motivo,
        productos,
        id_trabajador: trabajador_id,
        impuesto,
        id_tipo_orden_compra,
        subtotal,
        observacion,
        total,
      })
        .unwrap()
        .then((res) => {
          toast.success("Solicitud de Compra realizada correctamente.");
          reset();
        })
        .catch((error) => toast.error(error.data.message));
    }
  };

  if (isLoading) return <p>Cargando...</p>;

  return (
    <>
      <form
        className="rounded-md bg-gray-100 p-8 pt-4 first-letter:shadow-md"
        onSubmit={handleSubmit(onCrearSolicitudCompra)}
      >
        <div className="space-y-6">
          <ul className="space-y-4">
            <div className="col-span-2 mt-2">
              <label
                htmlFor="direccion"
                className="block font-medium text-gray-700"
              >
                Descripción de Solicitud
              </label>
              <div className="mt-1">
                <textarea
                  rows={6}
                  id="direccion"
                  defaultValue={detalle?.motivo}
                  className="block w-full resize-none rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  {...register("motivo")}
                />
              </div>
            </div>
            <div className="col-span-2 mt-2">
              <label
                htmlFor="direccion"
                className="block font-medium text-gray-700"
              >
                Observación
              </label>
              <div className="mt-1">
                <textarea
                  rows={6}
                  id="direccion"
                  defaultValue={detalle?.observacion}
                  className="block w-full resize-none rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  {...register("observacion")}
                />
              </div>
            </div>
            <div className="mt-2">
              <label
                htmlFor="tipo_orden_compra"
                className="block font-medium text-gray-700"
              >
                Tipo Orden Compra
              </label>
              <div className="mt-1">
                <select
                  id="tipo_orden_compra"
                  {...register("id_tipo_orden_compra", {
                    valueAsNumber: true,
                  })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  defaultValue={detalle?.id_tipo_orden_compra}
                >
                  {tipo_solicitud?.map((tipo_orden_compra) => (
                    <option
                      key={tipo_orden_compra.id}
                      value={tipo_orden_compra.id}
                    >{`${tipo_orden_compra.nombre} `}</option>
                  ))}
                </select>
              </div>
            </div>
            {/* Fecha Vigencia */}
            <div className="mt-2">
              <label
                htmlFor="fecha_vigencia"
                className="block  font-medium text-gray-700"
              >
                Fecha Vigencia
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  type="date"
                  id="fecha_vigencia"
                  defaultValue={
                    detalle?.fecha_vigencia
                      ? detalle?.fecha_vigencia.toLocaleString().split("T")[0]
                      : undefined
                  }
                  {...register("fecha_vigencia")}
                />
              </div>
            </div>
          </ul>
          <div className="flex justify-center space-y-4">
            <button
              disabled={productos.length === 0 ? true : false}
              type="submit"
              className="mt-4 w-full items-center rounded-md border border-transparent bg-[#388C04] px-4 py-1 text-center font-medium text-white shadow-sm"
            >
              {editar_solicitud ? "Actualizar Solicitud" : "Realizar Solicitud"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
