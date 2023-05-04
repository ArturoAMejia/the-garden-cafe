import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "./../../../../database";
import { IOrdenCompra } from "../../../../interfaces";

type Data =
  | {
      message: string;
    }
  | IOrdenCompra
  | IOrdenCompra[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerOrdenCompra(res);
    case "POST":
      return crearOrdenCompra(req, res);
    case "PUT":
      return actualizarOrdenCompra(req, res);
    case "PATCH":
      return desactivarOrdenCompra(req, res);

    default:
      return res.status(400).json({ message: "Método no soportado." });
  }
}

const obtenerOrdenCompra = async (res: NextApiResponse<Data>) => {
  await prisma.$connect();
  const orden_compra = await prisma.orden_compra.findMany({
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
      id_tipo_orden_compra: true,
      tipo_orden_compra: true,
      id_comprobante: true,
      comprobante: true,
      id_estado: true,
      cat_estado: true,
      id_solicitud_compra: true,
      solicitud_compra: true,
      autorizado_por: true,
      trabajador: {
        select: {
          id: true,
          id_persona: true,
          persona: true,
          id_estado_civil: true,
          estado_civil: true,
          id_estado: true,
          genero: true,
          codigo_inss: true,
          fecha_ingreso: true,
        },
      },
      num_orden: true,
      subtotal: true,
      descuento: true,
      impuesto: true,
      total: true,
      fecha_orden: true,
      detalle_orden_compra: {
        select: {
          id_producto: true,
          producto: true,
          monto: true,
          cantidad: true,
          precio_unitario: true,
        },
      },
    },
    where: {
      id_estado: 1,
    },
  });
  await prisma.$disconnect();
  return res.status(200).json(orden_compra);
};

const crearOrdenCompra = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    id_proveedor,
    motivo,
    id_tipo_orden_compra,
    descuento = 0,
    subtotal,
    detalle_orden_compra,
    id_solicitud_compra,
    autorizado_por,
  } = req.body;

  if (
    !id_proveedor ||
    !id_tipo_orden_compra ||
    !motivo ||
    !subtotal ||
    !detalle_orden_compra ||
    !id_solicitud_compra ||
    !autorizado_por
  ) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }
  await prisma.$connect();
  const comprobante = await prisma.comprobante.create({
    data: {
      descripcion: motivo,
      id_estado: 1,
      fecha_ingreso: new Date(),
    },
  });
  const orden_compra = await prisma.orden_compra.create({
    data: {
      descuento,
      id_proveedor,
      id_comprobante: comprobante.id,
      id_tipo_orden_compra,
      id_estado: 1,
      id_solicitud_compra,
      autorizado_por,
      subtotal,
      impuesto: subtotal * 0.15,
      total: subtotal * 1.15 - descuento,
      fecha_orden: new Date(),
    },
  });
  await prisma.detalle_orden_compra.createMany({
    data: detalle_orden_compra.map((detalle: any) => ({
      id_orden_compra: orden_compra.id,
      id_producto: detalle.id_producto,
      cantidad: detalle.cantidad,
      monto: detalle.monto,
      precio_unitario: detalle.precio_unitario,
    })),
  });
  await prisma.solicitud_compra.update({
    data: {
      id_estado: 9,
    },
    where: {
      id: id_solicitud_compra,
    },
  });
  await prisma.$disconnect();
  return res.status(201).json(orden_compra);
};

const actualizarOrdenCompra = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    id,
    descuento = 0,
    id_proveedor,
    id_comprobante,
    id_estado,
    id_tipo_orden_compra,
    subtotal,
    productos,
  } = req.body;

  if (!id)
    return res.status(400).json({
      message: "El id es necesario para actualizar la orden de compra",
    });

  if (
    !id_comprobante ||
    !id_proveedor ||
    !id_tipo_orden_compra ||
    !subtotal ||
    !id_estado ||
    !productos
  ) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }
  await prisma.$connect();
  const orden_compra = await prisma.orden_compra.update({
    data: {
      descuento: Number(descuento),
      id_proveedor: Number(id_proveedor),
      id_comprobante: Number(id_comprobante),
      id_tipo_orden_compra: Number(id_tipo_orden_compra),
      id_estado: Number(id_estado),
      subtotal: Number(subtotal),
      impuesto: subtotal * 0.15,
      total: subtotal * 1.15,
    },
    where: {
      id,
    },
  });
  await prisma.$transaction(
    productos.map((producto: any) =>
      prisma.detalle_orden_compra.upsert({
        where: {
          id_producto_id_orden_compra: {
            id_orden_compra: orden_compra.id,
            id_producto: producto.id,
          },
        },
        create: {
          id_orden_compra: orden_compra.id,
          id_producto: producto.id,
          cantidad: producto.cantidad,
          monto: producto.cantidad * producto.precio,
          precio_unitario: producto.precio,
        },
        update: {
          id_orden_compra: orden_compra.id,
          id_producto: producto.id,
          cantidad: producto.cantidad,
          monto: producto.cantidad * producto.precio,
          precio_unitario: producto.precio,
        },
      })
    )
  );
  await prisma.$disconnect();
  return res.status(200).json(orden_compra);
};

const desactivarOrdenCompra = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.body;

  if (!id)
    return res.status(400).json({
      message: "El id es necesario para desactivar la orden de compra",
    });

  await prisma.$connect();
  const orden_compra = await prisma.orden_compra.update({
    data: {
      id_estado: 2,
    },
    where: {
      id,
    },
  });
  await prisma.$disconnect();
  return res.status(200).json(orden_compra);
};
