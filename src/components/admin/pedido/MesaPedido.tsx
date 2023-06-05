import React, { FC } from "react";
import { useAppDispatch } from "@/hooks/hooks";
import { IMesa } from "@/interfaces";
import { seleccionarMesa } from "@/store/slices/pedido/pedidoSlice";
import { GiTable } from "react-icons/gi";

interface Props {
  mesa: IMesa;
}
export const MesaPedido: FC<Props> = ({ mesa }) => {
  const dispatch = useAppDispatch();
  return (
    <button
      type="button"
      onClick={() => dispatch(seleccionarMesa({ id_mesa: mesa.id }))}
      className="flex flex-col items-center justify-center rounded-md border border-transparent px-4 text-sm font-medium shadow-md sm:w-auto"
    >
      <p className="text-black">{mesa.nombre}</p>
      <GiTable
        size="10em"
        style={{
          color: mesa.id_estado === 1 ? "#22c55e" : "#be123c",
          paddingTop: "0",
        }}
      />
      <p className="text-black">
        {mesa.id_estado === 1 ? "Disponible" : "Ocupada"}
      </p>
    </button>
  );
};
