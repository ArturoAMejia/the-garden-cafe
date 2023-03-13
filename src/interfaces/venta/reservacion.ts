import { ICatEstado } from "../general";
import { ICliente } from "./cliente";
export interface IReservacion {
  id: number;
  id_cliente: number;
  cliente?: ICliente;
  id_estado: number;
  total_personas?: number;
  cat_estado?: ICatEstado;
  tipo_reservacion: string;
  observaciones?: string;
  fecha_reservacion: Date;
  horas_reservadas: number;
  fecha_registro: Date;
  detalle_reservacion?: any;
}
