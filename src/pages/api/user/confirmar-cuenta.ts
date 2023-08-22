import { prisma } from "database";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "PATCH":
      return confirmarCuenta(req, res);

    default:
      break;
  }
}

const confirmarCuenta = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.body;

  await prisma.$connect();

  const usuario = await prisma.usuario.findFirst({
    where: {
      id,
    },
  });

  if (!usuario) {
    return res.status(404).json({
      message: "Usuario no encontrado",
    });
  }

  await prisma.usuario.update({
    data: {
      id_estado: 1,
    },
    where: {
      id: usuario.id,
    },
  });

  await prisma.$disconnect();

  return res.status(200).json({
    message: "Usuario confirmado",
  });
};
