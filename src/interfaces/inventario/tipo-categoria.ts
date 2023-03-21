import { ICatEstado } from "../general";


export interface ITipoCategoria {
  id: number;
  nombre: string;
  id_estado: number;
  cat_estado?: ICatEstado;
}