import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "./../../../../database";
import { IMarca } from "../../../../interfaces";

type Data =
  | {
      message: string;
    }
  | IMarca[]
  | IMarca;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerMarcas(req, res);
    case "POST":
      return crearMarca(req, res);
    case "PUT":
      return actualizarMarca(req, res);

    case "PATCH":
      return desactivarMarca(req, res);

    default:
      return res.status(400).json({ message: "Método no soportado." });
  }
}

const obtenerMarcas = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await prisma.$connect();
  const marcas = await prisma.marca.findMany({
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
  return res.status(200).json(marcas);
};
const crearMarca = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { nombre, siglas } = req.body;

  if (!nombre)
    return res
      .status(400)
      .json({ message: "El nombre de la marca es obligatorio" });

  if (!siglas)
    return res
      .status(400)
      .json({ message: "Las siglas de la marca son obligatorias" });

  await prisma.$connect();
  const marca = await prisma.marca.create({
    data: {
      nombre,
      siglas,
      id_estado: 1,
    },
  });
  await prisma.$disconnect();
  return res.status(200).json(marca);
};

const actualizarMarca = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id, nombre, id_estado, siglas } = req.body;

  if (!id) res.status(400).json({ message: "El id de la marca es necesario" });

  if (!nombre)
    return res.status(400).json({
      message: "El nombre de la marca es obligatorio para actualizar",
    });

  if (!siglas)
    return res.status(400).json({
      message: "Las siglas de la marca son obligatorias para actualizar",
    });

  if (!id_estado)
    return res
      .status(400)
      .json({ message: "El estado de la marca es obligado para actualizar" });

  const t = await prisma.marca.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!t)
    return res
      .status(400)
      .json({ message: "No se encontró la marca a actualizar" });

  await prisma.$connect();
  const marca = await prisma.marca.update({
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

  return res.status(200).json(marca);
};
const desactivarMarca = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.body as { id: number };

  if (!id)
    return res.status(400).json({ message: "El id de la marca es necesario" });

  await prisma.$connect();

  const m = await prisma.marca.findFirst({
    where: {
      id,
    },
  });

  if (!m)
    return res
      .status(400)
      .json({ message: "No se encontró la marca a desactivar" });

  await prisma.marca.update({
    data: {
      id_estado: 2,
    },
    where: {
      id,
    },
  });
  await prisma.$disconnect();
  return res.status(200).json({ message: "Marca de inventario desactivada" });
};
