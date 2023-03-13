import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "./../../../../database";
import { IArqueoCaja } from "../../../../interfaces";

type Data =
  | {
      message: string;
    }
  | IArqueoCaja
  | IArqueoCaja[];

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
  const arqueos = await prisma.arqueo_caja.findMany();
  await prisma.$disconnect();
  return res.status(200).json(arqueos);
};

const crearArqueoCaja = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id_caja, id_trabajador, total } = req.body;

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
    },
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
