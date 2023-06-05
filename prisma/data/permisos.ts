export const permisos = [
  {
    nombre: "Agregar",
    descripcion: "Permite crear registros",
  },
  {
    nombre: "Editar",
    descripcion: "Permite Editar registros",
  },
  {
    nombre: "Desactivar",
    descripcion: "Permite Eliminar registros",
  },
  {
    nombre: "Anular",
    descripcion: "Permite Eliminar registros",
  },
  {
    nombre: "Rechazar",
    descripcion: "Permite Eliminar registros",
  },
  {
    nombre: "Abrir",
    descripcion: "Permite abrir caja",
  },

  {
    nombre: "Arquear",
    descripcion: "Permite arquear caja",
  },
  {
    nombre: "Cerrar",
    descripcion: "Permite cerrar caja",
  },
];

export const rol_permiso = [
  // ! Modulo de Compra
  {
    id_rol: 1,
    id_permiso: 1,
    id_sub_modulo: 1,
    nombre: "Agregar Proveedor",
  },
  {
    id_rol: 1,
    id_permiso: 2,
    id_sub_modulo: 1,
    nombre: "Editar Proveedor",
  },
  {
    id_rol: 1,
    id_permiso: 3,
    id_sub_modulo: 1,
    nombre: "Desactivar Proveedor",
  },
  {
    id_rol: 1,
    id_permiso: 1,
    id_sub_modulo: 2,
    nombre: "Crear Solicitud",
  },
  {
    id_rol: 1,
    id_permiso: 2,
    id_sub_modulo: 2,
    nombre: "Editar Solicitud",
  },
  {
    id_rol: 1,
    id_permiso: 5,
    id_sub_modulo: 2,
    nombre: "Rechazar Solicitud",
  },
  {
    id_rol: 1,
    id_permiso: 1,
    id_sub_modulo: 3,
    nombre: "Crear Orden de Compra",
  },
  {
    id_rol: 1,
    id_permiso: 2,
    id_sub_modulo: 3,
    nombre: "Editar Orden de Compra",
  },
  {
    id_rol: 1,
    id_permiso: 4,
    id_sub_modulo: 3,
    nombre: "Anular Orden de Compra",
  },
  {
    id_rol: 1,
    id_permiso: 1,
    id_sub_modulo: 5,
    nombre: "Agregar Compra",
  },
  {
    id_rol: 1,
    id_permiso: 2,
    id_sub_modulo: 5,
    nombre: "Editar Compra",
  },
  {
    id_rol: 1,
    id_permiso: 4,
    id_sub_modulo: 5,
    nombre: "Anular Compra",
  },
  // ! Modulo de Venta
  {
    id_rol: 1,
    id_permiso: 1,
    id_sub_modulo: 7,
    nombre: "Agregar Cliente",
  },
  {
    id_rol: 1,
    id_permiso: 2,
    id_sub_modulo: 7,

    nombre: "Editar Cliente",
  },
  {
    id_rol: 1,
    id_permiso: 3,
    id_sub_modulo: 7,
    nombre: "Desactivar Cliente",
  },

  {
    id_rol: 1,
    id_permiso: 1,
    id_sub_modulo: 8,
    nombre: "Agregar Reservacion",
  },
  {
    id_rol: 1,
    id_permiso: 2,
    id_sub_modulo: 8,
    nombre: "Editar Reservacion",
  },
  {
    id_rol: 1,
    id_permiso: 4,
    id_sub_modulo: 8,
    nombre: "Anular Reservacion",
  },
  {
    id_rol: 1,
    id_permiso: 1,
    id_sub_modulo: 9,
    nombre: "Agregar Venta",
  },
  {
    id_rol: 1,
    id_permiso: 2,
    id_sub_modulo: 9,
    nombre: "Editar Venta",
  },

  {
    id_rol: 1,
    id_permiso: 4,
    id_sub_modulo: 9,
    nombre: "Anular Venta",
  },
  // ! Modulo de Inventario
  {
    id_rol: 1,
    id_permiso: 1,
    id_sub_modulo: 11,
    nombre: "Agregar Categoria",
  },
  {
    id_rol: 1,
    id_permiso: 2,
    id_sub_modulo: 11,
    nombre: "Editar Categoria",
  },
  {
    id_rol: 1,
    id_permiso: 3,
    id_sub_modulo: 11,
    nombre: "Desactivar Categoria",
  },
  {
    id_rol: 1,
    id_permiso: 1,
    id_sub_modulo: 12,
    nombre: "Agregar Subcategoria",
  },
  {
    id_rol: 1,
    id_permiso: 2,
    id_sub_modulo: 12,
    nombre: "Editar Subcategoria",
  },
  {
    id_rol: 1,
    id_permiso: 3,
    id_sub_modulo: 12,
    nombre: "Desactivar Subcategoria",
  },
  {
    id_rol: 1,
    id_permiso: 1,
    id_sub_modulo: 13,
    nombre: "Agregar Unidad de medida",
  },
  {
    id_rol: 1,
    id_permiso: 2,
    id_sub_modulo: 13,
    nombre: "Editar Unidad de medida",
  },
  {
    id_rol: 1,
    id_permiso: 3,
    id_sub_modulo: 13,
    nombre: "Desactivar Unidad de medida",
  },
  {
    id_rol: 1,
    id_permiso: 1,
    id_sub_modulo: 14,
    nombre: "Agregar Marca",
  },
  {
    id_rol: 1,
    id_permiso: 2,
    id_sub_modulo: 14,
    nombre: "Editar Marca",
  },
  {
    id_rol: 1,
    id_permiso: 3,
    id_sub_modulo: 14,
    nombre: "Desactivar Marca",
  },
  {
    id_rol: 1,
    id_permiso: 1,
    id_sub_modulo: 15,
    nombre: "Agregar Ingredientes",
  },
  {
    id_rol: 1,
    id_permiso: 2,
    id_sub_modulo: 15,
    nombre: "Editar Ingredientes",
  },
  {
    id_rol: 1,
    id_permiso: 3,
    id_sub_modulo: 15,
    nombre: "Desactivar Ingredientes",
  },
  // {
  //   id_rol: 1,
  //   id_permiso: 1,
  //   nombre: "Agregar Platillo",
  // },
  // {
  //   id_rol: 1,
  //   id_permiso: 2,
  //   nombre: "Editar Platillo",
  // },
  // {
  //   id_rol: 1,
  //   id_permiso: 3,
  //   nombre: "Desactivar Platillo",
  // },
  // {
  //   id_rol: 1,
  //   id_permiso: 1,
  //   nombre: "Agregar Productos",
  // },
  // {
  //   id_rol: 1,
  //   id_permiso: 2,
  //   nombre: "Editar Productos",
  // },
  // {
  //   id_rol: 1,
  //   id_permiso: 3,
  //   nombre: "Desactivar Productos",
  // },
  {
    id_rol: 1,
    id_permiso: 1,
    id_sub_modulo: 17,
    nombre: "Agregar Inventario",
  },
  {
    id_rol: 1,
    id_permiso: 2,
    id_sub_modulo: 17,
    nombre: "Editar Inventario",
  },
  {
    id_rol: 1,
    id_permiso: 3,
    id_sub_modulo: 17,
    nombre: "Desactivar Inventario",
  },
  // ! Modulo de Pedidos
  {
    id_rol: 1,
    id_permiso: 1,
    id_sub_modulo: 18,
    nombre: "Agregar Pedido",
  },
  {
    id_rol: 1,
    id_permiso: 2,
    id_sub_modulo: 18,
    nombre: "Editar Pedido",
  },
  {
    id_rol: 1,
    id_permiso: 4,
    id_sub_modulo: 18,
    nombre: "Anular Pedido",
  },
  // ! Modulo de Caja
  {
    id_rol: 1,
    id_permiso: 6,
    id_sub_modulo: 22,
    nombre: "Abrir Caja",
  },
  {
    id_rol: 1,
    id_permiso: 7,
    id_sub_modulo: 23,
    nombre: "Arquear Caja",
  },
  {
    id_rol: 1,
    id_permiso: 8,
    id_sub_modulo: 24,
    nombre: "Cerrar Caja",
  },
  // {
  //   id_rol: 1,
  //   id_permiso: 6,
  //   id_sub_modulo: 22,
  //   nombre: "Abrir Deposito",
  // },
  {
    id_rol: 1,
    id_permiso: 8,
    id_sub_modulo: 25,
    nombre: "Cerrar Deposito",
  },
  // ! Modulo de Gestión de Negocio
  {
    id_rol: 1,
    id_permiso: 1,
    id_sub_modulo: 28,
    nombre: "Agregar Rol",
  },
  {
    id_rol: 1,
    id_permiso: 2,
    id_sub_modulo: 28,
    nombre: "Editar Rol",
  },
  {
    id_rol: 1,
    id_permiso: 3,
    id_sub_modulo: 28,
    nombre: "Desactivar Rol",
  },
  {
    id_rol: 1,
    id_permiso: 1,
    id_sub_modulo: 27,
    nombre: "Agregar trabajador",
  },
  {
    id_rol: 1,
    id_permiso: 2,
    id_sub_modulo: 27,
    nombre: "Editar trabajador",
  },
  {
    id_rol: 1,
    id_permiso: 3,
    id_sub_modulo: 27,
    nombre: "Desactivar trabajador",
  },
];
