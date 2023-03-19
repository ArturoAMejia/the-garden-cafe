import { Transition, Dialog } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { FC, Fragment, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AdminContext, AuthContext, CartContext } from "../../../../context";
import {
  IMoneda,
  IOrdenCompra,
  IPedido,
  ISolicitudCompra,
} from "../../../../interfaces";
import { useCrearCompraMutation } from "@/store/slices/compra";

type FormData = {
  id_proveedor: number;
  id_forma_pago: number;
  tipo_venta: string;
  descripcion: string;
};

interface Props {
  orden: IOrdenCompra;
}
export const RealizarCompra: FC<Props> = ({ orden }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(!isOpen);

  const [crearCompra] = useCrearCompraMutation();
  const { cargarPedido, productos, subtotal } = useContext(AdminContext);
  const openModal = () => {
    cargarPedido(
      orden.detalle_orden_compra.map((producto: any) => ({
        id: producto.id_producto,
        precio: producto.precio_unitario,
        nombre: producto.producto.nombre,
        descripcion: producto.producto.descripcion,
        imagen: producto.producto.imagen,
        cantidad: producto.cantidad,
      }))
    );
    setIsOpen(!isOpen);
  };

  const { register, handleSubmit, reset } = useForm<FormData>();

  const {
    id,
    id_proveedor,
    autorizado_por,
    detalle_orden_compra,
    comprobante,
  } = orden;

  const detalles = detalle_orden_compra.map((producto: any) => ({
    id: producto.id_producto,
    precio: producto.precio_unitario,
    cantidad: producto.cantidad,
  }));

  const onRealizarVenta = async (data: FormData) => {
    crearCompra({
      id_proveedor,
      id_trabajador: autorizado_por,
      id_orden_compra: id,
      productos: detalles,
      descripcion: comprobante!.descripcion,
      subtotal,
    })
      .unwrap()
      .then((res) => {
        toast.success("Compra guardada correctamente");
        closeModal();
      })
      .catch((error) => toast.error(error.data.message));
  };
  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={openModal}
          className="rounded-lg bg-lime-600 px-4 py-2 text-sm font-medium text-white  hover:bg-lime-700"
        >
          Realizar Compra
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
                    Realizar Venta
                  </Dialog.Title>

                  <form
                    className="h-3/4 w-full"
                    onSubmit={handleSubmit(onRealizarVenta)}
                  >
                    <div className="flex flex-col gap-4 md:grid md:grid-cols-5">
                      {/* Tipo de venta */}
                      <div className="mt-2">
                        <label
                          htmlFor="tipo_venta"
                          className="block font-medium text-gray-700"
                        >
                          Tipo de Venta
                        </label>
                        <div className="mt-1">
                          <select
                            id="tipo_venta"
                            {...register("tipo_venta")}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          >
                            <option value="En línea">En línea</option>
                            <option value="En línea">En el local</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="mt-4 inline-flex items-center rounded-md border border-transparent bg-[#388C04] px-4 py-2 font-medium text-white shadow-sm"
                    >
                      Aceptar Solicitud de Compra
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
