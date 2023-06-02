import React, { FC } from "react";

import { useAppDispatch } from "@/hooks/hooks";

import { IProductoCart } from "@/interfaces/producto";
import { actualizarCantidadRecepcionada } from "@/store/slices/compra";

interface Props {
  producto: IProductoCart;
}

export const CantidadRecepcionada: FC<Props> = ({ producto }) => {
  const dispatch = useAppDispatch();

  const handleNuevaCantidad = (nuevo_valor) => {
    dispatch(
      actualizarCantidadRecepcionada({
        ...producto,
        cantidad_recepcionada: parseInt(nuevo_valor),
      })
    );
  };

  return (
    <input
      type="number"
      className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      onChange={(e) => handleNuevaCantidad(e.target.value)}
      defaultValue={producto.cantidad}
      max={producto.cantidad}
      min={0}
      />
  );
};
