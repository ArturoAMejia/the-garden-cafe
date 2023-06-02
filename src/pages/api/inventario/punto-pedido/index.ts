import { prisma } from "database";
import type { NextApiRequest, NextApiResponse } from "next";

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
      return obtenerPuntoPedido(req, res);
    case "POST":
      return crearPuntoPedido(req, res);
    case "PUT":
      return actualizarPuntoPedido(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
const obtenerPuntoPedido = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await prisma.$connect();

  const punto_pedido = await prisma.punto_pedido.findMany({
    select: {
      id: true,
      id_producto: true,
      producto: true,
      desviacion_estandar: true,
      dias: true,
      costo_producto: true,
      semanas_trabajadas: true,
      tasa_anual: true,
      id_estado: true,
      punto_pedido: true,
    },
  });

  return res.status(200).json(punto_pedido);
};

const crearPuntoPedido = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    id_producto,
    desviacion_estandar,
    dias,
    costo_producto,
    semanas_trabajadas,
    tasa_anual,
    costo_pedido,
  } = req.body;

  await prisma.$connect();

  const demanda = await prisma.detalle_pedido_ingrediente.groupBy({
    by: ["id_producto"],
    _sum: {
      cantidad: true,
    },
    where: {
      id_producto,
    },
  });

  console.log(demanda.length);

  if (demanda.length === 0) {
    return res
      .status(400)
      .json({ message: "El producto no tiene demanda registrada" });
  }

  const demanda_promedio = demanda[0]._sum.cantidad;

  const D = demanda_promedio * semanas_trabajadas;

  const H = tasa_anual * costo_producto;

  const Q = Math.sqrt((2 * D * costo_pedido) / H);

  const stock_seguridad = await prisma.stock_seguridad.findUnique({
    where: {
      id_producto,
    },
  });

  if (!stock_seguridad) {
    return res
      .status(400)
      .json({ message: "El producto no tiene stock de seguridad" });
  }

  const PP = demanda_promedio * (dias / 5) + stock_seguridad.stock_seguridad;

  const punto_pedido = await prisma.punto_pedido.create({
    data: {
      id_producto,
      punto_pedido: Math.round(PP),
      desviacion_estandar: stock_seguridad.desviacion_estandar,
      dias,
      costo_producto,
      tasa_anual,
      semanas_trabajadas,
      id_estado: 1,
    },
  });

  return res.status(200).json(punto_pedido);
};

const actualizarPuntoPedido = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  throw new Error("Function not implemented.");
};
