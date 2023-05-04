import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "./../../../../database";
import { ICliente } from "../../../../interfaces";

type Data =
  | {
      message: string;
    }
  | ICliente[]
  | ICliente;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerClientes(req, res);

    case "POST":
      return crearCliente(req, res);

    case "PUT":
      return actualizarCliente(req, res);

    case "PATCH":
      return desactivarCliente(req, res);

    default:
      return res.status(400).json({ message: "Método no soportado." });
  }
}

const obtenerClientes = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await prisma.$connect();
  const clientes = await prisma.cliente.findMany({
    select: {
      id: true,
      id_estado: true,
      cat_estado: true,
      id_persona: true,
      persona: true,
      genero:true,
      tipo_cliente: true,
    },
    orderBy: {
      id: "asc",
    },
  });
  await prisma.$disconnect();

  res.status(200).json(clientes);
};
const crearCliente = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    cedula_ruc,
    nombre,
    apellido_razon_social,
    fecha_nacimiento_constitucion,
    telefono,
    direccion_domicilio,
    correo,

    tipo_cliente,
    genero = "",
  } = req.body;

  await prisma.$connect();

  if (
    !cedula_ruc ||
    !nombre ||
    !correo ||
    !apellido_razon_social ||
    !tipo_cliente
  ) {
    return res.status(400).json({ message: "Los campos son obligatorios" });
  }

  const p = await prisma.persona.findUnique({
    where: {
      cedula_ruc,
    },
  });

  if (p)
    return res
      .status(400)
      .json({ message: "El número de cédula o número RUC ya está en uso." });

  const persona = await prisma.persona.create({
    data: {
      nombre: nombre,
      apellido_razon_social,
      cedula_ruc,
      fecha_nacimiento_constitucion: new Date(fecha_nacimiento_constitucion),
      telefono: telefono.toString(),
      direccion_domicilio,
      correo,
    },
  });

  const cliente = await prisma.cliente.create({
    data: {
      id_persona: persona.id,
      tipo_cliente,
      id_estado: 1,
      genero,

    },
  });
  await prisma.$disconnect();

  return res.status(201).json(cliente);
};

const actualizarCliente = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    id,
    persona: {
      cedula_ruc,
      nombre,
      apellido_razon_social,
      fecha_nacimiento_constitucion,
      telefono,
      direccion_domicilio,
      correo,
    },
    tipo_cliente,
    genero = "",
  } = req.body;
  await prisma.$connect();

  if (!id)
    return res
      .status(400)
      .json({ message: "El id es necesario para actualizar el cliente" });

  if (
    !cedula_ruc ||
    !nombre ||
    !correo ||
    !apellido_razon_social ||
    !tipo_cliente
    // !genero
    // !id_estado
  ) {
    return res.status(400).json({ message: "Los campos son obligatorios" });
  }

  const c = await prisma.cliente.findFirst({
    select: {
      id_persona: true,
    },
    where: {
      id: Number(id),
    },
  });

  const persona = await prisma.persona.update({
    data: {
      nombre: nombre,
      telefono: telefono.toString(),
      direccion_domicilio,
      correo,
    },
    where: {
      id: Number(c?.id_persona),
    },
  });

  const cliente = await prisma.cliente.update({
    data: {
      tipo_cliente,
      // id_estado: Number(id_estado),
    },
    where: {
      id: Number(id),
    },
  });
  await prisma.$disconnect();
  return res.status(200).json(cliente);
};

const desactivarCliente = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.body;

  if (!id)
    return res
      .status(400)
      .json({ message: "El id es necesario para desactivar el cliente" });

  await prisma.$connect();
  const cliente = await prisma.cliente.findFirst({
    where: {
      id,
    },
  });

  if (!cliente) {
    return res.status(404).json({ message: "Cliente no encontrado" });
  }
  await prisma.cliente.update({
    data: {
      id_estado: 2,
    },
    where: {
      id: cliente.id,
    },
  });
  await prisma.$disconnect();
  return res.status(200).json({ message: "Cliente desactivado correctamente" });
};
