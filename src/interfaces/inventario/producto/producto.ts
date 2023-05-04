import { ICatEstado } from "@/interfaces/general";
import { IMarca } from "../marca";
import { IUnidadMedida } from "./../unidad-medida";
import { ICategoriaProducto } from "./categoria-producto";
import { IPrecioProducto } from "./precio-producto";
import { ISubCategoriaProducto } from "./sub-categoria-producto";

export interface IProducto {
  id: number;
  id_estado: number;
  cat_estado?: ICatEstado;
  id_marca: number;
  marca?: IMarca;
  id_categoria_producto: number;
  id_sub_categoria_producto: number;
  sub_categoria_producto?: ISubCategoriaProducto;
  id_tipo_producto: number;
  id_unidad_medida: number;
  cod_producto: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  fecha_ingreso: Date;
  categoria_producto: ICategoriaProducto | undefined;
  precio_producto?: IPrecioProducto;
  unidad_medida: IUnidadMedida | undefined;
  margen_ganancia?: number;
  gasto?: number;
  precio_compra?: number;
}
