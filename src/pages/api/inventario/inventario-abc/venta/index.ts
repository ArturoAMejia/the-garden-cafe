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

  const inventario = await prisma.producto_elaborado.findMany({
    include: {
      _count: {
        select: { detalle_venta: true },
      },

      detalle_venta: {
        select: {
          cantidad: true,
        },
      },
    },
    orderBy: {
      detalle_pedido: {
        _count: "desc",
      },
    },
  });

  const total = inventario.reduce(
    (acc, curr) => acc + curr._count.detalle_venta,
    0
  );

  const inventarioAbc = inventario.map((producto) => {
    let porcentaje: number = (producto._count.detalle_venta / total) * 100;

    if (!porcentaje) {
      porcentaje = 0;
    }
    console.log({ porcentaje });

    const cantidad_total = producto.detalle_venta.reduce(
      (acc, curr) => acc + curr.cantidad,
      0
    );
    const demanda_total =
      Number(cantidad_total) * Number(producto._count.detalle_venta);

    return {
      ...producto,
      cantidad_total,
      demanda_total,
      porcentaje,
    };
  });

  const inventarioOrdenado = inventarioAbc.sort(
    (a, b) => b.demanda_total - a.demanda_total
  );

  const inventarioAbcConAcumulado = inventarioOrdenado.reduce(
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

  return res.status(200).json(inventarioAbcConAcumulado);
};
