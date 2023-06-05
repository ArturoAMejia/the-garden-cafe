import React, { FC } from "react";

import { useAppDispatch } from "@/hooks/hooks";

import { IProductoCart } from "@/interfaces/producto";
import { actualizarProductoCantidad } from "@/store/slices/compra";

interface Props {
  producto: IProductoCart;
  id_estado?: number;
}

export const CantidadProducto: FC<Props> = ({ producto, id_estado }) => {
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
      disabled={id_estado === 14 ? true : false}
      className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      onChange={(e) => handleNuevaCantidad(e.target.value)}
      defaultValue={producto.cantidad}
    />
  );
};
