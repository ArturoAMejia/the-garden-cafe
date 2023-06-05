import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  useCrearPuntoPedidoMutation,
  useObtenerProductosQuery,
} from "@/store/slices/inventario";

type FormData = {
  id_producto: number;
  desviacion_estandar: number;
  dias: number;
  costo_producto: number;
  semanas_trabajadas: number;
  tasa_anual: number;
  costo_pedido: number;
};

export const CrearPuntoPedido = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const { data: productos, isLoading } = useObtenerProductosQuery();

  const [crearPuntoPedido] = useCrearPuntoPedidoMutation();

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(!isOpen);
  const openModal = () => setIsOpen(!isOpen);

  const onCrearInventario = async ({
    id_producto,
    desviacion_estandar,
    dias,
    costo_producto,
    semanas_trabajadas,
    tasa_anual,
    costo_pedido,
  }: FormData) => {
    try {
      await crearPuntoPedido({
        id_producto,
        desviacion_estandar,
        dias,
        costo_producto,
        semanas_trabajadas,
        tasa_anual,
        costo_pedido,
      }).unwrap();
      toast.success("Punto de Pedido creado correctamente");
      closeModal();
      reset();
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  if (isLoading) return <>Cargando...</>;

  return (
    <>
      <div className="mx-2">
        <button
          type="button"
          onClick={openModal}
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#388C04] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#8CA862] sm:w-auto"
        >
          Crear Stock de Seguridad
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
                <Dialog.Panel className="h-auto w-full	 max-w-screen-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900"
                  >
                    Crear Inventario
                  </Dialog.Title>

                  <form
                    className="w-full"
                    onSubmit={handleSubmit(onCrearInventario)}
                  >
                    <div className="grid grid-cols-4 gap-4">
                      {/* Producto */}
                      <div className="mt-2">
                        <label
                          htmlFor="categoria"
                          className="block font-medium text-gray-700"
                        >
                          Producto
                        </label>
                        <div className="mt-1">
                          <select
                            id="categoria"
                            {...register("id_producto", {
                              valueAsNumber: true,
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                          >
                            {productos?.map((prod) => (
                              <option key={prod.nombre} value={prod.id}>
                                {prod.nombre}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {/* Stock Mínimo */}
                      <div className="mt-2">
                        <label
                          htmlFor="stock_min"
                          className="block font-medium text-gray-700"
                        >
                          Días de Entrega
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            id="stock_min"
                            {...register("dias", {
                              valueAsNumber: true,
                            })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                      {/* Stock Máximo */}
                      <div className="mt-2">
                        <label
                          htmlFor="stock_max"
                          className="block font-medium text-gray-700"
                        >
                          Semanas Trabajadas
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            id="stock_max"
                            {...register("semanas_trabajadas", {
                              valueAsNumber: true,
                            })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                      </div>

                      <div className="mt-2">
                        <label
                          htmlFor="stock_max"
                          className="block font-medium text-gray-700"
                        >
                          Tasa Anual
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            step="any"
                            id="stock_max"
                            {...register("tasa_anual", {
                              valueAsNumber: true,
                            })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                      <div className="mt-2">
                        <label
                          htmlFor="stock_max"
                          className="block font-medium text-gray-700"
                        >
                          Costo del Producto
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            step="any"
                            id="stock_max"
                            {...register("costo_producto", {
                              valueAsNumber: true,
                            })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                      <div className="mt-2">
                        <label
                          htmlFor="stock_max"
                          className="block font-medium text-gray-700"
                        >
                          Costo del Pedido
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            step="any"
                            id="stock_max"
                            {...register("costo_pedido", {
                              valueAsNumber: true,
                            })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="mt-4 mr-2 inline-flex items-center rounded-md border border-transparent bg-[#388C04] px-4 py-2 font-medium text-white shadow-sm"
                    >
                      Crear Stock de Seguridad
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
