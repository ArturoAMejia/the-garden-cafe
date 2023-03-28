import { FC, Fragment, useState } from "react";

import { Combobox, Dialog, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { ProductoFiltrado } from "./ProductoFiltrado";
import { IProducto } from "../../../interfaces";
import { IProductoCart } from "../../../interfaces/producto";

interface Props {
  productos: IProducto[];
  añadirProductoOrden: (producto: IProductoCart) => void;
  isIngredient: boolean;
  isPlate:boolean;
}

export const FilterBar: FC<Props> = ({ productos, añadirProductoOrden, isIngredient, isPlate }) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filteredproductos =
    query === ""
      ? []
      : productos.filter((producto: IProducto) => {
          return producto.nombre.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <>
      <div className="mt-4 px-2 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          type="button"
          onClick={handleOpen}
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#388C04] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#8CA862] sm:w-auto"
        >
          Añadir Producto
        </button>
      </div>
      <Transition.Root
        show={open}
        as={Fragment}
        afterLeave={() => setQuery("")}
      >
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20"
          onClose={handleClose}
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
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Combobox
              as="div"
              className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
            >
              <div className="relative">
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <Combobox.Input
                  className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Buscar por nombre..."
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>

              {filteredproductos.length > 0 && (
                <Combobox.Options
                  static
                  className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
                >
                  {filteredproductos.map((producto: IProducto) => (
                    <ProductoFiltrado
                      key={producto.imagen}
                      producto={producto}
                      añadirProductoOrden={añadirProductoOrden}
                      isIngredient={isIngredient}
                      isPlate={isPlate}
                    />
                  ))}
                </Combobox.Options>
              )}

              {query !== "" && filteredproductos.length === 0 && (
                <p className="p-4 text-sm text-gray-500">
                  Producto no encontrado.
                </p>
              )}
            </Combobox>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  );
};
