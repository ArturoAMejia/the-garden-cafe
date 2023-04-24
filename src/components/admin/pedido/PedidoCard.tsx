import { IPedido } from "@/interfaces";
import {
  CheckIcon,
  ArrowTopRightOnSquareIcon,
  XMarkIcon,
  ArrowUturnDownIcon,
} from "@heroicons/react/24/outline";
import { Card, Title, Subtitle, Button } from "@tremor/react";
import { getHours, getMinutes } from "date-fns";
import { useActualizarEstadoPedidoMutation } from "@/store/slices/pedido";
import React, { FC } from "react";
import toast from "react-hot-toast";
import { AnularPedido } from "./AnularPedido";
import Link from "next/link";

interface Props {
  pedido: IPedido;
  id_estado: number;
  color: "amber" | "blue" | "green";
  undo?: number;
}
export const PedidoCard: FC<Props> = ({ pedido, id_estado, color, undo }) => {
  const [actualizarEstadoPedido] = useActualizarEstadoPedidoMutation();

  const handleEstado = async (pedido: IPedido, id_estado) => {
    try {
      await actualizarEstadoPedido({ ...pedido, id_estado }).unwrap();
      toast.success("Estado actualizado correctamente!.");
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <Card
      key={pedido.id}
      decoration="top"
      decorationColor={color}
      className="my-2 w-full"
    >
      <Title>Pedido º{pedido.id}</Title>
      <Subtitle>
        Cliente:{""} {pedido.cliente.persona.nombre}{" "}
        {pedido.cliente.persona.apellido_razon_social}{" "}
      </Subtitle>
      <Subtitle className="mb-2">
        Hora: {getHours(new Date(pedido.fecha_pedido))}
        {":"}
        {getMinutes(new Date(pedido.fecha_pedido))}
      </Subtitle>
      <div className="flex gap-2">
        {pedido.id_estado !== 5 && (
          <Button
            color="emerald"
            className="p-2"
            onClick={() => handleEstado(pedido, id_estado)}
          >
            <CheckIcon className="h-4 w-4" />
          </Button>
        )}

        <Link href={`/admin/pedidos/pedidos-realizados/${pedido.id}`}>
          <Button color="blue" className="p-2">
            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          </Button>
        </Link>
        {pedido.id_estado !== 3 && (
          <Button
            color="cyan"
            className="p-2"
            onClick={() => handleEstado(pedido, undo)}
          >
            <ArrowUturnDownIcon className="h-4 w-4" />
          </Button>
        )}
        {pedido.id_estado !== 5 && (
          <AnularPedido id={pedido.id} disable={pedido.id_estado === 13} />
        )}
      </div>
    </Card>
  );
};
