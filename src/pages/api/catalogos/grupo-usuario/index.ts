import { IGrupoUsuario } from "../../../../interfaces";
import { prisma } from "./../../../../database/db";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      message: string;
    }
  | IGrupoUsuario[]
  | IGrupoUsuario;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerGrupos(res);
    case "POST":
      return crearGrupo(req, res);
    case "PUT":
      return actualizarGrupo(req, res);
    case "PATCH":
      return desactivarGrupo(req, res);
    default:
      break;
  }
}
const obtenerGrupos = async (res: NextApiResponse<Data>) => {
  await prisma.$connect();
  const grupos = await prisma.grupo_usuario.findMany({
    select: {
      id: true,
      id_estado: true,
      cat_estado: true,
      nombre: true,
      descripcion: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  await prisma.$disconnect();
  return res.status(200).json(grupos);
};

const crearGrupo = async (req: NextApiRequest, res: NextApiResponse) => {
  const { nombre, descripcion } = req.body;

  if (!nombre || !descripcion)
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });

  await prisma.$connect();

  const grupo = await prisma.grupo_usuario.create({
    data: {
      nombre,
      descripcion,
      id_estado: 1,
    },
  });
  await prisma.$disconnect();

  return res.status(201).json(grupo);
};

const actualizarGrupo = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, nombre, descripcion } = req.body;

  if (!id)
    return res
      .status(400)
      .json({ message: "El id es necesario para actualizar al grupo" });

  if (!nombre || !descripcion)
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });

  await prisma.$connect();
  const g = await prisma.grupo_usuario.findFirst({
    where: {
      id,
    },
  });

  if (!g)
    return res
      .status(400)
      .json({ message: "no se encontró registro de ese grupo." });

  const grupo = await prisma.grupo_usuario.update({
    data: {
      nombre,
      descripcion,
    },
    where: {
      id,
    },
  });
  await prisma.$disconnect();
  return res.status(200).json(grupo);
};

const desactivarGrupo = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;

  if (!id)
    return res
      .status(200)
      .json({ message: "El id es necesario para desactivar el grupo" });

  await prisma.$connect();

  const g = await prisma.grupo_usuario.findFirst({
    where: {
      id,
    },
  });

  if (!g)
    return res
      .status(400)
      .json({ message: "No se encontró registro de ese grupo" });

  const grupo = await prisma.grupo_usuario.update({
    data: {
      id_estado: 2,
    },
    where: {
      id,
    },
  });

  await prisma.$disconnect();

  return res.status(200).json(grupo);
};
