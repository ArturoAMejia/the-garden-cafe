import { ICatEstado } from "./../general/estado";
import { IEstadoCivil } from "./estado-civil";
import { IPersona } from "./../general/persona";
import { IGrupoUsuario } from "../seguridad";
export interface ITrabajador {
  id: number;
  id_persona: number;
  persona?: IPersona;
  id_estado_civil: number;
  estado_civil?: IEstadoCivil;
  id_estado: number;
  cat_estado?: ICatEstado;
  codigo_inss: string;
  fecha_ingreso: Date;
  grupo?: IGrupoUsuario;
}
