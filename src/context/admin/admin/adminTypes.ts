import { ICompra } from "./../../../interfaces/compra/compra";
import {
  IUser,
  ICategoriaProducto,
  IOrdenCompra,
  ISolicitudCompra,
  IUnidadMedida,
  IMarca,
  IProducto,
  ICliente,
  ITipoOrdenCompra,
  IReservacion,
  IMoneda,
  ICatFormaPago,
  IVenta,
  IPedido,
  ITrabajador,
  IGrupoUsuario,
  IEstadoCivil,
  IInventario,
} from "../../../interfaces";
import { IProductoCart } from "../../../interfaces/producto";

export type AdminReducerType =
  | { type: "[Admin] - Login"; payload: IUser }
  | { type: "[Admin] - Logout" }
  | {
      type: "[Compra] - Actualizar productos en Orden";
      payload: IProductoCart[];
    }
  | { type: "[Compra] - Quitar producto en Orden"; payload: IProductoCart }
  | {
      type: "[Compra] - Actualizar cantidad de producto en Orden";
      payload: IProductoCart;
    }
  | { type: "[Compra] - Solicitud Completada" }
  | {
      type: "[Compra] - Actualiza resumen de la Orden de Compra";
      payload: {
        subtotal: number;
        tax: number;
        total: number;
      };
    }
  | {
      type: "[Compra] - Cargar Orden compra";
      payload: IProductoCart[];
    }
  | {
      type: "[Compra] - Obtener Tipos de Orden de Compra";
      payload: ITipoOrdenCompra[];
    }
  | { type: "[Inventario] - Obtener Inventario"; payload: IInventario[] }
  | { type: "[Ventas] - Obtener Pedidos"; payload: IPedido[] }
  | { type: "[Ventas] - Obtener Monedas"; payload: IMoneda[] }
  | { type: "[Ventas] - Crear Monedas"; payload: IMoneda }
  | { type: "[Ventas] - Actualizar Moneda"; payload: IMoneda }
  | { type: "[Ventas] - Desactivar Moneda"; payload: IMoneda }
  | { type: "[Ventas] - Obtener Formas Pago"; payload: ICatFormaPago[] }
  | { type: "[Ventas] - Crear Formas Pago"; payload: ICatFormaPago }
  | { type: "[Ventas] - Actualizar Formas Pago"; payload: ICatFormaPago }
  | { type: "[Ventas] - Desactivar Formas Pago"; payload: ICatFormaPago }
  | { type: "[Seguridad] - Obtener Trabajadores"; payload: ITrabajador[] }
  | { type: "[Seguridad] - Obtener Estados Civil"; payload: IEstadoCivil[] }
  | { type: "[Seguridad] - Obtener Grupos"; payload: IGrupoUsuario[] };
