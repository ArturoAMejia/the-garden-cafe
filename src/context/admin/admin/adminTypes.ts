import { ICompra } from "./../../../interfaces/compra/compra";
import {
  IUser,
  ICategoriaProducto,
  IProveedor,
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
  | { type: "[Admin] - Obtener Categorias"; payload: ICategoriaProducto[] }
  | { type: "[Admin] - Crear Categoria"; payload: ICategoriaProducto }
  | { type: "[Admin] - Obtener Proveedores"; payload: IProveedor[] }
  | { type: "[Compra] - Crear Orden Compra"; payload: IOrdenCompra }
  | { type: "[Compra] - Obtener Ordenes de Compra"; payload: IOrdenCompra[] }
  | {
      type: "[Compra] - Actualizar productos en Orden";
      payload: IProductoCart[];
    }
  | { type: "[Compra] - Quitar producto en Orden"; payload: IProductoCart }
  | {
      type: "[Compra] - Actualizar cantidad de producto en Orden";
      payload: IProductoCart;
    }
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
  | { type: "[Compra] - Solicitud Completada" }
  | { type: "[Compra] - Obtener Compras"; payload: ICompra[] }
  | {
      type: "[Compra] - Obtener Solicitudes Compra";
      payload: ISolicitudCompra[];
    }
  | {
      type: "[Compra] - Obtener Tipos de Orden de Compra";
      payload: ITipoOrdenCompra[];
    }
  | { type: "[Compra] - Orden Aceptada" }
  | { type: "[Inventario] - Obtener Unidad Medidas"; payload: IUnidadMedida[] }
  | { type: "[Inventario] - Obtener Inventario"; payload: IInventario[] }
  | { type: "[Inventario] - Crear Unidad Medidas"; payload: IUnidadMedida }
  | { type: "[Inventario] - Obtener Marca"; payload: IMarca[] }
  | { type: "[Inventario] - Crear Marca"; payload: IMarca }
  | { type: "[Inventario] - Obtener Productos"; payload: IProducto[] }
  | { type: "[Inventario] - Crear Producto"; payload: IProducto }
  | { type: "[Ventas] - Obtener Ventas"; payload: IVenta[] }
  | { type: "[Ventas] - Obtener Pedidos"; payload: IPedido[] }
  | { type: "[Ventas] - Obtener Clientes"; payload: ICliente[] }
  | { type: "[Ventas] - Crear Cliente"; payload: ICliente }
  | { type: "[Ventas] - Obtener Reservaciones"; payload: IReservacion[] }
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
