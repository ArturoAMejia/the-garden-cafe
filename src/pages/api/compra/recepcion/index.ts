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
      return obtenerRecepcionesOrdenesCompra(req, res);
    case "POST":
      return crearRecepcionOrdenCompra(req, res);

    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const obtenerRecepcionesOrdenesCompra = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await prisma.$connect();

  const recepcionesOrdenesCompra = await prisma.recepcion_compra.findMany({
    select: {
      id: true,
      id_orden_compra: true,
      orden_compra: true,
      fecha_recepcion: true,
      id_trabajador: true,
      trabajador: true,
      id_estado: true,
      descripcion: true,
      detalle_recepcion_compra: true,
    },
  });
  await prisma.$disconnect();

  return res.status(200).json(recepcionesOrdenesCompra);
};
const crearRecepcionOrdenCompra = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id_orden_compra, id_trabajador, descripcion, productos } = req.body;
  await prisma.$connect();

  const recepcionOrdenCompra = await prisma.recepcion_compra.create({
    data: {
      id_orden_compra,
      id_trabajador,
      descripcion,
      id_estado: 17,
      fecha_recepcion: new Date(),
    },
  });

  await prisma.detalle_recepcion_compra.createMany({
    data: productos.map((p) => ({
      id_recepcion_compra: recepcionOrdenCompra.id,
      id_producto: p.id,
      cantidad_solicitada: p.cantidad,
      cantidad_recibida: p.cantidad_recepcionada,
      precio_unitario: p.precio,
      monto: p.cantidad_recepcionada * p.precio,
    })),
  });

  await prisma.orden_compra.update({
    where: {
      id: id_orden_compra,
    },
    data: {
      id_estado: 17,
    },
  });

  await prisma.$transaction(
    productos.map((producto: any) =>
      prisma.inventario.upsert({
        where: {
          id_producto: producto.id,
        },
        update: {
          stock_actual: {
            increment: producto.cantidad_recepcionada,
          },
        },
        create: {
          id_producto: producto.id,
          stock_min: 1,
          stock_max: 100,
          stock_actual: producto.cantidad_recepcionada,
        },
      })
    )
  );

  await prisma.trans_inventario.createMany({
    data: productos.map((producto: any) => ({
      id_producto: producto.id,
      fecha_movimiento: new Date(),
      tipo_movimiento: "Entrada",
      cantidad: producto.cantidad_recepcionada,
    })),
  });

  await prisma.$disconnect();

  return res.status(201).json(recepcionOrdenCompra);
};
