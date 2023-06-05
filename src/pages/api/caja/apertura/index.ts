import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "./../../../../database";
import { IAperturaCaja } from "../../../../interfaces";

type Data =
  | {
      message: string;
    }
  | IAperturaCaja
  | IAperturaCaja[]
  | any;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerAperturasCajas(res);
    case "POST":
      return crearAperturaCaja(req, res);
    case "PUT":
      return actualizarAperturaCaja(req, res);
    case "PATCH":
      return desactivarAperturaCaja(req, res);
    default:
      return res.status(400).json({ message: "Método no soportado." });
  }
}
const obtenerAperturasCajas = async (res: NextApiResponse<Data>) => {
  await prisma.$connect();
  const aperturas = await prisma.apertura_caja.findMany({
    select: {
      id: true,
      id_caja: true,
      caja: true,
      id_trabajador: true,
      trabajador: {
        select: {
          persona: true,
        },
      },
      id_estado: true,
      cat_estado: true,
      id_moneda: true,
      moneda: true,
      fecha_apertura: true,
      detalle_apertura_caja: true,
    },
  });
  await prisma.$disconnect();
  return res.status(200).json(aperturas);
};

const crearAperturaCaja = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    id_caja,
    id_trabajador,
    id_moneda,
    id_tipo_cambio,
    monto_cordobas,
    monto_dolares,
  } = req.body;

  if (
    !id_caja ||
    !id_trabajador ||
    !id_moneda ||
    !monto_cordobas ||
    !monto_dolares
  )
    return res.status(400).json({ message: "Los campos son obligatorios" });

  await prisma.$connect();

  const a = await prisma.apertura_caja.findFirst({
    where: {
      id_estado: 1,
      id_caja: Number(id_caja),
    },
  });

  const caja = await prisma.caja.findFirst({
    where: {
      id_estado: 1,
      id: Number(id_caja),
    },
  });

  if (caja)
    return res.status(400).json({ message: "La caja ya se encuentra abierta" });

  await prisma.caja.update({
    data: {
      id_estado: 1,
    },
    where: {
      id: id_caja,
    },
  });

  const apertura = await prisma.apertura_caja.create({
    data: {
      id_caja: Number(id_caja),
      id_trabajador: Number(id_trabajador),
      id_estado: 1,
      id_moneda: Number(id_moneda),
      fecha_apertura: new Date(),
    },
  });
  await prisma.detalle_apertura_caja.create({
    data: {
      id_apertura_caja: apertura.id,
      monto_cordobas: Number(monto_cordobas),
      monto_dolares: Number(monto_dolares),
    },
  });
  await prisma.$disconnect();
  return res.status(201).json(apertura);
};

const actualizarAperturaCaja = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id, id_estado, id_moneda, id_tipo_cambio } = req.body;

  if (!id)
    return res
      .status(400)
      .json({ message: "Se requiere el id para actualizar la caja" });

  if (!id_estado || !id_moneda || !id_tipo_cambio)
    return res.status(400).json({ message: "Los campos son obligatorios" });

  await prisma.$connect();

  const a = await prisma.apertura_caja.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!a)
    return res
      .status(400)
      .json({ message: "No se encontró registro de esa caja" });

  const apertura = await prisma.apertura_caja.update({
    data: {
      id_estado: Number(id_estado),
      id_moneda: Number(id_moneda),
    },
    where: {
      id: Number(id),
    },
  });
  await prisma.$disconnect();
  return res.status(200).json(apertura);
};

const desactivarAperturaCaja = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.body;

  if (!id)
    return res.status(400).json({
      message: "Se requiere el id para actualizar el estado de la caja",
    });

  await prisma.$connect();
  const a = await prisma.apertura_caja.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!a)
    return res
      .status(400)
      .json({ message: "No se encontró registro de esa caja" });

  const apertura = await prisma.apertura_caja.update({
    data: {
      id_estado: 2,
    },
    where: {
      id: Number(id),
    },
  });

  await prisma.$disconnect();
  return res.status(200).json(apertura);
};
