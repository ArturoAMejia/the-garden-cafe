import { IMarca } from "./marca";
import { ICategoriaProducto, IPrecioProducto } from "./producto";
import { IUnidadMedida } from "./unidad-medida";

export interface IMenu {
  id: number;
  nombre: string;
  imagen: string;
  categoria_producto: ICategoriaProducto;
  descripcion: string;
  unidad_medida: IUnidadMedida;
  precio_producto: IPrecioProducto[];
  marca: IMarca;
  cantidad?: number;
  precio?: number;
}
