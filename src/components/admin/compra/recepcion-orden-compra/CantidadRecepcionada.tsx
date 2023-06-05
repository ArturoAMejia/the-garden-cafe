import React, { FC, useEffect, useState } from "react";

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
        cantidad_recepcionada: Number(nuevo_valor),
      })
    );
  };

  useEffect(() => {
    dispatch(actualizarCantidadRecepcionada(0));
  }, [dispatch]);

  return (
    <input
      type="number"
      className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      onChange={(e) => handleNuevaCantidad(e.target.value)}
      defaultValue={0}
      max={producto.cantidad}
      min={0}
    />
  );
};
