import { prisma } from "./../../../../database";
import { GetServerSidePropsContext } from "next";
import { FC } from "react";
import { AdminLayout } from "../../../../components/Layout/AdminLayout";
import { IPedido } from "../../../../interfaces/pedido";
import { PedidosRealizadosTable } from "../../../../components/tables";

interface Props {
  pedidos: IPedido[];
}
const PedidosRealizadosPage: FC<Props> = ({ pedidos }) => {
  return (
    <AdminLayout title="Pedidos">
      <div>
        <h1 className="mb-4 text-2xl font-bold">Pedidos Realizados</h1>
      </div>
      <PedidosRealizadosTable pedidos={pedidos} />
    </AdminLayout>
  );
};

export default PedidosRealizadosPage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const pedidos = await prisma.pedido.findMany({
    select: {
      id: true,
      id_cliente: true,
      cliente: {
        select: {
          id: true,
          id_estado: true,
          cat_estado: true,
          id_persona: true,
          persona: true,
          tipo_cliente: true,
        },
      },
      id_trabajador: true,
      trabajador: {
        select: {
          id: true,
          id_persona: true,
          persona: true,
          id_estado_civil: true,
          id_estado: true,
        },
      },
      tipo_pedido: true,
      fecha_pedido: true,
      ubicacion_entrega: true,
      id_estado: true,
      cat_estado: true,
      vigencia: true,
      observacion: true,
      detalle_pedido: {
        select: {
          id_producto_elaborado: true,
          producto_elaborado: true,
          monto: true,
          cantidad: true,
          precio: true,
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });
  return {
    props: {
      pedidos: JSON.parse(JSON.stringify(pedidos)),
    },
  };
}
