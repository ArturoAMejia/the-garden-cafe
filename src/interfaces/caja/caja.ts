import { ITrabajador } from "../administracion";
import { ICatEstado } from "../general";

export interface ICaja {
  id: number;
  id_estado: number;
  cat_estado?: ICatEstado;
  id_trabajador: number;
  trabajador?: ITrabajador;
  tipo_caja: string;
  fecha_registro: Date;
}
