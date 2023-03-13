import { prisma } from "./../../../../database/db";
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
      return obtenerModulos(res);

    default:
      break;
  }
}
const obtenerModulos = async (res: NextApiResponse<Data>) => {
  await prisma.$connect();
  const modulos = await prisma.modulo.findMany({
    select: {
      id: true,
      cat_estado: true,
      id_estado: true,
      nombre: true,
      descripcion: true,
      icono: true,
      fecha_registro: true,
      sub_modulo: true,
    },
  });
  const m = await prisma.rol_modulo.findMany({
    select: {
      id_modulo: true,
      modulo: {
        select: {
          nombre: true,
          icono: true,
          sub_modulo: true,
        },
      },
    },
    where: {
      id_rol: 1,
    },
  });
  await prisma.$disconnect();

  return res.status(200).json(m);
};
