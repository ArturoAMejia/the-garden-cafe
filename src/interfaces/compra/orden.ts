import { ITrabajador } from "./../administracion/trabajador";
import { ISolicitudCompra } from "./solicitud";
import { ICatEstado } from "./../general/estado";
import { IComprobante } from "./comprobante";
import { ITipoOrdenCompra } from "./tipo-orden-compra";
import { IProveedor } from "./proveedor";

export interface IOrdenCompra {
  id: number;
  id_proveedor: number;
  proveedor?: IProveedor;
  id_tipo_orden_compra: number;
  tipo_orden_compra?: ITipoOrdenCompra;
  id_comprobante: number;
  comprobante?: IComprobante;
  id_estado: number;
  cat_estado?: ICatEstado;
  id_solicitud_compra: number;
  solicitud_compra?: ISolicitudCompra;
  autorizado_por: number;
  trabajador?: ITrabajador;
  num_orden?: number;
  subtotal: number;
  descuento: number;
  impuesto: number;
  total: number;
  fecha_orden: Date;
  detalle_orden_compra?: any;
  motivo?: string;
}
