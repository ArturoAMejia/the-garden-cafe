import { prisma } from "@/database";
import { IProducto } from "@/interfaces";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      message: string;
    }
  | IProducto
  | IProducto[]
  | any;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerIngredientes(res);

    case "POST":
      return crearIngrediente(req, res);

    case "PUT":
      return actualizarIngrediente(req, res);

    case "PATCH":
      return desactivarIngrediente(req, res);

    default:
      return res.status(400).json({ message: "Método no soportado." });
  }
}
const obtenerIngredientes = async (res: NextApiResponse<Data>) => {
  await prisma.$connect();
  const productos = await prisma.producto.findMany({
    select: {
      id: true,
      nombre: true,
      descripcion: true,
      id_estado: true,
      id_marca: true,
      marca: true,
      id_sub_categoria_producto: true,
      sub_categoria_producto: true,
      id_tipo_producto: true,
      tipo_producto: true,
      id_unidad_medida: true,
      unidad_medida: true,
      precio_producto: {
        take: 1,
      },
      id_categoria_producto: true,
      categoria_producto: true,
      cod_producto: true,
      imagen: true,
      fecha_ingreso: true,
    },
    where: {
      id_tipo_producto: 1,
    },
  });
  await prisma.$disconnect();
  res.status(200).json(productos);
};

const crearIngrediente = async (
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
    precio_compra = 0,
    gasto = 0,
    margen_ganancia = 0,
    imagen,
  } = req.body;

  if (
    !nombre ||
    !descripcion ||
    !id_categoria_producto ||
    !id_marca ||
    !id_unidad_medida ||
    !id_sub_categoria_producto
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
      id_tipo_producto: 1,
    },
  });
  await prisma.precio_producto.create({
    data: {
      id_producto: producto.id,
      precio_compra,
      gasto,
      margen_ganancia,
      fecha_precio: new Date(),
      precio_venta: precio_compra + gasto + margen_ganancia,
      id_estado: 1,
    },
  });
  await prisma.$disconnect();
  res.status(201).json(producto);
};

const actualizarIngrediente = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    id,
    nombre,
    descripcion,
    imagen,
    id_categoria_producto,
    id_sub_categoria_producto,
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
    !id_sub_categoria_producto ||
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
      id_sub_categoria_producto,
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

const desactivarIngrediente = async (
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
