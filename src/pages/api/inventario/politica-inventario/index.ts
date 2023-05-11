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
      return obtenerPolicitasInventario(req, res);
    case "PUT":
      return actualizarPoliticaInventario(req, res);
    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}

const obtenerPolicitasInventario = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await prisma.$connect();

  const politicas = await prisma.politica_abc.findMany();

  console.log(politicas);

  return res.status(200).json(politicas);
};
const actualizarPoliticaInventario = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id, porcentaje } = req.body;

  if (!id || !porcentaje) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  await prisma.$connect();

  const politica = await prisma.politica_abc.update({
    where: {
      id,
    },
    data: {
      porcentaje,
    },
  });

  return res.status(200).json(politica);
};
