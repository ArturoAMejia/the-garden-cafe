import React, { FC, useContext } from "react";
import Cookies from "js-cookie";
import { AdminLayout } from "../../components/Layout/AdminLayout";
import {
  TicketIcon,
  BanknotesIcon,
  UserGroupIcon,
  InboxStackIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { prisma } from "./../../database";

interface Props {
  ventas: IVenta[];
  clientes: number;
  pedidos: number;
  usuarios: number;
}

const Inicio: FC<Props> = ({ ventas, clientes, pedidos, usuarios }) => {
  const ventasTotales = ventas.reduce(function (pre, curr) {
    return pre + curr.total;
  }, 0);

  const categories: {
    title: string;
    metric: string;
    icon: any;
    color: Color;
  }[] = [
    {
      title: "Ventas",
      metric: `C$ ${ventasTotales.toFixed()}`,
      icon: TicketIcon,
      color: "green",
    },
    {
      title: "Usuarios",
      metric: usuarios.toString(),
      icon: UserIcon,
      color: "blue",
    },
    {
      title: "Clientes",
      metric: clientes.toString(),
      icon: UserGroupIcon,
      color: "amber",
    },
    {
      title: "Pedidos",
      metric: pedidos.toString(),
      icon: InboxStackIcon,
      color: "red",
    },
  ];
  const { user } = useContext(AuthContext);

  const { data: session } = useSession();

  return (
    <AdminLayout title="Administración">
      <h1 className="text-2xl font-bold">Bienvenido {user?.correo}</h1>
      <CardShow categorias={categories} />
      {/* <PieChart /> */}
      {/* <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci ex
        incidunt mollitia ipsum alias temporibus consequuntur neque voluptas,
        aspernatur quasi minus voluptate quos veniam vero omnis dolores
        doloribus, maiores architecto tempora. Molestiae, asperiores dolores.
        Reprehenderit repudiandae cupiditate aliquid laboriosam aliquam!
      </p> */}
    </AdminLayout>
  );
};

export default Inicio;

import { GetServerSideProps } from "next";
import { IVenta } from "../../interfaces";

import PieChart from "@/components/charts/PieChart";
import { AdminContext, AuthContext } from "@/context";
import { Color } from "@tremor/react";
import { CardShow } from "@/components/charts/CardShow";
import { getSession, useSession } from "next-auth/react";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  type Roles = 1 | 2 | 3 | 4 | 5 | 7;

  const id_rol = session.user?.id_rol;

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  await prisma.$connect();
  const ventas = await prisma.venta.findMany({
    select: {
      total: true,
    },
  }); // your fetch function here
  const clientes = await prisma.cliente.count();
  const usuarios = await prisma.usuario.count();
  const pedidos = await prisma.pedido.count();
  await prisma.$disconnect();

  return {
    props: {
      ventas,
      clientes,
      pedidos,
      usuarios,
    },
  };
};
