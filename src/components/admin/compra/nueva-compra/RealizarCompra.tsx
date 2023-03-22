import { Transition, Dialog } from "@headlessui/react";
import {
  ExclamationCircleIcon,
  PlusCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
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
  tipo_Compra: string;
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

  const onRealizarCompra = async () => {
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
          className="rounded-2xl bg-green-700 px-4 py-2 text-sm font-medium text-white  hover:bg-green-600"
        >
          Realizar Compra
        </button>
      </div>

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XCircleIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationCircleIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Realizar Compra
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        ¿Está seguro que quiere realizar la compra?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={onRealizarCompra}
                  >
                    Realizar compra
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
