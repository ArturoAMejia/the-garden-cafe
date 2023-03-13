import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { jwt } from "../../../utils/";

import { prisma } from "./../../../database";
import { Modulo } from "../../../interfaces/seguridad/rol-modulo";

type Data =
  | { message: string }
  | {
      token: string;
      user: {
        id: string;
        usuario: string;
      };
    }
  | any;
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return checkJWT(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await prisma.$connect();
  const { token = "" } = req.cookies;

  let userId = "";

  try {
    userId = await jwt.isValidToken(token);
  } catch (error) {
    return res.status(401).json({
      message: "Token de autorización no es válido",
    });
  }
  const user = await prisma.usuario.findUnique({
    select: {
      id: true,
      usuario: true,
      id_rol: true,
    },
    where: {
      id: Number(userId),
    },
  });
  const modulos = await prisma.rol_modulo.findMany({
    select: {
      rol: true,
      id_modulo: true,
      modulo: {
        select: {
          nombre: true,
          icono: true,
          sub_modulo: true,
        },
      },
    },
    where: {
      id_rol: user?.id_rol,
    },
  });
  await prisma.$disconnect();

  if (!user) {
    return res.status(400).json({ message: "No existe usuario con ese id" });
  }

  // TODO Añadir el grupo al usuario para el JWT
  const { id, usuario } = user;

  return res.status(200).json({
    token: jwt.signToken(id.toString(), usuario),
    user: {
      id: id.toString(),
      usuario,
    },
    modulos,
  });
};
