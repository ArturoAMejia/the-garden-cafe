import { prisma } from "database";
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
      return obtenerVentasTotales(req, res);

    default:
      break;
  }
}
const obtenerVentasTotales = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await prisma.$connect();

  const ventas = await prisma.venta.groupBy({
    by: ["fecha_venta"],
    _sum: {
      total: true,
    },
    _count: {
      id: true,
    },
  });

  await prisma.$disconnect();

  return res.status(200).json(ventas);
};
