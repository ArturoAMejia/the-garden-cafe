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
      return cambiarEstadoSolicitudCompra(req, res);

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
          genero: true,
          persona: true,
          fecha_ingreso: true,
        },
      },
      fecha_solicitud: true,
      fecha_vigencia: true,
      cantidad: true,
      id_estado: true,
      observacion: true,
      cat_estado: true,
      motivo: true,
      id_tipo_orden_compra: true,
      tipo_orden_compra: true,
      detalle_solicitud_compra: {
        select: {
          id_producto: true,
          producto: {
            select: {
              id: true,
              nombre: true,
              descripcion: true,
              unidad_medida: true,
            },
          },
          monto: true,
          cantidad: true,
          precio_unitario: true,
        },
      },
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
    observacion,
    productos,
    id_tipo_orden_compra,
  } = req.body;

  console.log(req.body);

  if (
    !id_trabajador ||
    !motivo ||
    !fecha_vigencia ||
    !subtotal ||
    !total ||
    !id_tipo_orden_compra
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
      id_tipo_orden_compra,
      id_estado: 13,
      motivo,
      descuento,
      observacion,
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
    fecha_vigencia,
    motivo,
    productos,
    id_comprobante,
    id_trabajador,
    impuesto,
    id_tipo_orden_compra,
    subtotal,
    observacion,
    total,
  } = req.body;

  if (!id)
    return res
      .status(400)
      .json({ message: "El id es necesario para actualizar la solicitud" });
  if (!id_trabajador || !id_comprobante || !fecha_vigencia || !motivo)
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
      cantidad: productos.length,
      fecha_solicitud: new Date(),
      observacion,
      motivo,
      impuesto,
      subtotal,
      total,
      id_tipo_orden_compra,
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

const cambiarEstadoSolicitudCompra = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id, id_estado, observacion } = req.body;

  if (!id)
    return res
      .status(400)
      .json({ message: "El id es necesario para actualizar la solicitud" });

  if (!id_estado)
    return res.status(400).json({
      message: "El id_estado es necesario para actualizar la solicitud",
    });

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
      observacion,
    },
    where: {
      id,
    },
  });
  await prisma.$disconnect();
  return res.status(201).json(solicitud_compra);
};
