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
    nombre: "Reservaciones",
    descripcion: "Módulo de Reservaciones del sistema",
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
    nombre: "Ingredientes",
    url: "/admin/inventario/ingredientes",
  },
  {
    id_modulo: 3,
    nombre: "Platillos",
    url: "/admin/inventario/platillos",
  },
  {
    id_modulo: 3,
    nombre: "Producto",
    url: "/admin/inventario/productos",
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
    id_modulo: 6,
    nombre: "Apertura",
    url: "/admin/caja/apertura",
  },
  {
    id_modulo: 6,
    nombre: "Arqueo",
    url: "/admin/caja/arqueo",
  },
  {
    id_modulo: 6,
    nombre: "Cierre",
    url: "/admin/caja/cierre",
  },
  {
    id_modulo: 6,
    nombre: "Déposito del día",
    url: "/admin/caja/deposito-del-día",
  },
  {
    id_modulo: 6,
    nombre: "Tesorería",
    url: "/admin/caja/tesoreria",
  },
  // Módulo de Usuarios
  {
    id_modulo: 7,
    nombre: "Trabajadores",
    url: "/admin/user/trabajadores",
  },
  {
    id_modulo: 7,
    nombre: "Grupo",
    url: "/admin/user/grupos",
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
    nombre: "Modulo de Reservaciones",
  },
  {
    id_rol: 1,
    id_modulo: 6,
    nombre: "Modulo de Caja",
  },
  {
    id_rol: 1,
    id_modulo: 7,
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
    id_modulo: 6,
    nombre: "Modulo de Caja",
  },
  {
    id_rol: 3,
    id_modulo: 2,
    nombre: "Modulo de Ventas",
  },
  {
    id_rol: 3,
    id_modulo: 6,
    nombre: "Modulo de Caja",
  },
  {
    id_rol: 4,
    id_modulo: 1,
    nombre: "Modulo de Compra",
  },
  {
    id_rol: 4,
    id_modulo: 2,
    nombre: "Modulo de Venta",
  },
  {
    id_rol: 5,
    id_modulo: 6,
    nombre: "Modulo de Caja",
  },
  {
    id_rol: 5,
    id_modulo: 2,
    nombre: "Modulo de Venta",
  },
];
