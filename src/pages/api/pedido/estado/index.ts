import { IPedido } from "@/interfaces";
import { prisma } from "database";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      message: string;
    }
  | IPedido;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "PATCH":
      return actualizarEstadoPedido(req, res);

    default:
      return res.status(404).json({ message: "Method not found" });
  }
}

const actualizarEstadoPedido = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id, id_estado } = req.body;

  if (!id || !id_estado) {
    return res.status(400).json({ message: "Dichos campos son obligatorios" });
  }

  await prisma.$connect();

  const p = await prisma.pedido.findUnique({
    where: {
      id,
    },
  });

  if (!p) {
    return res.status(404).json({ message: "Pedido no encontrado" });
  }

  const pedido = await prisma.pedido.update({
    data: {
      id_estado,
    },
    where: {
      id,
    },
  });

  return res.status(200).json(pedido);
};
