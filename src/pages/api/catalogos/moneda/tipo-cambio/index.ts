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
      return obtenerTipoCambios(res);

    default:
      break;
  }
}
const obtenerTipoCambios = async (res: NextApiResponse<Data>) => {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  await prisma.$connect();
  const tipoCambios = await prisma.tipo_cambio.findFirst({
    where: {
      fecha: hoy,
    },
  });
  await prisma.$disconnect();
  return res.status(200).json(tipoCambios);
};
