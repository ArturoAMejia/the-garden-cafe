import { ITrabajador } from "../administracion";
import { ICatEstado } from "../general";
import { ICaja } from "./caja";

export interface ICierreCaja {
  id: number;
  id_caja: number;
  caja?: ICaja;
  id_estado: number;
  cat_estado?: ICatEstado;
  trabajador?: ITrabajador;
  id_trabajador: number;
  fecha_cierre: Date;
  total: number;
}
