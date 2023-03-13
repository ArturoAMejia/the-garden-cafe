import { IComprobante } from "../../../../interfaces";
import { prisma } from "./../../../../database";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      message: string;
    }
  | IComprobante
  | IComprobante[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerComprobantes(res);
    case "POST":
      return crearComprobante(req, res);
    case "PUT":
      return actualizarComprobante(req, res);
    case "PATCH":
      return desactivarComprobante(req, res);

    default:
      return res.status(400).json({ message: "Método no soportado." });
  }
}
const obtenerComprobantes = async (res: NextApiResponse<Data>) => {
  await prisma.$connect();
  const comprobantes = await prisma.comprobante.findMany();
  await prisma.$disconnect();
  return res.status(200).json(comprobantes);
};

const crearComprobante = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { descripcion, id_estado } = req.body as IComprobante;

  if (!descripcion || !id_estado)
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });

  await prisma.$connect();
  const comprobante = await prisma.comprobante.create({
    data: {
      descripcion,
      id_estado,
      fecha_ingreso: new Date(),
    },
  });
  await prisma.$disconnect();

  return res.status(201).json(comprobante);
};

const actualizarComprobante = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id, descripcion, numeracion, serie, id_estado } =
    req.body as IComprobante;

  if (!id)
    return res
      .status(400)
      .json({ message: "El id es necesario para actualizar el comprobante." });

  if (!descripcion || !numeracion || !serie || !id_estado)
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });

  await prisma.$connect();
  const comprobante = await prisma.comprobante.update({
    data: {
      descripcion,
      numeracion,
      serie,
      id_estado: Number(id_estado),
    },
    where: {
      id: Number(id),
    },
  });
  await prisma.$disconnect();

  return res.status(200).json(comprobante);
};

const desactivarComprobante = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.body;

  if (!id)
    return res
      .status(400)
      .json({ message: "El id es necesario para desactivar el comprobante." });

  await prisma.$connect();
  const comprobante = await prisma.comprobante.update({
    data: {
      id_estado: 2,
    },
    where: {
      id: Number(id),
    },
  });
  await prisma.$disconnect();

  return res.status(200).json(comprobante);
};
