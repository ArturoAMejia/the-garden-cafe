import React, { FC, Fragment, useContext, useState } from "react";

import { AuthContext } from "../../../context";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { ICatEstado, IPedido } from "../../../interfaces";
import { Transition, Dialog } from "@headlessui/react";
import { useObtenerClientesQuery } from "@/store/slices/venta";
import { useCrearPedidoMutation } from "@/store/slices/pedido";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { AppState } from "@/store/store";
import { pedidoCompletado } from "@/store/slices/pedido/pedidoSlice";
import { useSession } from "next-auth/react";

interface Props {
  estados: ICatEstado[];
}

type FormData = IPedido;

export const AgregarPedido: FC<Props> = ({ estados }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(!isOpen);
  const openModal = () => setIsOpen(!isOpen);

  const { data: session } = useSession();
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [crearPedido, { isLoading: creandoPedido, isSuccess }] =
    useCrearPedidoMutation();

  const productos = useAppSelector((state: AppState) => state.pedido.productos);

  const dispatch = useAppDispatch();
  const { data: clientes, isLoading } = useObtenerClientesQuery();

  const createPedido = async () => {};

  const onCrearPedido = async (data: FormData) => {
    // TODO Crear pedidoApi con redux

    toast.promise(
      crearPedido({
        ...data,
        id_trabajador: Number(session.user.id),
        id_cliente: Number(data.id_cliente),
        productos,
      })
        .unwrap()
        .then(() => {
          dispatch(pedidoCompletado());
          closeModal();
          reset();
        }),
      {
        loading: "Creando pedido...",
        success: "Pedido realizado correctamente",
        error: "No se pudo crear el pedido",
      }
      // toast.success("Pedido realizado correctamente.");
      // orderComplete();
    );
  };

  if (isLoading) return <>Cargando...</>;

  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={openModal}
          className="mt-2 inline-flex items-center justify-center rounded-md border border-transparent bg-[#388C04] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#8CA862] sm:w-auto"
        >
          Crear nuevo pedido
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
                <Dialog.Panel className="h-auto w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900"
                  >
                    Crear Pedido
                  </Dialog.Title>

                  <form onSubmit={handleSubmit(onCrearPedido)}>
                    <div className="grid grid-cols-3 gap-4">
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

                      {/* Estado */}
                      <div className="mt-2">
                        <label
                          htmlFor="estado"
                          className="block font-medium text-gray-700"
                        >
                          Estado
                        </label>
                        <div className="mt-1 flex flex-row">
                          <select
                            id="estado"
                            {...register("id_estado")}
                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                          >
                            {estados.map((estado) => (
                              <option key={estado.nombre} value={estado.id}>
                                {estado.nombre}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-span-3 mt-2">
                        <label
                          htmlFor="observacion"
                          className="block font-medium text-gray-700"
                        >
                          Observación
                        </label>
                        <textarea
                          rows={4}
                          id="observacion"
                          className="block w-full resize-none rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          {...register("observacion")}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className={`mt-4 inline-flex items-center rounded-md border border-transparent px-4 py-2 font-medium text-white shadow-sm ${
                        creandoPedido === true ? "bg-[#c8e8b5" : "bg-[#388c04]"
                      } 
                      `}
                      disabled={creandoPedido === true ? true : false}
                    >
                      Crear Pedido
                      <PlusCircleIcon
                        className="ml-2 -mr-1 h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="mt-4 ml-10 inline-flex items-center rounded-md border border-transparent bg-[#CA1514] px-4 py-2 font-medium text-white shadow-sm"
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
