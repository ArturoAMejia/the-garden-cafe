import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "./../../../../database/db";
import { ISolicitudCompra } from "./../../../../interfaces";

type Data =
  | {
      message: string;
    }
  | ISolicitudCompra
  | ISolicitudCompra[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerSolicitudesCompra(res);
    case "POST":
      return crearSolicitudCompra(req, res);
    case "PUT":
      return actualizarSolicitudCompra(req, res);
    case "PATCH":
      return desactivarSolicitudCompra(req, res);

    default:
      return res.status(400).json({ message: "Método no soportado." });
  }
}
const obtenerSolicitudesCompra = async (res: NextApiResponse<Data>) => {
  await prisma.$connect();
  const solicitudesCompra = await prisma.solicitud_compra.findMany({
    select: {
      id: true,
      id_comprobante: true,
      comprobante: true,
      id_trabajador: true,
      trabajador: {
        select: {
          id: true,
          id_estado: true,
          codigo_inss: true,
          id_estado_civil: true,
          estado_civil: true,
          id_persona: true,
          persona: true,
          fecha_ingreso: true,
        },
      },
      fecha_solicitud: true,
      fecha_vigencia: true,
      cantidad: true,
      id_estado: true,
      cat_estado: true,
      motivo: true,
      detalle_solicitud_compra: true,
      descuento: true,
      impuesto: true,
      subtotal: true,
      total: true,
    },
  });
  await prisma.$disconnect();
  return res.status(200).json(solicitudesCompra);
};

const crearSolicitudCompra = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    id_trabajador,
    motivo,
    fecha_vigencia,
    descuento = 0,
    impuesto,
    subtotal,
    total,
    productos,
  } = req.body;

  console.log(req.body);

  if (
    !id_trabajador ||
    !motivo ||
    !fecha_vigencia ||
    !impuesto ||
    !subtotal ||
    !total
  )
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });

  await prisma.$connect();
  const comprobante = await prisma.comprobante.create({
    data: {
      descripcion: motivo,
      id_estado: 1,
      fecha_ingreso: new Date(),
    },
  });
  const solicitud_compra = await prisma.solicitud_compra.create({
    data: {
      id_trabajador,
      id_comprobante: comprobante.id,
      cantidad: productos.length,
      fecha_solicitud: new Date(),
      // 7 = En espera
      id_estado: 8,
      motivo,
      descuento,
      impuesto,
      subtotal,
      total,
      fecha_vigencia: new Date(fecha_vigencia),
    },
  });

  await prisma.detalle_solicitud_compra.createMany({
    data: productos.map((producto: any) => ({
      id_solicitud_compra: solicitud_compra.id,
      id_producto: producto.id,
      cantidad: producto.cantidad,
      monto: producto.cantidad * producto.precio,
      precio_unitario: producto.precio,
    })),
  });
  await prisma.$disconnect();
  return res.status(201).json(solicitud_compra);
};

const actualizarSolicitudCompra = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    id,
    id_trabajador,
    id_comprobante,
    fecha_vigencia,
    id_estado,
    cantidad,
    motivo,
    productos,
  } = req.body;

  if (!id)
    return res
      .status(400)
      .json({ message: "El id es necesario para actualizar la solicitud" });
  if (
    !id_trabajador ||
    !id_comprobante ||
    !fecha_vigencia ||
    !cantidad ||
    !motivo
  )
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });

  await prisma.$connect();
  const s = await prisma.solicitud_compra.findFirst({
    where: {
      id,
    },
  });

  if (!s)
    return res
      .status(400)
      .json({ message: "No se encontró registro para desactivar" });

  const solicitud_compra = await prisma.solicitud_compra.update({
    data: {
      id_trabajador,
      id_comprobante,
      cantidad,
      fecha_solicitud: new Date(),
      // 7 = En espera
      id_estado,
      motivo,
      fecha_vigencia: new Date(fecha_vigencia),
    },
    where: {
      id,
    },
  });

  await prisma.$transaction(
    productos.map((producto: any) =>
      prisma.detalle_solicitud_compra.upsert({
        where: {
          id_producto_id_solicitud_compra: {
            id_solicitud_compra: solicitud_compra.id,
            id_producto: producto.id,
          },
        },
        create: {
          id_solicitud_compra: solicitud_compra.id,
          id_producto: producto.id,
          cantidad: producto.cantidad,
          monto: producto.cantidad * producto.precio,
          precio_unitario: producto.precio,
        },
        update: {
          id_solicitud_compra: solicitud_compra.id,
          id_producto: producto.id,
          cantidad: producto.cantidad,
          monto: producto.cantidad * producto.precio,
          precio_unitario: producto.precio,
        },
      })
    )
  );
  await prisma.$disconnect();
  return res.status(200).json(solicitud_compra);
};

const desactivarSolicitudCompra = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id, id_estado = 1 } = req.body;

  if (!id)
    return res
      .status(400)
      .json({ message: "El id es necesario para actualizar la solicitud" });

  await prisma.$connect();
  const s = await prisma.solicitud_compra.findFirst({
    where: {
      id,
    },
  });

  if (!s)
    return res
      .status(400)
      .json({ message: "No se encontró registro para desactivar" });
  const solicitud_compra = await prisma.solicitud_compra.update({
    data: {
      //Cambiar a esta aprobado
      id_estado,
    },
    where: {
      id,
    },
  });
  await prisma.$disconnect();
  return res.status(201).json(solicitud_compra);
};
