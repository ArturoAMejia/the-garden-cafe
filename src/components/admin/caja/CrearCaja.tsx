import React, { FC, Fragment, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useSession } from "next-auth/react";
import { useCrearCajaMutation } from "@/store/slices/caja/cajaApi";
import { useObtenerMonedasQuery } from "@/store/slices/catalogos";

type FormData = {
  tipo_caja: string;
};

export const CrearCaja = () => {
  const [crearCaja] = useCrearCajaMutation();

  const { data: session } = useSession();

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(!isOpen);

  const openModal = () => setIsOpen(!isOpen);

  const { register, handleSubmit, reset } = useForm<FormData>();

  const onAceptarSolicitud = async ({ tipo_caja }: FormData) => {
    await crearCaja({
      tipo_caja,
      id_trabajador: session?.user.id_trabajador,
    })
      .unwrap()
      .then(() => {
        toast.success("Caja creada correctamente.");
        closeModal();
        reset();
      })
      .catch((error) => {
        toast.error(error.response?.data.message);
        return;
      });
  };

  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={openModal}
          className="rounded-lg bg-lime-600 px-4 py-2 text-sm font-medium text-white  hover:bg-lime-700"
        >
          Crear Caja
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
                    Crear Caja
                  </Dialog.Title>

                  <form
                    className="h-3/4 w-full"
                    onSubmit={handleSubmit(onAceptarSolicitud)}
                  >
                    <div className="flex flex-col gap-4 md:grid md:grid-cols-3">
                      {/* Tipo de Caja */}
                      <div className="mt-2">
                        <label
                          htmlFor="tipo_caja"
                          className="block font-medium text-gray-700"
                        >
                          Tipo de Caja
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="tipo_caja"
                            {...register("tipo_caja", {
                              valueAsNumber: true,
                            })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="mt-4 inline-flex items-center rounded-md border border-transparent bg-[#388C04] px-4 py-2 font-medium text-white shadow-sm"
                    >
                      Crear Caja
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
