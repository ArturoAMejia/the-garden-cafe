import { AdminContext, AuthContext } from "@/context";
import { useCrearSolicitudCompraMutation } from "@/store/slices/compra";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormData = {
  fecha_vigencia: Date;
  motivo: string;
  id_tipo_orden_compra: number;
};

export const ResumenSolicitud = () => {

  const { data: session } = useSession();

  const trabajador_id = Number(session.user.id);

  const { productos, subtotal, solicitudCompleta, total, tax } =
    useContext(AdminContext);

  const { register, handleSubmit, reset } = useForm<FormData>();

  const [crearSolicitudCompra] = useCrearSolicitudCompraMutation();

  const onCrearSolicitudCompra = async ({
    fecha_vigencia,
    id_tipo_orden_compra,
    motivo,
  }: FormData) => {
    crearSolicitudCompra({
      fecha_vigencia,
      motivo,
      productos,
      id_trabajador: trabajador_id,
      impuesto: tax,
      subtotal,
      total,
    })
      .unwrap()
      .then((res) => {
        toast.success("Solicitud de Compra realizada correctamente.");
        reset();
        solicitudCompleta();
      })
      .catch((error) => toast.error(error.data.message));
  };

  return (
    <>
      <form
        className="mt-8 w-max rounded-md bg-gray-100 p-8 pt-4 first-letter:shadow-md"
        onSubmit={handleSubmit(onCrearSolicitudCompra)}
      >
        <div className="mt-6 space-y-6">
          <ul className="space-y-4">
            <div className="col-span-2 mt-2">
              <label
                htmlFor="direccion"
                className="block font-medium text-gray-700"
              >
                Descripción de Solicitud de Compra
              </label>
              <div className="mt-1">
                <textarea
                  rows={6}
                  id="direccion"
                  className="block w-full resize-none rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  {...register("motivo")}
                />
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
              Realizar Solicitud
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
