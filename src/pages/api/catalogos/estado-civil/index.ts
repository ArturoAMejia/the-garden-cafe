import type { NextApiRequest, NextApiResponse } from "next";

import { IEstadoCivil } from "../../../../interfaces";
import { prisma } from "./../../../../database/db";

type Data =
  | {
      message: string;
    }
  | IEstadoCivil[]
  | IEstadoCivil;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerEstadoCivil(req, res);
    case "POST":
      return crearEstadoCivil(req, res);
    case "PUT":
      return actualizarEstadoCivil(req, res);
    case "DELETE":
      return eliminarEstadoCivil(req, res);

    default:
      res.status(400).json({ message: "Método no permitido" });
  }
}

const obtenerEstadoCivil = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await prisma.$connect();
  const estado_civil = await prisma.cat_estado_civil.findMany();
  await prisma.$disconnect();
  res.status(200).json(estado_civil);
};

const crearEstadoCivil = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { nombre } = req.body;
  if (!nombre)
    res.status(400).json({ message: "El nombre del estado civil obligatorio" });
  await prisma.$connect();
  const estado_civil = await prisma.cat_estado_civil.create({
    data: {
      nombre,
    },
  });
  await prisma.$disconnect();
  res.status(201).json(estado_civil);
};

const actualizarEstadoCivil = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id, nombre } = req.body;

  if (!id)
    res
      .status(400)
      .json({ message: "No se encontró el estado civil a actualizar" });
  if (!nombre)
    res
      .status(400)
      .json({ message: "El nombre del estado civil es obligatorio" });

  await prisma.$connect();

  const e = await prisma.cat_estado_civil.findFirst({
    where: {
      id,
    },
  });

  if (!e)
    return res
      .status(400)
      .json({ message: "No se encotró registro con ese id." });

  const estado_civil = await prisma.cat_estado_civil.update({
    data: {
      nombre,
    },
    where: {
      id: Number(id),
    },
  });
  await prisma.$disconnect();
  res.status(200).json(estado_civil);
};

const eliminarEstadoCivil = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.body;

  if (!id)
    res
      .status(400)
      .json({ message: "No se encontró el estado civil eliminar" });

  await prisma.$connect();

  const e = await prisma.cat_estado_civil.findFirst({
    where: {
      id,
    },
  });

  if (!e)
    return res
      .status(400)
      .json({ message: "No se encotró registro con ese id." });

  const estado_civil = await prisma.cat_estado_civil.delete({
    where: {
      id: Number(id),
    },
  });
  await prisma.$disconnect();

  res.status(200).json(estado_civil);
};
