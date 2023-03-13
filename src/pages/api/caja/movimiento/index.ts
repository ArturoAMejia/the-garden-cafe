import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "./../../../../database/db";
import { IMovimientoCaja } from "../../../../interfaces";

type Data =
  | {
      message: string;
    }
  | IMovimientoCaja
  | IMovimientoCaja[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerMovimientosCaja(res);
    case "POST":
      return crearMovimientoCaja(req, res);
    case "PUT":
      return actualizarMovimientoCaja(req, res);
    default:
      return res.status(400).json({ message: "Método no soportado." });
  }
}

const obtenerMovimientosCaja = async (res: NextApiResponse<Data>) => {
  await prisma.$connect();
  const movimientos = await prisma.movimiento_caja.findMany();
  await prisma.$disconnect();
  return res.status(200).json(movimientos);
};

const crearMovimientoCaja = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id_caja, id_trabajador, id_moneda, concepto, monto } = req.body;

  if (!id_caja || !id_trabajador || !id_moneda || !concepto || !monto)
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });

  await prisma.$connect();
  const movimiento = await prisma.movimiento_caja.create({
    data: {
      id_caja: Number(id_caja),
      id_trabajador: Number(id_trabajador),
      id_moneda: Number(id_moneda),
      concepto,
      monto: Number(monto),
      fecha_movimiento: new Date(),
    },
  });
  await prisma.$disconnect();
  return res.status(201).json(movimiento);
};

const actualizarMovimientoCaja = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id, id_caja, id_trabajador, id_moneda, concepto, monto } = req.body;

  if (!id)
    return res
      .status(400)
      .json({ message: "El id es necesario para actualizar el movimiento." });

  if (!id_caja || !id_trabajador || !id_moneda || !concepto || !monto)
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });

  await prisma.$connect();
  const m = await prisma.movimiento_caja.findFirst({
    where: {
      id,
    },
  });

  if (!m)
    return res
      .status(400)
      .json({ message: "No se encontró registro con ese id." });
      
  const movimiento = await prisma.movimiento_caja.update({
    data: {
      id_moneda: Number(id_moneda),
      concepto,
      monto: Number(monto),
    },
    where: {
      id,
    },
  });
  await prisma.$disconnect();
  return res.status(201).json(movimiento);
};
