import { useAppDispatch } from "@/hooks/hooks";
import { IMesa, IReservacion } from "@/interfaces";
import { seleccionarMesa } from "@/store/slices/pedido/pedidoSlice";
import {
  useObtenerMesasQuery,
  useObtenerClientesQuery,
  useCrearReservacionMutation,
} from "@/store/slices/venta";
import { Transition, Dialog } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { FC, Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { GiTable } from "react-icons/gi";

import { AgregarCliente } from "../cliente/AgregarCliente";
import { Loader } from "@/components/ui/Loader";

interface Props {
  mesa: IMesa;
}

type FormData = IReservacion;

const Mesa: FC<Props> = ({ mesa }) => {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    if (mesa.id_estado === 2) {
      toast.error("Mesa no disponible.");
      return;
    }

    dispatch(seleccionarMesa({ id_mesa: mesa.id }));
    setIsOpen(!isOpen);
  };
  const closeModal = () => setIsOpen(!isOpen);

  const { register, handleSubmit, reset } = useForm<FormData>();

  const { data: mesas, isLoading: isLoadingMesas } = useObtenerMesasQuery();

  const { data: clientes, isLoading } = useObtenerClientesQuery();

  const [crearReservacion] = useCrearReservacionMutation();

  const onRegistrarNuevaReservacion = async (data: FormData) => {
    toast.promise(
      crearReservacion({ ...data, id_mesa: mesa.id })
        .unwrap()
        .then(() => {
          closeModal();
          reset();
        }),
      {
        loading: "Registrando nueva reservación...",
        success: () => {
          return "Reservación creada satisfactoriamente.";
        },
        error: (err) => {
          return `No se pudo registrar la reservación. ${err.data.message}`;
        },
      }
    );
  };

  if (isLoading) return <Loader />;
  if (isLoadingMesas) return <Loader />;
  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={openModal}
          className="flex flex-col items-center justify-center rounded-md border border-transparent px-4 text-sm font-medium shadow-md sm:w-auto"
        >
          <p className="text-black">{mesa.nombre}</p>
          <GiTable
            size="10em"
            style={{
              color: mesa.id_estado === 1 ? "#22c55e" : "#be123c",
              paddingTop: "0",
            }}
          />
          <p className="text-black">
            {mesa.id_estado === 1 ? "Disponible" : "Ocupada"}
          </p>
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
                    Agregar Nueva Reservación
                  </Dialog.Title>

                  <form onSubmit={handleSubmit(onRegistrarNuevaReservacion)}>
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
                            {...register("id_cliente")}
                          >
                            {clientes?.map((cliente) => (
                              <option
                                key={`${cliente.tipo_cliente} ${cliente.id_persona}`}
                                value={cliente.id}
                              >
                                {`${cliente.persona?.nombre} ${cliente.persona?.apellido_razon_social}`}
                              </option>
                            ))}
                          </select>
                          <AgregarCliente showMin={true} />
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
                          />
                        </div>
                      </div>
                      {/* Fecha y hora a Reservar */}
                      <div className="mt-2">
                        <label
                          htmlFor="fecha_reservacion"
                          className="block font-medium text-gray-700"
                        >
                          Fecha y Hora a Reservar
                        </label>
                        <div className="mt-1">
                          <input
                            type="datetime-local"
                            id="fecha_reservacion"
                            {...register("fecha_reservacion", {
                              valueAsDate: true,
                            })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                          />
                        </div>
                      </div>
                      <div className="mt-2">
                        <label
                          htmlFor="total_adultos"
                          className="block font-medium text-gray-700"
                        >
                          Total Adultos
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            id="total_adultos"
                            {...register("adultos", {
                              valueAsNumber: true,
                            })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                      <div className="mt-2">
                        <label
                          htmlFor="total_menores"
                          className="block font-medium text-gray-700"
                        >
                          Total Niños
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            id="total_menores"
                            {...register("menores", {
                              valueAsNumber: true,
                            })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                      </div>

                      {/* Hora a reservar
                      <div className="mt-2">
                        <label
                          htmlFor="fecha_reservacion"
                          className="block font-medium text-gray-700"
                        >
                          Hora a Reservar
                        </label>
                        <div className="mt-1">
                          <input
                            type="time"
                            id="hora_reserva"
                            {...register("hora_reserva")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                      </div> */}
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
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="mt-4 inline-flex items-center rounded-md border border-transparent bg-[#388C04] px-4 py-2 font-medium text-white shadow-sm"
                    >
                      Agregar Nueva Reservación
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

export default Mesa;
