import { createContext } from "react";
import {
  IUser,
  IReservacion,
  IProducto,
  ICategoriaProducto,
  IProveedor,
  IMenu,
  ISolicitudCompra,
  ITipoOrdenCompra,
  IOrdenCompra,
  IUnidadMedida,
  IMarca,
  ICliente,
  IPedido,
  IMoneda,
  ICatFormaPago,
  IVenta,
  ICompra,
  ITrabajador,
  IEstadoCivil,
  IGrupoUsuario,
  IInventario,
} from "../../../interfaces";

import { IProductoCart } from "../../../interfaces/producto";

interface ContextProps {
  categorias: ICategoriaProducto[];
  proveedores: IProveedor[];
  productos: IProductoCart[];
  inventarios: IInventario[];
  ordenes_compra: IOrdenCompra[];
  unidades_medidas: IUnidadMedida[];
  clientes: ICliente[];
  reservaciones: IReservacion[];
  solicitudes_compra: ISolicitudCompra[];
  marcas: IMarca[];
  monedas: IMoneda[];
  formas_pago: ICatFormaPago[];
  ventas: IVenta[];
  pedidos: IPedido[];
  compras: ICompra[];
  trabajadores: ITrabajador[];
  productos_inventario: IProducto[];
  estado_civil: IEstadoCivil[];
  grupos_usuarios: IGrupoUsuario[];
  totalProductos: number;
  subtotal: number;
  total: number;
  tax: number;
  tipos_orden_compra: ITipoOrdenCompra[];
  obtenerInventarios: () => Promise<void>;
  crearInventario: (
    id_producto: number,
    stock_min: number,
    stock_max: number,
    stock_actual: number
  ) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  crearCategoria: (categoria: ICategoriaProducto) => Promise<{
    hasError: boolean;
    message?: string;
  }>;
  actualizarCategorias: (categoria: ICategoriaProducto) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  desactivarCategoria: (categoria: ICategoriaProducto) => Promise<void>;
  crearProveedor: (
    cedula_ruc: string,
    nombre: string,
    correo: string,
    apellido_razon_social: string,
    fecha_nacimiento: Date,
    telefono: string,
    celular: string,
    direccion_domicilio: string,
    tipo_proveedor: string,
    genero: string,
    sector_comercial: string,
    nacionalidad: string
  ) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  actualizarProveedor: (
    id: number,
    cedula_ruc: string,
    nombre: string,
    correo: string,
    apellido_razon_social: string,
    fecha_nacimiento_constitucion: Date,
    telefono: string,
    celular: string,
    direccion_domicilio: string,
    tipo_persona: string,
    genero: string,
    sector_comercial: string,
    nacionalidad: string
  ) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  desactivarProveedor: (proveedor: IProveedor) => Promise<void>;
  añadirProductoOrden: (producto: IProductoCart) => void;
  actualizarCantidadProducto: (producto: IProductoCart) => void;
  quitarProducto: (producto: IProductoCart) => void;
  crearSolicitdCompra: (
    fecha_vigencia: Date,
    motivo: string,
    id_tipo_orden_compra: number,
    productos: IProductoCart[],
    id_trabajador: number,
    descuento: number,
    impuesto: number,
    subtotal: number,
    total: number
  ) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  solicitudCompleta: () => void;
  aceptarSolicitudCompra: (
    orden_compra: IOrdenCompra,
    productos: any
  ) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  rechazarSolicitudCompra: (
    id: number,
    id_estado: number
  ) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  anularOrdenCompra: (id: number) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  crearUnidadMedida: (unidad_medida: IUnidadMedida) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  actualizarUnidadMedida: (unidad_medida: IUnidadMedida) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  desactivarUnidadMedida: (id: number) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  crearMarca: (unidad_medida: IMarca) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  actualizarMarca: (unidad_medida: IMarca) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  desactivarMarca: (id: number) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  crearProducto: (producto: IProducto) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  crearCliente: (cliente: ICliente) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  actualizarCliente: (cliente: ICliente) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  desactivarCliente: (id: number) => Promise<void>;
  crearPedido: (pedido: IPedido) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  anularPedido: (id: number) => Promise<void>;
  obtenerReservaciones: () => Promise<void>;
  crearReservacion: (reservacion: IReservacion) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  actualizarReservacion: (reservacion: IReservacion) => Promise<{
    hasError: boolean;
    message: string;
  }>;

  anularReservacion: (id: number) => Promise<void>;
  crearMoneda: (moneda: IMoneda) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  actualizarMoneda: (moneda: IMoneda) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  desactivarMoneda: (id: number) => Promise<void>;
  crearFormaPago: (forma_pago: ICatFormaPago) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  actualizarFormaPago: (forma_pago: ICatFormaPago) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  desactivarFormaPago: (id: number) => Promise<void>;
  realizarVenta: (
    id_trabajador: number,
    id_cliente: number,
    id_pedido: number,
    id_cat_forma_pago: number,
    id_moneda: number,
    subtotal: number,
    descuento: number,
    tipo_venta: string,
    descripcion: string,
    productos: []
  ) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  anularVenta: (id: number) => Promise<void>;
  realizarCompra: (
    id_proveedor: number,
    id_trabajador: number,
    id_orden_compra: number,
    productos: [],
    descripcion: string,
    subtotal: number
  ) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  cargarPedido: (productos: IProductoCart[]) => void;
  anularCompra: (id: number) => Promise<void>;
  registrarTrabajador: (
    cedula_ruc: string,
    nombre: string,
    apellido_razon_social: string,
    fecha_nacimiento_constitucion: Date,
    telefono: number,
    direccion_domicilio: string,
    correo: string,
    id_cargo: string,
    codigo_inss: string,
    genero: string,
    id_estado_civil: string
  ) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  actualizarTrabajador: (
    id: number,
    cedula_ruc: string,
    nombre: string,
    apellido_razon_social: string,
    fecha_nacimiento_constitucion: Date,
    telefono: number,
    direccion_domicilio: string,
    correo: string,
    id_cargo: string,
    codigo_inss: string,
    genero: string,
    id_estado_civil: string
  ) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  desactivarTrabajador: (id: number) => Promise<void>;
  crearGrupo: (
    nombre: string,
    descripcion: string
  ) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  actualizarGrupo: (
    id: number,
    nombre: string,
    descripcion: string
  ) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  desactivarGrupo: (id: number) => Promise<void>;
}

export const AdminContext = createContext<ContextProps>({} as ContextProps);
