import React, { FC } from "react";
import Cookies from "js-cookie";
import { AdminLayout } from "../../components/Layout/AdminLayout";
import { navigation, navMesero } from "../../helpers";
import { prisma } from "./../../database";

interface Props {
  ventas: IVenta[];
  clientes: number;
  pedidos: number;
}

const Inicio: FC<Props> = ({ ventas, clientes, pedidos }) => {
  // const ventasTotales = ventas.reduce(function (pre, curr) {
  //   return pre + curr.total;
  // }, 0);
  const grupo = Cookies.get("grupo");
  let navbar;
  switch (grupo) {
    case "Administrador":
      navbar = navigation;
      break;
    case "Mesero":
      navbar = navMesero;
      break;

    default:
      break;
  }

  return (
    <AdminLayout title="Administración">
      <h1>test</h1>
      <CardShow />
      <PieChart />
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci ex
        incidunt mollitia ipsum alias temporibus consequuntur neque voluptas,
        aspernatur quasi minus voluptate quos veniam vero omnis dolores
        doloribus, maiores architecto tempora. Molestiae, asperiores dolores.
        Reprehenderit repudiandae cupiditate aliquid laboriosam aliquam!
      </p>
    </AdminLayout>
  );
};

export default Inicio;

import { GetServerSideProps } from "next";
import { IVenta } from "../../interfaces";
import CardShow from "@/components/charts/CardShow";
import PieChart from "@/components/charts/PieChart";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await prisma.$connect();
  const ventas = await prisma.venta.findMany({
    select: {
      total: true,
    },
  }); // your fetch function here
  const clientes = await prisma.cliente.count();
  const pedidos = await prisma.pedido.count();
  await prisma.$disconnect();

  return {
    props: {
      ventas,
      clientes,
      pedidos,
    },
  };
};
