export const modulos = [
  {
    id_estado: 1,
    nombre: "Compra",
    descripcion: "Módulo de compra del sistema",
    icono: "CreditCardIcon",
  },
  {
    id_estado: 1,
    nombre: "Venta",
    descripcion: "Módulo de venta del sistema",
    icono: "CurrencyDollarIcon",
  },
  {
    id_estado: 1,
    nombre: "Inventario",
    descripcion: "Módulo de Inventario del sistema",
    icono: "UsersIcon",
  },
  {
    id_estado: 1,
    nombre: "Pedidos",
    descripcion: "Módulo de Pedidos del sistema",
    icono: "FolderIcon",
  },
  {
    id_estado: 1,
    nombre: "Caja",
    descripcion: "Módulo de Caja del sistema",
    icono: "BanknotesIcon",
  },
  {
    id_estado: 1,
    nombre: "Usuarios",
    descripcion: "Módulo de Usuarios del sistema",
    icono: "UsersIcon",
  },
];

export const sub_modulos = [
  // Modulo de Compra
  {
    id_modulo: 1,
    nombre: "Proveedor",
    url: "/admin/compra/proveedor",
  },
  {
    id_modulo: 1,
    nombre: "Nueva Solicitud de Compra",
    url: "/admin/compra/solicitud-compra",
  },
  {
    id_modulo: 1,
    nombre: "Solicitudes de Compra",
    url: "/admin/compra/solicitud-compra/realizadas",
  },

  {
    id_modulo: 1,
    nombre: "Nueva Orden de Compra",
    url: "/admin/compra/nueva-orden",
  },
  {
    id_modulo: 1,
    nombre: "Ordenes Compra",
    url: "/admin/compra/ordenes",
  },
  {
    id_modulo: 1,
    nombre: "Recepción de Orden de Compra",
    url: "/admin/compra/recepcion-orden-compra",
  },
  {
    id_modulo: 1,
    nombre: "Nueva Compra",
    url: "/admin/compra/nueva-compra",
  },
  {
    id_modulo: 1,
    nombre: "Compras Realizadas",
    url: "/admin/compra/compras-realizadas",
  },
  // Modulo de Venta
  {
    id_modulo: 2,
    nombre: "Clientes",
    url: "/admin/venta/clientes",
  },
  {
    id_modulo: 2,
    nombre: "Reservaciones",
    url: "/admin/venta/reservaciones",
  },
  {
    id_modulo: 2,
    nombre: "Nueva Venta",
    url: "/admin/venta/nueva-venta",
  },
  {
    id_modulo: 2,
    nombre: "Ventas Realizadas",
    url: "/admin/venta",
  },
  // Módulo de Inventario
  {
    id_modulo: 3,
    nombre: "Categorías",
    url: "/admin/inventario/categoria",
  },
  {
    id_modulo: 3,
    nombre: "Subcategorías",
    url: "/admin/inventario/sub-categoria",
  },
  {
    id_modulo: 3,
    nombre: "Unidad de Medida",
    url: "/admin/inventario/unidad-medida",
  },
  {
    id_modulo: 3,
    nombre: "Marca",
    url: "/admin/inventario/marca",
  },
  {
    id_modulo: 3,
    nombre: "Producto",
    url: "/admin/inventario/productos",
  },
  {
    id_modulo: 3,
    nombre: "Precio Producto",
    url: "/admin/inventario/precio-producto/",
  },
  {
    id_modulo: 3,
    nombre: "Inventario",
    url: "/admin/inventario/",
  },
  // Módulo de Pedidos
  {
    id_modulo: 4,
    nombre: "Nuevo Pedido",
    url: "/admin/pedidos/nuevo-pedido",
  },
  {
    id_modulo: 4,
    nombre: "Pedidos",
    url: "/admin/pedidos",
  },
  {
    id_modulo: 4,
    nombre: "Pedidos Realizados",
    url: "/admin/pedidos/pedidos-realizados",
  },
  {
    id_modulo: 4,
    nombre: "Pedidos Anulados",
    url: "/admin/pedidos/pedidos-anulados",
  },
  // Módulo de Caja
  {
    id_modulo: 5,
    nombre: "Apertura",
    url: "/admin/caja/apertura",
  },
  {
    id_modulo: 5,
    nombre: "Arqueo",
    url: "/admin/caja/arqueo",
  },
  {
    id_modulo: 5,
    nombre: "Cierre",
    url: "/admin/caja/cierre",
  },
  {
    id_modulo: 5,
    nombre: "Déposito del día",
    url: "/admin/caja/deposito-del-día",
  },
  {
    id_modulo: 5,
    nombre: "Tesorería",
    url: "/admin/caja/tesoreria",
  },
  // Módulo de Usuarios
  {
    id_modulo: 6,
    nombre: "Trabajadores",
    url: "/admin/user/trabajadores",
  },
  {
    id_modulo: 6,
    nombre: "Grupo",
    url: "/admin/user/grupos",
  },
  {
    id_modulo: 5,
    nombre: "Cajas",
    url: "/admin/caja",
  },
];

export const roles_modulos = [
  {
    id_rol: 1,
    id_modulo: 1,
    nombre: "Modulo de Compra",
  },
  {
    id_rol: 1,
    id_modulo: 2,
    nombre: "Modulo de Venta",
  },
  {
    id_rol: 1,
    id_modulo: 3,
    nombre: "Modulo de Inventario",
  },
  {
    id_rol: 1,
    id_modulo: 4,
    nombre: "Modulo de Pedidos",
  },
  {
    id_rol: 1,
    id_modulo: 5,
    nombre: "Modulo de Caja",
  },
  {
    id_rol: 1,
    id_modulo: 6,
    nombre: "Modulo de Usuarios",
  },
  {
    id_rol: 2,
    id_modulo: 1,
    nombre: "Modulo de Compra",
  },
  {
    id_rol: 2,
    id_modulo: 2,
    nombre: "Modulo de Venta",
  },
  {
    id_rol: 2,
    id_modulo: 3,
    nombre: "Modulo de Inventario",
  },
  {
    id_rol: 2,
    id_modulo: 5,
    nombre: "Modulo de Caja",
  },
  {
    id_rol: 3,
    id_modulo: 2,
    nombre: "Modulo de Venta",
  },
  {
    id_rol: 3,
    id_modulo: 4,
    nombre: "Modulo de Pedidos",
  },
  {
    id_rol: 4,
    id_modulo: 4,
    nombre: "Modulo de Pedidos",
  },
  {
    id_rol: 5,
    id_modulo: 4,
    nombre: "Modulo de Pedidos",
  },
  {
    id_rol: 5,
    id_modulo: 2,
    nombre: "Modulo de Venta",
  },
  {
    id_rol: 5,
    id_modulo: 5,
    nombre: "Modulo de Caja",
  },
  {
    id_rol: 7,
    id_modulo: 1,
    nombre: "Modulo de Compra",
  },
  {
    id_rol: 7,
    id_modulo: 3,
    nombre: "Modulo de Inventario",
  },
  {
    id_rol: 8,
    id_modulo: 1,
    nombre: "Modulo de Compra",
  },
  {
    id_rol: 9,
    id_modulo: 2,
    nombre: "Modulo de Venta",
  },
];

export const rol_sub_modulos = [
  // ? Rol de Administrador
  // ! Modulo de compra
  {
    id_rol: 1,
    id_modulo: 1,
    id_sub_modulo: 1,
    nombre: "Submodulo de Proveedores",
  },
  {
    id_rol: 1,
    id_modulo: 1,
    id_sub_modulo: 2,
    nombre: "Nueva solicitud de compra",
  },
  {
    id_rol: 1,
    id_modulo: 1,
    id_sub_modulo: 3,
    nombre: "Submodulo de solicitudes de compra",
  },
  {
    id_rol: 1,
    id_sub_modulo: 4,
    id_modulo: 1,
    nombre: "Nueva orden de compra",
  },
  {
    id_rol: 1,
    id_sub_modulo: 5,
    id_modulo: 1,
    nombre: "Ordenes de Compra",
  },
  {
    id_rol: 1,
    id_sub_modulo: 6,
    id_modulo: 1,
    nombre: "Recepcion de solicitud de compra",
  },
  {
    id_rol: 1,
    id_sub_modulo: 7,
    id_modulo: 1,
    nombre: "Nueva compra",
  },
  {
    id_rol: 1,
    id_sub_modulo: 8,
    id_modulo: 1,
    nombre: "Compras realizadas",
  },
  // ! Modulo de venta
  {
    id_rol: 1,
    id_sub_modulo: 9,
    id_modulo: 2,
    nombre: "Clientes",
  },
  {
    id_rol: 1,
    id_sub_modulo: 10,
    id_modulo: 2,
    nombre: "Reservaciones",
  },
  {
    id_rol: 1,
    id_sub_modulo: 11,
    id_modulo: 2,
    nombre: "Nueva Venta",
  },
  {
    id_rol: 1,
    id_modulo: 2,
    id_sub_modulo: 12,
    nombre: "Ventas Realizadas",
  },
  // ! Modulo de inventario
  {
    id_rol: 1,
    id_modulo: 3,
    id_sub_modulo: 13,
    nombre: "Submodulo de categorias de productos",
  },
  {
    id_rol: 1,
    id_modulo: 3,
    id_sub_modulo: 14,
    nombre: "Submodulo de subcategorias de productos",
  },
  {
    id_rol: 1,
    id_modulo: 3,
    id_sub_modulo: 15,
    nombre: "Submodulo de unidades de medida",
  },
  {
    id_rol: 1,
    id_modulo: 3,
    id_sub_modulo: 16,
    nombre: "Submodulo de marcas",
  },
  {
    id_rol: 1,
    id_modulo: 3,
    id_sub_modulo: 17,
    nombre: "Submodulo de productos",
  },
  {
    id_rol: 1,
    id_modulo: 3,
    id_sub_modulo: 18,
    nombre: "Submodulo de precio de productos",
  },
  {
    id_rol: 1,
    id_modulo: 3,
    id_sub_modulo: 19,
    nombre: "Submodulo de Inventario",
  },
  // ! Modulo de pedidos
  {
    id_rol: 1,
    id_modulo: 4,
    id_sub_modulo: 20,
    nombre: "Nuevo pedido",
  },
  {
    id_rol: 1,
    id_modulo: 4,
    id_sub_modulo: 21,
    nombre: "Submodulo de pedidos",
  },
  {
    id_rol: 1,
    id_modulo: 4,
    id_sub_modulo: 22,
    nombre: "Submodulo de pedidos realizados",
  },
  {
    id_rol: 1,
    id_modulo: 4,
    id_sub_modulo: 23,
    nombre: "Submodulo de pedidos anulados",
  },
  // ! Modulo de caja
  {
    id_rol: 1,
    id_modulo: 5,
    id_sub_modulo: 31,
    nombre: "Caja",
  },
  {
    id_rol: 1,
    id_modulo: 5,
    id_sub_modulo: 24,
    nombre: "Apertura de Caja",
  },
  {
    id_rol: 1,
    id_modulo: 5,
    id_sub_modulo: 25,
    nombre: "Arqueo de caja",
  },
  {
    id_rol: 1,
    id_modulo: 5,
    id_sub_modulo: 26,
    nombre: "Cierre de caja",
  },
  {
    id_rol: 1,
    id_modulo: 5,
    id_sub_modulo: 27,
    nombre: "Deposito del dia",
  },
  {
    id_rol: 1,
    id_modulo: 5,
    id_sub_modulo: 28,
    nombre: "Tesoreria",
  },
  // ! Modulo de Usuarios
  {
    id_rol: 1,
    id_modulo: 6,
    id_sub_modulo: 29,
    nombre: "Trabajadores",
  },
  {
    id_rol: 1,
    id_modulo: 6,
    id_sub_modulo: 30,
    nombre: "Grupos",
  },
  // ? Rol de Gerente
  // ! Modulo de compra
  {
    id_rol: 2,
    id_modulo: 1,
    id_sub_modulo: 1,
    nombre: "Submodulo de Proveedores",
  },
  {
    id_rol: 2,
    id_modulo: 1,
    id_sub_modulo: 2,
    nombre: "Nueva solicitud de compra",
  },
  {
    id_rol: 2,
    id_modulo: 1,
    id_sub_modulo: 3,
    nombre: "Submodulo de solicitudes de compra",
  },
  {
    id_rol: 2,
    id_modulo: 1,
    id_sub_modulo: 4,
    nombre: "Nueva orden de compra",
  },
  {
    id_rol: 2,
    id_modulo: 1,
    id_sub_modulo: 5,
    nombre: "Ordenes de Compra",
  },
  {
    id_rol: 2,
    id_modulo: 1,
    id_sub_modulo: 6,
    nombre: "Recepcion de solicitud de compra",
  },
  {
    id_rol: 2,
    id_modulo: 1,
    id_sub_modulo: 7,
    nombre: "Nueva compra",
  },
  {
    id_rol: 2,
    id_modulo: 1,
    id_sub_modulo: 8,
    nombre: "Compras realizadas",
  },
  // ! Modulo de venta
  {
    id_rol: 2,
    id_modulo: 2,
    id_sub_modulo: 9,
    nombre: "Clientes",
  },
  {
    id_rol: 2,
    id_modulo: 2,
    id_sub_modulo: 10,
    nombre: "Reservaciones",
  },
  {
    id_rol: 2,
    id_modulo: 2,
    id_sub_modulo: 11,
    nombre: "Nueva Venta",
  },
  {
    id_rol: 2,
    id_modulo: 2,
    id_sub_modulo: 12,
    nombre: "Ventas Realizadas",
  },
  // ! Modulo de inventario
  {
    id_rol: 2,
    id_modulo: 3,
    id_sub_modulo: 13,
    nombre: "Submodulo de categorias de productos",
  },
  {
    id_rol: 2,
    id_modulo: 3,
    id_sub_modulo: 14,
    nombre: "Submodulo de subcategorias de productos",
  },
  {
    id_rol: 2,
    id_modulo: 3,
    id_sub_modulo: 15,
    nombre: "Submodulo de unidades de medida",
  },
  {
    id_rol: 2,
    id_modulo: 3,
    id_sub_modulo: 16,
    nombre: "Submodulo de marcas",
  },
  {
    id_rol: 2,
    id_modulo: 3,
    id_sub_modulo: 17,
    nombre: "Submodulo de productos",
  },
  {
    id_rol: 2,
    id_modulo: 3,
    id_sub_modulo: 18,
    nombre: "Submodulo de precio de productos",
  },
  {
    id_rol: 2,
    id_modulo: 3,
    id_sub_modulo: 19,
    nombre: "Submodulo de Inventario",
  },
  // ! Modulo de pedidos
  {
    id_rol: 2,
    id_modulo: 4,
    id_sub_modulo: 20,
    nombre: "Nuevo pedido",
  },
  {
    id_rol: 2,
    id_modulo: 4,
    id_sub_modulo: 21,
    nombre: "Submodulo de pedidos",
  },
  {
    id_rol: 2,
    id_modulo: 4,
    id_sub_modulo: 22,
    nombre: "Submodulo de pedidos realizados",
  },
  {
    id_rol: 2,
    id_modulo: 4,
    id_sub_modulo: 23,
    nombre: "Submodulo de pedidos anulados",
  },
  // ! Modulo de caja
  {
    id_rol: 2,
    id_modulo: 5,
    id_sub_modulo: 31,
    nombre: "Caja",
  },
  {
    id_rol: 2,
    id_modulo: 5,
    id_sub_modulo: 24,
    nombre: "Apertura de Caja",
  },
  {
    id_rol: 2,
    id_modulo: 5,
    id_sub_modulo: 25,
    nombre: "Arqueo de caja",
  },
  {
    id_rol: 2,
    id_modulo: 5,
    id_sub_modulo: 26,
    nombre: "Cierre de caja",
  },
  {
    id_rol: 2,
    id_modulo: 5,
    id_sub_modulo: 27,
    nombre: "Deposito del dia",
  },
  {
    id_rol: 2,
    id_modulo: 5,
    id_sub_modulo: 28,
    nombre: "Tesoreria",
  },
  // ! Modulo de Usuarios
  {
    id_rol: 2,
    id_modulo: 5,
    id_sub_modulo: 29,
    nombre: "Trabajadores",
  },
  {
    id_rol: 2,
    id_modulo: 5,
    id_sub_modulo: 30,
    nombre: "Grupos",
  },
  // ? Rol de Mesero
  // ! Modulo de pedidos
  {
    id_rol: 3,
    id_modulo: 4,
    id_sub_modulo: 20,
    nombre: "Nuevo pedido",
  },
  {
    id_rol: 3,
    id_modulo: 4,
    id_sub_modulo: 21,
    nombre: "Submodulo de pedidos",
  },
  // ! Modulo de venta
  {
    id_modulo: 2,
    id_rol: 3,
    id_sub_modulo: 9,
    nombre: "Clientes",
  },
  // ? Rol de Cocinero
  // ! Modulo de pedidos
  {
    id_rol: 4,
    id_modulo: 4,
    id_sub_modulo: 21,
    nombre: "Submodulo de pedidos",
  },
  // ? Rol de Cajero
  // ! Modulo de caja
  {
    id_rol: 5,
    id_modulo: 5,
    id_sub_modulo: 31,
    nombre: "Caja",
  },
  {
    id_rol: 5,
    id_modulo: 5,
    id_sub_modulo: 24,
    nombre: "Apertura de Caja",
  },
  {
    id_rol: 5,
    id_modulo: 5,
    id_sub_modulo: 25,
    nombre: "Arqueo de caja",
  },
  {
    id_rol: 5,
    id_modulo: 5,
    id_sub_modulo: 26,
    nombre: "Cierre de caja",
  },
  {
    id_rol: 5,
    id_modulo: 5,
    id_sub_modulo: 27,
    nombre: "Deposito del dia",
  },
  {
    id_rol: 5,
    id_modulo: 5,
    id_sub_modulo: 28,
    nombre: "Tesoreria",
  },
  // ! Modulo de pedidos
  {
    id_rol: 5,
    id_modulo: 4,
    id_sub_modulo: 21,
    nombre: "Submodulo de pedidos",
  },
  // ! Modulo de venta
  {
    id_rol: 5,
    id_modulo: 2,
    id_sub_modulo: 11,
    nombre: "Nueva Venta",
  },
  // ? Rol de Bodeguero
  // ! Modulo de Compra
  {
    id_modulo: 1,
    id_rol: 7,
    id_sub_modulo: 2,
    nombre: "Nueva solicitud de compra",
  },
  {
    id_rol: 7,
    id_modulo: 1,
    id_sub_modulo: 3,
    nombre: "Submodulo de solicitudes de compra",
  },
  {
    id_rol: 7,
    id_modulo: 1,
    id_sub_modulo: 6,
    nombre: "Recepcion de solicitud de compra",
  },
  // ! Modulo de inventario
  {
    id_rol: 7,
    id_modulo: 3,
    id_sub_modulo: 19,
    nombre: "Submodulo de Inventario",
  },
  // ? Rol de Comprador
  // ! Modulo de Compra
  {
    id_modulo: 1,
    id_rol: 8,
    id_sub_modulo: 1,
    nombre: "Submodulo de Proveedores",
  },
  {
    id_rol: 8,
    id_modulo: 1,
    id_sub_modulo: 2,
    nombre: "Nueva solicitud de compra",
  },
  {
    id_rol: 8,
    id_modulo: 1,
    id_sub_modulo: 3,
    nombre: "Submodulo de solicitudes de compra",
  },
  {
    id_rol: 8,
    id_modulo: 1,
    id_sub_modulo: 5,
    nombre: "Ordenes de Compra",
  },
  {
    id_rol: 8,
    id_modulo: 1,
    id_sub_modulo: 6,
    nombre: "Recepcion de solicitud de compra",
  },
  {
    id_rol: 8,
    id_modulo: 1,
    id_sub_modulo: 7,
    nombre: "Nueva compra",
  },
  {
    id_rol: 8,
    id_modulo: 1,
    id_sub_modulo: 8,
    nombre: "Compras realizadas",
  },
  // ? Rol de Anfitrion
  // ! Modulo de venta
  {
    id_rol: 9,
    id_modulo: 2,
    id_sub_modulo: 9,
    nombre: "Clientes",
  },
  {
    id_rol: 9,
    id_modulo: 2,
    id_sub_modulo: 10,
    nombre: "Reservaciones",
  },
];
