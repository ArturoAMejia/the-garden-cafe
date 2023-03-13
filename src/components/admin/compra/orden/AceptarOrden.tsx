import { Transition, Dialog } from "@headlessui/react";
import { EnvelopeIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { FC, Fragment, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AdminContext, AuthContext } from "../../../../context";
import { ISolicitudCompra } from "../../../../interfaces";

type FormData = {
  id_proveedor: number;
  id_tipo_orden_compra: number;
};

interface Props {
  solicitud_compra: ISolicitudCompra;
}

export const AceptarOrden: FC<Props> = ({ solicitud_compra }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(!isOpen);
  const openModal = () => setIsOpen(!isOpen);

  const { proveedores, tipos_orden_compra, aceptarSolicitudCompra } =
    useContext(AdminContext);

  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onAceptarSolicitud = async ({
    id_proveedor,
    id_tipo_orden_compra,
  }: FormData) => {
    // if (hasError) {
    //   toast.error(message!);
    //   return;
    // }

    const { hasError, message } = await aceptarSolicitudCompra(
      {
        id: 1,
        id_comprobante: solicitud_compra.id_comprobante,
        id_estado: 8,
        descuento: solicitud_compra.descuento,
        id_proveedor,
        id_tipo_orden_compra,
        impuesto: solicitud_compra.impuesto,
        subtotal: solicitud_compra.subtotal,
        total: solicitud_compra.total,
        fecha_orden: new Date(),
        id_solicitud_compra: solicitud_compra.id,
        autorizado_por: Number(user!.id),
        detalle_orden_compra: solicitud_compra.detalle_solicitud_compra,
        motivo: solicitud_compra.motivo,
      },
      solicitud_compra.detalle_solicitud_compra
    );

    if (hasError) {
      toast.error(message!);
      return;
    }

    toast.success("Solicitud aceptada correctamente.");

    closeModal();
    reset();
  };

  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={openModal}
          className="rounded-lg bg-lime-600 px-4 py-2 text-sm font-medium text-white  hover:bg-lime-700"
        >
          Aceptar
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
                    Aceptar Solicitud de Compra
                  </Dialog.Title>

                  <form
                    className="h-3/4 w-full"
                    onSubmit={handleSubmit(onAceptarSolicitud)}
                  >
                    <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                      {/* Proveedor */}
                      <div className="mt-2">
                        <label
                          htmlFor="proveedor"
                          className="block font-medium text-gray-700"
                        >
                          Proveedor
                        </label>
                        <div className="mt-1">
                          <select
                            id="proveedor"
                            {...register("id_proveedor", {
                              valueAsNumber: true,
                            })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          >
                            {proveedores.map((proveedor) => (
                              <option
                                key={proveedor.id}
                                value={proveedor.id}
                              >{`${proveedor.persona?.nombre} ${proveedor.persona?.apellido_razon_social}`}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {/* tipo_orden_compra */}
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
                          >
                            {tipos_orden_compra?.map((tipo_orden_compra) => (
                              <option
                                key={tipo_orden_compra.id}
                                value={tipo_orden_compra.id}
                              >{`${tipo_orden_compra.nombre} `}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="mt-4 inline-flex items-center rounded-md border border-transparent bg-[#388C04] px-4 py-2 font-medium text-white shadow-sm"
                    >
                      Aceptar Solicitud de Compra
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
