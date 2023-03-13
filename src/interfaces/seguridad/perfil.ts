import { IGrupoUsuario } from "./grupo-usuario";
export interface IPerfil {
  id: number;
  id_grupo_usuario: number;
  grupo_usuario?: IGrupoUsuario;
  nombre: string;
  descripcion: string;
}
