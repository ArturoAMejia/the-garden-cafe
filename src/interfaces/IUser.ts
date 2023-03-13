import { ICatEstado } from "./general";
import { IPerfil } from "./seguridad";

export interface IUser {
  id: number;
  usuario: string;
  password: string;
  correo: string;
  fecha_registro: Date;
  id_estado: number;
  cat_estado?: ICatEstado;
  perfil?: IPerfil;
  id_perfil: number;
  tipo_usuario: string;
  id_persona: number;
}
