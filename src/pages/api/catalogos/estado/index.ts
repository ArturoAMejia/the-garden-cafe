import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "./../../../../database/db";
import { ICatEstado } from "../../../../interfaces";

type Data =
  | {
      message: string;
    }
  | ICatEstado[]
  | ICatEstado;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerEstados(req, res);

    case "POST":
      return crearEstado(req, res);
    default:
      return res.status(400).json({ message: "Método no soportado." });
  }
}

const obtenerEstados = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await prisma.$connect();
  const estados = await prisma.cat_estado.findMany();
  await prisma.$disconnect();
  res.status(200).json(estados);
};
const crearEstado = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id_categoria_estado, nombre, descripcion } = req.body as ICatEstado;

  if (!id_categoria_estado || !nombre || !descripcion)
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });

  await prisma.$connect();
  const estado = await prisma.cat_estado.create({
    data: {
      id_categoria_estado,
      descripcion,
      nombre,
    },
  });
  await prisma.$disconnect();
  res.status(200).json(estado);
};
