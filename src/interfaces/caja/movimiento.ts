import { ITrabajador } from "../administracion";
import { IComprobante } from "../compra";
import { IMoneda } from "../general";
import { ICaja } from "./caja";

export interface IMovimientoCaja {
  id: number;
  caja?: ICaja;
  id_caja: number;
  comprobante?: IComprobante;
  id_comprobante: number;
  trabajador?: ITrabajador;
  id_trabajador: number;
  moneda?: IMoneda;
  id_moneda: number;
  num_movimiento: number;
  tipo_movimiento: string;
  fecha_movimiento: Date;
  concepto: string;
  monto: number;
}
