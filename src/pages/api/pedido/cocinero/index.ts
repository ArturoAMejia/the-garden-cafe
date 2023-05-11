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
    case "POST":
      return asignarPedido(req, res);

    case "PATCH":
      return actualizarEstado(req, res);
    default:
      break;
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

  return res.status(200).json(pedido);
};
