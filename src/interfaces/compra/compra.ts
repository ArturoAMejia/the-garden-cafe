import { ICatEstado } from "./../general/estado";
import { IComprobante } from "./comprobante";
import { IOrdenCompra } from "./orden";
import { ITrabajador } from "../administracion";
import { IProveedor } from "./proveedor";

export interface ICompra {
  id: number;
  id_proveedor: number;
  proveedor?: IProveedor;
  id_trabajador: number;
  trabajador?: ITrabajador;
  id_orden_compra: number;
  orden_compra?: IOrdenCompra;
  id_comprobante: number;
  comprobante?: IComprobante;
  id_estado: number;
  cat_estado?: ICatEstado;
  fecha_compra: Date;
  descripcion: string;
  descuento: number;
  subtotal: number;
  impuesto: number;
  total: number;
  detalle_compra?: any;
}
