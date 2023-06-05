import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "./../../../database";
import { ICaja } from "./../../../interfaces";

type Data =
  | {
      message: string;
    }
  | ICaja
  | ICaja[]
  | any;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerCajas(res);
    case "POST":
      return crearCaja(req, res);
    case "PUT":
      return actualizarCaja(req, res);
    case "PATCH":
      return desactivarCaja(req, res);
    default:
      return res.status(400).json({ message: "Método no soportado." });
  }
}

const obtenerCajas = async (res: NextApiResponse<Data>) => {
  await prisma.$connect();
  const cajas = await prisma.caja.findMany({
    select: {
      id: true,
      id_estado: true,
      cat_estado: true,
      id_trabajador: true,
      trabajador: {
        select: {
          persona: true,
        },
      },
      tipo_caja: true,
      fecha_registro: true,
      saldo_actual: true,
    },
  });
  await prisma.$disconnect();
  return res.status(200).json(cajas);
};

const crearCaja = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { tipo_caja, id_trabajador } = req.body;

  if (!tipo_caja || !id_trabajador)
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });

  await prisma.$connect();
  const caja = await prisma.caja.create({
    data: {
      id_trabajador: Number(id_trabajador),
      id_estado: 2,
      tipo_caja,
      fecha_registro: new Date(),
    },
  });

  await prisma.$disconnect();
  return res.status(201).json(caja);
};

const actualizarCaja = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id, tipo_caja, id_estado } = req.body;

  if (!id)
    return res.status(400).json({
      message: "El id es necesario para hacer la actualización de la caja.",
    });

  if (!tipo_caja || !id_estado)
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });

  await prisma.$connect();
  const c = await prisma.caja.findFirst({
    where: {
      id,
    },
  });

  if (!c)
    return res
      .status(400)
      .json({ message: "No se encontró la caja a actualizar." });

  const caja = await prisma.caja.update({
    data: {
      id_estado: Number(id_estado),
      tipo_caja,
    },
    where: {
      id,
    },
  });

  await prisma.$disconnect();
  return res.status(200).json(caja);
};

const desactivarCaja = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.body;

  if (!id)
    return res.status(400).json({
      message: "El id es necesario para hacer la actualización de la caja.",
    });

  await prisma.$connect();
  const c = await prisma.caja.findFirst({
    where: {
      id,
    },
  });

  if (!c)
    return res
      .status(400)
      .json({ message: "No se encontró la caja a actualizar." });

  const caja = await prisma.caja.update({
    data: {
      id_estado: 2,
    },
    where: {
      id,
    },
  });

  await prisma.$disconnect();
  return res.status(200).json(caja);
};
