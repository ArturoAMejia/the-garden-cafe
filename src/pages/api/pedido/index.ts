import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "./../../../database";
import { hour } from "../../../helpers/addHours";
import { IPedido } from "../../../interfaces";

type Data =
  | {
      message: string;
    }
  | IPedido
  | IPedido[];

export default function hanlder(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerPedidos(res);
    case "POST":
      return registerPedido(req, res);
    case "PUT":
      return actualizarPedido(req, res);
    case "PATCH":
      return cancelarPedido(req, res);
    default:
      return res.status(404).json({ message: "Method not found" });
  }
}

const obtenerPedidos = async (res: NextApiResponse<Data>) => {
  await prisma.$connect();
  const pedidos = await prisma.pedido.findMany({
    select: {
      id: true,
      id_cliente: true,
      cliente: {
        select: {
          id: true,
          id_estado: true,
          cat_estado: true,
          genero: true,
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
          estado_civil: true,
          id_estado: true,
          genero: true,
          codigo_inss: true,
          fecha_ingreso: true,
        },
      },
      tipo_pedido: true,
      fecha_pedido: true,
      ubicacion_entrega: true,
      id_estado: true,
      cat_estado: true,
      vigencia: true,
      observacion: true,
      detalle_pedido: {
        select: {
          id_producto: true,
          id_producto_elaborado: true,
          producto_elaborado: true,
          producto: true,
          monto: true,
          cantidad: true,
          precio: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });
  return res.status(200).json(pedidos);
};

const registerPedido = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    id_usuario,
    id_cliente,
    id_trabajador = 1,
    tipo_pedido,
    ubicacion_entrega = "",
    observacion = "",
    productos,
  } = req.body;

  console.log(req.body);

  if (!tipo_pedido || !productos)
    return res.status(400).json({ message: "Dichos campos son obligatorios" });

  let client;

  await prisma.$connect();

  if (id_cliente) {
    client = await prisma.cliente.findFirst({
      where: {
        id: id_cliente,
      },
    });
  } else if (id_usuario) {
    const user = await prisma.usuario.findFirst({
      where: {
        id: Number(id_usuario),
      },
    });

    const p = await prisma.persona.findFirst({
      where: {
        usuario: {
          id: user!.id,
        },
      },
    });

    client = await prisma.cliente.findFirst({
      where: {
        id_persona: p?.id,
      },
    });
  }

  if (!client)
    return res
      .status(400)
      .json({ message: "No se encontró registro de este cliente." });

  console.log(productos);

  const pedido = await prisma.pedido.create({
    data: {
      id_cliente: client!.id,
      id_trabajador,
      tipo_pedido,
      fecha_pedido: new Date(),
      ubicacion_entrega: ubicacion_entrega,
      id_estado: 3,
      observacion,
      vigencia: hour(new Date(), 35),
    },
  });

  await prisma.detalle_pedido.createMany({
    data: productos.map((producto: any) => ({
      id_pedido: pedido.id,
      id_producto_elaborado: producto.id,
      id_estado: 4,
      cantidad: producto.cantidad,
      monto: producto.cantidad * producto.precio,
      precio: producto.precio,
    })),
  });

  const detalle = productos.map((producto) => {
    return {
      cantidad: producto.cantidad,
      detalle: producto.detalle,
    };
  });

  detalle.map(async (producto: any) => {
    await prisma.detalle_pedido_ingrediente.createMany({
      data: producto.detalle.map((p: any) => ({
        id_pedido: pedido.id,
        id_producto: p.id_producto,
        cantidad: p.cantidad * producto.cantidad,
      })),
    });
  });

  detalle.map(async (producto: any) => {
    await prisma.trans_inventario.createMany({
      data: producto.detalle.map((p: any) => ({
        id_producto: p.id_producto,
        cantidad: p.cantidad * producto.cantidad,
        tipo_movimiento: "Salida",
      })),
    });
  });

  detalle.map(async (producto: any) => {
    producto.detalle.map(async (p: any) => {
      await prisma.inventario.update({
        where: {
          id_producto: p.id_producto,
        },
        data: {
          stock_actual: {
            decrement: p.cantidad * producto.cantidad,
          },
        },
      });
    });
  });

  // await prisma.$transaction();
  await prisma.$disconnect();

  return res.status(200).json(pedido);
};

const actualizarPedido = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    id,
    id_cliente,
    id_trabajador,
    tipo_pedido,
    ubicacion_entrega = "",
    observacion = "",
    productos,
  } = req.body;

  if (!id)
    return res
      .status(400)
      .json({ message: "El id es necesario para actualizar el pedido" });

  if (!id_cliente || !tipo_pedido || !productos)
    return res.status(400).json({ message: "Dichos campos son obligatorios" });

  await prisma.$connect();
  const pedido = await prisma.pedido.update({
    data: {
      id_cliente: Number(id_cliente),
      id_trabajador: Number(id_trabajador),
      tipo_pedido,
      ubicacion_entrega: ubicacion_entrega,
      observacion,
    },
    where: {
      id,
    },
  });

  await prisma.detalle_pedido.deleteMany({
    where: {
      id_pedido: pedido.id,
    },
  });

  // TODO Cambiar any
  await prisma.detalle_pedido.createMany({
    data: productos.map((producto: any) => ({
      id_pedido: pedido.id,
      id_producto_elaborado: producto.id,
      id_estado: producto.id_estado,
      cantidad: producto.cantidad,
      monto: producto.cantidad * producto.precio,
      precio: producto.precio,
    })),
  });
  await prisma.$disconnect();
  return res.status(200).json(pedido);
};

const cancelarPedido = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.body;
  if (!id)
    return res
      .status(400)
      .json({ message: "El id del pedido es necesario para cancelarlo" });
  await prisma.$connect();
  const pedido = await prisma.pedido.update({
    data: {
      id_estado: 15,
    },
    where: {
      id,
    },
  });
  await prisma.$disconnect();

  return res.status(200).json(pedido);
};
