import { Combobox } from "@headlessui/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";

import { IMenu, IProducto } from "../../../interfaces";
import { IProductoCart } from "../../../interfaces/producto";

interface Props {
  producto: any;
  añadirProductoOrden: (producto: IProductoCart) => void;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export const ProductoFiltrado: FC<Props> = ({
  producto,
  añadirProductoOrden,
}) => {
  const [tempCartProducto, setTempCartProducto] = useState<any>({
    id: Number(producto.id),
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    categoria: producto?.categoria_producto.nombre,
    unidad_medida: producto?.unidad_medida.siglas,
    cantidad: 1,
    precio: producto.precio_producto![0].precio_venta,
    imagen: producto.imagen,
  });


  const onAddProduct = () => {
    toast.success("Producto añadido al carrito!");
    añadirProductoOrden(tempCartProducto);
  };
  return (
    <Combobox.Option
      key={producto.id}
      value={producto}
      className={({ active }) =>
        classNames(
          "cursor-default select-none px-4 py-2",
          active && "bg-[#FFF9EA] text-black"
        )
      }
    >
      <div className="flex flex-row justify-between">
        <p className="mt-2">{producto.nombre}</p>
        <button
          type="submit"
          className="w-auto whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-xs font-medium text-white bg-[#388C04] hover:bg-[#8CA862]"
          onClick={onAddProduct}
        >
          <span>Añadir</span>
          <ShoppingCartIcon className="ml-2 h-5 w-5 text-white" />
        </button>
      </div>
    </Combobox.Option>
  );
};
