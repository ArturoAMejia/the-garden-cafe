
import { prisma } from "./../../../database";
import { GetServerSidePropsContext } from "next";
import { FC } from "react";
import { AdminLayout } from "../../../components/Layout/AdminLayout";
import { IPedido } from "../../../interfaces/pedido";



interface Props {
  pedidos: IPedido[];
}
const PedidosPage: FC<Props> = ({ pedidos }) => {


  return (
    <AdminLayout title="Pedidos">
      <div>
        <h1 className="text-2xl font-bold mb-4">Pedidos Realizados</h1>
      </div>
    </AdminLayout>
  );
};

export default PedidosPage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {

  const pedidos = await prisma.pedido.findMany();
  return {
    props: {
      pedidos: JSON.parse(JSON.stringify(pedidos)),
    },
  };
}
