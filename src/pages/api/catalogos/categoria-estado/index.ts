import { ICategoriaEstado } from "../../../../interfaces";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../database/db";

type Data =
  | {
      message: string;
    }
  | ICategoriaEstado[]
  | ICategoriaEstado;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerCategoriasEstado(res);
    case "POST":
      return crearCategoriasEstado(req, res);
    case "PUT":
      return actualizarCategoriasEstado(req, res);
    case "DELETE":
      return eliminarCategoriaEstado(req, res);

    default:
      return res.status(400).json({ message: "Método no soportado." });
  }
}

const obtenerCategoriasEstado = async (res: NextApiResponse<Data>) => {
  await prisma.$connect();
  const categorias_estados = await prisma.categoria_estado.findMany({
    orderBy: {
      id: "asc",
    },
  });
  await prisma.$disconnect();
  res.status(200).json(categorias_estados);
};

const crearCategoriasEstado = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { nombre } = req.body;
  if (!nombre)
    res
      .status(400)
      .json({ message: "El nombre de la categoría es obligatorio" });
  await prisma.$connect();
  const categoria = await prisma.categoria_estado.create({
    data: {
      nombre,
    },
  });
  await prisma.$disconnect();
  res.status(201).json(categoria);
};

const actualizarCategoriasEstado = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id, nombre } = req.body;

  if (!id)
    res
      .status(400)
      .json({ message: "No se encontró la categoría a actualizar" });
  if (!nombre)
    res
      .status(400)
      .json({ message: "El nombre de la categoría es obligatorio" });

  await prisma.$connect();
  const c = await prisma.categoria_estado.findFirst({
    where:{
      id
    }
  });

  if (!c) 
    return res.status(400).json({ message: "No se encotró registro a actualizar."});
  const categoria = await prisma.categoria_estado.update({
    data: {
      nombre,
    },
    where: {
      id
    },
  });
  await prisma.$disconnect();
  res.status(200).json(categoria);
};

const eliminarCategoriaEstado = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.body;
  if (!id)
    res.status(400).json({ message: "No se encontró la categoría a eliminar" });

  await prisma.$connect();
  const c = await prisma.categoria_estado.findFirst({
    where:{
      id
    }
  });

  if (!c) 
    return res.status(400).json({ message: "No se encotró registro a actualizar."});
    
  const categoria = await prisma.categoria_estado.delete({
    where: {
      id: Number(id),
    },
  });
  await prisma.$disconnect();

  res.status(200).json(categoria);
};
