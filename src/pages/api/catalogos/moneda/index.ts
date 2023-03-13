import { IMoneda } from "../../../../interfaces";
import { prisma } from "./../../../../database";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      message: string;
    }
  | IMoneda[]
  | IMoneda;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerMonedas(res);
    case "POST":
      return crearMoneda(req, res);
    case "PUT":
      return actualizarMoneda(req, res);
    default:
      break;
  }
}
const obtenerMonedas = async (res: NextApiResponse<Data>) => {
  await prisma.$connect();
  const monedas = await prisma.moneda.findMany();
  await prisma.$disconnect();
  return res.status(200).json(monedas);
};
const crearMoneda = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { origen, nombre, simbolo } = req.body;

  if (!origen || !nombre || !simbolo)
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });

  await prisma.$connect();
  const moneda = await prisma.moneda.create({
    data: {
      nombre,
      origen,
      simbolo,
    },
  });
  await prisma.$disconnect();
  return res.status(201).json(moneda);
};

const actualizarMoneda = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id, origen, nombre, simbolo } = req.body;

  if (!id)
    return res
      .status(400)
      .json({ message: "El id es necesario para actualizar la moneda" });

  if (!origen || !nombre || !simbolo)
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });

  await prisma.$connect();

  const moneda = await prisma.moneda.update({
    data: {
      nombre,
      origen,
      simbolo,
    },
    where: {
      id,
    },
  });
  await prisma.$disconnect();
  return res.status(200).json(moneda);
};
