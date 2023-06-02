import { prisma } from "database";

import type { NextApiRequest, NextApiResponse } from "next";
import NormalDistribution from "normal-distribution";
import { zScore } from "simple-statistics";
import * as jstat from "jstat";

type Data =
  | {
      message: string;
    }
  | any;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerStockSeguridad(req, res);
    case "POST":
      return crearStockSeguridad(req, res);

    default:
      break;
  }
}

const obtenerStockSeguridad = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await prisma.$connect();

  const stock_seguridad = await prisma.stock_seguridad.findMany({
    select: {
      id: true,
      id_producto: true,
      producto: true,
      tiempo_entrega: true,
      desviacion_estandar: true,
      probabilidad_nivel_servicio: true,
      stock_seguridad: true,
    },
  });

  await prisma.$disconnect();

  return res.status(200).json(stock_seguridad);
};

const crearStockSeguridad = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    tiempo_entrega,
    desviacion_estandar,
    probabilidad_nivel_servicio,
    id_producto,
  } = req.body;

  await prisma.$connect();

  const Z = jstat.normal.inv(probabilidad_nivel_servicio, 0, 1);

  const stock_seguridad = Z * desviacion_estandar * (tiempo_entrega / 5);

  const ss = await prisma.stock_seguridad.create({
    data: {
      tiempo_entrega,
      desviacion_estandar,
      probabilidad_nivel_servicio,
      id_producto,
      stock_seguridad: Math.round(stock_seguridad),
    },
  });

  await prisma.$disconnect();

  return res.status(200).json(ss);
};
