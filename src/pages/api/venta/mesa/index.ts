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
      return obtenerMesas(req, res);

    case "POST":
      return crearMesa(req, res);

    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

const obtenerMesas = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await prisma.$connect();

  const mesas = await prisma.mesa.findMany({
    orderBy: {
      id: "asc",
    },
  });

  await prisma.$disconnect();

  return res.status(200).json(mesas);
};

const crearMesa = async (req: NextApiRequest, res: NextApiResponse<Data>) => {};
