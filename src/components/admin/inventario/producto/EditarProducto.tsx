import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import React, { ChangeEvent, FC, Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IIngrediente, IProducto } from "../../../../interfaces";
import {
  useActualizarIngredienteMutation,
  useActualizarProductoMutation,
  useCrearIngredienteMutation,
  useCrearProductoMutation,
  useObtenerCategoriasQuery,
  useObtenerMarcasQuery,
  useObtenerSubcategoriasQuery,
  useObtenerUnidadesMedidaQuery,
} from "@/store/slices/inventario";
import { Loader } from "@/components/ui/Loader";

type FormData = IProducto;

type propType = IProducto | IIngrediente;
interface Props {
  isIngredient?: boolean;
  isProduct?: boolean;
  producto: propType;
}
export const EditarProducto: FC<Props> = ({
  isIngredient,
  isProduct,
  producto,
}) => {
  const { data: categorias, isLoading: isLoadingCategorias } =
    useObtenerCategoriasQuery();
  const { data: marcas, isLoading: isLoadingMarcas } = useObtenerMarcasQuery();

  const { data: unidades_medidas, isLoading: isLoadingUnidadesMedidas } =
    useObtenerUnidadesMedidaQuery();

  const { data: sub_categorias, isLoading: isLoadingSubCat } =
    useObtenerSubcategoriasQuery();

  const [actualizarProducto] = useActualizarProductoMutation();

  const [actualizarIngrediente] = useActualizarIngredienteMutation();

  const { register, handleSubmit, reset } = useForm<FormData>();

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(!isOpen);
  const openModal = () => setIsOpen(!isOpen);

  const onFileSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) return;

    // console.log(file)
    // try {
    //   for (const file of target.files) {
    //     console.log(file);
    //     const formData = new FormData();
    //     formData.append("file", file);
    //     const { data } = await tgcApi.post<{ message: string }>(
    //       "api/upload",
    //       formData
    //     );
    //     console.log(data.message);
    //     setValue("imagen", data.message, {
    //       shouldValidate: true,
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const onCrearProducto = async (data: FormData) => {
    if (isIngredient) {
      try {
        await actualizarIngrediente({ ...data, id: producto.id }).unwrap();
        toast.success("Ingrediente actualizado correctamente");
        closeModal();
        reset();
      } catch (error: any) {
        toast.error(error.data.message);
      }
    } else if (isProduct) {
      try {
        await actualizarProducto({ ...data, id: producto.id }).unwrap();
        toast.success("Producto agregado correctamente");
        closeModal();
        reset();
      } catch (error: any) {
        toast.error(error.data.message);
      }
    }
  };

  if (isLoadingCategorias) return <Loader />;

  if (isLoadingMarcas) return <Loader />;

  if (isLoadingUnidadesMedidas) return <Loader />;

  if (isLoadingSubCat) return <Loader />;

  return (
    <>
      <div className="mx-2">
        <button
          type="button"
          onClick={openModal}
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#388C04] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#8CA862] sm:w-auto"
        >
          {isProduct ? `Editar` : isIngredient ? `Editar` : ""}
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
                    Editar Producto
                  </Dialog.Title>

                  <form
                    className="w-full"
                    onSubmit={handleSubmit(onCrearProducto)}
                  >
                    <div className="grid grid-cols-4 gap-4">
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
                            defaultValue={producto.nombre}
                            {...register("nombre")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                      {/* Descripcion */}
                      <div className="mt-2">
                        <label
                          htmlFor="nombre"
                          className="block font-medium text-gray-700"
                        >
                          Descripción
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="nombre"
                            defaultValue={producto.descripcion}
                            {...register("descripcion")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                      {/* Categoria */}
                      <div className="mt-2">
                        <label
                          htmlFor="categoria"
                          className="block font-medium text-gray-700"
                        >
                          Categoria
                        </label>
                        <div className="mt-1">
                          <select
                            id="categoria"
                            {...register("id_categoria_producto", {
                              valueAsNumber: true,
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                          >
                            {categorias?.map((categoria) => (
                              <option
                                key={categoria.nombre}
                                value={categoria.id}
                                defaultValue={producto.id_categoria_producto}
                              >
                                {categoria.nombre}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {/* Subcategoria */}
                      <div className="mt-2">
                        <label
                          htmlFor="categoria"
                          className="block font-medium text-gray-700"
                        >
                          Subcategoria
                        </label>
                        <div className="mt-1">
                          <select
                            id="categoria"
                            {...register("id_sub_categoria_producto", {
                              valueAsNumber: true,
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                          >
                            {sub_categorias?.map((sub_categoria) => (
                              <option
                                key={sub_categoria.nombre}
                                value={sub_categoria.id}
                                defaultValue={
                                  producto.id_sub_categoria_producto
                                }
                              >
                                {sub_categoria.nombre}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {/* Marca */}
                      <div className="mt-2">
                        <label
                          htmlFor="marca"
                          className="block font-medium text-gray-700"
                        >
                          Marca
                        </label>
                        <div className="mt-1">
                          <select
                            id="marca"
                            {...register("id_marca", {
                              valueAsNumber: true,
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                          >
                            {marcas?.map((marca) => (
                              <option
                                key={marca.siglas}
                                value={marca.id}
                                defaultValue={producto.id_marca}
                              >
                                {marca.siglas}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {/* Unidad de Medida */}
                      <div className="mt-2">
                        <label
                          htmlFor="unidad_medida"
                          className="block font-medium text-gray-700"
                        >
                          Unidad de medida
                        </label>
                        <div className="mt-1">
                          <select
                            id="unidad_medida"
                            {...register("id_unidad_medida", {
                              valueAsNumber: true,
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                          >
                            {unidades_medidas?.map((medida) => (
                              <option
                                key={medida.siglas}
                                value={medida.id}
                                defaultValue={producto.id_unidad_medida}
                              >
                                {medida.siglas}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {/* Imagen */}
                      <div className="mt-2 ">
                        <label
                          htmlFor="cover-photo"
                          className="mb-2 block font-medium text-gray-700"
                        >
                          Imagen de producto
                        </label>
                        <div className="sm:col-span-2">
                          <div className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                            <div className="space-y-1 text-center">
                              <svg
                                className="mx-auto h-6 w-6 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div className="flex text-sm text-gray-600">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                  <span>Suba una imagen</span>
                                  <input
                                    id="file-upload"
                                    type="file"
                                    multiple
                                    // {...register("imagen">)}
                                    accept="image/jpg, image/png ,image/jpeg"
                                    className="sr-only"
                                    onChange={(file) => onFileSelected(file)}
                                  />
                                </label>
                              </div>
                              <p className="text-xs text-gray-500">
                                PNG, JPG, GIF up to 10MB
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Fecha de fabricacion */}
                      <div className="mt-2">
                        <label
                          htmlFor="nombre"
                          className="block font-medium text-gray-700"
                        >
                          Fecha de Ingreso
                        </label>
                        <div className="mt-1">
                          <input
                            type="date"
                            id="fecha_fabricacion"
                            {...register("fecha_ingreso", {
                              valueAsDate: true,
                            })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                      {/* Estado
                      <div className="mt-2">
                        <label
                          htmlFor="estado"
                          className="block font-medium text-gray-700"
                        >
                          Estado
                        </label>
                        <div className="mt-1">
                          <select
                            id="estado"
                            {...register("id_estado", {
                              valueAsNumber: true,
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                          >
                            {estados.map((estado) => (
                              <option key={estado.nombre} value={estado.id}>
                                {estado.nombre}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div> */}
                    </div>
                    <button
                      type="submit"
                      className="mt-4 mr-2 inline-flex items-center rounded-md border border-transparent bg-[#388C04] px-4 py-2 font-medium text-white shadow-sm"
                    >
                      Editar Producto
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
