import { createContext } from "react";
import {
  IUser,
  IReservacion,
  IProducto,
  ICategoriaProducto,
  IProveedor,
  IMenu,
  ITipoOrdenCompra,
  IUnidadMedida,
  IMarca,
  ICliente,
  IPedido,
  IMoneda,
  ICatFormaPago,
  IVenta,
  ITrabajador,
  IEstadoCivil,
  IGrupoUsuario,
  IInventario,
} from "../../../interfaces";

import { IProductoCart } from "../../../interfaces/producto";

interface ContextProps {
  categorias: ICategoriaProducto[];
  productos: IProductoCart[];
  inventarios: IInventario[];

  unidades_medidas: IUnidadMedida[];
  clientes: ICliente[];
  reservaciones: IReservacion[];

  marcas: IMarca[];
  monedas: IMoneda[];
  formas_pago: ICatFormaPago[];
  ventas: IVenta[];
  pedidos: IPedido[];

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
  añadirProductoOrden: (producto: IProductoCart) => void;
  actualizarCantidadProducto: (producto: IProductoCart) => void;
  quitarProducto: (producto: IProductoCart) => void;
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
  solicitudCompleta: () => void;
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
  cargarPedido: (productos: IProductoCart[]) => void;

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
