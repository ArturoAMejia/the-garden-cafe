import { createContext } from "react";
import {
  IReservacion,
  IProducto,
  ITipoOrdenCompra,
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
  productos: IProductoCart[];
  inventarios: IInventario[];
  monedas: IMoneda[];
  formas_pago: ICatFormaPago[];
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
  añadirProductoOrden: (producto: IProductoCart) => void;
  actualizarCantidadProducto: (producto: IProductoCart) => void;
  quitarProducto: (producto: IProductoCart) => void;
  crearPedido: (pedido: IPedido) => Promise<{
    hasError: boolean;
    message: string;
  }>;
  anularPedido: (id: number) => Promise<void>;
  solicitudCompleta: () => void;
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
