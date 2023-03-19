import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../../database";
import { ICategoriaProducto } from "../../../../interfaces";

type Data =
  | {
      message: string;
    }
  | ICategoriaProducto
  | ICategoriaProducto[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerCategoriaProducto(res);
    case "POST":
      return crearCategoriaProducto(req, res);
    case "PUT":
      return actualizarCategoriaProducto(req, res);
    case "PATCH":
      return desactivarCategoria(req, res);
    default:
      return res.status(400).json({ message: "Método no soportado." });
  }
}

const obtenerCategoriaProducto = async (res: NextApiResponse<Data>) => {
  await prisma.$connect();
  const categorias = await prisma.categoria_producto.findMany({
    select: {
      id: true,
      nombre: true,
      id_estado: true,
      descripcion: true,
      cat_estado: true,
    },
    orderBy: {
      id: "asc",
    },
  });
  await prisma.$disconnect();
  res.status(200).json(categorias);
};
const crearCategoriaProducto = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { nombre, descripcion, id_tipo_categoria } = req.body;

  if (!nombre || !descripcion || !id_tipo_categoria)
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });

  await prisma.$connect();
  const categoria = await prisma.categoria_producto.create({
    data: {
      nombre,
      descripcion,
      id_estado: 1,
      id_tipo_categoria,
    },
  });
  await prisma.$disconnect();
  res.status(201).json(categoria);
};

const actualizarCategoriaProducto = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id, nombre, descripcion, id_estado } = req.body as ICategoriaProducto;

  if (!id)
    return res
      .status(400)
      .json({ message: "El id es necesario para actualizar la categoría." });

  if (!nombre || !id_estado || !descripcion) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  await prisma.$connect();
  const prod = await prisma.categoria_producto.findFirst({
    where: {
      id,
    },
  });

  if (!prod) {
    return res
      .status(400)
      .json({ message: "No se encontró la categoria a actualizar" });
  }

  const categoria = await prisma.categoria_producto.update({
    data: {
      nombre,
      descripcion,
      id_estado,
    },
    where: {
      id,
    },
  });

  await prisma.$disconnect();
  res.status(200).json(categoria);
};
const desactivarCategoria = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.body;

  console.log(req.body);

  if (!id)
    return res
      .status(400)
      .json({ message: "El id es necesario para desactivar la categoría." });

  await prisma.$connect();
  const c = await prisma.categoria_producto.findFirst({
    where: {
      id,
    },
  });

  if (!c)
    return res
      .status(400)
      .json({ message: "No se encontró la categoría a desactivar." });

  const categoria = await prisma.categoria_producto.update({
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
