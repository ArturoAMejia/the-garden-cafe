import { ITrabajador } from "../administracion";
import { IComprobante } from "../compra";
import { ICatEstado, IMoneda } from "../general";
import { IPedido } from "../pedido";
import { IProductoCart } from "../producto";
import { ICliente } from "./cliente";
import { ICatFormaPago } from "./forma-pago";

export interface IVenta {
  id: number;
  id_cliente: number;
  cliente?: ICliente;
  id_trabajador: number;
  trabajador?: ITrabajador;
  id_pedido: number;
  pedido?: IPedido;
  id_comprobante: number;
  comprobante?: IComprobante;
  id_moneda: number;
  moneda?: IMoneda;
  id_cat_forma_pago: number;
  cat_forma_pago?: ICatFormaPago;
  id_estado: number;
  cat_estado?: ICatEstado;
  tipo_venta: string;
  fecha_venta: Date;
  subtotal: number;
  descuento: number;
  impuesto: number;
  total: number;
  productos: IProductoCart[];
  detalle_venta: any;
}
