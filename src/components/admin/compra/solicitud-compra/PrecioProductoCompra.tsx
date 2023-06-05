import React, { FC } from "react";

import { useAppDispatch } from "@/hooks/hooks";

import { IProductoCart } from "@/interfaces/producto";
import {
  actualizarProductoCantidad,
  actualizarProductoPrecio,
} from "@/store/slices/compra";

interface Props {
  producto: IProductoCart;
  id_estado?: number;
}

export const PrecioProductoCompra: FC<Props> = ({ producto, id_estado }) => {
  const dispatch = useAppDispatch();

  const handleNuevaCantidad = (precio) => {
    dispatch(
      actualizarProductoPrecio({
        ...producto,
        precio: parseInt(precio),
      })
    );
  };

  return (
    <input
      type="number"
      className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      onChange={(e) => handleNuevaCantidad(e.target.value)}
      defaultValue={producto.precio}
    />
  );
};
