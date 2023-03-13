import React, { FC } from "react";
import { GetServerSidePropsContext } from "next";

import { prisma } from "../../../../database";
import { IPedido } from "../../../../interfaces";
import { AdminLayout } from "../../../../components/Layout/AdminLayout";
import { PedidosRealizadosTable } from "../../../../components/tables";

interface Props {
  pedidos: IPedido[];
}
const PedidosAnuladosPage: FC<Props> = ({ pedidos }) => {
  return (
    <AdminLayout title="Pedidos Anulados">
      <div>
        <h1 className="mb-4 text-2xl font-bold">Pedidos Anulados</h1>
      </div>
      <PedidosRealizadosTable pedidos={pedidos} />
    </AdminLayout>
  );
};

export default PedidosAnuladosPage;

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
    },
    where: {
      id_estado: 2,
    },
  });
  return {
    props: {
      pedidos: JSON.parse(JSON.stringify(pedidos)),
    },
  };
}
