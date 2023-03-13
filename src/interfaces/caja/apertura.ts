import { ICatEstado, IMoneda, ITipoCambio } from "../general";
import { ITrabajador } from "./../administracion/trabajador";
import { ICaja } from "./caja";
export interface IAperturaCaja {
  id: number;
  id_caja: number;
  caja?: ICaja;
  id_trabajador: number;
  trabajador?: ITrabajador;
  id_estado: number;
  cat_estado?: ICatEstado;
  id_moneda: number;
  moneda?: IMoneda;
  fecha_apertura: Date;
  detalle_apertura_caja: IDetalleApertura;
}

export interface IDetalleApertura {
  id: number;
  id_apertura_caja: number;
  monto_cordobas: number;
  monto_dolares: number;
}
