import { ICatEstado } from "../general";
import { ITrabajador } from "./trabajador";

export interface IModulo {
  id: number;
  trabajador?: ITrabajador;
  id_trabajador: number;
  cat_estado?: ICatEstado;
  id_estado: number;
  nombre: string;
  descripcion: string;
  icono: string;
  fecha_registro: Date;
  sub_modulos: ISubModulo[];
}

export interface ISubModulo {
  id: string;
  modulo?: IModulo;
  id_modulo: number;
  nombre: string;
  url: string;
}
