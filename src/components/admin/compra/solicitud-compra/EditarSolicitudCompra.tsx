import { FC, Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import { AdminContext, AuthContext } from "../../../../context";
import { useCrearSolicitudCompraMutation } from "@/store/slices/compra/compraApi";
import { ISolicitudCompra } from "@/interfaces";

interface Props {
  solicitud: ISolicitudCompra;
}

type FormData = {
  fecha_vigencia: Date;
  motivo: string;
  id_tipo_orden_compra: number;
};

export const EditarSolicitudCompra: FC<Props> = ({ solicitud }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(!isOpen);
  const openModal = () => setIsOpen(!isOpen);

  console.log(solicitud);

  const { user } = useContext(AuthContext);

  const [crearSolicitudCompra] = useCrearSolicitudCompraMutation();

  const { productos, subtotal, solicitudCompleta, total, tax } =
    useContext(AdminContext);
  const { register, handleSubmit, reset } = useForm<FormData>();

  const trabajador_id = Number(user?.id);

  const onCrearNuevaOrdenCompra = async ({
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
        closeModal();
        reset();
        solicitudCompleta();
      })
      .catch((error) => toast.error(error.data.message));
  };

  return (
    <>
      <div className="mt-4 px-2">
        <button
          disabled={productos.length === 0 ? true : false}
          type="button"
          onClick={openModal}
          className="rounded-lg bg-lime-600 px-4 py-2 text-sm font-medium text-white  hover:bg-lime-700"
        >
          Realizar Solicitud de Compra
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="h-auto w-full max-w-6xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900"
                  >
                    Solicitud de Compra
                  </Dialog.Title>

                  <form
                    className="h-3/4 w-full"
                    //  TODO Función para añadir la orden
                    onSubmit={handleSubmit(onCrearNuevaOrdenCompra)}
                  >
                    <div className="flex flex-col gap-4 md:grid md:grid-cols-3">
                      {/* Descripción */}
                      <div className="col-span-2 mt-2">
                        <label
                          htmlFor="direccion"
                          className="block font-medium text-gray-700"
                        >
                          Descripción de Solicitud de Compra
                        </label>
                        <div className="mt-1">
                          <textarea
                            rows={2}
                            id="direccion"
                            className="block w-full resize-none rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            {...register("motivo")}
                          />
                        </div>
                      </div>
                      {/* Proveedor */}
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
                    </div>
                    <button
                      type="submit"
                      className="mt-4 inline-flex items-center rounded-md border border-transparent bg-[#388C04] px-4 py-2 font-medium text-white shadow-sm"
                    >
                      Realizar Solicitud Orden de Compra
                      <PlusCircleIcon
                        className="ml-2 -mr-1 h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                    <button
                      type="button"
                      className="mt-4 ml-10 inline-flex items-center rounded-md border border-transparent bg-[#CA1514] px-4 py-2 font-medium text-white shadow-sm"
                      onClick={closeModal}
                    >
                      Cancelar
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
