import { FC, Fragment, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  ICategoriaProducto,
  ISubCategoriaProducto,
} from "../../../../../interfaces";
import {
  useActualizarSubcategoriaMutation,
  useObtenerCategoriasQuery,
} from "@/store/slices/inventario";
import { Loader } from "@/components/ui/Loader";

interface Props {
  sub_categoria_producto: ISubCategoriaProducto;
}

type FormData = {
  id: number;
  nombre: string;
  id_categoria_producto: number;
  id_estado: number;
};
export const EditarSubCategoriaProducto: FC<Props> = ({
  sub_categoria_producto,
}) => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(!isOpen);
  const openModal = () => setIsOpen(!isOpen);

  const { data: categorias, isLoading } = useObtenerCategoriasQuery();

  const [actualizarSubcategoria] = useActualizarSubcategoriaMutation();

  const onActualizarSubCategoria = async ({
    id = sub_categoria_producto.id,
    nombre,
    id_categoria_producto,
  }: FormData) => {
    try {
      await actualizarSubcategoria({
        id: sub_categoria_producto.id,
        nombre,
        id_categoria_producto,
        id_estado: sub_categoria_producto.id_estado,
      }).unwrap();
      toast.success("Subcategoria actualizada correctamente");
      closeModal();
      reset();
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };
  if (isLoading) return <Loader />;
  return (
    <>
      <div className="mx-2">
        <button
          type="button"
          onClick={openModal}
          className="inline-flex items-center justify-center rounded-lg border border-transparent bg-lime-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#8CA862] sm:w-auto"
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
                <Dialog.Panel className="h-auto w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900"
                  >
                    Actualizar Subcategoria de Producto
                  </Dialog.Title>

                  <form
                    className="h-3/4 w-full"
                    onSubmit={handleSubmit(onActualizarSubCategoria)}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {/* Nombre */}
                      <div className="mt-2">
                        <label
                          htmlFor="nombre"
                          className="block font-medium text-gray-700"
                        >
                          Nombre
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="nombre"
                            {...register("nombre")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            defaultValue={sub_categoria_producto.nombre}
                          />
                        </div>
                      </div>
                      {/* Categorias */}
                      <div className="mt-2">
                        <label
                          htmlFor="categorias"
                          className="block font-medium text-gray-700"
                        >
                          Categoría
                        </label>
                        <div className="mt-1">
                          <select
                            id="categorias"
                            {...register("id_categoria_producto", {
                              valueAsNumber: true,
                            })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          >
                            {categorias?.map((categoria) => (
                              <option
                                key={categoria.id}
                                value={categoria.id}
                              >{`${categoria.nombre}`}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {/* Estado */}
                      <div className="mt-2">
                        <label
                          htmlFor="nombre"
                          className="block font-medium text-gray-700"
                        >
                          Estado
                        </label>
                        <div className="mt-1">
                          <select
                            id="estado"
                            {...register("id_estado")}
                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                          >
                            <option
                              key={sub_categoria_producto.id}
                              value={sub_categoria_producto.cat_estado?.nombre}
                            >
                              {sub_categoria_producto.cat_estado?.nombre}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="mt-4 mr-2 inline-flex items-center rounded-md border border-transparent bg-[#388C04] px-4 py-2 font-medium text-white shadow-sm"
                    >
                      Actualizar
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
