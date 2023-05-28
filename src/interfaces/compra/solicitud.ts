import { IComprobante } from "./comprobante";
import { ITrabajador } from "./../administracion/trabajador";
import { ICatEstado } from "./../general/estado";
import { ITipoOrdenCompra } from "./tipo-orden-compra";
export interface ISolicitudCompra {
  id: number;
  id_estado: number;
  cat_estado?: ICatEstado;
  id_trabajador: number;
  trabajador?: ITrabajador;
  id_comprobante: number;
  id_tipo_orden_compra: number;
  tipo_orden_compra?: ITipoOrdenCompra;
  descuento: number;
  impuesto: number;
  subtotal: number;
  total: number;
  comprobante?: IComprobante;
  fecha_solicitud: Date;
  fecha_vigencia: Date;
  cantidad: number;
  motivo: string;
  observacion: string;
  detalle_solicitud_compra?: any;
}
