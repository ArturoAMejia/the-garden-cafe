import type { NextApiRequest, NextApiResponse } from "next";

import bcrypt from "bcryptjs";

import { prisma } from "./../../../database";
import { jwt } from "../../../utils";

type Data =
  | { message: string }
  | {
      token: string;
      user: {
        username: string;
      };
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return registerUser(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    nombre,
    apellido_razon_social,
    tipo_persona = "",
    num_cedula,
    direccion = "",
    genero = "",
    fecha_nacimiento_constitucion,
    username,
    password,
    telefono = "",
    confirmacion_password = "",
  } = req.body;

  if (password.length < 6) {
    return res.status(400).json({
      message: "La contraseña debe de ser de 6 caracteres",
    });
  }

  if (password !== confirmacion_password) {
    return res.status(400).json({
      message: "Las contraseñas deben de ser iguales",
    });
  }

  await prisma.$connect();
  const persona = await prisma.persona.findUnique({
    where: {
      cedula_ruc: num_cedula,
    },
  });

  const user = await prisma.usuario.findUnique({
    where: {
      usuario: username,
    },
  });

  if (persona) {
    prisma.$disconnect();
    return res.status(400).json({
      message: "No puede usar ese numero de cedula",
    });
  }

  if (user?.usuario === username) {
    prisma.$disconnect();
    return res.status(400).json({
      message: "El correo ya está en uso",
    });
  }

  const nuevaPersona = await prisma.persona.create({
    data: {
      nombre,
      apellido_razon_social,
      cedula_ruc: num_cedula,
      genero,
      fecha_nacimiento_constitucion,
      telefono,
      correo: username,
      direccion_domicilio: direccion,
      tipo_persona,
      fecha_registro: new Date(),
    },
  });

  // TODO Añadir tipo de Persona para su creacion

  const nuevoUsuario = await prisma.usuario.create({
    data: {
      id_perfil: 2,
      id_estado: 1,
      usuario: username,
      // TODO Cambiar el correo
      correo: username,
      password: bcrypt.hashSync(password),
      id_rol: 6,
      id_persona: nuevaPersona.id,
    },
  });

  const cliente = await prisma.cliente.create({
    data: {
      id_estado: 1,

      id_persona: nuevaPersona.id,
      tipo_cliente: tipo_persona,
    },
  });
  await prisma.$disconnect();

  const { id, usuario } = nuevoUsuario;

  const token = jwt.signToken(id.toString(), usuario);

  return res.status(200).json({
    token, //jwt
    user: {
      username,
    },
  });
};
