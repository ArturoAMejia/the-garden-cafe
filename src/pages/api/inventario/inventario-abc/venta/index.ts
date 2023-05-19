import { prisma } from "database";
import type { NextApiRequest, NextApiResponse } from "next";

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
      return obtenerInventarioAbc(req, res);

    default:
      break;
  }
}

const obtenerInventarioAbc = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await prisma.$connect();

  const demanda = await prisma.detalle_venta.groupBy({
    by: ["id_producto_elaborado"],
    _sum: {
      cantidad: true,
    },
    orderBy: {
      _sum: {
        cantidad: "desc",
      },
    },
  });

  const inventario = await prisma.producto_elaborado.findMany({
    where: {
      id: {
        in: demanda.map((producto) => producto.id_producto_elaborado),
      },
    },
  });

  const productos = inventario.map((producto) => {
    const demanda_producto = demanda.filter(
      (d) => d.id_producto_elaborado === producto.id
    );
    return {
      ...producto,
      demanda: demanda_producto[0]._sum.cantidad,
    };
  });

  const productos_ordenados = productos.sort((a, b) => b.demanda - a.demanda);

  const demanda_total = productos_ordenados.reduce(
    (acc, curr) => acc + curr.demanda,
    0
  );

  const inventario_abc = productos_ordenados.map((producto) => {
    let porcentaje: number = (producto.demanda / demanda_total) * 100;

    if (!porcentaje) {
      porcentaje = 0;
    }

    return {
      ...producto,
      porcentaje,
    };
  });

  const inventario_porcentaje_acumulado = inventario_abc.reduce(
    (acc, producto) => {
      const porcentaje_acumulado =
        acc.length > 0
          ? acc[acc.length - 1].porcentaje_acumulado + producto.porcentaje
          : producto.porcentaje;
      return [
        ...acc,
        {
          ...producto,
          porcentaje_acumulado,
        },
      ];
    },
    []
  );

  // const total = inventario.reduce(
  //   (acc, curr) => acc + curr._count.detalle_venta,
  //   0
  // );

  // const inventarioAbc = inventario.map((producto) => {
  //   let porcentaje: number = (producto._count.detalle_venta / total) * 100;

  //   if (!porcentaje) {
  //     porcentaje = 0;
  //   }

  //   const cantidad_total = producto.detalle_venta.reduce(
  //     (acc, curr) => acc + curr.cantidad,
  //     0
  //   );

  //   const demanda_total =
  //     Number(cantidad_total) * Number(producto._count.detalle_venta);

  //   return {
  //     ...producto,
  //     cantidad_total,
  //     demanda_total,
  //     porcentaje,
  //   };
  // });

  // const inventarioOrdenado = inventarioAbc.sort(
  //   (a, b) => b.demanda_total - a.demanda_total
  // );

  // const inventarioAbcConAcumulado = inventarioOrdenado.reduce(
  //   (acc, producto) => {
  //     const porcentaje_acumulado =
  //       acc.length > 0
  //         ? acc[acc.length - 1].porcentaje_acumulado + producto.porcentaje
  //         : producto.porcentaje;
  //     return [
  //       ...acc,
  //       {
  //         ...producto,
  //         porcentaje_acumulado,
  //       },
  //     ];
  //   },
  //   []
  // );

  return res.status(200).json(inventario_porcentaje_acumulado);
};
