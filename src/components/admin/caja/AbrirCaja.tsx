import { Transition, Dialog } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { Fragment, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../../../context";
import { ICaja, IMoneda, IPedido } from "../../../interfaces";

import { useSession } from "next-auth/react";
import { useObtenerMonedasQuery } from "@/store/slices/catalogos";
import {
  useCrearAperturaCajaMutation,
  useObtenerCajasQuery,
} from "@/store/slices/caja";

type FormData = {
  id_caja: number;
  id_moneda: number;
  monto_cordobas: number;
};

export const AbrirCaja = () => {
  const { data: monedas, isLoading: isLoadingMonedas } =
    useObtenerMonedasQuery();

  const { data: cajas, isLoading } = useObtenerCajasQuery();

  const [aperturarCaja] = useCrearAperturaCajaMutation();

  const { data: session } = useSession();
  const { user } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(!isOpen);

  const openModal = () => setIsOpen(!isOpen);

  const { register, handleSubmit, reset } = useForm<FormData>();

  const onAceptarSolicitud = async ({
    id_caja,
    id_moneda,
    monto_cordobas,
  }: FormData) => {
    toast.promise(
      aperturarCaja({
        id_trabajador: session.user?.id,
        id_caja,
        id_moneda,
        monto_cordobas,
        monto_dolares: monto_cordobas / 35.95,
      })
        .unwrap()
        .then(() => {
          closeModal();
          reset();
        }),
      {
        loading: "Abriendo caja...",
        success: "Caja abierta exitosamente.",
        error: (res) => `${res.data.message}`,
      }
    );
  };

  if (isLoadingMonedas) return <>Cargando...</>;

  if (isLoading) return <>Cargando...</>;

  const cajas_cerradas = cajas?.filter((caja) => caja.id_estado === 2);

  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={openModal}
          className="rounded-lg bg-lime-600 px-4 py-2 text-sm font-medium text-white  hover:bg-lime-700"
        >
          Abrir Caja
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
                    Abrir Caja
                  </Dialog.Title>

                  <form
                    className="h-3/4 w-full"
                    onSubmit={handleSubmit(onAceptarSolicitud)}
                  >
                    <div className="flex flex-col gap-4 md:grid md:grid-cols-3">
                      {/* Caja */}
                      <div className="mt-2">
                        <label
                          htmlFor="caja"
                          className="block font-medium text-gray-700"
                        >
                          Caja
                        </label>
                        <div className="mt-1">
                          <select
                            id="caja"
                            {...register("id_caja", {
                              valueAsNumber: true,
                            })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          >
                            {cajas_cerradas.map((caja: ICaja) => (
                              <option key={caja.id} value={caja.id}>
                                {caja.tipo_caja}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Moneda */}
                      <div className="mt-2">
                        <label
                          htmlFor="moneda"
                          className="block font-medium text-gray-700"
                        >
                          Moneda
                        </label>
                        <div className="mt-1">
                          <select
                            id="moneda"
                            {...register("id_moneda", {
                              valueAsNumber: true,
                            })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          >
                            {monedas.map((moneda: IMoneda) => (
                              <option key={moneda.id} value={moneda.id}>
                                {moneda.nombre}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {/* Monto de Apertura */}
                      <div className="mt-2">
                        <label
                          htmlFor="tipo_venta"
                          className="block font-medium text-gray-700"
                        >
                          Monto de apertura
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            id="monto"
                            {...register("monto_cordobas", {
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
                      Abrir Caja
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
