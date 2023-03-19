import { ICatEstado } from "@/interfaces/general";
import { ICategoriaProducto } from "./categoria-producto";


export interface ISubCategoriaProducto {
  id:number;
  id_categoria_producto:number;
  categoria_producto?: ICategoriaProducto
  id_estado:number;
  cat_estado?: ICatEstado
  nombre:string;
}