import { ICatEstado } from './../../';


export interface ICategoriaProducto {
  id: number;
  id_estado: number;
  cat_estado?: ICatEstado
  nombre: string;
  descripcion: string;
}
