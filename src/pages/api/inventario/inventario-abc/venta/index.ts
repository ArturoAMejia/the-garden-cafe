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
        select: { detalle_pedido: true },
      },
    },
    orderBy: {
      detalle_pedido: {
        _count: "desc",
      },
    },
  });

  const total = inventario.reduce(
    (acc, curr) => acc + curr._count.detalle_pedido,
    0
  );

  const inventarioAbc = inventario.map((producto) => {
    const porcentaje = (producto._count.detalle_pedido / total) * 100;
    return {
      ...producto,
      porcentaje,
    };
  });

  const inventarioAbcConAcumulado = inventarioAbc.reduce((acc, producto) => {
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
  }, []);

  console.log(inventarioAbc);

  

  return res.status(200).json(inventarioAbcConAcumulado);
};
