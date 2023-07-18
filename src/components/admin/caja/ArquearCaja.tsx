import { Transition, Dialog } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { FC, Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { IArqueoCaja, ICaja } from "../../../interfaces";
import tgcApi from "../../../api/tgcApi";
import axios from "axios";

import {
  useCrearArqueoCajaMutation,
  useObtenerCajasQuery,
} from "@/store/slices/caja";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";



import {
  Billete,
  Moneda,
  actualizarBilleteCordobas,
  actualizarMonedas,
} from "@/store/slices/caja/cajaSlice";
import { AppState } from "@/store/store";
import { CajasTable } from "@/components/tables/caja/CajasTable";

type FormData = {
  id_caja: number;
};

interface Props {
  caja: ICaja;
}

const denominacion_billetes_cordobas = [10, 20, 50, 100, 200, 500, 1000];
const denominacion_monedas_cordobas = [0.25, 0.5, 1, 5, 10];

export const ArquearCaja: FC<Props> = ({ caja }) => {
  const { data: cajas, isLoading } = useObtenerCajasQuery();

  const [crearArqueoCaja] = useCrearArqueoCajaMutation();

  const { data: session } = useSession();

  const dispatch = useAppDispatch();

  const { total, billetes, monedas } = useAppSelector(
    (state: AppState) => state.caja
  );

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(!isOpen);

  const openModal = () => setIsOpen(!isOpen);

  const { handleSubmit, reset } = useForm<FormData>();

  const onAceptarSolicitud = async ({ id_caja }: FormData) => {
    try {
      toast.promise(
        crearArqueoCaja({
          id_caja: caja.id,
          id_trabajador: Number(session?.user?.id_trabajador),
          id_moneda: 1,
          total,
          billetes,
          monedas,
        })
          .unwrap()
          .then(() => {
            closeModal();
          }),
        {
          loading: "Cerrando caja...",
          success: "Caja arqueada correctamente.",
          error: "No se pudo arquear la caja.",
        }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
        return;
      }

      toast.error("No se pudo cerrar la caja.");
    }

    reset();
  };

  if (isLoading) return <>Cargando...</>;

  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={openModal}
          className="rounded-lg bg-lime-600 px-4 py-2 text-sm font-medium text-white  hover:bg-lime-700"
        >
          Arquear Caja
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
                <Dialog.Panel className="h-auto w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900"
                  >
                    Arquear Caja
                  </Dialog.Title>

                  <form
                    className="h-3/4 w-full"
                    onSubmit={handleSubmit(onAceptarSolicitud)}
                  >
                    <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                      {/* Caja */}
                      <div className="col-span-2 mt-2">
                        <label
                          htmlFor="caja"
                          className="block font-medium text-gray-700"
                        >
                          Caja {caja.id} - {caja.tipo_caja}
                        </label>
                      </div>

                      <div>
                        <label className="block font-medium text-gray-700">
                          Billetes - Córdobas
                        </label>
                        {denominacion_billetes_cordobas.map((denominacion) => (
                          <div
                            key={denominacion}
                            className=" mt-2 flex items-center gap-4"
                          >
                            <label
                              htmlFor={denominacion.toString()}
                              className="mr-4 block font-medium text-gray-700"
                            >
                              C$ {denominacion}
                            </label>
                            <div className="mt-1 w-full">
                              <input
                                type="number"
                                id="billete_cien"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                min="0"
                                onChange={(e) =>
                                  dispatch(
                                    actualizarBilleteCordobas({
                                      denominacion,
                                      cantidad: Number(e.target.value),
                                    })
                                  )
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div>
                        <label className="block font-medium text-gray-700">
                          Monedas - Córdobas
                        </label>
                        {denominacion_monedas_cordobas.map((denominacion) => (
                          <div
                            key={denominacion}
                            className=" mt-2 flex items-center gap-4"
                          >
                            <label
                              htmlFor={denominacion.toString()}
                              className="mr-4 block font-medium text-gray-700"
                            >
                              C$ {denominacion}
                            </label>
                            <div className="mt-1 w-full">
                              <input
                                type="number"
                                id="billete_cien"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                min="0"
                                onChange={(e) =>
                                  dispatch(
                                    actualizarMonedas({
                                      denominacion,
                                      cantidad: Number(e.target.value),
                                    })
                                  )
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <ResumenArqueo caja={caja} />
                    <button
                      type="submit"
                      className="mt-4 inline-flex items-center rounded-md border border-transparent bg-[#388C04] px-4 py-2 font-medium text-white shadow-sm"
                    >
                      Arquear Caja
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

const ResumenArqueo: FC<Props> = ({ caja }) => {
  const { total, total_billetes_cordobas, total_monedas } = useAppSelector(
    (state: AppState) => state.caja
  );
  return (
    <div>
      <div className="">
        <label className="block font-medium text-gray-700">
          Total Billetes: C${total_billetes_cordobas.toFixed(2)}
        </label>
      </div>
      <div className="">
        <label className="block font-medium text-gray-700">
          Total Monedas: C${total_monedas.toFixed(2)}
        </label>
      </div>
      <div className="col-span-2">
        <label className="block font-medium text-gray-700">
          Saldo Actual: C${caja.saldo_actual.toFixed(2)}
        </label>
        <label className="block font-medium text-gray-700">
          Total Efectivo: C$ {total.toFixed(2)}
        </label>
      </div>
    </div>
  );
};

interface PropsDetalle {
  arqueo: IArqueoCaja;
  monedas: Moneda[];
  billetes: Billete[];
}
export const DetalleArqueoCaja: FC<PropsDetalle> = ({
  arqueo,
  billetes,
  monedas,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(!isOpen);

  const openModal = () => setIsOpen(!isOpen);
  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={openModal}
          className="rounded-lg bg-lime-600 px-4 py-2 text-sm font-medium text-white  hover:bg-lime-700"
        >
          Ver Detalles
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
                    Detalles Arqueo
                  </Dialog.Title>

                  <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                    {/* Caja */}
                    <div className="col-span-2 mt-2">
                      <label
                        htmlFor="caja"
                        className="block font-medium text-gray-700"
                      >
                        Caja {arqueo.caja.id} - {arqueo.caja.tipo_caja}
                      </label>
                    </div>

                    <div>
                      <label className="block font-medium text-gray-700">
                        Billetes - Córdobas
                      </label>
                      {billetes.map((denominacion) => (
                        <div
                          key={denominacion.denominacion.toString()}
                          className=" mt-2 flex items-center gap-4"
                        >
                          <label
                            htmlFor={denominacion.denominacion.toString()}
                            className="mr-4 block font-medium text-gray-700"
                          >
                            Cantidad: {denominacion.cantidad.toString()}
                          </label>
                          <label
                            htmlFor={denominacion.toString()}
                            className="mr-4 block font-medium text-gray-700"
                          >
                            Denominación: C${" "}
                            {denominacion.denominacion.toString()}
                          </label>
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="block font-medium text-gray-700">
                        Billetes - Córdobas
                      </label>
                      {monedas.map((denominacion) => (
                        <div
                          key={denominacion.denominacion.toString()}
                          className=" mt-2 flex items-center gap-4"
                        >
                          <label
                            htmlFor={denominacion.denominacion.toString()}
                            className="mr-4 block font-medium text-gray-700"
                          >
                            Cantidad: {denominacion.cantidad.toString()}
                          </label>
                          <label
                            htmlFor={denominacion.toString()}
                            className="mr-4 block font-medium text-gray-700"
                          >
                            Denominación: C${" "}
                            {denominacion.denominacion.toString()}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <label className="block font-medium text-gray-700">
                    Total Efectivo: C$ {arqueo.total.toFixed(2)}
                  </label>

                  <button
                    type="button"
                    className="mt-4  inline-flex items-center rounded-md border border-transparent bg-[#CA1514] px-4 py-2 font-medium text-white shadow-sm"
                    onClick={closeModal}
                  >
                    Salir
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
