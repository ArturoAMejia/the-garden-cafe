import { prisma } from "./../../../database";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { jwt } from "../../../utils";

type Data =
  | { message: string }
  | {
      token: string;
      user: {
        id: string;
        usuario: string;

        correo: string;
        nombre: string;
        apellido_razon_social: string;
      };
    }
  | any;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return loginUser(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await prisma.$connect();
  const { username, password } = req.body;

  const user = await prisma.usuario.findUnique({
    select: {
      id: true,
      password: true,
      id_rol: true,
      rol: true,
      correo: true,
      usuario: true,
      persona: true,
    },
    where: {
      usuario: username,
    },
  });

  const modulos = await prisma.rol_modulo.findMany({
    select: {
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
    return res
      .status(400)
      .json({ message: "Correo o contraseña no válidos - EMAIL" });
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return res
      .status(400)
      .json({ message: "Correo o contraseña no válidos - Password" });
  }

  const { id, usuario, id_rol, rol, persona, correo } = user;

  

  const token = jwt.signToken(id.toString(), usuario);

  return res.status(200).json({
    token, //jwt
    user: {
      id: id.toString(),
      usuario,
      correo,
      nombre: persona.nombre,
      rol,
      apellido_razon_social: persona.apellido_razon_social,
    },
    modulos
  });
};
