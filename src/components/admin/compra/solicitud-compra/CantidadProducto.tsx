import React, { FC, useState } from "react";

import { useAppDispatch } from "@/hooks/hooks";

import { IProductoCart } from "@/interfaces/producto";
import {
  actualizarCantidadProductoSolicitud,
  actualizarProductoCantidad,
} from "@/store/slices/compra";

interface Props {
  producto: IProductoCart;
}

export const CantidadProducto: FC<Props> = ({ producto }) => {
  const dispatch = useAppDispatch();

  const handleNuevaCantidad = (nuevo_valor) => {
    dispatch(
      actualizarProductoCantidad({
        ...producto,
        cantidad: parseInt(nuevo_valor),
      })
    );
  };

  return (
    <input
      type="text"
      className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      onChange={(e) => handleNuevaCantidad(e.target.value)}
      defaultValue={producto.cantidad}
    />
  );
};
