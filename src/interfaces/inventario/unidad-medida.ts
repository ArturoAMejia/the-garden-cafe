import { ICatEstado } from "../general";

export interface IUnidadMedida {
  id: number;
  id_estado: number;
  cat_estado?: ICatEstado;
  nombre: string;
  siglas: string;
}
