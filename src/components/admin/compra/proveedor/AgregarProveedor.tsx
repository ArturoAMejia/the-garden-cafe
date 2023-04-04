import { Fragment, useState } from "react";

import { PlusCircleIcon } from "@heroicons/react/24/outline";

import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Transition, Dialog } from "@headlessui/react";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Error } from "../../../landing/Error";
import { useCrearProveedorMutation } from "@/store/slices/compra";

const schema = z.object({
  cedula_ruc: z
    .string()
    .regex(new RegExp("^[0-9]{3}-[0-9]{6}-[0-9]{4}[aA-zZ]{1}$"), {
      message: "Formato de cédula no válido",
    }),
  nombre: z.string().regex(new RegExp("^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑs]{2,50}$")),
  correo: z.string(),
  apellido_razon_social: z
    .string()
    .regex(new RegExp("^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑs-]{2,50}$")),
  fecha_nacimiento_constitucion: z.date(),
  telefono: z.string(),
  direccion_domicilio: z.string(),
  tipo_persona: z.string(),
  nacionalidad: z.string(),
  sector_comercial: z.string(),
});

export const AgregarProveedor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(!isOpen);
  const openModal = () => setIsOpen(!isOpen);

  type FormSchemaType = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormSchemaType>({ resolver: zodResolver(schema) });

  const [crearProveedor, { isLoading, isError }] = useCrearProveedorMutation();

  const onRegistrarProveedor: SubmitHandler<FormSchemaType> = async (form) => {
    console.log(form);
    try {
      await crearProveedor(form).unwrap();
      toast.success("Proveedor creado satisfactoriamente.");
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
          Agregar Nuevo Proveedor
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
                    Agregar Nuevo Proveedor
                  </Dialog.Title>

                  <form onSubmit={handleSubmit(onRegistrarProveedor)}>
                    <div className="grid grid-cols-4 gap-4">
                      {/* Cédula - RUC */}
                      <div className="mt-2">
                        <label
                          htmlFor="nombre"
                          className="block font-medium text-gray-700"
                        >
                          Cédula - RUC
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="nombre"
                            {...register("cedula_ruc")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="001-010101-0101A"
                          />
                          {errors.cedula_ruc && (
                            <Error error={errors.cedula_ruc.message} />
                          )}
                        </div>
                      </div>
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
                            placeholder="Nombre"
                          />
                        </div>
                      </div>
                      <div className="mt-2">
                        <label
                          htmlFor="nombre"
                          className="block font-medium text-gray-700"
                        >
                          Apellido - Razón Social
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="nombre"
                            {...register("apellido_razon_social")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Apellido Razón Social"
                          />
                        </div>
                      </div>
                      {/* Fecha de Nacimiento */}
                      <div className="mt-2">
                        <label
                          htmlFor="nombre"
                          className="block font-medium text-gray-700"
                        >
                          Fecha de Nacimiento
                        </label>
                        <div className="mt-1">
                          <input
                            type="date"
                            id="nombre"
                            {...register("fecha_nacimiento_constitucion", {
                              valueAsDate: true,
                            })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                      {/* Teléfono */}
                      <div className="mt-2">
                        <label
                          htmlFor="nombre"
                          className="block font-medium text-gray-700"
                        >
                          Teléfono
                        </label>
                        <div className="mt-1">
                          <input
                            type="tel"
                            id="nombre"
                            {...register("telefono")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="88119900"
                          />
                        </div>
                      </div>
                      {/* Dirección - Domicilio */}
                      <div className="col-span-2 mt-2">
                        <label
                          htmlFor="nombre"
                          className="block font-medium text-gray-700"
                        >
                          Dirección - Domicilio
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="nombre"
                            {...register("direccion_domicilio")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Dirección"
                          />
                        </div>
                      </div>

                      {/*  Correo  */}
                      <div className="mt-2">
                        <label
                          htmlFor="nombre"
                          className="block font-medium text-gray-700"
                        >
                          Correo
                        </label>
                        <div className="mt-1">
                          <input
                            type="email"
                            id="nombre"
                            {...register("correo")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="ejemplo@ejemplo.com"
                          />
                        </div>
                      </div>

                      {/* Tipo de Proveedor */}
                      <div className="mt-2">
                        <label
                          htmlFor="nombre"
                          className="block font-medium text-gray-700"
                        >
                          Tipo de Proveedor
                        </label>
                        <div className="mt-1">
                          <select
                            id="tipo_Proveedor"
                            {...register("tipo_persona")}
                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                          >
                            <option value="Natural">Natural</option>
                            <option value="Jurídico">Jurídico</option>
                          </select>
                        </div>
                      </div>
                      {/* Nacionalidad */}
                      <div className="mt-2">
                        <label
                          htmlFor="nacionalidad"
                          className="block font-medium text-gray-700"
                        >
                          Nacionalidad
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="nacionalidad"
                            {...register("nacionalidad")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Nicargüense"
                          />
                        </div>
                      </div>
                      {/* Sector Comercial */}
                      <div className="mt-2">
                        <label
                          htmlFor="sector_comercial"
                          className="block font-medium text-gray-700"
                        >
                          Sector Comercial
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="sector_comercial"
                            {...register("sector_comercial")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="sector_comercial"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="mt-4 inline-flex items-center rounded-md border border-transparent bg-[#388C04] px-4 py-2 font-medium text-white shadow-sm"
                      disabled={isSubmitting || isLoading}
                    >
                      Agregar Proveedor
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
