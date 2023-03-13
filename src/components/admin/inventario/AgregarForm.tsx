import { PaperAirplaneIcon, XCircleIcon } from "@heroicons/react/24/outline";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import tgcApi from "../../../api/tgcApi";
import { AdminContext } from "../../../context/admin/admin";
import { ICategoriaProdcuto } from "../../../interfaces/product";

type FormData = {
  nombre: string;
  descripcion: string;
  id_categoria: number;
  unidad_medida: string;
  precio: string;
};

export const AgregarForm = () => {
  const [categorias, setCategorias] = useState<ICategoriaProdcuto[]>([]);
  const { register, handleSubmit, reset } = useForm<FormData>();
  useEffect(() => {
    const getCategorias = async () => {
      const { data } = await tgcApi.get(
        "/inventario/producto-elaborado/categoria"
      );
      setCategorias(data);
    };
    getCategorias();
  }, []);

  const onSubmitProduct = async (form: FormData) => {
    try {
      const { data } = await tgcApi({
        url: "/inventario/producto-elaborado/",
        method: "POST",
        data: form,
      });
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white py-5 sm:rounded-lg sm:p-6">
      <div className="flex justify-between">
        <div className="">
          <h1 className="text-2xl font-bold">Añadir producto</h1>
        </div>
        <div className="pr-7">
          <button className="">
            <XCircleIcon className="h-7 w-7 " />
          </button>
        </div>
      </div>
      <div className="mt-5 md:mt-0 md:col-span-2">
        <form onSubmit={handleSubmit(onSubmitProduct)}>
          <div className="flex flex-wrap gap-4">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="nombre"
                className="block text-base font-medium text-gray-700"
              >
                Nombre del producto
              </label>
              <input
                type="text"
                id="nombre"
                autoComplete="given-name"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md"
                {...register("nombre", {
                  required: "Este campo es requerido",
                })}
              />
            </div>

            <div className="col-span-8 sm:col-span-6">
              <label
                htmlFor="categoria"
                className="block text-base font-medium text-gray-700"
              >
                Categorias
              </label>
              <select
                id="categoria"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base rounded-md"
                {...register("id_categoria", {
                  required: "Este campo es requerido",
                })}
              >
                {categorias.map((cat) => (
                  <option
                    key={cat.id}
                    value={cat.id * 1}
                    className="capitalize"
                  >
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="unidad_medida"
                className="block text-base font-medium text-gray-700"
              >
                Unidad de medida
              </label>
              <select
                id="unidad_medida"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
                {...register("unidad_medida", {
                  required: "Este campo es requerido",
                })}
              >
                <option value="onzas">Onzas</option>
                <option value="libras">Libras</option>
                <option value="kilogramos">Kilogramos</option>
                <option value="litros">Litros</option>
                <option value="mililitros">Mililitros</option>
              </select>
            </div>
            <div className="col-span-6">
              <label
                htmlFor="precio"
                className="block text-base font-medium text-gray-700"
              >
                Precio
              </label>
              <input
                type="number"
                id="precio"
                placeholder="10.00"
                step="0.01"
                autoComplete="precio"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md"
                {...register("precio", {
                  required: "Este campo es requerido",
                })}
              />
            </div>
            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="descripcion"
                className="block text-base font-medium text-gray-700"
              >
                Descripción del producto
              </label>
              <div className="mt-1">
                <textarea
                  rows={4}
                  id="descripcion"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-96 sm:text-base border-gray-300 rounded-md"
                  defaultValue={""}
                  {...register("descripcion", {
                    required: "Este campo es requerido",
                  })}
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-base leading-4 font-medium rounded-md text-white bg-[#f5b56a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PaperAirplaneIcon
              className="-ml-0.5 mr-2 h-4 w-4"
              aria-hidden="true"
            />
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
};
