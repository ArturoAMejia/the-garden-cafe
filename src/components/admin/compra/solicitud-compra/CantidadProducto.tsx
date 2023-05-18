import React, { FC, useState } from "react";

import { useAppDispatch } from "@/hooks/hooks";

import { IProductoCart } from "@/interfaces/producto";
import { actualizarCantidadProductoSolicitud } from "@/store/slices/compra";

interface Props {
  producto: IProductoCart;
}

export const CantidadProducto: FC<Props> = ({ producto }) => {

  const [value, setValue] = useState<number>(producto.cantidad);

  const dispatch = useAppDispatch();
  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
    dispatch(
      actualizarCantidadProductoSolicitud({ ...producto, cantidad: value })
    );
  };
  return (
    <input
      type="number"
      className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      value={value}
      onChange={onValueChange}
    />
  );
};
