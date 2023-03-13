import { formas_pago } from "./data/forma-pago";
import { categoria_estados, estados } from "./data/estados";
import { prisma } from "../src/database";

import { precio_productos, productos, unidad_medida } from "./data/productos";
import { roles } from "./data/roles";
import { modulos, roles_modulos, sub_modulos } from "./data/modulos";
import { permisos } from "./data/permisos";
import {
  categoria_producto,
  sub_categoria_producto,
  tipo_producto,
} from "./data/categoria_productos";
import {
  cargos,
  estado_civil,
  grupos_usuarios,
  perfiles,
  personas,
  proveedor,
  trabajador,
  usuarios,
} from "./data/personas";
import { marca } from "./data/marca";
import { monedas } from "./data/monedas";
import { cajas } from "./data/caja";

const main = async (): Promise<void> => {
  await prisma.$connect();
  try {
    await prisma.categoria_estado.createMany({
      data: categoria_estados,
    });
    await prisma.cat_estado.createMany({
      data: estados,
    });
    await prisma.cat_estado_civil.createMany({
      data: estado_civil,
    });
    await prisma.persona.createMany({
      data: personas,
    });
    await prisma.proveedor.createMany({
      data: proveedor,
    });
    await prisma.cat_cargo.createMany({
      data: cargos,
    });
    await prisma.grupo_usuario.createMany({
      data: grupos_usuarios,
    });
    await prisma.perfil.createMany({
      data: perfiles,
    });
    await prisma.trabajador.createMany({
      data: trabajador,
    });
    await prisma.caja.createMany({
      data: cajas,
    });
    await prisma.permiso.createMany({
      data: permisos,
    });
    await prisma.modulo.createMany({
      data: modulos,
    });
    await prisma.sub_modulo.createMany({
      data: sub_modulos,
    });
    await prisma.rol.createMany({
      data: roles,
    });
    await prisma.rol_modulo.createMany({
      data: roles_modulos,
    });
    await prisma.usuario.createMany({
      data: usuarios,
    });
    await prisma.unidad_medida.createMany({
      data: unidad_medida,
    });
    await prisma.tipo_producto.createMany({
      data: tipo_producto,
    });
    await prisma.categoria_producto.createMany({
      data: categoria_producto,
    });
    await prisma.sub_categoria_producto.createMany({
      data: sub_categoria_producto,
    });
    await prisma.marca.createMany({
      data: marca,
    });
    await prisma.producto.createMany({
      data: productos,
    });
    await prisma.precio_producto.createMany({
      data: precio_productos,
    });
    await prisma.moneda.createMany({
      data: monedas,
    });
    await prisma.cat_forma_pago.createMany({
      data: formas_pago,
    });
  } catch (error) {
    console.log(error);
  }
  await prisma.$disconnect();
};

main();
