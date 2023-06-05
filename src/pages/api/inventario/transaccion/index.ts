import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "./../../../../database";
import { ITransaccion } from "./../../../../interfaces";

type Data =
  | {
      message: string;
    }
  | ITransaccion
  | ITransaccion[]
  | any;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerTransacciones(res);
    case "POST":
      return crearTransaccion(req, res);
    case "PUT":
      return actualizarTransaccion(req, res);
    default:
      return res.status(400).json({ message: "Método no soportado." });
  }
}
const obtenerTransacciones = async (res: NextApiResponse<Data>) => {
  await prisma.$connect();

  const transacciones = await prisma.trans_inventario.groupBy({
    by: ["fecha_movimiento", "id_producto", "tipo_movimiento"],
    _sum: {
      cantidad: true,
    },
    orderBy: {
      fecha_movimiento: "desc",
    },
  });

  const productos = await prisma.producto.findMany({
    where: {
      id: {
        in: transacciones.map((transaccion) => transaccion.id_producto),
      },
    },
    select: {
      id: true,
      nombre: true,
    },
  });

  const trans = productos.map((producto) => {
    const transaccion = transacciones.filter(
      (t) => t.id_producto === producto.id
    );
    return {
      ...producto,
      cantidad: transaccion[0]._sum.cantidad,
      fecha_movimiento: transaccion[0].fecha_movimiento,
      tipo_movimiento: transaccion[0].tipo_movimiento,
    };
  });
  await prisma.$disconnect();
  return res.status(200).json(trans);
};

const crearTransaccion = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id_producto, cantidad, tipo_movimiento } = req.body;

  if (!id_producto || !cantidad || !tipo_movimiento)
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });

  await prisma.$connect();

  const transaccion = await prisma.trans_inventario.create({
    data: {
      id_producto,
      cantidad,
      tipo_movimiento,
      fecha_movimiento: new Date(),
    },
  });

  await prisma.$disconnect();
  return res.status(201).json(transaccion);
};

const actualizarTransaccion = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id, id_producto, cantidad, tipo_movimiento } = req.body;

  if (!id)
    return res
      .status(400)
      .json({ message: "El id es necesario para actualizar la transacción." });

  if (!id_producto || !cantidad || !tipo_movimiento)
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });

  await prisma.$connect();

  const transaccion = await prisma.trans_inventario.update({
    data: {
      id_producto,
      cantidad,
      tipo_movimiento,
      fecha_movimiento: new Date(),
    },
    where: {
      id,
    },
  });

  await prisma.$disconnect();
  return res.status(200).json(transaccion);
};
