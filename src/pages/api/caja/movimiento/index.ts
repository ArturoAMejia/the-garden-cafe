import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "./../../../../database/db";
import { IMovimientoCaja } from "../../../../interfaces";

type Data =
  | {
      message: string;
    }
  | IMovimientoCaja
  | IMovimientoCaja[]
  | any;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerMovimientosCaja(res);
    // case "POST":
    // return crearMovimientoCaja(req, res);
    case "PUT":
      return actualizarMovimientoCaja(req, res);
    default:
      return res.status(400).json({ message: "Método no soportado." });
  }
}

const obtenerMovimientosCaja = async (res: NextApiResponse<Data>) => {
  await prisma.$connect();

  const m = await prisma.movimiento_caja.groupBy({
    by: ["id_caja", "tipo_movimiento", "fecha_movimiento"],
    _sum: {
      monto: true,
    },
  });
  console.log(m);

  const cajas = await prisma.movimiento_caja.findMany({
    select: {
      id: true,
      caja: true,
      id_caja: true,
      comprobante: true,
      id_comprobante: true,
      trabajador: true,
      id_trabajador: true,
      moneda: true,
      id_moneda: true,
      num_movimiento: true,
      tipo_movimiento: true,
      fecha_movimiento: true,
      concepto: true,
      monto: true,
    },
    where: {
      id_caja: {
        in: m.map((movimiento) => movimiento.id_caja),
      },
    },
  });

  const a = cajas.map((caja) => {
    const monto_total = m.filter(
      (movimiento) => movimiento.id_caja === caja.id_caja
    );
    return {
      ...caja,
      monto_total: monto_total[0]._sum.monto,
    };
  });

  console.log(a);
  const movimientos = await prisma.movimiento_caja.findMany({
    select: {
      id: true,
      caja: true,
      id_caja: true,
      comprobante: true,
      id_comprobante: true,
      trabajador: true,
      id_trabajador: true,
      moneda: true,
      id_moneda: true,
      num_movimiento: true,
      tipo_movimiento: true,
      fecha_movimiento: true,
      concepto: true,
      monto: true,
    },
  });
  await prisma.$disconnect();
  return res.status(200).json(movimientos);
};

// const crearMovimientoCaja = async (
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) => {
//   const { id_caja, id_trabajador, id_moneda, concepto, monto } = req.body;

//   if (!id_caja || !id_trabajador || !id_moneda || !concepto || !monto)
//     return res
//       .status(400)
//       .json({ message: "Todos los campos son obligatorios" });

//   await prisma.$connect();
//   const movimiento = await prisma.movimiento_caja.create({
//     data: {
//       id_caja: Number(id_caja),
//       id_trabajador: Number(id_trabajador),
//       id_moneda: Number(id_moneda),
//       concepto,
//       tipo_movimiento: "INGRESO",
//       monto: Number(monto),
//     },
//   });
//   await prisma.$disconnect();
//   return res.status(201).json(movimiento);
// };

const actualizarMovimientoCaja = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id, id_caja, id_trabajador, id_moneda, concepto, monto } = req.body;

  if (!id)
    return res
      .status(400)
      .json({ message: "El id es necesario para actualizar el movimiento." });

  if (!id_caja || !id_trabajador || !id_moneda || !concepto || !monto)
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });

  await prisma.$connect();
  const m = await prisma.movimiento_caja.findFirst({
    where: {
      id,
    },
  });

  if (!m)
    return res
      .status(400)
      .json({ message: "No se encontró registro con ese id." });

  const movimiento = await prisma.movimiento_caja.update({
    data: {
      id_moneda: Number(id_moneda),
      concepto,
      monto: Number(monto),
    },
    where: {
      id,
    },
  });
  await prisma.$disconnect();
  return res.status(201).json(movimiento);
};
