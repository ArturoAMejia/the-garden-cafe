import { IProducto, IProductoElaborado } from "@/interfaces";
import { prisma } from "database";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      message: string;
    }
  | IProductoElaborado
  // TODO Quitar el any cuando se implementen los métodos
  | IProductoElaborado[]
  | any;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerPlatillos(res);

    case "POST":
      return crearPlatillo(req, res);

    case "PUT":
      return actualizarPlatillo(req, res);

    case "PATCH":
      return desactivarPlatillo(req, res);

    default:
      return res.status(400).json({ message: "Método no soportado." });
  }
}

const obtenerPlatillos = async (res: NextApiResponse<Data>) => {
  await prisma.$connect();
  const productos = await prisma.producto_elaborado.findMany({
    select: {
      id: true,
      nombre: true,
      descripcion: true,
      id_estado: true,
      id_unidad_medida: true,
      unidad_medida: true,
      precio_producto: true,
      id_categoria_producto: true,
      categoria_producto: true,
      id_sub_categoria_producto: true,
      sub_categoria_producto: true,
      cod_producto: true,
      imagen: true,
      fecha_ingreso: true,
      detalle_producto_elaborado: {
        select: {
          id_producto: true,
          producto: true,
          cantidad: true,
          id_producto_elaborado: true,
          producto_elaborado: true,
        },
      },
    },
  });
  await prisma.$disconnect();
  res.status(200).json(productos);
};

const crearPlatillo = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    nombre,
    descripcion,
    id_unidad_medida,
    precio_producto,
    id_zona_preparacion,
    id_categoria_producto,
    id_sub_categoria_producto,
    imagen,
    productos,
  } = req.body;

  if (
    !nombre ||
    !descripcion ||
    !id_unidad_medida ||
    !precio_producto ||
    !id_zona_preparacion ||
    !id_categoria_producto ||
    !id_sub_categoria_producto ||
    !productos
  ) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios." });
  }

  await prisma.$connect();
  const producto = await prisma.producto_elaborado.create({
    data: {
      nombre,
      descripcion,
      id_unidad_medida,
      precio_producto,
      id_zona_preparacion,
      id_categoria_producto,
      id_sub_categoria_producto,
      imagen,
      id_estado: 1,
    },
  });

  await prisma.detalle_producto_elaborado.createMany({
    data: productos.map((producto: any) => ({
      id_producto_elaborado: producto.id_producto_elaborado,
      id_producto: producto.id_producto,
      id_estado: 1,
      cantidad: producto.cantidad,
    })),
  });

  await prisma.$disconnect();

  res.status(201).json(producto);
};

const actualizarPlatillo = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    id,
    nombre,
    descripcion,
    id_unidad_medida,
    precio_producto,
    id_zona_preparacion,
    id_categoria_producto,
    id_sub_categoria_producto,
    imagen,
    productos,
  } = req.body;

  if (!id) return res.status(400).json({ message: "ID es obligatorio." });

  if (
    !nombre ||
    !descripcion ||
    !id_unidad_medida ||
    !precio_producto ||
    !id_zona_preparacion ||
    !id_categoria_producto ||
    !id_sub_categoria_producto ||
    !productos
  ) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios." });
  }

  await prisma.$connect();

  const p = await prisma.producto_elaborado.findUnique({
    where: {
      id,
    },
  });

  if (!p) return res.status(404).json({ message: "Platillo no encontrado." });

  const producto = await prisma.producto_elaborado.update({
    data: {
      nombre,
      descripcion,
      id_unidad_medida,
      precio_producto,
      id_zona_preparacion,
      id_categoria_producto,
      id_sub_categoria_producto,
      imagen,
      id_estado: 1,
    },
    where: {
      id,
    },
  });

  await prisma.$transaction(
    productos.map((producto: any) =>
      prisma.detalle_producto_elaborado.upsert({
        where: {
          id_producto_id_producto_elaborado: {
            id_producto_elaborado: producto.id_producto_elaborado,
            id_producto: producto.id_producto,
          },
        },
        create: {
          id_producto_elaborado: producto.id_producto_elaborado,
          id_producto: producto.id_producto,
          id_estado: 1,
          cantidad: producto.cantidad,
        },
        update: {
          cantidad: producto.cantidad,
        },
      })
    )
  );

  await prisma.$disconnect();

  res.status(200).json(producto);
};

const desactivarPlatillo = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: "ID es obligatorio." });

  await prisma.$connect();

  const p = await prisma.producto_elaborado.findUnique({
    where: {
      id,
    },
  });

  if (!p) return res.status(404).json({ message: "Platillo no encontrado." });

  const producto = await prisma.producto_elaborado.update({
    data: {
      id_estado: 2,
    },
    where: {
      id,
    },
  });

  await prisma.$disconnect();

  res.status(200).json(producto);
};
