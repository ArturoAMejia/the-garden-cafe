import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../../database";
import {
  ICategoriaProducto,
  ISubCategoriaProducto,
} from "../../../../interfaces";
import { ITipoCategoria } from "@/interfaces/inventario/tipo-categoria";

type Data =
  | {
      message: string;
    }
  | ITipoCategoria
  | ITipoCategoria[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerTipoCategoria(res);
    case "POST":
      return crearTipoCategoria(req, res);
    case "PUT":
      return actualizarTipoCategoria(req, res);
    case "PATCH":
      return desactivarTipoCategoria(req, res);
    default:
      return res.status(400).json({ message: "Método no soportado." });
  }
}

const obtenerTipoCategoria = async (res: NextApiResponse<Data>) => {
  await prisma.$connect();
  const tipo_categoria = await prisma.tipo_categoria.findMany({
    select: {
      id: true,
      nombre: true,
      id_estado: true,
      cat_estado: true,
    },
    orderBy: {
      id: "asc",
    },
  });
  await prisma.$disconnect();
  res.status(200).json(tipo_categoria);
};
const crearTipoCategoria = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { nombre } = req.body;

  if (!nombre)
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });

  await prisma.$connect();
  const tipo_categoria = await prisma.tipo_categoria.create({
    data: {
      nombre,
      id_estado: 1,
    },
  });
  await prisma.$disconnect();
  res.status(201).json(tipo_categoria);
};

const actualizarTipoCategoria = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id, nombre } = req.body;

  if (!id)
    return res
      .status(400)
      .json({ message: "El id es necesario para actualizar la categoría." });

  if (!nombre ) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  await prisma.$connect();
  const prod = await prisma.sub_categoria_producto.findFirst({
    where: {
      id,
    },
  });

  if (!prod) {
    return res
      .status(400)
      .json({ message: "No se encontró el tipo de categoria a actualizar" });
  }

  const tipo_categoria = await prisma.tipo_categoria.update({
    data: {
      nombre,
    },
    where: {
      id,
    },
  });

  await prisma.$disconnect();
  res.status(200).json(tipo_categoria);
};
const desactivarTipoCategoria = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.body;

  if (!id)
    return res
      .status(400)
      .json({ message: "El id es necesario para desactivar el tipo categoría." });

  await prisma.$connect();
  const c = await prisma.tipo_categoria.findFirst({
    where: {
      id,
    },
  });

  if (!c)
    return res
      .status(400)
      .json({ message: "No se encontró el tipo de categoría a desactivar." });

  const categoria = await prisma.tipo_categoria.update({
    data: {
      id_estado: 2,
    },
    where: {
      id: Number(id),
    },
  });
  await prisma.$disconnect();
  res.status(200).json(categoria);
};
