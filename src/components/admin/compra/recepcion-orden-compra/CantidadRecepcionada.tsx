import React, { FC, useState } from "react";

import { useAppDispatch } from "@/hooks/hooks";

import { IProductoCart } from "@/interfaces/producto";
import { actualizarCantidadRecepcionada } from "@/store/slices/compra";

interface Props {
  producto: IProductoCart;
}

export const CantidadRecepcionada: FC<Props> = ({ producto }) => {
  const [value, setValue] = useState(producto.cantidad);
  const dispatch = useAppDispatch();

  console.log(producto.cantidad);
  console.log(value);

  const handleNuevaCantidad = (nuevo_valor) => {
    setValue(nuevo_valor);
    dispatch(
      actualizarCantidadRecepcionada({
        ...producto,
        cantidad_recepcionada: Number(value),
      })
    );
  };

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
