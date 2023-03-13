import { prisma } from "./../../../../../database";
import type { NextApiRequest, NextApiResponse } from "next";

import { IProducto } from "../../../../../interfaces";
import { IMenu } from "../../../../../interfaces";

// import { IProducto } from "../../../interfaces/inventario";

type Data =
  | {
      message: string;
    }
  | IProducto
  | IMenu[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerMenu(res);
    default:
      return res.status(400).json({ message: "Método no soportado." });
  }
}
const obtenerMenu = async (res: NextApiResponse<Data>) => {
  await prisma.$connect();
  const productos = await prisma.producto.findMany({
    select: {
      id: true,
      nombre: true,
      imagen: true,
      categoria_producto: true,
      descripcion: true,
      unidad_medida: true,
      marca: true,
      precio_producto: {
        take: 1,
      },
    },
  });
  await prisma.$disconnect();
  res.status(200).json(productos);
};
