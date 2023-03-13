import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../../database";
import { IUnidadMedida } from "../../../../interfaces/inventario";

type Data =
  | {
      message: string;
    }
  | IUnidadMedida
  | IUnidadMedida[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerUnidadMedida(req, res);
    case "POST":
      return crearUnidadMedida(req, res);
    case "PUT":
      return actualizarUnidadMedida(req, res);
    case "PATCH":
      return desactivarUnidadMedida(req, res);

    default:
      return res.status(400).json({ message: "Método no soportado." });
  }
}

const obtenerUnidadMedida = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await prisma.$connect();
  const unidad_medida = await prisma.unidad_medida.findMany({
    select: {
      id: true,
      id_estado: true,
      cat_estado: true,
      nombre: true,
      siglas: true,
    },
    orderBy: {
      id: "asc",
    },
  });
  await prisma.$disconnect();
  res.status(200).json(unidad_medida);
};
const crearUnidadMedida = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { nombre, siglas } = req.body;

  if (!nombre || !siglas)
    return res.status(400).json({ message: "Todos los campos obligatorios" });

  await prisma.$connect();
  const unidad_medida = await prisma.unidad_medida.create({
    data: {
      nombre,
      siglas,
      id_estado: 1,
    },
  });
  await prisma.$disconnect();
  return res.status(201).json(unidad_medida);
};
const actualizarUnidadMedida = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id, nombre, siglas, id_estado } = req.body;

  if (!id || !nombre || !siglas || !id_estado)
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });

  await prisma.$connect();
  const u = await prisma.unidad_medida.findFirst({
    where: {
      id,
    },
  });

  if (!u)
    return res
      .status(400)
      .json({ message: "Unidad de memedida no encontrada" });

  const unidad_medida = await prisma.unidad_medida.update({
    data: {
      nombre,
      siglas,
      id_estado,
    },
    where: {
      id,
    },
  });
  await prisma.$disconnect();
  return res.status(200).json(unidad_medida);
};

const desactivarUnidadMedida = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: "El id es obligatorio" });

  await prisma.$connect();
  const u = await prisma.unidad_medida.findFirst({
    where: {
      id,
    },
  });

  if (!u)
    return res
      .status(400)
      .json({ message: "Unidad de memedida no encontrada" });

  const UnidadMedida = await prisma.unidad_medida.update({
    data: {
      id_estado: 2,
    },
    where: {
      id: Number(id),
    },
  });
  await prisma.$disconnect();
  return res.status(200).json(UnidadMedida);
};
