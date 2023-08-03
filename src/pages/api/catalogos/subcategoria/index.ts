import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../../database";
import {
  ICategoriaProducto,
  ISubCategoriaProducto,
} from "../../../../interfaces";

type Data =
  | {
      message: string;
    }
  | ISubCategoriaProducto
  | ISubCategoriaProducto[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerSubCategoriaProducto(res);
    case "POST":
      return crearSubCategoriaProducto(req, res);
    case "PUT":
      return actualizarSubCategoriaProducto(req, res);
    case "PATCH":
      return desactivarSubCategoria(req, res);
    default:
      return res.status(400).json({ message: "Método no soportado." });
  }
}

const obtenerSubCategoriaProducto = async (res: NextApiResponse<Data>) => {
  await prisma.$connect();
  const categorias = await prisma.sub_categoria_producto.findMany({
    select: {
      id: true,
      id_categoria_producto: true,
      categoria_producto: true,
      nombre: true,
      id_estado: true,
      cat_estado: true,
    },
    orderBy: {
      id: "asc",
    },
  });
  await prisma.$disconnect();
  res.status(200).json(categorias);
};
const crearSubCategoriaProducto = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { nombre, id_categoria_producto } = req.body;

  if (!nombre || !id_categoria_producto)
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });

  await prisma.$connect();
  const categoria = await prisma.sub_categoria_producto.create({
    data: {
      nombre,
      id_categoria_producto,
      id_estado: 1,
    },
  });
  await prisma.$disconnect();
  res.status(201).json(categoria);
};

const actualizarSubCategoriaProducto = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id, nombre, id_categoria_producto, id_estado } = req.body;

  if (!id)
    return res
      .status(400)
      .json({ message: "El id es necesario para actualizar la categoría." });

  if (!nombre || !id_estado || !id_categoria_producto) {
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
      .json({ message: "No se encontró la categoria a actualizar" });
  }

  const categoria = await prisma.sub_categoria_producto.update({
    data: {
      nombre,
      id_categoria_producto,
      id_estado,
    },
    where: {
      id,
    },
  });

  await prisma.$disconnect();
  res.status(200).json(categoria);
};
const desactivarSubCategoria = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.body;

  if (!id)
    return res
      .status(400)
      .json({ message: "El id es necesario para desactivar la categoría." });

  await prisma.$connect();
  const c = await prisma.sub_categoria_producto.findFirst({
    where: {
      id,
    },
  });

  if (!c)
    return res
      .status(400)
      .json({ message: "No se encontró la categoría a desactivar." });

  const categoria = await prisma.sub_categoria_producto.update({
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
