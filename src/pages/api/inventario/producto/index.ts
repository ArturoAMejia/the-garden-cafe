import { prisma } from "./../../../../database";
import type { NextApiRequest, NextApiResponse } from "next";

import { IProducto } from "../../../../interfaces";

// import { IProducto } from "../../../interfaces/inventario";

type Data =
  | {
      message: string;
    }
  | IProducto
  | IProducto[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerProductos(res);

    case "POST":
      return crearProducto(req, res);

    case "PUT":
      return actualizarProducto(req, res);

    case "PATCH":
      return desactivarProducto(req, res);

    default:
      return res.status(400).json({ message: "Método no soportado." });
  }
}
const obtenerProductos = async (res: NextApiResponse<Data>) => {
  await prisma.$connect();
  const productos = await prisma.producto.findMany({
    select: {
      id: true,
      nombre: true,
      descripcion: true,
      id_estado: true,
      id_marca: true,
      id_unidad_medida: true,
      unidad_medida: true,
      precio_producto: true,
      id_categoria_producto: true,
      categoria_producto: true,
      cod_producto: true,
      imagen: true,
      fecha_ingreso: true,
    },
    where: {
      categoria_producto: {
        nombre: "Desayuno",
      },
    },
  });
  await prisma.$disconnect();
  res.status(200).json(productos);
};

const crearProducto = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    nombre,
    descripcion,
    id_categoria_producto,
    id_marca,
    id_unidad_medida,
    id_sub_categoria_producto,
    id_tipo_producto,
    imagen,
  } = req.body;

  if (
    !nombre ||
    !descripcion ||
    !id_categoria_producto ||
    !id_marca ||
    !id_unidad_medida ||
    !id_sub_categoria_producto ||
    !id_tipo_producto
  )
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });

  await prisma.$connect();
  const producto = await prisma.producto.create({
    data: {
      nombre,
      descripcion,
      id_categoria_producto,
      id_marca,
      id_unidad_medida,
      id_estado: 5,
      imagen,
      fecha_ingreso: new Date(),
      id_sub_categoria_producto,
      id_tipo_producto,
    },
  });
  await prisma.$disconnect();
  res.status(201).json(producto);
};

const actualizarProducto = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    id,
    nombre,
    descripcion,
    imagen,
    id_categoria_producto,
    id_estado,
    id_marca,
    id_unidad_medida,
    cod_producto,
    fecha_ingreso,
  } = req.body;
  
  if (!id)
  return res
  .status(400)
  .json({ message: "El id es necesario para actualizar el producto" });
  
  if (
    !nombre ||
    !descripcion ||
    !imagen ||
    !id_categoria_producto ||
    !id_estado ||
    !id_marca ||
    !cod_producto ||
    !id_unidad_medida ||
    !fecha_ingreso
    )
    return res
    .status(400)
    .json({ message: "Todos los campos son obligatorios" });
    
  await prisma.$connect();

  const producto = await prisma.producto.update({
    data: {
      nombre,
      descripcion,
      imagen,
      id_categoria_producto,
      id_estado,
      id_marca,
      id_unidad_medida,
      cod_producto,
      fecha_ingreso: new Date(fecha_ingreso),
    },
    where: {
      id,
    },
  });
  await prisma.$disconnect();
  res.status(200).json(producto);
};

const desactivarProducto = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.body;

  if (!id)
    return res
      .status(400)
      .json({ message: "El id es necesario para desactivar el producto." });
  await prisma.$connect();
  const producto = await prisma.producto.update({
    data: {
      id_estado: 2,
    },
    where: {
      id,
    },
  });
  await prisma.$disconnect();
  return res.status(200).json(producto);
};
