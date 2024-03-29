import { formas_pago } from "./data/forma-pago";
import { categoria_estados, estados } from "./data/estados";

import {
  precio_productos,
  productos,
  productos_elaborados,
  unidad_medida,
  zona_preparacion,
} from "./data/productos";
import { roles } from "./data/roles";
import {
  modulos,
  rol_sub_modulos,
  roles_modulos,
  sub_modulos,
} from "./data/modulos";
import { permisos, rol_permiso } from "./data/permisos";
import {
  categoria_producto,
  sub_categoria_producto,
  tipo_categoria,
  tipo_producto,
} from "./data/categoria_productos";
import {
  cargos,
  clientes,
  estado_civil,
  grupos_usuarios,
  perfiles,
  personas,
  proveedor,
  trabajador,
  usuarios,
} from "./data/personas";
import { marca } from "./data/marca";
import { monedas, tipo_cambio } from "./data/monedas";
import { cajas } from "./data/caja";
import { tipo_orden_compra } from "./data/tipo-orden-compra";
import { prisma } from "../database";
import {
  ingredientes,
  inventario_productos,
  platillo_ingredientes,
  platillos,
  politicas,
} from "./data/inventario";
import { mesas } from "./data/mesas";

const main = async (): Promise<void> => {
  await prisma.$connect();
  try {
    await prisma.categoria_estado.createMany({
      data: categoria_estados,
    });
    await prisma.cat_estado.createMany({
      data: estados,
    });
    await prisma.tipo_orden_compra.createMany({
      data: tipo_orden_compra,
    }),
      await prisma.cat_estado_civil.createMany({
        data: estado_civil,
      });
    await prisma.persona.createMany({
      data: personas,
    });
    await prisma.proveedor.createMany({
      data: proveedor,
    });
    await prisma.cliente.createMany({
      data: clientes,
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
    await prisma.rol_sub_modulo.createMany({
      data: rol_sub_modulos,
    });
    await prisma.rol_permiso.createMany({
      data: rol_permiso,
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
    await prisma.tipo_categoria.createMany({
      data: tipo_categoria,
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
    await prisma.producto.createMany({
      data: ingredientes,
    });
    await prisma.precio_producto.createMany({
      data: precio_productos,
    });
    await prisma.zona_preparacion.createMany({
      data: zona_preparacion,
    });
    await prisma.producto_elaborado.createMany({
      data: productos_elaborados,
    });
    await prisma.producto_elaborado.createMany({
      data: platillos,
    });
    await prisma.detalle_producto_elaborado.createMany({
      data: platillo_ingredientes,
    });
    await prisma.inventario.createMany({
      data: inventario_productos,
    });
    await prisma.moneda.createMany({
      data: monedas,
    });
    await prisma.cat_forma_pago.createMany({
      data: formas_pago,
    });
    await prisma.politica_abc.createMany({
      data: politicas,
    });
    await prisma.mesa.createMany({
      data: mesas,
    });
    await prisma.tipo_cambio.createMany({
      data: tipo_cambio,
    });
  } catch (error) {
    console.log(error);
  }
  await prisma.$disconnect();
};

main();
