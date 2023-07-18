import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "./../../../database";
import { format } from "date-fns";

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
      return obtenerVentas(res);
    case "POST":
      return crearVenta(req, res);
    case "PUT":
      return actualizarVenta(req, res);
    case "PATCH":
      return anularVenta(req, res);

    default:
      return res.status(400).json({ message: "Método no soportado." });
  }
}
const obtenerVentas = async (res: NextApiResponse<Data>) => {
  await prisma.$connect();
  const ventas = await prisma.venta.findMany({
    select: {
      id: true,
      cliente: {
        select: {
          id: true,
          id_estado: true,
          cat_estado: true,
          id_persona: true,
          persona: true,
          tipo_cliente: true,
        },
      },
      id_trabajador: true,
      trabajador: {
        select: {
          id: true,
          id_persona: true,
          persona: true,
          id_estado_civil: true,
          id_estado: true,
        },
      },
      id_pedido: true,
      pedido: true,
      id_comprobante: true,
      comprobante: true,
      id_moneda: true,
      moneda: true,
      id_cat_forma_pago: true,
      cat_forma_pago: true,
      id_estado: true,
      cat_estado: true,
      tipo_venta: true,
      fecha_venta: true,
      subtotal: true,
      descuento: true,
      impuesto: true,
      total: true,
      detalle_venta: true,
    },
    orderBy: {
      id: "desc",
    },
  });
  await prisma.$disconnect();
  return res.status(200).json(ventas);
};

const crearVenta = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {
    id_trabajador = 1,
    id_cliente,
    tipo_venta,
    subtotal,
    descuento,
    descripcion,
    id_cat_forma_pago,
    id_moneda,
    id_pedido,
    productos,
    pago_cliente,
  } = req.body;

  if (
    !id_cliente ||
    !tipo_venta ||
    !subtotal ||
    !id_cat_forma_pago ||
    !id_moneda ||
    !id_pedido ||
    !productos ||
    !pago_cliente
  ) {
    return res.status(400).json({ message: "Los campos son obligatorios" });
  }
  await prisma.$connect();
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const tipo_cambio = await prisma.tipo_cambio.findFirst({
    where: {
      fecha: hoy,
    },
  });

  const pago_dolares = pago_cliente * tipo_cambio.valor_cambio;

  if (id_moneda === 2) {
    if (pago_dolares < subtotal * 1.15) {
      return res
        .status(400)
        .json({ message: "El pago del cliente es menor al total de la venta" });
    }
  } else {
    if (pago_cliente < subtotal * 1.15) {
      return res
        .status(400)
        .json({ message: "El pago del cliente es menor al total de la venta" });
    }
  }

  const caja = await prisma.caja.findFirst({
    where: {
      id_estado: 1,
    },
  });

  if (!caja) {
    return res.status(400).json({ message: "No hay caja abierta" });
  }

  const comprobante = await prisma.comprobante.create({
    data: {
      descripcion,
      id_estado: 1,
      fecha_ingreso: new Date(),
    },
  });

  const venta = await prisma.venta.create({
    data: {
      id_trabajador,
      id_cliente,
      id_cat_forma_pago,
      id_comprobante: comprobante.id,
      id_estado: 1,
      id_moneda,
      id_pedido,
      tipo_venta,
      descuento,
      subtotal,
      impuesto: subtotal * 0.15,
      total: subtotal * 1.15,
    },
  });

  await prisma.pedido.update({
    where: {
      id: id_pedido,
    },
    data: {
      id_estado: 8,
    },
  });

  await prisma.detalle_venta.createMany({
    data: productos.map((producto: any) => ({
      id_venta: venta.id,
      id_producto_elaborado: Number(producto.id),
      cantidad: producto.cantidad,
      monto: producto.cantidad * producto.precio,
      precio: producto.precio,
    })),
  });

  const apertura_caja = await prisma.apertura_caja.findFirst({
    where: {
      id_caja: caja.id,
      id_estado: 1,
    },
  });

  await prisma.movimiento_caja.create({
    data: {
      id_caja: caja.id,
      id_trabajador,
      concepto: "Venta",
      tipo_movimiento: "Ingreso",
      monto: venta.total,
      id_comprobante: comprobante.id,
      id_moneda: apertura_caja.id_moneda,
    },
  });

  await prisma.caja.update({
    where: {
      id: caja.id,
    },
    data: {
      saldo_actual: {
        increment: venta.total,
      },
    },
  });

  const pedido = await prisma.pedido.findFirst({
    where: {
      id: id_pedido,
    },
  });

  await prisma.mesa.update({
    where: {
      id: pedido.id_mesa,
    },
    data: {
      id_estado: 1,
    },
  });

  await prisma.$disconnect();
  return res.status(201).json(venta);
};

const actualizarVenta = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    id,
    id_cliente,
    tipo_venta,
    subtotal,
    descuento,
    id_cat_forma_pago,
    id_estado,
    id_moneda,
    productos,
  } = req.body;

  if (
    !id_cliente ||
    !tipo_venta ||
    !subtotal ||
    !descuento ||
    !id_cat_forma_pago ||
    !id_estado ||
    !id_moneda ||
    !productos
  ) {
    return res.status(400).json({ message: "Los campos son obligatorios" });
  }
  await prisma.$connect();
  // ! Verifica si existe la venta con ese id
  const v = await prisma.venta.findFirst({
    where: {
      id,
    },
  });

  if (!v) return res.status(400).json({ message: "Venta no encontrada." });

  // ! Realiza la actualización de los datos
  const venta = await prisma.venta.update({
    data: {
      id_cliente,
      id_cat_forma_pago,
      id_estado,
      id_moneda,
      tipo_venta,
      descuento,
      subtotal,
      impuesto: subtotal * 0.15,
      total: subtotal * 1.15,
    },
    where: {
      id,
    },
  });
  // TODO cambiar el any del producto
  await prisma.$transaction(
    productos.map((producto: any) =>
      prisma.detalle_venta.upsert({
        where: {
          id_venta_id_producto_elaborado: {
            id_venta: id,
            id_producto_elaborado: producto.id,
          },
        },
        create: {
          id_venta: venta.id,
          id_producto_elaborado: producto.id,
          cantidad: producto.cantidad,
          monto: producto.cantidad * producto.precio,
          precio: producto.precio,
        },
        update: {
          id_venta: venta.id,
          id_producto_elaborado: producto.id,
          cantidad: producto.cantidad,
          monto: producto.cantidad * producto.precio,
          precio: producto.precio,
        },
      })
    )
  );
  await prisma.$disconnect();
  return res.status(200).json(venta);
};

const anularVenta = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.body;

  console.log(req.body);
  if (!id)
    return res
      .status(400)
      .json({ message: "El id es necesario para anular la venta." });

  await prisma.$connect();
  const v = await prisma.venta.findFirst({
    where: {
      id,
    },
  });

  if (!v) return res.status(400).json({ message: "Venta no encontrada." });

  const venta = await prisma.venta.update({
    data: {
      id_estado: 15,
    },
    where: {
      id,
    },
  });

  const caja = await prisma.caja.findFirst({
    where: {
      id_estado: 1,
    },
  });

  await prisma.caja.update({
    where: {
      id: caja.id,
    },
    data: {
      saldo_actual: {
        decrement: venta.total,
      },
    },
  });

  await prisma.movimiento_caja.create({
    data: {
      id_caja: caja.id,
      id_trabajador: venta.id_trabajador,
      concepto: "Anulación de venta",
      tipo_movimiento: "Egreso",
      monto: venta.total,
      id_comprobante: venta.id_comprobante,
      id_moneda: venta.id_moneda,
    },
  });

  await prisma.$disconnect();
  return res.status(200).json(venta);
};
