import { Transition, Dialog } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { FC, Fragment, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AdminContext } from "../../../../context";
import { IMoneda, IPedido } from "../../../../interfaces";
import { useCrearVentaMutation } from "@/store/slices/venta";
import {
  asignarDescuento,
  cargarPedido,
  cobrarPedido,
} from "@/store/slices/pedido/pedidoSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { AppState } from "@/store/store";
import { Divider, Subtitle } from "@tremor/react";
import { useActualizarEstadoPedidoMutation } from "@/store/slices/pedido";

type FormData = {
  id_moneda: number;
  id_forma_pago: number;
  tipo_venta: string;
  descripcion: string;
  pago_cliente: number;
};

interface Props {
  pedido: IPedido;
}

export const RealizarVenta: FC<Props> = ({ pedido }) => {
  const { monedas, formas_pago } = useContext(AdminContext);

  const [actualizarEstadoPedido] = useActualizarEstadoPedidoMutation();

  const { id, id_trabajador, id_cliente, detalle_pedido } = pedido;

  const productosPedido = detalle_pedido.map((producto: any) => ({
    id: producto.id_producto_elaborado,
    precio: producto.precio,
    cantidad: producto.cantidad,
  }));

  const [crearVenta] = useCrearVentaMutation();

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(!isOpen);

  const dispatch = useAppDispatch();

  const { total, subtotal, cambio, descuento } = useAppSelector(
    (state: AppState) => state.pedido
  );

  const openModal = () => {
    const productos = pedido.detalle_pedido.map((producto: any) => ({
      id: producto.id_producto_elaborado,
      precio: producto.precio,
      nombre: producto.producto_elaborado.nombre,
      descripcion: producto.producto_elaborado.descripcion,
      imagen: producto.producto_elaborado.imagen,
      cantidad: producto.cantidad,
    }));

    dispatch(cargarPedido(productos));
    setIsOpen(!isOpen);
  };

  const { register, handleSubmit, reset } = useForm<FormData>();

  const onRealizarVenta = async (data: FormData) => {
    const { descripcion, id_forma_pago, id_moneda, tipo_venta } = data;
    try {
      await crearVenta({
        id_pedido: id,
        id_trabajador,
        id_cliente,
        productos: productosPedido,
        descripcion,
        id_cat_forma_pago: id_forma_pago,
        tipo_venta,
        id_moneda,
        subtotal,
        descuento: 0,
      }).unwrap();
      toast.success("Venta realizada correctamente.", {
        duration: 3000,
      });
      await actualizarEstadoPedido({ ...pedido, id_estado: 8 }).unwrap();
      closeModal();
      reset();
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={openModal}
          className="rounded-lg bg-lime-600 px-4 py-2 text-sm font-medium text-white  hover:bg-lime-700"
        >
          Realizar Venta
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
                    <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
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
                      {/* Forma de pago */}
                      <div className="mt-2">
                        <label
                          htmlFor="forma_pago"
                          className="block font-medium text-gray-700"
                        >
                          Forma de Pago
                        </label>
                        <div className="mt-1">
                          <select
                            id="forma_pago"
                            {...register("id_forma_pago", {
                              valueAsNumber: true,
                            })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          >
                            {formas_pago.map((forma_pago) => (
                              <option key={forma_pago.id} value={forma_pago.id}>
                                {forma_pago.nombre}
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
                      {/* Entrega del Cliente */}
                      <div className="mt-2">
                        <label
                          htmlFor="pago_cliente"
                          className="block font-medium text-gray-700"
                        >
                          Entrega cliente
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            id="pago_cliente"
                            onChange={(e) =>
                              dispatch(
                                cobrarPedido({
                                  pago_cliente: Number(e.target.value),
                                })
                              )
                            }
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                      {/* Descuento */}
                      <div className="mt-2">
                        <label
                          htmlFor="pago_cliente"
                          className="block font-medium text-gray-700"
                        >
                          Descuento
                        </label>
                        <div className="mt-1">
                          <input
                            type="number"
                            id="pago_cliente"
                            onChange={(e) =>
                              dispatch(
                                asignarDescuento({
                                  descuento: Number(e.target.value),
                                })
                              )
                            }
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                      {/* Descripción */}
                      <div className="col-span-2 mt-2">
                        <label
                          htmlFor="direccion"
                          className="block font-medium text-gray-700"
                        >
                          Descripción de la Venta
                        </label>
                        <div className="mt-1">
                          <textarea
                            rows={2}
                            id="direccion"
                            className="block w-full resize-none rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            {...register("descripcion")}
                          />
                        </div>
                      </div>
                      <div className="col-span-5 flex flex-col">
                        <Divider className="my-2" />
                        <Subtitle className="text-lg font-bold text-black">
                          {" "}
                          Subtotal: ${subtotal.toFixed(2)}
                        </Subtitle>
                        <Subtitle className="text-lg font-bold text-black">
                          Impuesto: $
                          {(
                            subtotal * Number(process.env.NEXT_PUBLIC_TAX_RATE)
                          ).toFixed(2)}
                        </Subtitle>
                        <Subtitle className="text-lg font-bold text-black">
                          Descuento: ${descuento.toFixed(2)}
                        </Subtitle>
                        {}
                        <Subtitle className="text-lg font-bold text-black">
                          Cambio: ${cambio.toFixed(2)}
                        </Subtitle>
                        <Subtitle className="text-lg font-bold text-black">
                          Total: ${total.toFixed(2)}
                        </Subtitle>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="mt-4 inline-flex items-center rounded-md border border-transparent bg-[#388C04] px-4 py-2 font-medium text-white shadow-sm"
                    >
                      Realizar Venta
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
