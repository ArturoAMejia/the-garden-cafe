

import { ICatEstado } from "../general";


export interface ITipoProducto {
  id: number;
  nombre: string;
  id_estado: number;
  cat_estado: ICatEstado;
}