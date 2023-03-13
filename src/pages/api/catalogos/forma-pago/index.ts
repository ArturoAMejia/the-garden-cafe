import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../../database";
import { ICatFormaPago } from "../../../../interfaces";

type Data =
  | {
      message: string;
    }
  | ICatFormaPago
  | ICatFormaPago[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerCatFormaPago(res);
    case "POST":
      return crearCatFormaPago(req, res);
    case "PUT":
      return actualizarCatFormaPago(req, res);
    case "PATCH":
      return desactivarFormaPago(req, res);

    default:
      return res.status(400).json({ message: "Método no soportado." });
  }
}

const obtenerCatFormaPago = async (res: NextApiResponse<Data>) => {
  await prisma.$connect();
  const forma_pago = await prisma.cat_forma_pago.findMany();
  await prisma.$disconnect();
  res.status(200).json(forma_pago);
};
const crearCatFormaPago = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { nombre, descripcion } = req.body;

  if (!nombre || !descripcion) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  await prisma.$connect();
  const forma_pago = await prisma.cat_forma_pago.create({
    data: {
      nombre,
      descripcion,
      id_estado: 1,
    },
  });
  await prisma.$disconnect();
  res.status(201).json(forma_pago);
};

const actualizarCatFormaPago = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id, nombre, descripcion, id_estado } = req.body;

  if (!id || !nombre || !id_estado || !descripcion) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }
  const prod = await prisma.cat_forma_pago.findFirst({
    where: {
      id,
    },
  });

  if (!prod) {
    return res
      .status(400)
      .json({ message: "No se encontró la forma pago a actualizar" });
  }

  await prisma.$connect();
  const f = await prisma.cat_forma_pago.findFirst({
    where: {
      id,
    },
  });

  if (!f)
    return res
      .status(400)
      .json({ message: "No se encotró registro con ese id." });

  const forma_pago = await prisma.cat_forma_pago.update({
    data: {
      nombre,
      id_estado,
    },
    where: {
      id,
    },
  });

  await prisma.$disconnect();
  res.status(200).json(forma_pago);
};
const desactivarFormaPago = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  await prisma.$connect();
  const prod = await prisma.cat_forma_pago.findFirst({
    where: {
      id,
    },
  });

  if (!prod) {
    return res
      .status(400)
      .json({ message: "No se encontró la forma pago a actualizar" });
  }
  const forma_pago = await prisma.cat_forma_pago.update({
    data: {
      id_estado: 2,
    },
    where: {
      id,
    },
  });
  await prisma.$disconnect();
  res.status(200).json(forma_pago);
};
