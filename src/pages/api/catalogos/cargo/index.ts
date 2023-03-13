import type { NextApiRequest, NextApiResponse } from "next";

import { ICargo } from "../../../../interfaces";
import { prisma } from "../../../../database";

type Data =
  | {
      message: string;
    }
  | ICargo[]
  | ICargo;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerCargos(req, res);
    case "POST":
      return crearCargo(req, res);
    case "PUT":
      return actualizarCargo(req, res);
    case "PATCH":
      return desactivarCargo(req, res);

    default:
      return res.status(400).json({ message: "Método no soportado." });
  }
}

const obtenerCargos = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await prisma.$connect();

  const cargos = await prisma.cat_cargo.findMany();

  await prisma.$disconnect();

  return res.status(200).json(cargos);
};

const crearCargo = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { nombre, descripcion, salario, vigencia } = req.body;

  if (!nombre || !descripcion || !salario || !vigencia)
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });

  await prisma.$connect();

  //* El estado al crear el cargo es Activo
  const cargo = await prisma.cat_cargo.create({
    data: {
      nombre,
      descripcion,
      salario: Number(salario),
      vigencia: new Date(vigencia),
      id_estado: 1,
    },
  });

  await prisma.$disconnect();
  return res.status(201).json(cargo);
};
const actualizarCargo = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id, nombre, descripcion, salario, vigencia, id_estado } = req.body;

  if (!id)
    return res.status(400).json({message:"El id es necesario para actualizar el cargo."});
  
  if (!nombre || !descripcion || !salario || !vigencia || !id_estado)
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios." });

  await prisma.$connect();
  const c = await prisma.cat_cargo.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!c)
    return res
      .status(400)
      .json({ message: "No se encontró el cargo a actualizar" });

  const cargo = await prisma.cat_cargo.update({
    data: {
      nombre,
      descripcion,
      salario: Number(salario),
      vigencia: new Date(vigencia),
      id_estado: Number(id_estado),
    },
    where: {
      id: Number(id),
    },
  });

  await prisma.$disconnect();

  return res.status(200).json(cargo);
};

const desactivarCargo = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: "El id es necesario" });

  await prisma.$connect();
  const c = await prisma.cat_cargo.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!c)
    return res
      .status(400)
      .json({ message: "No se encontró el cargo a desactivar" });

  const cargo = await prisma.cat_cargo.update({
    data: {
      id_estado: 2,
    },
    where: {
      id: Number(id),
    },
  });

  await prisma.$disconnect();

  return res.status(200).json(cargo);
};
