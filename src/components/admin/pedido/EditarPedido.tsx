import { Transition, Dialog } from "@headlessui/react";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { FC, Fragment, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { IPedido } from "../../../interfaces";
import { ResumenPedido } from "./ResumenPedido";
import { AdminContext, AuthContext, CartContext } from "../../../context";
import { FilterBar } from "./FilterBar";
import { useMenu } from "../../../hooks";
import { toast } from "react-hot-toast";
import { IProductoCart } from "../../../interfaces/producto";
import { ItemCounter } from "./ItemCounter";
import Image from "next/image";
import { useObtenerClientesQuery } from "@/store/slices/venta";

type FormData = IPedido;
interface Props {
  pedido: IPedido;
}

export const EditarPedido: FC<Props> = ({ pedido }) => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(!isOpen);
  const openModal = () => setIsOpen(!isOpen);

  const { cart, actualizarPedido } = useContext(CartContext);

  const { data: clientes, isLoading } = useObtenerClientesQuery();
  const { user } = useContext(AuthContext);

  const onActualizarPedido = async (data: FormData) => {
    const { hasError, message } = await actualizarPedido(
      pedido.id,
      data.id_cliente,
      Number(user!.id),
      data.tipo_pedido,
      data.ubicacion_entrega,
      data.observacion,
      cart
    );

    if (hasError) {
      toast.error(message);
      return;
    }
    toast.success("Pedido actualizado correctamente.");
    closeModal();
    reset();
  };

  if (isLoading) return <>Cargando...</>;
  return (
    <>
      <div className="mx-2">
        <button
          type="button"
          onClick={openModal}
          className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white  hover:bg-sky-300"
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
                <Dialog.Panel className="max-h-fit	 w-11/12 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900"
                  >
                    Editar Pedido
                  </Dialog.Title>

                  <form
                    className="h-3/4 w-full"
                    onSubmit={handleSubmit(onActualizarPedido)}
                  >
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
                        </div>
                      </div>
                      {/* Tipo pedido */}
                      <div className="mt-2">
                        <label
                          htmlFor="tipo_pedido"
                          className="block font-medium text-gray-700"
                        >
                          Tipo Pedido
                        </label>
                        <div className="mt-1 flex flex-row">
                          <select
                            {...register("tipo_pedido")}
                            id="tipo_pedido"
                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                          >
                            <option value="Local">Local</option>
                            <option value="Para llevar">Para llevar</option>
                          </select>
                        </div>
                      </div>
                      {/* Observaciones */}
                      <div className="mt-2">
                        <label
                          htmlFor="Observaciones"
                          className="block font-medium text-gray-700"
                        >
                          Observaciones
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="Observaciones"
                            {...register("observacion")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                      {/* Observaciones */}
                      <div className="mt-2">
                        <label
                          htmlFor="ubicacion_entrega"
                          className="block font-medium text-gray-700"
                        >
                          Ubicación de Entrega
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="ubicacion_entrega"
                            {...register("ubicacion_entrega")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="mt-4 inline-flex items-center rounded-md border border-transparent bg-[#388C04] px-4 py-2 font-medium text-white shadow-sm"
                    >
                      Editar Pedido
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
