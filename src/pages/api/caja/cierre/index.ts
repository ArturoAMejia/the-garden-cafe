import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "./../../../../database/db";
import { ICierreCaja } from "./../../../../interfaces";

type Data =
  | {
      message: string;
    }
  | ICierreCaja
  | ICierreCaja[]
  | any;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerCierresCaja(res);
    case "POST":
      return crearCierreCaja(req, res);
    case "PUT":
      return actualizarCierreCaja(req, res);
    case "PATCH":
      return desactivarCierreCaja(req, res);
    default:
      return res.status(400).json({ message: "Método no soportado." });
  }
}

const obtenerCierresCaja = async (res: NextApiResponse<Data>) => {
  await prisma.$connect();
  const cierres = await prisma.cierre_caja.findMany({
    select: {
      id: true,
      id_caja: true,
      caja: true,
      id_estado: true,
      cat_estado: true,
      trabajador: {
        select: {
          persona: true,
        },
      },
      id_trabajador: true,
      fecha_cierre: true,
      total: true,
    },
  });
  await prisma.$disconnect();
  return res.status(200).json(cierres);
};

const crearCierreCaja = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id_caja, total, id_trabajador } = req.body;

  if (!id_caja || !total)
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios." });

  await prisma.$connect();

  const a = await prisma.apertura_caja.findFirst({
    where: {
      id_caja,
    },
  });

  const cierre = await prisma.cierre_caja.create({
    data: {
      id_caja: Number(id_caja),
      id_trabajador,
      total: Number(total),
      id_estado: 1,
      fecha_apertura: a.fecha_apertura,
    },
  });

  await prisma.caja.update({
    where: {
      id: id_caja,
    },
    data: {
      id_estado: 2,
    },
  });
  await prisma.apertura_caja.update({
    data: {
      id_estado: 2,
    },
    where: {
      id: a?.id,
    },
  });
  await prisma.$disconnect();
  return res.status(201).json(cierre);
};

const actualizarCierreCaja = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id, total, id_estado } = req.body;

  if (!id || !total || !id_estado)
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios." });

  await prisma.$connect();
  const c = await prisma.cierre_caja.findFirst({
    where: {
      id,
    },
  });

  if (!c)
    return res
      .status(400)
      .json({ message: "No se encotró un cierre de caja con ese id." });
  const cierre = await prisma.cierre_caja.update({
    data: {
      id_estado: Number(id_estado),
      total: Number(total),
    },
    where: {
      id,
    },
  });
  await prisma.$disconnect();
  return res.status(200).json(cierre);
};

const desactivarCierreCaja = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.body;

  if (!id)
    return res
      .status(400)
      .json({ message: "Se requiere el id para desactivar el cierre de caja" });

  await prisma.$connect();

  const c = await prisma.cierre_caja.findFirst({
    where: {
      id,
    },
  });

  if (!c)
    return res.status(400).json({
      message: "No se encontró registró de cierre de caja con ese id.",
    });
  const cierre = await prisma.cierre_caja.update({
    data: {
      id_estado: 2,
    },
    where: {
      id,
    },
  });
  await prisma.$disconnect();
  return res.status(200).json(cierre);
};
