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
  id_mesa?: number;
  detalle_reservacion?: any;
  hora_reserva?: any;
  adultos?: number;
  menores?: number;
}

export interface IMesa {
  id: number;
  nombre: string;
  ubicacion: string;
  cat_estado?: ICatEstado;
  id_estado: number;
  capacidad: number;
}
