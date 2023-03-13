import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CurrencyDollarIcon,
  CreditCardIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

export const navigation = [
  { id: 1, name: "Inicio", icon: HomeIcon, current: true, href: "/admin" },
  {
    id: 2,
    name: "Gestión de Inventario",
    icon: UsersIcon,
    current: false,
    children: [
      { name: "Categoria", href: "/admin/inventario/categoria" },
      { name: "Unidad de Medida", href: "/admin/inventario/unidad-medida" },
      { name: "Marca", href: "/admin/inventario/marca" },
      { name: "Producto", href: "/admin/inventario/productos" },
    ],
  },
  {
    id: 3,
    name: "Gestión de Pedidos",
    icon: FolderIcon,
    current: false,
    children: [
      { name: "Nuevo Pedido", href: "/admin/pedidos/nuevo-pedido" },
      { name: "Pedidos Realizados", href: "/admin/pedidos/pedidos-realizados" },
      { name: "Pedidos Anulados", href: "/admin/pedidos/pedidos-anulados" },
    ],
  },
  {
    id: 4,
    name: "Gestión de Ventas",
    icon: CurrencyDollarIcon,
    current: false,
    children: [
      { name: "Clientes", href: "/admin/venta/clientes" },
      { name: "Reservaciones", href: "/admin/venta/reservaciones" },
      { name: "Nueva Venta", href: "/admin/venta/nueva-venta" },
      { name: "Ventas Realizadas", href: "/admin/venta" },
    ],
  },
  {
    id: 5,
    name: "Gestión de Compra",
    icon: CreditCardIcon,
    current: false,
    children: [
      { name: "Proveedor", href: "/admin/compra/proveedor" },
      {
        name: "Nueva Solicitud de Compra",
        href: "/admin/compra/solicitud-compra",
      },
      { name: "Nueva Orden de Compra", href: "/admin/compra/nueva-orden" },
      { name: "Ordenes de Compra", href: "/admin/compra/ordenes" },
      { name: "Nueva Compra", href: "/admin/compra/nueva-compra" },
      { name: "Compras Realizadas", href: "/admin/compra/compras-realizadas" },
    ],
  },
  {
    id: 6,
    name: "Gestión de Caja",
    icon: BanknotesIcon,
    current: false,
    children: [
      { name: "Apertura", href: "/admin/caja/apertura" },
      { name: "Arqueo", href: "#" },
      { name: "Cierre", href: "/admin/caja/cierre" },
      { name: "Déposito del día", href: "#" },
      { name: "Tesorería", href: "#" },
    ],
  },
  {
    id: 7,
    name: "Gestión de Usuarios",
    icon: UsersIcon,
    current: false,
    children: [
      { name: "Trabajadores", href: "/admin/user/trabajadores" },
      { name: "Grupo", href: "/admin/user/grupos" },
    ],
  },
];

export const navMesero = [
  {
    id: 3,
    name: "Gestión de Pedidos",
    icon: FolderIcon,
    current: false,
    children: [
      { name: "Nuevo Pedido", href: "/admin/pedidos/nuevo-pedido" },
      { name: "Pedidos Realizados", href: "/admin/pedidos/pedidos-realizados" },
      { name: "Pedidos Anulados", href: "/admin/pedidos/pedidos-anulados" },
    ],
  },
  {
    id: 4,

    name: "Gestión de Ventas",
    icon: CurrencyDollarIcon,
    current: false,
    children: [
      { name: "Clientes", href: "/admin/venta/cliente" },
      { name: "Ordenes", href: "/admin/venta/ordenes" },
      { name: "Ventas al contado", href: "/admin/ventas-al-contado" },
      { name: "Ventas a domicilio", href: "/admin/ventas-a-domicilio" },
      { name: "Ventas al crédito", href: "/admin/ventas-al-credito" },
      { name: "Reclamos", href: "/reclamos" },
      { name: "Clientes potenciales", href: "/admin/clientes-potenciales" },
      { name: "Tesoreria", href: "/admin/tesoreria" },
    ],
  },
];

export const navCajero = [
  {
    id: 4,

    name: "Gestión de Ventas",
    icon: CurrencyDollarIcon,
    current: false,
    children: [
      { name: "Clientes", href: "/admin/venta/cliente" },
      { name: "Ordenes", href: "/admin/venta/ordenes" },
      { name: "Ventas al contado", href: "/admin/ventas-al-contado" },
      { name: "Ventas a domicilio", href: "/admin/ventas-a-domicilio" },
      { name: "Ventas al crédito", href: "/admin/ventas-al-credito" },
      { name: "Reclamos", href: "/reclamos" },
      { name: "Clientes potenciales", href: "/admin/clientes-potenciales" },
      { name: "Tesoreria", href: "/admin/tesoreria" },
    ],
  },
  {
    id: 6,
    name: "Gestión de Caja",
    icon: BanknotesIcon,
    current: false,
    children: [
      { name: "Apertura", href: "#" },
      { name: "Arqueo", href: "#" },
      { name: "Cierre", href: "#" },
      { name: "Déposito del día", href: "#" },
      { name: "Tesorería", href: "#" },
    ],
  },
];
export const navCocinero = [
  {
    id: 3,
    name: "Gestión de Pedidos",
    icon: FolderIcon,
    current: false,
    children: [
      { name: "Nuevo Pedido", href: "/admin/pedidos/nuevo-pedido" },
      { name: "Pedidos Realizados", href: "/admin/pedidos/pedidos-realizados" },
      { name: "Pedidos Anulados", href: "/admin/pedidos/pedidos-anulados" },
    ],
  },
];

export const navGerente = [
  {
    id: 2,
    name: "Gestión de Inventario",
    icon: UsersIcon,
    current: false,
    children: [
      { name: "Categoria", href: "/admin/inventario/categoria" },
      { name: "Presentación", href: "/admin/inventario/presentacion" },
      { name: "Marca", href: "/admin/inventario/productos-para-vender" },
      { name: "Producto", href: "/admin/inventario/insumos" },
      { name: "Materia Prima", href: "/admin/inventario/materia-prima" },
    ],
  },
  {
    id: 3,
    name: "Gestión de Pedidos",
    icon: FolderIcon,
    current: false,
    children: [
      { name: "Nuevo Pedido", href: "/admin/pedidos/nuevo-pedido" },
      { name: "Pedidos Realizados", href: "/admin/pedidos/pedidos-realizados" },
      { name: "Pedidos Anulados", href: "/admin/pedidos/pedidos-anulados" },
    ],
  },
  {
    id: 4,

    name: "Gestión de Ventas",
    icon: CurrencyDollarIcon,
    current: false,
    children: [
      { name: "Clientes", href: "/admin/venta/cliente" },
      { name: "Ordenes", href: "/admin/venta/ordenes" },
      { name: "Ventas al contado", href: "/admin/ventas-al-contado" },
      { name: "Ventas a domicilio", href: "/admin/ventas-a-domicilio" },
      { name: "Ventas al crédito", href: "/admin/ventas-al-credito" },
      { name: "Reclamos", href: "/reclamos" },
      { name: "Clientes potenciales", href: "/admin/clientes-potenciales" },
      { name: "Tesoreria", href: "/admin/tesoreria" },
    ],
  },
  {
    id: 5,
    name: "Gestión de Compra",
    icon: CreditCardIcon,
    current: false,
    children: [
      { name: "Proveedor", href: "/admin/compra/proveedor" },
      { name: "Nueva Orden de Compra", href: "/admin/compra/orden-compra" },
      { name: "Nueva compra", href: "/admin/compra/nueva-compra" },
      { name: "Compras Realizadas", href: "/admin/compra/compras-realizadas" },
      { name: "Compra al crédito y consignación", href: "#" },
    ],
  },
];

export const vistaRol = (grupo: string) => {
  switch (grupo) {
    case "Mesero":
      return navMesero;
    case "Cajero":
      return navCajero;
    case "Cocinero":
      return navCocinero;
    case "Gerente":
      return navGerente;
    case "Administrador":
      return navigation;
    default:
      return navigation;
  }
};
