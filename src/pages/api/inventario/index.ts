import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "./../../../database";
import { IInventario } from "./../../../interfaces";

type Data =
  | {
      message: string;
    }
  | IInventario
  | IInventario[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerInventario(res);
    case "POST":
      return crearInventario(req, res);
    case "PUT":
      return actualizarInvenario(req, res);

    default:
      return res.status(400).json({ message: "Método no soportado." });
  }
}

const obtenerInventario = async (res: NextApiResponse<Data>) => {
  await prisma.$connect();
  const inventario = await prisma.inventario.findMany({
    select: {
      id: true,
      id_producto: true,
      producto: true,
      stock_min: true,
      stock_max: true,
      stock_actual: true,
    },
  });
  await prisma.$disconnect();
  return res.status(200).json(inventario);
};

const crearInventario = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id_producto, stock_min, stock_max, stock_actual } = req.body;

  if (!id_producto || !stock_min || !stock_max || !stock_actual)
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });

  await prisma.$connect();
  const inventario = await prisma.inventario.create({
    data: {
      id_producto,
      stock_min,
      stock_max,
      stock_actual,
    },
  });
  await prisma.$disconnect();
  return res.status(201).json(inventario);
};

const actualizarInvenario = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id, id_producto, stock_min, stock_max, stock_actual } = req.body;

  if (!id)
    return res
      .status(400)
      .json({ message: "El id es necesario para actualizar el inventario" });

  if (!id_producto || !stock_min || !stock_max || !stock_actual)
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });

  await prisma.$connect();
  const inventario = await prisma.inventario.update({
    data: {
      id_producto,
      stock_min,
      stock_max,
      stock_actual,
    },
    where: {
      id,
    },
  });
  await prisma.$disconnect();
  return res.status(200).json(inventario);
};
