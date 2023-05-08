import { prisma } from "@/database";
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
      return obtenerPrecioProducto(req, res);
    case "POST":
      return crearPrecioProducto(req, res);
    case "PUT":
      return actualizarPrecioProducto(req, res);
    case "PATCH":
      return desactivarPrecioProducto(req, res);

    default:
      break;
  }
}

const obtenerPrecioProducto = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await prisma.$connect();

  const precioProducto = await prisma.precio_producto.findMany({
    select: {
      id: true,
      precio_venta: true,
      precio_compra: true,
      margen_ganancia: true,
      gasto: true,
      id_estado: true,
      id_producto: true,
      producto: true,
    },
  });

  return res.status(200).json(precioProducto);
};

const crearPrecioProducto = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id_producto, precio_venta, precio_compra, margen_ganancia, gasto } =
    req.body;

  console.log(req.body);
  if (
    !id_producto ||
    !precio_venta ||
    !precio_compra ||
    !margen_ganancia ||
    !gasto
  ) {
    return res.status(400).json({
      message: "Todos los campos son obligatorios",
    });
  }

  await prisma.$connect();

  const precioProducto = await prisma.precio_producto.create({
    data: {
      id_producto,
      precio_venta,
      precio_compra,
      margen_ganancia,
      gasto,
      id_estado: 1,
    },
  });

  return res.status(200).json(precioProducto);
};

const actualizarPrecioProducto = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    id,
    id_producto,
    precio_venta,
    precio_compra,
    margen_ganancia,
    gasto,
  } = req.body;

  if (
    !id ||
    !id_producto ||
    !precio_venta ||
    !precio_compra ||
    !margen_ganancia ||
    !gasto
  ) {
    return res.status(400).json({
      message: "Todos los campos son obligatorios",
    });
  }

  await prisma.$connect();

  const precioProducto = await prisma.precio_producto.update({
    data: {
      id_producto,
      precio_venta,
      precio_compra,
      margen_ganancia,
      gasto,
      id_estado: 1,
    },
    where: {
      id,
    },
  });

  return res.status(200).json(precioProducto);
};

const desactivarPrecioProducto = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  throw new Error("Function not implemented.");
};
