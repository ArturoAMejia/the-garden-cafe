import { IPedido } from "@/interfaces";
import {
  CheckIcon,
  ArrowTopRightOnSquareIcon,
  ArrowUturnDownIcon,
} from "@heroicons/react/24/outline";
import { Card, Title, Subtitle, Button } from "@tremor/react";
import { getHours, getMinutes, intlFormat } from "date-fns";
import {
  useActualizarEstadoCocineroPedidoMutation,
  useActualizarEstadoPedidoMutation,
  useAsignarCocineroPedidoMutation,
  useObtenerPedidosCocinerosQuery,
} from "@/store/slices/pedido";
import React, { FC } from "react";
import toast from "react-hot-toast";
import { AnularPedido } from "./AnularPedido";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Loader } from "@/components/ui/Loader";

interface Props {
  pedido: IPedido;
  id_estado: number;
  color: "amber" | "blue" | "green";
  undo?: number;
  asignarCocinero: boolean;
}
export const PedidoCard: FC<Props> = ({
  pedido,
  id_estado,
  color,
  undo,
  asignarCocinero,
}) => {
  const { data: session } = useSession();

  const [actualizarEstadoPedido] = useActualizarEstadoPedidoMutation();
  const [asignarCocineroPedido] = useAsignarCocineroPedidoMutation();

  const [actualizarEstadoCocineroPedido] =
    useActualizarEstadoCocineroPedidoMutation();

  const { data: pedidos_cocineros, isLoading } =
    useObtenerPedidosCocinerosQuery();

  if (isLoading) return <Loader />;

  const pedidoAsignado = pedidos_cocineros.includes(
    (pedidos) => pedidos.id_pedido === pedido.id
  );

  const handleEstado = async (pedido: IPedido, id_estado) => {
    try {
      await actualizarEstadoPedido({ ...pedido, id_estado }).unwrap();
      if (asignarCocinero && pedidoAsignado === false) {
        await asignarCocineroPedido({
          id_pedido: pedido.id,
          id_trabajador: session.user.id_trabajador,
        }).unwrap();
        toast.success("Pedido tomado correctamente.");
      }

      await actualizarEstadoCocineroPedido({
        id_pedido: pedido.id,
        id_trabajador: session.user.id_trabajador,
        id_estado,
      });

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
      className="my-2 w-60"
    >
      <Title>Pedido º{pedido.id}</Title>
      <Subtitle>
        Cliente:{""} {pedido.cliente.persona.nombre}{" "}
        {pedido.cliente.persona.apellido_razon_social}{" "}
      </Subtitle>
      <Subtitle>
        Trabajador:{""} {pedido.trabajador.persona.nombre}{" "}
        {pedido.trabajador.persona.apellido_razon_social}{" "}
      </Subtitle>
      <Subtitle>Mesa: {pedido.id_mesa}</Subtitle>
      <Subtitle>
        Fecha:{""}
        {intlFormat(
          new Date(pedido.fecha_pedido),
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          },
          {
            locale: "es-NI",
          }
        )}
      </Subtitle>
      <Subtitle className="mb-2">
        Hora: {getHours(new Date(pedido.fecha_pedido))}
        {":"}
        {getMinutes(new Date(pedido.fecha_pedido))}
      </Subtitle>
      <div className="flex gap-2">
        {(pedido.id_estado === 3 && session.user.id_rol === 4) ||
        (pedido.id_estado === 4 && session.user.id_rol === 4) ||
        (pedido.id_estado === 5 && session.user.id_rol === 3) ||
        (pedido.id_estado === 6 && session.user.id_rol === 3) ||
        (pedido.id_estado !== 7 && session.user.id_rol === 1) ||
        (pedido.id_estado !== 7 && session.user.id_rol === 2) ? (
          <Button
            color="emerald"
            className="p-2"
            onClick={() => handleEstado(pedido, id_estado)}
          >
            <CheckIcon className="h-4 w-4" />
          </Button>
        ) : null}

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

        <AnularPedido id={pedido.id} disable={pedido.id_estado === 13} />
      </div>
    </Card>
  );
};
