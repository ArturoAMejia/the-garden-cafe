import { ICatEstado } from "../general";

export interface IGrupoUsuario {
  id: number;
  id_estado: number;
  cat_estado?: ICatEstado
  nombre: string;
  descripcion: string;
}
