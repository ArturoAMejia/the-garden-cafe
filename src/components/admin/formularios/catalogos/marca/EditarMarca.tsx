import { FC, Fragment, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useActualizarMarcaMutation } from "@/store/slices/inventario";

interface Props {
  marca: any;
}

type FormData = {
  nombre: string;
  siglas: string;
  id_estado: number;
};
export const EditarMarca: FC<Props> = ({ marca }) => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(!isOpen);
  const openModal = () => setIsOpen(!isOpen);


  const [actualizarMarca] = useActualizarMarcaMutation();
  const onActualizarMarca = async ({ nombre, id_estado, siglas }: FormData) => {
    actualizarMarca({
      id: marca.id,
      id_estado: Number(id_estado),
      nombre,
      siglas,
    })
      .unwrap()
      .then((res) => {
        toast.success("Marca actualizada correctamente.");
        closeModal();
        reset();
      })
      .catch((error) => toast.error(error.data.message));
  };
  return (
    <>
      <div className="mx-2">
        <button
          type="button"
          onClick={openModal}
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#388C04] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#8CA862] sm:w-auto"
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
                <Dialog.Panel className="h-auto w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900"
                  >
                    Actualizar Marca
                  </Dialog.Title>

                  <form
                    className="h-3/4 w-full"
                    onSubmit={handleSubmit(onActualizarMarca)}
                  >
                    <div className="grid grid-cols-3 gap-4">
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
                            defaultValue={marca.nombre}
                          />
                        </div>
                      </div>
                      {/* Siglas */}
                      <div className="mt-2">
                        <label
                          htmlFor="siglas"
                          className="block font-medium text-gray-700"
                        >
                          Siglas
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="siglas"
                            maxLength={3}
                            {...register("siglas")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            defaultValue={marca.siglas}
                          />
                        </div>
                      </div>
                      {/* Estado */}
                      <div className="mt-2">
                        <label
                          htmlFor="nombre"
                          className="block font-medium text-gray-700"
                        >
                          Estado
                        </label>
                        <div className="mt-1">
                          <select
                            id="estado"
                            {...register("id_estado")}
                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                          >
                            <option key={marca.id} value={marca.cat_estado?.id}>
                              {marca.cat_estado?.nombre}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="mt-4 mr-2 inline-flex items-center rounded-md border border-transparent bg-[#388C04] px-4 py-2 font-medium text-white shadow-sm"
                    >
                      Actualizar Marca
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
