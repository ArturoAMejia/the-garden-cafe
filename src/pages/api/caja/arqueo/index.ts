import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "./../../../../database";
import { IArqueoCaja } from "../../../../interfaces";

type Data =
  | {
      message: string;
    }
  | IArqueoCaja
  | IArqueoCaja[]
  | any;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerArqueosCaja(res);
    case "POST":
      return crearArqueoCaja(req, res);
    case "PUT":
      return actualizarArqueoCaja(req, res);
    default:
      return res.status(400).json({ message: "Método no soportado." });
  }
}
const obtenerArqueosCaja = async (res: NextApiResponse<Data>) => {
  await prisma.$connect();
  const arqueos = await prisma.arqueo_caja.findMany({
    select: {
      id: true,
      caja: true,
      id_caja: true,
      trabajador: {
        select: {
          persona: true,
        },
      },
      id_trabajador: true,
      total: true,
      fecha_arqueo: true,
      detalle_billete_arqueo: true,
      detalle_monedas_arqueo: true,
      moneda: true,
      id_moneda: true,
    },
  });
  await prisma.$disconnect();
  return res.status(200).json(arqueos);
};

const crearArqueoCaja = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id_caja, id_trabajador, total, id_moneda, billetes, monedas } =
    req.body;

  if (!id_caja || !id_trabajador || !total)
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });

  await prisma.$connect();
  const arqueo = await prisma.arqueo_caja.create({
    data: {
      id_caja: Number(id_caja),
      id_trabajador: Number(id_trabajador),
      fecha_arqueo: new Date(),
      total: Number(total),
      id_moneda,
    },
  });
  await prisma.detalle_billete_arqueo.createMany({
    data: billetes.map((b: any) => ({
      id_arqueo_caja: arqueo.id,
      denominacion: b.denominacion,
      cantidad: b.cantidad,
      total: b.cantidad * b.denominacion,
    })),
  });
  await prisma.detalle_monedas_arqueo.createMany({
    data: monedas.map((m: any) => ({
      id_arqueo_caja: arqueo.id,
      denominacion: m.denominacion,
      cantidad: m.cantidad,
      total: m.cantidad * m.denominacion,
    })),
  });

  await prisma.$disconnect();
  return res.status(201).json(arqueo);
};

const actualizarArqueoCaja = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id, total } = req.body;

  if (!id) return res.status(400).json({ message: "El id es necesario." });

  if (!total)
    return res
      .status(400)
      .json({ message: "El total del arqueo es necesario." });

  await prisma.$connect();
  const a = await prisma.arqueo_caja.findFirst({
    where: {
      id,
    },
  });

  if (!a) return res.status(400).json({ message: "No se encontró el arqueo." });

  const arqueo = await prisma.arqueo_caja.update({
    data: {
      total: Number(total),
    },
    where: {
      id,
    },
  });
  await prisma.$disconnect();
  return res.status(200).json(arqueo);
};
