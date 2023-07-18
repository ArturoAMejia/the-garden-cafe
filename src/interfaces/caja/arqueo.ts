import { ITrabajador } from "../administracion";
import { ICaja } from "./caja";

export interface IArqueoCaja {
  id: number;
  id_caja: number;
  caja?: ICaja;
  id_trabajador: number;
  trabajador?: ITrabajador;
  fecha_arqueo: Date;
  total: number;
  detalle_billete_arqueo?: any;
  detalle_monedas_arqueo?: any;
}
