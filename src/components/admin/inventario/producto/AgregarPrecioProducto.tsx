import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import React, { FC, Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  useCrearPrecioProductoMutation,
  useObtenerIngredientesQuery,
  useObtenerPrecioProductoQuery,
} from "@/store/slices/inventario";
import { Loader } from "@/components/ui/Loader";

type FormData = {
  id_producto: number;
  precio_compra: number;
  precio_venta: number;
  gasto: number;
  margen_ganancia: number;
};

export const AgregarPrecioProducto = () => {
  const { register, watch, handleSubmit, reset } = useForm<FormData>();

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(!isOpen);
  const openModal = () => setIsOpen(!isOpen);

  const [crearPrecioProducto] = useCrearPrecioProductoMutation();

  const { data: productos, isLoading } = useObtenerIngredientesQuery();

  const { data: preciosProducto, isLoading: isLoadingPreciosProducto } =
    useObtenerPrecioProductoQuery();

  const onAgregarPrecioProducto = async (data: FormData) => {
    try {
      await crearPrecioProducto(data).unwrap();
      toast.success("Precio de producto agregado correctamente");
      reset();
      closeModal();
    } catch (err) {
      toast.error("Error al agregar precio de producto");
    }
  };

  if (isLoading) return <Loader />;

  if (isLoadingPreciosProducto) return <Loader />;

  return (
    <>
      <div className="mx-2">
        <button
          type="button"
          onClick={openModal}
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#388C04] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#8CA862] sm:w-auto"
        >
          Agregar precio producto
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
                <Dialog.Panel className="h-auto w-full max-w-screen-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900"
                  >
                    Agregar precio de producto
                  </Dialog.Title>

                  <form
                    className="w-full"
                    onSubmit={handleSubmit(onAgregarPrecioProducto)}
                  >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="mt-2">
                        <label
                          htmlFor="producto"
                          className="block font-medium text-gray-700"
                        >
                          Producto
                        </label>
                        <div className="mt-1 flex items-center">
                          <select
                            id="producto"
                            {...register("id_producto", {
                              valueAsNumber: true,
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                          >
                            {productos?.map((producto) => (
                              <option key={producto.nombre} value={producto.id}>
                                {producto.nombre}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {/* Gasto */}
                      <div className="mt-2">
                        <label
                          htmlFor="gasto"
                          className="block font-medium text-gray-700"
                        >
                          Gasto
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            id="gasto"
                            {...register("gasto", { valueAsNumber: true })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                      {/* Precio de compra */}
                      <div className="mt-2">
                        <label
                          htmlFor="precio_compra"
                          className="block font-medium text-gray-700"
                        >
                          Precio de compra
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            id="nombre"
                            {...register("precio_compra", {
                              valueAsNumber: true,
                            })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                      {/* Margen de Ganancias */}
                      <div className="mt-2">
                        <label
                          htmlFor="margen_de_ganancias"
                          className="block font-medium text-gray-700"
                        >
                          Margen de Ganancias
                        </label>
                        <div className="mt-1 flex items-center">
                          <input
                            type="number"
                            id="gasto"
                            {...register("margen_ganancia", {
                              valueAsNumber: true,
                            })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                      {/* Precio de Venta */}
                      <div className="mt-2">
                        <label
                          htmlFor="margen_de_ganancias"
                          className="block font-medium text-gray-700"
                        >
                          Precio de Venta
                        </label>
                        <div className="mt-1 flex items-center">
                          <input
                            type="number"
                            id="gasto"
                            {...register("precio_venta", {
                              valueAsNumber: true,
                            })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="mt-4 mr-2 inline-flex items-center  rounded-md border border-transparent bg-[#388C04] px-4 py-2 font-medium text-white shadow-sm sm:justify-center md:justify-start"
                    >
                      Agregar Producto
                      <PlusCircleIcon
                        className="ml-2 -mr-1 h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                    <button
                      type="button"
                      className="mt-4 inline-flex items-center rounded-md border border-transparent bg-[#CA1514] px-4 py-2 text-center font-medium text-white shadow-sm md:ml-16"
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
