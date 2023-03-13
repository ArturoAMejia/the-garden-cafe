import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "./../../../database";
import { ICompra } from "../../../interfaces";

type Data =
  | {
      message: string;
    }
  | ICompra
  | ICompra[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerCompras(res);
    case "POST":
      return crearCompra(req, res);
    case "PUT":
      return actualizarCompras(req, res);
    case "PATCH":
      return cancelarCompras(req, res);

    default:
      return res.status(400).json({ message: "Método no soportado." });
  }
}

const obtenerCompras = async (res: NextApiResponse<Data>) => {
  await prisma.$connect();
  const compras = await prisma.compra.findMany({
    select: {
      id: true,
      id_proveedor: true,
      proveedor: {
        select: {
          id: true,
          id_persona: true,
          persona: true,
          id_estado: true,
          cat_estado: true,
          sector_comercial: true,
          nacionalidad: true,
        },
      },
      id_trabajador: true,
      trabajador: {
        select: {
          id: true,
          id_persona: true,
          persona: true,
          id_estado_civil: true,
          estado_civil: true,
          id_estado: true,
          codigo_inss: true,
          fecha_ingreso: true,
        },
      },
      id_orden_compra: true,
      orden_compra: true,
      id_comprobante: true,
      comprobante: true,
      id_estado: true,
      cat_estado: true,
      fecha_compra: true,
      descripcion: true,
      descuento: true,
      subtotal: true,
      impuesto: true,
      total: true,
      detalle_compra: true,
    },
  });
  await prisma.$disconnect();
  return res.status(200).json(compras);
};

const crearCompra = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {
    id_proveedor,
    id_trabajador,
    id_orden_compra,
    productos, // ! Tiene que ser un arreglo de productos
    descripcion,
    subtotal,
  } = req.body;

  if (
    !id_proveedor ||
    !id_trabajador ||
    !id_orden_compra ||
    !descripcion ||
    !subtotal ||
    !productos
  ) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }
  await prisma.$connect();
  const comprobante = await prisma.comprobante.create({
    data: {
      descripcion,
      id_estado: 1,
      fecha_ingreso: new Date(),
    },
  });
  const compra = await prisma.compra.create({
    data: {
      id_proveedor,
      id_trabajador,
      id_comprobante: comprobante.id,
      id_orden_compra,
      descripcion,
      // ! 7 = En espera
      id_estado: 1,
      descuento: 0,
      subtotal,
      impuesto: subtotal * 0.15,
      total: subtotal * 1.15,
      fecha_compra: new Date(),
    },
  });
  await prisma.detalle_compra.createMany({
    data: productos.map((producto: any) => ({
      id_compra: compra.id,
      id_producto: producto.id,
      cantidad: producto.cantidad,
      monto: producto.cantidad * producto.precio,
      precio: producto.precio,
    })),
  });
  await prisma.$disconnect();
  return res.status(201).json(compra);
};

const actualizarCompras = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    id,
    id_proveedor,
    id_trabajador,
    id_comprobante,
    id_orden_compra,
    id_estado,
    productos, // ! Tiene que ser un arreglo de productos
    descripcion,
    descuento = 0,
    subtotal,
  } = req.body;
  if (!id)
    return res
      .status(400)
      .json({ message: "El id es obligatorio para actualizar la compra" });

  if (
    !id_proveedor ||
    !id_trabajador ||
    !id_comprobante ||
    !id_estado ||
    !id_orden_compra ||
    !descripcion ||
    !descuento ||
    !subtotal ||
    !productos
  ) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }
  await prisma.$connect();

  // ! Comprueba si existe la compra con ese id
  const c = await prisma.compra.findFirst({
    where: {
      id,
    },
  });

  if (!c) return res.status(400).json({ message: "Compra no encontrada." });

  // ! Realiza la actualizacion de los datos
  const compra = await prisma.compra.update({
    data: {
      id_proveedor: Number(id_proveedor),
      id_trabajador: Number(id_trabajador),
      id_comprobante: Number(id_comprobante),
      id_orden_compra: Number(id_orden_compra),
      descripcion,
      id_estado: Number(id_estado),
      descuento: Number(descuento),
      subtotal: Number(subtotal),
      impuesto: subtotal * 0.15,
      total: subtotal * 1.15,
    },
    where: {
      id: Number(id),
    },
  });
  // TODO Cambiar el any.
  await prisma.$transaction(
    productos.map((producto: any) =>
      prisma.detalle_compra.upsert({
        where: {
          id_compra_id_producto: {
            id_compra: id,
            id_producto: producto.id,
          },
        },
        create: {
          id_compra: compra.id,
          id_producto: producto.id,
          cantidad: producto.cantidad,
          monto: producto.cantidad * producto.precio,
          precio: producto.precio,
        },
        update: {
          id_compra: compra.id,
          id_producto: producto.id,
          cantidad: producto.cantidad,
          monto: producto.cantidad * producto.precio,
          precio: producto.precio,
        },
      })
    )
  );
  await prisma.$disconnect();
  return res.status(200).json(compra);
};

const cancelarCompras = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.body;

  if (!id)
    return res
      .status(400)
      .json({ message: "Es necesario el id para cancelar la compra" });

  await prisma.$connect();
  const c = await prisma.compra.findFirst({
    where: {
      id,
    },
  });

  if (!c) return res.status(400).json({ message: "Compra no encontrada." });

  const compra = await prisma.compra.update({
    data: {
      id_estado: 2,
    },
    where: {
      id: Number(id),
    },
  });
  await prisma.$disconnect();
  return res.status(200).json(compra);
};
