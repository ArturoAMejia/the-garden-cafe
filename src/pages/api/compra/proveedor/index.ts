import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "./../../../../database";
import { IProveedor } from "../../../../interfaces";

type Data =
  | {
      message: string;
    }
  | IProveedor
  | IProveedor[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return obtenerProveedores(req, res);

    case "POST":
      return crearProveedor(req, res);

    case "PUT":
      return actualizarProveedor(req, res);

    case "PATCH":
      return desactivarProveedor(req, res);

    default:
      return res.status(400).json({ message: "Método no soportado." });
  }
}

const obtenerProveedores = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await prisma.$connect();
  const proveedores = await prisma.proveedor.findMany({
    select: {
      id: true,
      id_persona: true,
      persona: true,
      id_estado: true,
      cat_estado: true,
      sector_comercial: true,
      nacionalidad: true,
    },
    orderBy: {
      id: "asc",
    },
  });
  await prisma.$disconnect();
  res.status(200).json(proveedores);
};
const crearProveedor = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    cedula_ruc,
    nombre,
    correo,
    apellido_razon_social,
    fecha_nacimiento_constitucion = "",
    telefono = "",
    celular = "",
    direccion_domicilio = "",
    tipo_persona,
    sector_comercial,
    nacionalidad,
  } = req.body;

  if (
    !cedula_ruc ||
    !nombre ||
    !correo ||
    !apellido_razon_social ||
    !tipo_persona ||
    !nacionalidad ||
    !sector_comercial
  ) {
    return res.status(400).json({ message: "Los campos son obligatorios" });
  }

  await prisma.$connect();
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
      nombre,
      cedula_ruc,
      apellido_razon_social,
      fecha_nacimiento_constitucion: new Date(fecha_nacimiento_constitucion),
      tipo_persona,
      telefono,
      direccion_domicilio,
      correo,
    },
  });

  const proveedor = await prisma.proveedor.create({
    data: {
      id_persona: persona.id,
      id_estado: 1,
      sector_comercial,
      nacionalidad,
    },
  });
  await prisma.contacto_proveedor.create({
    data: {
      id_proveedor: proveedor.id,
      telefono,
      celular,
      direccion: direccion_domicilio,
    },
  });
  await prisma.$disconnect();

  return res.status(201).json(proveedor);
};
const actualizarProveedor = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    id,
    cedula_ruc,
    nombre,
    correo,
    apellido_razon_social,
    fecha_nacimiento_constitucion = "",
    telefono = "",
    celular = "",
    direccion_domicilio = "",
    tipo_persona,
    genero = "",
    sector_comercial,
    nacionalidad,
  } = req.body;

  await prisma.$connect();

  if (!id)
    return res
      .status(400)
      .json({ message: "El id es necesario para actualizar el proveedor." });

  if (
    !cedula_ruc ||
    !nombre ||
    !correo ||
    !apellido_razon_social ||
    !tipo_persona ||
    !nacionalidad ||
    !sector_comercial
  ) {
    return res.status(400).json({ message: "Los campos son obligatorios" });
  }

  await prisma.$connect();

  const p = await prisma.proveedor.findFirst({
    select: {
      id_persona: true,
    },
    where: {
      id,
    },
  });

  await prisma.persona.update({
    data: {
      nombre: nombre,
      telefono,
      direccion_domicilio,
      correo,
      fecha_nacimiento_constitucion: new Date(fecha_nacimiento_constitucion),
    },
    where: {
      id: p!.id_persona,
    },
  });

  const proveedor = await prisma.proveedor.update({
    data: {
      id_estado: 1,
      sector_comercial,
      nacionalidad,
    },
    where: {
      id, // ! El id que se manda es el ID del Proveedor
    },
  });

  const cp = await prisma.contacto_proveedor.findFirst({
    where: {
      id_proveedor: id,
    },
  });
  await prisma.contacto_proveedor.update({
    data: {
      telefono,
      celular,
      direccion: direccion_domicilio,
    },
    where: {
      id: cp?.id,
    },
  });
  await prisma.$disconnect();

  return res.status(200).json(proveedor);
};

const desactivarProveedor = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.body;

  if (!id)
    return res
      .status(400)
      .json({ message: "Se necesita el id para desactivar el proveedor." });
  await prisma.$connect();
  const p = await prisma.proveedor.findFirst({
    where: {
      id,
    },
  });
  if (!p) {
    res.status(404).json({ message: "Proveedor no encontrado" });
    return;
  }
  const proveedor = await prisma.proveedor.update({
    where: {
      id,
    },
    data: {
      id_estado: 2,
    },
  });
  await prisma.$disconnect();
  res.status(200).json(proveedor);
};
