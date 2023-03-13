import Cookies from "js-cookie";
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Layout from "../../components/Layout/Layout";

type FormData = {
  correo: string;
  fecha_reserva: Date;
  total_personas: string;
  observaciones: string;
};

const ReservacionesIndex = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const nombre = Cookies.get("nombre");
  const apellido = Cookies.get("apellido");
  const correo = Cookies.get("correo");
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(!isOpen);
  const openModal = () => setIsOpen(!isOpen);
  const [open, setOpen] = useState(true);

  let today = new Date().toISOString().slice(0, -8);

  const { register, handleSubmit, reset, getValues } = useForm<FormData>();

  const { user } = useContext(AuthContext);

  const cancelButtonRef = useRef(null);
  if (!isLoggedIn) {
    return <Login />;
  }
  const realizarPedido = () => {
    setOpen(false);
    router.push("/menu");
  };

  const onFormSubmit = async ({
    correo,
    fecha_reserva,
    total_personas,
    observaciones,
  }: FormData) => {
    try {
      const res = await tgcApi({
        url: "api/venta/reservacion",
        method: "POST",
        data: {
          id_cliente: Number(user?.id),
          correo,
          fecha_reserva,
          total_personas,
          observaciones,
        },
      });
      reset();
      toast.success("Reservacion realizada correctamente!");
      closeModal()

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };
  const realizarReservacion = async ({
    correo,
    fecha_reserva,
    total_personas,
    observaciones,
  }: FormData) => {
    onFormSubmit({
      correo,
      fecha_reserva,
      total_personas,
      observaciones,
    });
  };

  return (
    <Layout
      title="Reserva en Línea"
      pageDescription="Página para reservar una mesa"
    >
      <div>
        <div className="bg-[#FFF9EA] py-12 md:py-20">
          <div className="mx-auto max-w-lg px-4 lg:px-8">
            <h1 className="mb-12 text-3xl font-bold">Reserva tu mesa!</h1>
            <form
              className="grid grid-cols-6 gap-4"
              onSubmit={handleSubmit(onFormSubmit)}
            >
              <div className="col-span-3">
                <label
                  className="mb-1 block text-sm text-gray-600"
                  htmlFor="nombre"
                >
                  Nombre
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm"
                  type="text"
                  id="nombre"
                  value={nombre}
                  // {...register("nombre")}
                />
              </div>
              <div className="col-span-3">
                <label
                  className="mb-1 block text-sm text-gray-600"
                  htmlFor="apellido"
                >
                  Apellido
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm"
                  type="text"
                  id="apellido"
                  value={apellido}
                  //{...register("apellido")}
                />
              </div>
              <div className="col-span-3">
                <label
                  className="mb-1 block text-sm text-gray-600"
                  htmlFor="correo"
                >
                  Correo
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm"
                  type="email"
                  id="correo"
                  value={correo}
                  {...register("correo")}
                />
              </div>
              <div className="col-span-3">
                <label
                  className="mb-1 block text-sm text-gray-600"
                  htmlFor="telefono"
                >
                  Telefono
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm"
                  type="tel"
                  id="telefono"
                />
              </div>
              <div className="col-span-6">
                <label
                  className="mb-1 block text-sm text-gray-600"
                  htmlFor="hora_reserva"
                >
                  Fecha y Hora de Reserva
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm"
                  type="datetime-local"
                  min={today}
                  id="hora_reserva"
                  {...register("fecha_reserva", {
                    required: "Este campo es obligatorio",
                    valueAsDate: true,
                  })}
                />
              </div>
              <div className="col-span-6">
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Observaciones
                </label>
                <div className="mt-1">
                  <textarea
                    rows={4}
                    id="comment"
                    className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                    defaultValue={""}
                    {...register("observaciones")}
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label
                  className="mb-1 block text-sm text-gray-600"
                  htmlFor="nombre"
                >
                  Total personas
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm"
                  type="number"
                  {...register("total_personas", {
                    valueAsNumber: true,
                  })}
                />
              </div>
              {/* <div className="col-span-6">
                <button
                  className="block w-full rounded-lg bg-[#A8734F] p-2.5 text-sm text-white"
                  type="submit"
                >
                  Continuar
                </button>
              </div> */}
              <div className="col-span-6">
                <>
                  <div className="mx-2">
                    <button
                      type="button"
                      onClick={openModal}
                      className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-[#388C04] py-2 text-sm font-medium text-white shadow-sm  hover:bg-[#8CA862]"
                    >
                      Continuar
                    </button>
                  </div>

                  <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                      as="div"
                      className="relative z-10"
                      onClose={closeModal}
                    >
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
                              <div className="relative inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
                                <div>
                                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                    <BookmarkIcon
                                      className="h-6 w-6 text-green-600"
                                      aria-hidden="true"
                                    />
                                  </div>
                                  <div className="mt-3 text-center sm:mt-5">
                                    <Dialog.Title
                                      as="h3"
                                      className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                      ¿Desea añadir un pedido a su reservación?
                                    </Dialog.Title>
                                  </div>
                                </div>
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                  <button
                                    type="submit"
                                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                                    onClick={() =>
                                      realizarReservacion({
                                        correo: getValues("correo"),
                                        fecha_reserva:
                                          getValues("fecha_reserva"),
                                        total_personas:
                                          getValues("total_personas"),
                                        observaciones:
                                          getValues("observaciones"),
                                      })
                                    }
                                  >
                                    Continuar con mi reservación
                                  </button>
                                  <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                                    onClick={() => realizarPedido()}
                                    ref={cancelButtonRef}
                                  >
                                    Realizar pedido
                                  </button>
                                </div>
                              </div>
                            </Dialog.Panel>
                          </Transition.Child>
                        </div>
                      </div>
                    </Dialog>
                  </Transition>
                </>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReservacionesIndex;

import { GetServerSideProps } from "next";
import { prisma } from "./../../database";

import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import tgcApi from "../../api/tgcApi";
import Login from "../auth/login";
import { useRouter } from "next/router";
import { ConfirmarReservacion } from "../../components/reservaciones/ConfirmarReservacion";
import { Dialog, Transition } from "@headlessui/react";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "../../context";
