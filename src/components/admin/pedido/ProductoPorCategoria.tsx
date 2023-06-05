import React, { FC, useState, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { ICategoriaProducto } from "@/interfaces";
import { ProductoAñadirOrdenTable } from "@/components/tables/pedidos/ProductoAñadirOrdenTable";
import { useObtenerPlatillosQuery } from "@/store/slices/inventario";
import { ProductoFiltrado } from "./ProductoFiltrado";
import { añadirProductoPedido } from "@/store/slices/pedido/pedidoSlice";

interface Props {
  categoria: ICategoriaProducto;
}

export const ProductoPorCategoria: FC<Props> = ({ categoria }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(!isOpen);
  const closeModal = () => setIsOpen(!isOpen);

  const { data: platillos, isLoading } = useObtenerPlatillosQuery();

  if (isLoading) return <>Cargando...</>;

  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={openModal}
          className="flex w-full flex-col items-center justify-center rounded-md border border-transparent bg-blue-100 p-8 px-4 text-sm font-medium shadow-lg"
        >
          {categoria.nombre}
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          {/* <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child> */}

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              {/* <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
              
              </Transition.Child> */}
              <Dialog.Panel className="h-auto w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-bold leading-6 text-gray-900"
                >
                  {categoria.nombre}
                </Dialog.Title>
                <div>
                  {/* <ProductoAñadirOrdenTable id_categoria={categoria.id} /> */}
                  {platillos
                    .filter(
                      (platillo) =>
                        platillo.id_categoria_producto === categoria.id
                    )
                    .map((platillo) => (
                      <ProductoFiltrado
                        añadirProductoOrden={añadirProductoPedido}
                        isIngredient={false}
                        isPlate={true}
                        producto={platillo}
                        key={`${platillo.id}${platillo.nombre}${platillo.precio_producto}`}
                      />
                    ))}
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
