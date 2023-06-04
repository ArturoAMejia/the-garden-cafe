import { Transition, Dialog } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { ICaja } from "../../../interfaces";
import tgcApi from "../../../api/tgcApi";
import axios from "axios";

import { useObtenerCajasQuery } from "@/store/slices/caja";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { AppState } from "@/store/store";
import {
  actualizarBilleteCien,
  actualizarBilleteCincuenta,
  actualizarBilleteVeinte,
  actualizarBilleteDiez,
  actualizarBilleteCinco,
  actualizarBilleteDos,
  actualizarBilleteUn,
  actualizarMonedaUnCentavo,
  actualizarMonedaCincoCentavo,
  actualizarMonedaDiezCentavo,
  actualizarMonedaVeinticincoCentavo,
  actualizarMonedaCincuentaCentavo,
} from "@/store/slices/caja/cajaSlice";

type FormData = {
  id_caja: number;
  billete_cien: number;
  billete_cincuenta: number;
  billete_veinte: number;
  billete_diez: number;
  billete_cinco: number;
  billete_dos: number;
  billete_un: number;
  moneda_un_centavo: number;
  moneda_cinco_centavo: number;
  moneda_diez_centavo: number;
  moneda_veinticinco_centavo: number;
  moneda_cincuenta_centavo: number;
};

export const ArquearCaja = () => {
  const { data: cajas, isLoading } = useObtenerCajasQuery();

  const { data: session } = useSession();

  const dispatch = useAppDispatch();
  const { total, total_billetes, total_monedas } = useAppSelector(
    (state: AppState) => state.caja
  );

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(!isOpen);

  const openModal = () => setIsOpen(!isOpen);

  const { register, handleSubmit, reset, watch } = useForm<FormData>();

  const caja_seleccionada = watch("id_caja", 1);

  const onAceptarSolicitud = async ({ id_caja }: FormData) => {
    try {
      await tgcApi.post("api/caja/cierre", {
        id_trabajador: Number(session?.user?.id_trabajador),
        id_caja,
      });
      toast.success("Caja cerrada correctamente.");
      closeModal();
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
                <Dialog.Panel className="h-auto w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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
                            {cajas.map((caja: ICaja) => (
                              <option key={caja.id} value={caja.id}>
                                {caja.tipo_caja}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block font-medium text-gray-700">
                          Billetes
                        </label>

                        <div className=" mt-2 flex items-center gap-4">
                          <label
                            htmlFor="billete_cien"
                            className="mr-4 block font-medium text-gray-700"
                          >
                            $100
                          </label>
                          <div className="mt-1 w-full">
                            <input
                              type="number"
                              id="billete_cien"
                              {...register("billete_cien", {
                                valueAsNumber: true,
                              })}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              onChange={(e) =>
                                dispatch(
                                  actualizarBilleteCien(Number(e.target.value))
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className=" mt-2 flex items-center gap-4">
                          <label
                            htmlFor="billete_cincuenta"
                            className="mr-6 block font-medium text-gray-700"
                          >
                            $50
                          </label>
                          <div className="mt-1 w-full">
                            <input
                              type="number"
                              id="billete_cincuenta"
                              {...register("billete_cincuenta", {
                                valueAsNumber: true,
                              })}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              onChange={(e) =>
                                dispatch(
                                  actualizarBilleteCincuenta(
                                    Number(e.target.value)
                                  )
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className=" mt-2 flex items-center gap-4">
                          <label
                            htmlFor="billete_veinte"
                            className="mr-6 block font-medium text-gray-700"
                          >
                            $20
                          </label>
                          <div className="mt-1 w-full">
                            <input
                              type="number"
                              id="billete_veinte"
                              {...register("billete_veinte", {
                                valueAsNumber: true,
                              })}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              onChange={(e) =>
                                dispatch(
                                  actualizarBilleteVeinte(
                                    Number(e.target.value)
                                  )
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className=" mt-2 flex items-center gap-4">
                          <label
                            htmlFor="billete_diez"
                            className="mr-6 block font-medium text-gray-700"
                          >
                            $10
                          </label>
                          <div className="mt-1 w-full">
                            <input
                              type="number"
                              id="billete_diez"
                              {...register("billete_diez", {
                                valueAsNumber: true,
                              })}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              onChange={(e) =>
                                dispatch(
                                  actualizarBilleteDiez(Number(e.target.value))
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className=" mt-2 flex items-center gap-4">
                          <label
                            htmlFor="billete_cinco"
                            className="mr-8 block font-medium text-gray-700"
                          >
                            $5
                          </label>
                          <div className="mt-1 w-full">
                            <input
                              type="number"
                              id="billete_cinco"
                              {...register("billete_cinco", {
                                valueAsNumber: true,
                              })}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              onChange={(e) =>
                                dispatch(
                                  actualizarBilleteCinco(Number(e.target.value))
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className=" mt-2 flex items-center gap-4">
                          <label
                            htmlFor="billete_dos"
                            className="mr-8 block font-medium text-gray-700"
                          >
                            $2
                          </label>
                          <div className="mt-1 w-full">
                            <input
                              type="number"
                              id="billete_dos"
                              {...register("billete_dos", {
                                valueAsNumber: true,
                              })}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              onChange={(e) =>
                                dispatch(
                                  actualizarBilleteDos(Number(e.target.value))
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className=" mt-2 flex items-center gap-4">
                          <label
                            htmlFor="billete_uno"
                            className="mr-8 block font-medium text-gray-700"
                          >
                            $1
                          </label>
                          <div className="mt-1 w-full">
                            <input
                              type="number"
                              id="billete_uno"
                              {...register("billete_un", {
                                valueAsNumber: true,
                              })}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              onChange={(e) =>
                                dispatch(
                                  actualizarBilleteUn(Number(e.target.value))
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block font-medium text-gray-700">
                          Monedas
                        </label>

                        <div className=" mt-2 flex items-center gap-4">
                          <label
                            htmlFor="moneda_un_centavo"
                            className="mr-4 block font-medium text-gray-700"
                          >
                            $0.01
                          </label>
                          <div className="mt-1 w-full">
                            <input
                              type="number"
                              id="moneda_un_centavo"
                              {...register("moneda_un_centavo", {
                                valueAsNumber: true,
                              })}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              onChange={(e) =>
                                dispatch(
                                  actualizarMonedaUnCentavo(
                                    Number(e.target.value)
                                  )
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className=" mt-2 flex items-center gap-4">
                          <label
                            htmlFor="moneda_cinco_centavo"
                            className="mr-6 block font-medium text-gray-700"
                          >
                            $0.05
                          </label>
                          <div className="mt-1 w-full">
                            <input
                              type="number"
                              id="moneda_cinco_centavo"
                              {...register("moneda_cinco_centavo", {
                                valueAsNumber: true,
                              })}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              onChange={(e) =>
                                dispatch(
                                  actualizarMonedaCincoCentavo(
                                    Number(e.target.value)
                                  )
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className=" mt-2 flex items-center gap-4">
                          <label
                            htmlFor="moneda_diez_centavo"
                            className="mr-6 block font-medium text-gray-700"
                          >
                            $0.10
                          </label>
                          <div className="mt-1 w-full">
                            <input
                              type="number"
                              id="moneda_diez_centavo"
                              {...register("moneda_diez_centavo", {
                                valueAsNumber: true,
                              })}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              onChange={(e) =>
                                dispatch(
                                  actualizarMonedaDiezCentavo(
                                    Number(e.target.value)
                                  )
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className=" mt-2 flex items-center gap-4">
                          <label
                            htmlFor="moneda_veinticinco_centavo"
                            className="mr-6 block font-medium text-gray-700"
                          >
                            $0.25
                          </label>
                          <div className="mt-1 w-full">
                            <input
                              type="number"
                              id="moneda_veinticinco_centavo"
                              {...register("moneda_veinticinco_centavo", {
                                valueAsNumber: true,
                              })}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              onChange={(e) =>
                                dispatch(
                                  actualizarMonedaVeinticincoCentavo(
                                    Number(e.target.value)
                                  )
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className=" mt-2 flex items-center gap-4">
                          <label
                            htmlFor="moneda_cincuenta_centavo"
                            className="mr-8 block font-medium text-gray-700"
                          >
                            $0.50
                          </label>
                          <div className="mt-1 w-full">
                            <input
                              type="number"
                              id="moneda_cincuenta_centavo"
                              {...register("moneda_cincuenta_centavo", {
                                valueAsNumber: true,
                              })}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              onChange={(e) =>
                                dispatch(
                                  actualizarMonedaCincuentaCentavo(
                                    Number(e.target.value)
                                  )
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <label className="block font-medium text-gray-700">
                          Total Billetes: ${total_billetes.toFixed(2)}
                        </label>
                      </div>
                      <div className="">
                        <label className="block font-medium text-gray-700">
                          Total Monedas: ${total_monedas.toFixed(2)}
                        </label>
                      </div>
                      <div className="col-span-2">
                        <label className="block font-medium text-gray-700">
                          Saldo Actual: $
                          {cajas
                            .find((caja) => caja.id === caja_seleccionada)
                            .saldo_actual.toFixed(2)}
                        </label>
                        <label className="block font-medium text-gray-700">
                          Total Efectivo: $ {total.toFixed(2)}
                          {/* {cajas
                            .find((caja) => caja.id === caja_seleccionada)
                            .saldo_actual.toFixed(2)} */}
                        </label>
                      </div>
                    </div>

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
