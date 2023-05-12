import { prisma } from "@/database";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      message: string;
    }
  | any;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerPedidosCocineros(res);
    case "POST":
      return asignarPedido(req, res);

    case "PATCH":
      return actualizarEstado(req, res);
    default:
      return res.status(400).json({ message: "Método no soportado." });
  }
}
const asignarPedido = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id_trabajador, id_pedido } = req.body;

  if (!id_trabajador || !id_pedido)
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });

  await prisma.$connect();

  const pedido = await prisma.pedido_cocinero.create({
    data: {
      id_trabajador,
      id_pedido,
      id_estado: 4,
    },
  });

  await prisma.$disconnect();

  return res.status(200).json(pedido);
};

const actualizarEstado = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id_pedido, id_estado } = req.body;

  if (!id_pedido || !id_estado)
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });

  await prisma.$connect();

  const pedido = await prisma.pedido_cocinero.update({
    where: {
      id_pedido,
    },
    data: {
      id_estado,
    },
  });

  await prisma.$disconnect();

  return res.status(200).json(pedido);
};
const obtenerPedidosCocineros = async (res: NextApiResponse<any>) => {
  await prisma.$connect();

  const pedidos_cocineros = await prisma.pedido_cocinero.findMany({
    select: {
      id: true,
      id_pedido: true,
      id_trabajador: true,
      id_estado: true,
    },
  });

  await prisma.$disconnect();

  return res.status(200).json(pedidos_cocineros);
};
