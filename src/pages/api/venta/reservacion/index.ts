import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "./../../../../database";
import { IReservacion } from "../../../../interfaces";
import { getHours, getMinutes } from "date-fns";
import set from "date-fns/set";

type Data =
  | {
      message: string;
    }
  | IReservacion[]
  | IReservacion;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerReservaciones(res);
    case "POST":
      return crearReservacion(req, res);
    case "PUT":
      return actualizarReservacion(req, res);
    case "PATCH":
      return anularReservacion(req, res);

    default:
      res.status(400).json({ message: "Bad request" });
  }
}

const crearReservacion = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    id_cliente,
    tipo_reservacion = "En línea",
    fecha_reservacion,
    observaciones = "",
    id_mesa,
    hora_reserva,
    adultos,
    menores,
  } = req.body;

  const horas_rerservas = getHours(new Date(fecha_reservacion));
  const minuto_reservado = getMinutes(new Date(fecha_reservacion));

  if (!id_cliente || !fecha_reservacion) {
    return res.status(400).json({ message: "Los campos son obligatorios" });
  }
  await prisma.$connect();

  const reservacion = await prisma.reservacion.create({
    data: {
      id_cliente: Number(id_cliente),
      id_estado: 1,
      tipo_reservacion,
      fecha_reservacion: new Date(fecha_reservacion),
      horas_reservadas: Number(horas_rerservas),
      fecha_registro: new Date(),
    },
  });

  await prisma.detalle_reservacion.create({
    data: {
      id_reservacion: reservacion.id,
      total_personas: adultos + menores,
      adultos,
      menores,
      hora_reserva: set(new Date(fecha_reservacion), {
        hours: horas_rerservas,
        minutes: minuto_reservado,
      }),
      servicio: "Restaurante",
      id_mesa,
      observaciones,
    },
  });

  await prisma.mesa.update({
    where: {
      id: id_mesa,
    },
    data: {
      id_estado: 2,
    },
  });
  await prisma.$disconnect();

  return res.status(201).json(reservacion);
};
const obtenerReservaciones = async (res: NextApiResponse<Data>) => {
  await prisma.$connect();
  const reservaciones = await prisma.reservacion.findMany({
    select: {
      id: true,
      id_cliente: true,
      cliente: {
        select: {
          id: true,
          id_estado: true,
          id_persona: true,
          persona: true,
          genero: true,
          tipo_cliente: true,
        },
      },
      id_estado: true,
      cat_estado: true,
      tipo_reservacion: true,
      fecha_reservacion: true,
      horas_reservadas: true,
      fecha_registro: true,
      detalle_reservacion: true,
    },
    orderBy: {
      id: "asc",
    },
  });
  await prisma.$disconnect();
  return res.status(200).json(reservaciones);
};

const actualizarReservacion = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    id,
    id_cliente,
    tipo_reservacion = "En línea",
    fecha_reservacion,
    total_personas,
    observaciones = "",
    id_mesa,
    hora_reserva,
    adultos,
    menores,
  } = req.body;

  if (!id)
    return res
      .status(400)
      .json({ message: "El id es necesario para realizar la actualización" });

  if (!id_cliente || !fecha_reservacion || !total_personas) {
    return res.status(400).json({ message: "Los campos son obligatorios" });
  }
  const horas_rerservas = getHours(new Date(fecha_reservacion));
  const minuto_reservado = getMinutes(new Date(fecha_reservacion));

  await prisma.$connect();
  const r = await prisma.reservacion.findFirst({
    where: {
      id,
    },
  });

  if (!r)
    return res
      .status(400)
      .json({ message: "No se encontró una reservacion con ese id." });

  const reservacion = await prisma.reservacion.update({
    data: {
      tipo_reservacion,
      fecha_reservacion: new Date(fecha_reservacion),
      horas_reservadas: Number(horas_rerservas),
    },
    where: {
      id: Number(id),
    },
  });
  await prisma.detalle_reservacion.create({
    data: {
      id_reservacion: reservacion.id,
      total_personas: adultos + menores,
      adultos,
      menores,
      hora_reserva: set(new Date(fecha_reservacion), {
        hours: horas_rerservas,
        minutes: minuto_reservado,
      }),
      servicio: "Restaurante",
      id_mesa,
      observaciones,
    },
  });
  await prisma.$disconnect();

  return res.status(200).json(reservacion);
};

const anularReservacion = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.body;

  if (!id)
    return res
      .status(400)
      .json({ message: "Es necesario el id para anular la reservación" });

  await prisma.$connect();
  const r = await prisma.reservacion.findFirst({
    where: {
      id,
    },
  });

  if (!r)
    return res
      .status(400)
      .json({ message: "No se encontró una reservacion con ese id." });

  const reservacion = await prisma.reservacion.update({
    data: {
      id_estado: 2,
    },
    where: {
      id,
    },
  });
  await prisma.$disconnect();
  return res.status(200).json(reservacion);
};
