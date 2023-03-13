import { FC, Fragment, useContext, useState } from "react";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import { ICliente } from "../../../../interfaces";
import { AdminContext } from "../../../../context";

type FormData = ICliente;
interface Props {
  cliente: ICliente;
}
export const EditarCliente: FC<Props> = ({ cliente }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(!isOpen);
  const openModal = () => setIsOpen(!isOpen);

  const { actualizarCliente } = useContext(AdminContext);

  const { register, handleSubmit, reset } = useForm<FormData>();

  const onEditarCliente = async (data: FormData) => {
    const { hasError, message } = await actualizarCliente({
      ...data,
      id: cliente.id,
    });

    if (hasError) {
      toast.error(message);
      return;
    }

    toast.success("Cliente actualizado correctamente.");
    closeModal();
    reset();
  };

  return (
    <>
      <div className="mx-2">
        <button
          type="button"
          onClick={openModal}
          className="rounded-2xl bg-sky-500 px-4 py-2 text-sm font-medium text-white  hover:bg-sky-300"
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
                    Editar Cliente
                  </Dialog.Title>

                  <form
                    className="h-3/4 w-full"
                    onSubmit={handleSubmit(onEditarCliente)}
                  >
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
                            {...register("persona.cedula_ruc")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="001-010199-0000L"
                            defaultValue={cliente.persona!.cedula_ruc}
                          />
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
                            {...register("persona.nombre")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            defaultValue={cliente.persona!.nombre}
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
                            {...register("persona.apellido_razon_social")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            defaultValue={
                              cliente.persona?.apellido_razon_social
                            }
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
                            {...register(
                              "persona.fecha_nacimiento_constitucion",
                              {
                                valueAsDate: true,
                              }
                            )}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            defaultValue={
                              cliente.persona?.fecha_nacimiento_constitucion
                                ? cliente.persona.fecha_nacimiento_constitucion
                                    .toLocaleString()
                                    .split("T")[0]
                                : undefined
                            }
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
                            {...register("persona.telefono")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            defaultValue={cliente.persona!.telefono}
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
                            {...register("persona.direccion_domicilio")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            defaultValue={cliente.persona!.direccion_domicilio}
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
                            {...register("persona.correo")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            defaultValue={cliente.persona!.correo}
                          />
                        </div>
                      </div>

                      {/* Tipo de cliente */}
                      <div className="mt-2">
                        <label
                          htmlFor="nombre"
                          className="block font-medium text-gray-700"
                        >
                          Tipo de Cliente
                        </label>
                        <div className="mt-1">
                          <select
                            id="tipo_cliente"
                            {...register("tipo_cliente")}
                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                            defaultValue={cliente.tipo_cliente}
                          >
                            <option value="Natural">Natural</option>
                            <option value="Jurídico">Jurídico</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="mt-4 inline-flex items-center rounded-md border border-transparent bg-[#388C04] px-4 py-2 font-medium text-white shadow-sm"
                    >
                      Editar Cliente
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
