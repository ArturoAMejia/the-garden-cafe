import { IPerfil } from "./perfil";


export interface IUsuario {
  id: number;
  id_estado: number;
  id_perfil: number;
  perfil?: IPerfil;
  usuario: string;
  correo: string;
  password: string;
  tipo_usuario:string;
  fecha_registro: Date;
}
