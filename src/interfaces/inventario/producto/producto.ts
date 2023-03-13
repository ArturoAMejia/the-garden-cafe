import { IUnidadMedida } from "./../unidad-medida";
import { ICategoriaProducto } from "./categoria-producto";
import { IPrecioProducto } from "./precio-producto";

export interface IProducto {
  id: number;
  id_estado: number;
  id_marca: number;
  id_categoria_producto: number;
  id_unidad_medida: number;
  cod_producto: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  fecha_ingreso: Date;
  categoria_producto?: ICategoriaProducto;
  precio_producto?: IPrecioProducto[];
  unidad_medida?: IUnidadMedida;
}
