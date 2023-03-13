import { ICatEstado } from "./../";

export interface IMarca {
  id: number;
  nombre: string;
  id_estado: number;
  cat_estado?: ICatEstado;
  siglas: string;
}
