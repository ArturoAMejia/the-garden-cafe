import { Transition, Dialog } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { FC, Fragment, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { IReservacion } from "../../../../interfaces";
import { AdminContext } from "../../../../context";
import { toast } from "react-hot-toast";
import {
  useActualizarReservacionMutation,
  useObtenerClientesQuery,
} from "@/store/slices/venta";

type FormData = IReservacion;

interface Props {
  reservacion: IReservacion;
}

export const EditarReservacion: FC<Props> = ({ reservacion }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(!isOpen);
  const openModal = () => setIsOpen(!isOpen);
  const { register, handleSubmit, reset } = useForm<FormData>();

  const { data: clientes } = useObtenerClientesQuery();

  const [actualizarReservacion, { isError, isLoading }] =
    useActualizarReservacionMutation();

  const onActualizarReservacion = async (data: FormData) => {
    try {
      await actualizarReservacion({
        ...data,
        id: reservacion.id,
      }).unwrap();
      toast.success("Reservación actualizada satisfactoriamente.");
      closeModal();
      reset();
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <>
      <div className="mx-2">
        <button
          type="button"
          onClick={openModal}
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#388C04] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#8CA862] sm:w-auto"
        >
          Editar
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
                <Dialog.Panel className="h-auto w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900"
                  >
                    Editar Reservación
                  </Dialog.Title>

                  <form onSubmit={handleSubmit(onActualizarReservacion)}>
                    <div className="grid grid-cols-4 gap-4">
                      {/* Cliente */}
                      <div className="mt-2">
                        <label
                          htmlFor="cliente"
                          className="block font-medium text-gray-700"
                        >
                          Cliente
                        </label>
                        <div className="mt-1 flex flex-row">
                          <select
                            id="cliente"
                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                            {...register("id_cliente", {
                              valueAsNumber: true,
                            })}
                          >
                            {clientes?.map((cliente) => (
                              <option
                                key={`${cliente.tipo_cliente} ${cliente.id_persona}`}
                                value={cliente.id}
                                defaultValue={reservacion.id_cliente}
                              >
                                {`${cliente.persona?.nombre} ${cliente.persona?.apellido_razon_social}`}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {/* Tipo Reservacion */}
                      <div className="mt-2">
                        <label
                          htmlFor="tipo_reservacion"
                          className="block font-medium text-gray-700"
                        >
                          Tipo Reservacion
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="tipo_reservacion"
                            {...register("tipo_reservacion")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            defaultValue={reservacion.tipo_reservacion}
                          />
                        </div>
                      </div>
                      {/* Horas reservadas */}
                      <div className="mt-2">
                        <label
                          htmlFor="horas_reservadas"
                          className="block font-medium text-gray-700"
                        >
                          Horas Reservadas
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            id="horas_reservadas"
                            {...register("horas_reservadas")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            defaultValue={reservacion.horas_reservadas}
                          />
                        </div>
                      </div>
                      {/* <div className="mt-2">
                        <label
                          htmlFor="horas_reservadas"
                          className="block font-medium text-gray-700"
                        >
                          Total Personas
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            id="horas_reservadas"
                            {...register("total_personas")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            defaultValue={
                              reservacion.detalle_reservacion[0].total_personas
                            }
                          />
                        </div>
                      </div> */}
                      {/* Fecha de Nacimiento */}
                      <div className="mt-2">
                        <label
                          htmlFor="fecha_reservacion"
                          className="block font-medium text-gray-700"
                        >
                          Fecha a Reservar
                        </label>
                        <div className="mt-1">
                          <input
                            type="date"
                            id="fecha_reservacion"
                            {...register("fecha_reservacion", {
                              valueAsDate: true,
                            })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            defaultValue={
                              reservacion.fecha_reservacion
                                .toLocaleString()
                                .split("T")[0]
                            }
                          />
                        </div>
                      </div>
                      {/* Observaciones */}
                      <div className="col-span-2 mt-2">
                        <label
                          htmlFor="observaciones"
                          className="block font-medium text-gray-700"
                        >
                          Observaciones
                        </label>
                        <div className="mt-1">
                          <textarea
                            rows={2}
                            id="direccion"
                            className="block w-full resize-none rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            {...register("observaciones")}
                            defaultValue={
                              reservacion.detalle_reservacion.observaciones
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="mt-4 inline-flex items-center rounded-md border border-transparent bg-[#388C04] px-4 py-2 font-medium text-white shadow-sm"
                    >
                      Editar Reservación
                      <PlusCircleIcon
                        className="ml-2 -mr-1 h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                    <button
                      type="button"
                      className="mt-4 ml-16 inline-flex items-center rounded-md border border-transparent bg-[#CA1514] px-4 py-2 font-medium text-white shadow-sm"
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
