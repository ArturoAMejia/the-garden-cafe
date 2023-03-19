import { FC, Fragment, useContext, useState } from "react";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import { EnvelopeIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

import { useForm } from "react-hook-form";
import tgcApi from "../../../../api/tgcApi";
import toast from "react-hot-toast";
import { IProveedor } from "../../../../interfaces";
import { AdminContext } from "../../../../context";
import { useActualizarProveeedorMutation } from "@/store/slices/compra/compraApi";

type FormData = {
  cedula_ruc: string;
  nombre: string;
  correo: string;
  apellido_razon_social: string;
  fecha_nacimiento_constitucion: Date;
  telefono: string;
  celular: string;
  direccion_domicilio: string;
  tipo_persona: string;
  genero: string;
  sector_comercial: string;
  nacionalidad: string;
};

interface Props {
  proveedor: IProveedor;
}
export const EditarProveedor: FC<Props> = ({ proveedor }) => {
  const id = proveedor.id;
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(!isOpen);
  const openModal = () => setIsOpen(!isOpen);

  // const { actualizarProveedor } = useContext(AdminContext);

  const [actualizarProveedor, { isError, error }] =
    useActualizarProveeedorMutation();
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onActualizarProveedor = async ({
    cedula_ruc,
    nombre,
    apellido_razon_social,
    correo,
    fecha_nacimiento_constitucion,
    telefono,
    celular,
    genero,
    direccion_domicilio,
    tipo_persona,
    sector_comercial,
    nacionalidad,
  }: FormData) => {
    actualizarProveedor({
      id,
      cedula_ruc,
      nombre,
      apellido_razon_social,
      correo,
      fecha_nacimiento_constitucion,
      telefono,
      celular,
      genero,
      direccion_domicilio,
      tipo_persona,
      sector_comercial,
      nacionalidad,
    })
      .unwrap()
      .then((res) => {
        toast.success("Proveedor actualizado correctamente.");
        closeModal();
        reset();
      })
      .catch((error) => toast.error(error.data.message));

    // if (hasError) {
    //   toast.error(message!);
    //   return;
    // }
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
                <Dialog.Panel className="h-auto w-full max-w-6xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900"
                  >
                    Editar Proveedor
                  </Dialog.Title>

                  <form
                    className="h-3/4 w-full"
                    onSubmit={handleSubmit(onActualizarProveedor)}
                  >
                    <div className="flex flex-col gap-4 md:grid md:grid-cols-4">
                      {/* No_ruc */}
                      <div className="mt-2">
                        <label
                          htmlFor="no_ruc"
                          className="block font-medium text-gray-700"
                        >
                          Num. de Cédula o Num. RUC
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="no_ruc"
                            {...register("cedula_ruc")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="001-191021-4313G"
                            defaultValue={proveedor.persona?.cedula_ruc}
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
                            {...register("nombre")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            defaultValue={proveedor.persona?.nombre}
                          />
                        </div>
                      </div>
                      {/* Apellido Razon Social */}
                      <div className="mt-2">
                        <label
                          htmlFor="apellido_razon_social"
                          className="block font-medium text-gray-700"
                        >
                          Apellido - Razón Social
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="apellido_razon_social"
                            {...register("apellido_razon_social")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            defaultValue={
                              proveedor.persona?.apellido_razon_social
                            }
                          />
                        </div>
                      </div>
                      {/* Numero de Celular */}
                      <div className="mt-2">
                        <label
                          htmlFor="phone-number"
                          className="block font-medium text-gray-700"
                        >
                          Número de Celular
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 flex items-center">
                            <label htmlFor="celular" className="sr-only">
                              Compañia
                            </label>
                            <select
                              id="telefono"
                              name="country"
                              autoComplete="country"
                              className="mr-2 h-full rounded-md border-transparent bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500"
                            >
                              <option>Tigo</option>
                              <option>Claro</option>
                            </select>
                          </div>
                          <input
                            type="number"
                            id="celular"
                            {...register("celular")}
                            className="mr-2 block w-full rounded-md border-gray-300 pl-16 focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="7666 8163"
                            defaultValue={proveedor.persona?.telefono}
                          />
                        </div>
                      </div>
                      {/* Numero de telefono */}
                      <div className="mt-2">
                        <label
                          htmlFor="phone-number"
                          className="block font-medium text-gray-700"
                        >
                          Número de Teléfono
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 flex items-center">
                            <label htmlFor="telefono" className="sr-only">
                              Compañia
                            </label>
                            <select
                              id="telefono"
                              name="country"
                              autoComplete="country"
                              className="mr-2 h-full rounded-md border-transparent bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500"
                            >
                              <option>Tigo</option>
                              <option>Claro</option>
                            </select>
                          </div>
                          <input
                            type="number"
                            id="telefono"
                            {...register("telefono")}
                            className="mr-2 block w-full rounded-md border-gray-300 pl-16 focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="7666 8163"
                            defaultValue={proveedor.persona!.telefono}
                          />
                        </div>
                      </div>
                      {/* Direccion */}
                      <div className="col-span-2 mt-2">
                        <label
                          htmlFor="direccion"
                          className="block font-medium text-gray-700"
                        >
                          Direccion
                        </label>
                        <div className="mt-1">
                          <textarea
                            rows={2}
                            id="direccion"
                            className="block w-full resize-none rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            {...register("direccion_domicilio")}
                            defaultValue={
                              proveedor.persona!.direccion_domicilio
                            }
                          />
                        </div>
                      </div>
                      {/* Correo */}
                      <div className="mt-2">
                        <label
                          htmlFor="correo"
                          className="block  font-medium text-gray-700"
                        >
                          Correo
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <EnvelopeIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </div>
                          <input
                            type="email"
                            id="correo"
                            {...register("correo")}
                            className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="ejemplo@ejemplo.com"
                            defaultValue={proveedor.persona!.correo}
                          />
                        </div>
                      </div>
                      {/* Fecha Nacimiento - Constitucion */}
                      <div className="mt-2">
                        <label
                          htmlFor="fecha_nacimiento_constitucion"
                          className="block font-medium text-gray-700"
                        >
                          Fecha Nacimiento - Constitucion
                        </label>
                        <div className="mt-1">
                          <input
                            type="date"
                            id="fecha_nacimiento_constitucion"
                            {...register("fecha_nacimiento_constitucion")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            defaultValue={
                              proveedor.persona?.fecha_nacimiento_constitucion
                                ? proveedor.persona.fecha_nacimiento_constitucion
                                    .toLocaleString()
                                    .split("T")[0]
                                : undefined
                            }
                          />
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
                            defaultValue={proveedor.nacionalidad}
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
                            defaultValue={proveedor.sector_comercial}
                          />
                        </div>
                      </div>
                      {/* Tipo Proveedor */}
                      <div className="mt-2">
                        <label
                          htmlFor="tipo_persona"
                          className="block font-medium text-gray-700"
                        >
                          Tipo Proveedor
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="tipo_persona"
                            {...register("tipo_persona")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            defaultValue={proveedor.persona!.tipo_persona}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="mt-4 inline-flex items-center rounded-md border border-transparent bg-[#388C04] px-4 py-2 font-medium text-white shadow-sm"
                    >
                      Editar Proveedor
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
