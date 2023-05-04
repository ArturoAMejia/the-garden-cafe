import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "./../../../database/db";

import bcrypt from "bcryptjs";

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
      return obtenerTrabajadores(res);
    case "POST":
      return crearTrabajador(req, res);
    case "PUT":
      return actualizarTrabajador(req, res);
    case "PATCH":
      return desactivarTrabajador(req, res);

    default:
      return res.json({ message: "Metodo no permitido" });
  }
}

const obtenerTrabajadores = async (res: NextApiResponse<Data>) => {
  await prisma.$connect();
  const trabajadores = await prisma.trabajador.findMany({
    select: {
      id: true,
      id_persona: true,
      persona: {
        select: {
          id: true,
          nombre: true,
          apellido_razon_social: true,
          cedula_ruc: true,
          telefono: true,
          direccion_domicilio: true,
          correo: true,
          fecha_nacimiento_constitucion: true,
          fecha_registro: true,
          tipo_persona: true,
          usuario: {
            select: {
              id: true,
              usuario: true,
              password: true,
              correo: true,
              fecha_registro: true,
              id_estado: true,
              cat_estado: true,
              perfil: {
                select: {
                  id: true,
                  id_grupo_usuario: true,
                  grupo_usuario: {
                    select: {
                      id: true,
                      id_estado: true,
                      nombre: true,
                      descripcion: true,
                    },
                  },
                  nombre: true,
                  descripcion: true,
                },
              },
              id_perfil: true,
              id_persona: true,
            },
          },
        },
      },
      id_estado_civil: true,
      estado_civil: true,
      genero: true,

      id_estado: true,
      cat_estado: true,
      codigo_inss: true,
      fecha_ingreso: true,
    },
  });
  await prisma.$disconnect();
  return res.status(200).json(trabajadores);
};

const crearTrabajador = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const {
    cedula_ruc,
    nombre,
    apellido_razon_social,
    fecha_nacimiento_constitucion,
    telefono,
    direccion_domicilio,
    correo,
    id_cargo,
    codigo_inss,
    genero,
    id_estado_civil,
  } = req.body;
  await prisma.$connect();
  const persona = await prisma.persona.findUnique({
    where: {
      cedula_ruc,
    },
  });

  const user = await prisma.usuario.findUnique({
    where: {
      usuario: correo,
    },
  });

  if (persona) {
    prisma.$disconnect();
    return res.status(400).json({
      message: "No puede usar ese numero de cedula",
    });
  }

  if (user?.usuario === correo) {
    prisma.$disconnect();
    return res.status(400).json({
      message: "El correo ya está en uso",
    });
  }

  const nuevaPersona = await prisma.persona.create({
    data: {
      nombre,
      apellido_razon_social,
      cedula_ruc,
      fecha_nacimiento_constitucion: new Date(fecha_nacimiento_constitucion),
      telefono,
      correo,
      direccion_domicilio: direccion_domicilio,
      tipo_persona: "Natural",
      fecha_registro: new Date(),
    },
  });

  // TODO Añadir tipo de Persona para su creacion

  await prisma.usuario.create({
    data: {
      id_perfil: 2,
      id_estado: 1,
      usuario: correo,
      // TODO Cambiar el correo
      correo: correo,
      password: bcrypt.hashSync("12345678"),
      id_persona: nuevaPersona.id,
    },
  });

  const trabajador = await prisma.trabajador.create({
    data: {
      id_persona: nuevaPersona!.id,
      codigo_inss,
      genero,

      fecha_ingreso: new Date(),
      id_estado: 1,
      id_estado_civil,
    },
  });

  await prisma.$disconnect();
  return res.status(201).json(trabajador);
};

const actualizarTrabajador = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const {
    id,
    cedula_ruc,
    nombre,
    apellido_razon_social,
    fecha_nacimiento_constitucion,
    telefono,
    direccion_domicilio,
    correo,
    id_cargo,
    codigo_inss,
    genero,
    id_estado_civil,
  } = req.body;
  if (!cedula_ruc)
    return res.status(400).json({ message: "No se encontró a ese trabajador" });

  await prisma.$connect();

  const p = await prisma.persona.findFirst({
    where: {
      cedula_ruc,
    },
  });

  if (!p)
    return res
      .status(400)
      .json({ message: "No se encontró registro de ese trabajador." });

  const per = await prisma.persona.update({
    data: {
      nombre,
      apellido_razon_social,
      cedula_ruc,
      fecha_nacimiento_constitucion: new Date(fecha_nacimiento_constitucion),
      telefono,
      correo,
      direccion_domicilio: direccion_domicilio,
      tipo_persona: "Natural",
      fecha_registro: new Date(),
    },
    where: {
      cedula_ruc,
    },
  });

  const trabajador = await prisma.trabajador.update({
    data: {
      codigo_inss,
      fecha_ingreso: new Date(),
      id_estado: 1,
      genero,

      id_estado_civil,
    },
    where: {
      id_persona: per.id,
    },
  });
  await prisma.$disconnect();
  return res.status(200).json(trabajador);
};

const desactivarTrabajador = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { id } = req.body;

  if (!id)
    return res
      .status(400)
      .json({ message: "El id es necesario para desactivar al trabajador" });

  await prisma.$connect();

  const trabajador = await prisma.trabajador.update({
    data: {
      id_estado: 2,
    },
    where: {
      id,
    },
  });
  await prisma.$disconnect();
  return res.status(200).json(trabajador);
};
