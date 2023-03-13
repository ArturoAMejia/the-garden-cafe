import { ITipoOrdenCompra } from "../../../../interfaces";
import { prisma } from "./../../../../database";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      message: string;
    }
  | ITipoOrdenCompra[]
  | ITipoOrdenCompra;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerTiposOrdenCompra(res);
    case "POST":
      return crearTipoOrdenCompra(req, res);
    case "PUT":
      return actualizarTipoOrdenCompra(req, res);
    case 'PATCH':
      return desactivarTipoOrdenCompra(req, res);

    default:
      return res.status(400).json({ message: "Método no soportado." });
  }
}

const obtenerTiposOrdenCompra = async (res: NextApiResponse<Data>) => {
  await prisma.$connect();
  const tipos_orden_compra = await prisma.tipo_orden_compra.findMany();
  await prisma.$disconnect();
  res.status(200).json(tipos_orden_compra);
};

const crearTipoOrdenCompra = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { nombre } = req.body;

  if (!nombre)
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });

  await prisma.$connect();
  const tipo_orden_compra = await prisma.tipo_orden_compra.create({
    data: {
      id_estado: 1,
      nombre,
    },
  });
  await prisma.$disconnect();
  res.status(201).json(tipo_orden_compra);
};

const actualizarTipoOrdenCompra = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id, id_estado, nombre } = req.body;

  if (!id || !id_estado || !nombre)
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });

  await prisma.$connect();
  const t = await prisma.tipo_orden_compra.findFirst({
    where: {
      id,
    },
  });

  if (!t)
    return res.status(400).json({
      message: "No se encontró el tipo de orden de compra a actualizar",
    });

  const tipo_orden_compra = await prisma.tipo_orden_compra.update({
    data: {
      id_estado: Number(id_estado),
      nombre,
    },
    where: {
      id,
    },
  });
  await prisma.$disconnect();
  res.status(201).json(tipo_orden_compra);
};


const desactivarTipoOrdenCompra = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id} = req.body;

  if (!id)
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });

  await prisma.$connect();
  const t = await prisma.tipo_orden_compra.findFirst({
    where: {
      id,
    },
  });

  if (!t)
    return res.status(400).json({
      message: "No se encontró el tipo de orden de compra a actualizar",
    });

  const tipo_orden_compra = await prisma.tipo_orden_compra.update({
    data: {
      id_estado: 2,
    },
    where: {
      id,
    },
  });
  await prisma.$disconnect();
  res.status(201).json(tipo_orden_compra);
};
