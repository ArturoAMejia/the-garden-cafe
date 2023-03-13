import { FC, Fragment, useContext, useState } from "react";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import {
  ICargo,
  IEstadoCivil,
  IGrupoUsuario,
  ITrabajador,
} from "../../../../interfaces";
import { AdminContext } from "../../../../context";
import { toast } from "react-hot-toast";

type FormData = {
  cedula_ruc: string;
  nombre: string;
  apellido_razon_social: string;
  fecha_nacimiento_constitucion: Date;
  telefono: number;
  direccion_domicilio: string;
  correo: string;
  id_cargo: string;
  codigo_inss: string;
  genero: string;
  id_estado_civil: string;
};

interface Props {
  trabajador: ITrabajador;
}
const EditarTrabajadores: FC<Props> = ({ trabajador }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(!isOpen);
  const openModal = () => setIsOpen(!isOpen);

  const { register, handleSubmit, reset } = useForm<FormData>();

  const { actualizarTrabajador, estado_civil, grupos_usuarios } =
    useContext(AdminContext);
  const onEditarTrabajadores = async ({
    cedula_ruc,
    nombre,
    apellido_razon_social,
    fecha_nacimiento_constitucion,
    telefono,
    direccion_domicilio,
    correo,
    id_cargo,
    codigo_inss,
    genero,
    id_estado_civil,
  }: FormData) => {
    const { hasError, message } = await actualizarTrabajador(
      trabajador.id,
      cedula_ruc,
      nombre,
      apellido_razon_social,
      fecha_nacimiento_constitucion,
      telefono,
      direccion_domicilio,
      correo,
      id_cargo,
      codigo_inss,
      genero,
      id_estado_civil
    );

    if (hasError) {
      toast.error(message);
      return;
    }

    toast.success("Trabajador registrado correctamente.");
    reset();
    closeModal();
  };

  return (
    <>
      <div className="mx-2">
        <button
          type="button"
          onClick={openModal}
          className="inline-flex items-center rounded-md border border-transparent bg-[#388C04] px-4 py-2 font-medium text-white shadow-sm"
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
                    Editar Trabajador
                  </Dialog.Title>

                  <form
                    className="h-3/4 w-full"
                    onSubmit={handleSubmit(onEditarTrabajadores)}
                  >
                    <div className="flex flex-col  gap-4 md:grid md:grid-cols-4">
                      {/* Cédula - RUC */}
                      <div className="mt-2">
                        <label
                          htmlFor="cedula"
                          className="block font-medium text-gray-700"
                        >
                          Cédula - RUC
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="cedula"
                            {...register("cedula_ruc")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="001-010199-0000L"
                            defaultValue={trabajador.persona?.cedula_ruc}
                            required
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
                            required
                            defaultValue={trabajador.persona?.nombre}
                          />
                        </div>
                      </div>
                      <div className="mt-2">
                        <label
                          htmlFor="apellido"
                          className="block font-medium text-gray-700"
                        >
                          Apellido
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="apellido"
                            {...register("apellido_razon_social")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                            defaultValue={
                              trabajador.persona?.apellido_razon_social
                            }
                          />
                        </div>
                      </div>
                      {/* Fecha de Nacimiento */}
                      <div className="mt-2">
                        <label
                          htmlFor="fecha_nacimiento_constitucion"
                          className="block font-medium text-gray-700"
                        >
                          Fecha de Nacimiento
                        </label>
                        <div className="mt-1">
                          <input
                            type="date"
                            id="fecha_nacimiento_constitucion"
                            {...register("fecha_nacimiento_constitucion", {
                              valueAsDate: true,
                            })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                          />
                        </div>
                      </div>
                      {/* Teléfono */}
                      <div className="mt-2">
                        <label
                          htmlFor="telefono"
                          className="block font-medium text-gray-700"
                        >
                          Teléfono
                        </label>
                        <div className="mt-1">
                          <input
                            type="tel"
                            id="telefono"
                            {...register("telefono")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                            defaultValue={trabajador.persona?.telefono}
                          />
                        </div>
                      </div>
                      {/* Dirección - Domicilio */}
                      <div className="col-span-2 mt-2">
                        <label
                          htmlFor="direccion"
                          className="block font-medium text-gray-700"
                        >
                          Dirección - Domicilio
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="direccion"
                            {...register("direccion_domicilio")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                            defaultValue={
                              trabajador.persona?.direccion_domicilio
                            }
                          />
                        </div>
                      </div>

                      {/*  Correo  */}
                      <div className="mt-2">
                        <label
                          htmlFor="correo"
                          className="block font-medium text-gray-700"
                        >
                          Correo
                        </label>
                        <div className="mt-1">
                          <input
                            type="email"
                            id="correo"
                            {...register("correo")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                            defaultValue={trabajador.persona?.correo}
                          />
                        </div>
                      </div>

                      {/* Cargo */}
                      <div className="mt-2">
                        <label
                          htmlFor="grupo"
                          className="block font-medium text-gray-700"
                        >
                          Grupo
                        </label>
                        <div className="mt-1">
                          <select
                            id="grupo"
                            {...register("id_cargo")}
                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                          >
                            {grupos_usuarios?.map((c) => (
                              <option key={c.nombre.toString()} value={c.id}>
                                {c.nombre}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {/*  codigo_inss  */}
                      <div className="mt-2">
                        <label
                          htmlFor="codigo_inss"
                          className="block font-medium text-gray-700"
                        >
                          Codigo INSS
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="codigo_inss"
                            {...register("codigo_inss")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            defaultValue={trabajador.codigo_inss}
                          />
                        </div>
                      </div>
                      {/*  genero  */}
                      <div className="mt-2">
                        <label
                          htmlFor="genero"
                          className="block font-medium text-gray-700"
                        >
                          Género
                        </label>
                        <div className="mt-1">
                          <select
                            id="genero"
                            {...register("genero")}
                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                          >
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                          </select>
                        </div>
                      </div>
                      {/* estado civil */}
                      <div className="mt-2">
                        <label
                          htmlFor="estado_civil"
                          className="block font-medium text-gray-700"
                        >
                          Estado Civil
                        </label>
                        <div className="mt-1">
                          <select
                            id="grupo"
                            {...register("id_estado_civil", {
                              valueAsNumber: true,
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                          >
                            {estado_civil?.map((c) => (
                              <option key={c.nombre.toString()} value={c.id}>
                                {c.nombre}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="mt-4 inline-flex items-center rounded-md border border-transparent bg-[#388C04] px-4 py-2 font-medium text-white shadow-sm"
                    >
                      Editar Trabajador
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

export default EditarTrabajadores;
