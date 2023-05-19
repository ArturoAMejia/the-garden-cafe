import { IProveedor } from "../compra";
import { ICatEstado } from "../general";
import { IMarca } from "./marca";
import {
  ICategoriaProducto,
  IPrecioProducto,
  ISubCategoriaProducto,
} from "./producto";
import { IUnidadMedida } from "./unidad-medida";

export interface IInventario {
  id: number;
  id_producto: number;
  producto?: any;
  stock_min: number;
  stock_max: number;
  stock_actual: number;
}

export interface IIngrediente {
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

export interface IProductoElaborado {
  id?: number;
  id_estado: number;
  cat_estado?: ICatEstado;
  id_categoria_producto: number;
  categoria_producto?: ICategoriaProducto;
  id_sub_categoria_producto: number;
  sub_categoria_producto?: ISubCategoriaProducto;
  id_zona_preparacion: number;
  zona_preparacion?: any;
  id_unidad_medida: number;
  unidad_medida?: IUnidadMedida;
  cod_producto: string;
  descripcion: string;
  nombre: string;
  precio_producto: number;
  imagen: string;
  detalle_producto_elaborado?: any;
}

export interface IDetalleProductoElaborado {
  id_producto: number;
  id_producto_elaborado: number;
  cantidad: number;
  id_estado: number;
}
// export interface IInventarioABC {
//   id: number;
//   id_estado: number;
//   id_categoria_producto: number;
//   id_sub_categoria_producto: number;
//   id_zona_preparacion: number;
//   id_unidad_medida: number;
//   cod_producto: string;
//   nombre: string;
//   descripcion: string;
//   imagen: string;
//   precio_producto: number;
//   fecha_ingreso: Date;
//   _count: Count;
//   porcentaje: number;
//   porcentaje_acumulado: number;
//   clasificacion?: string;
//   cantidad_total?: number;
//   demanda_total?: number;
// }

export interface IInventarioABC {
  id:                        number;
  id_estado:                 number;
  id_categoria_producto:     number;
  id_sub_categoria_producto: number;
  id_zona_preparacion:       number;
  id_unidad_medida:          number;
  cod_producto:              string;
  nombre:                    string;
  descripcion:               string;
  imagen:                    string;
  precio_producto:           number;
  fecha_ingreso:             Date;
  demanda:                   number;
  porcentaje:                number;
  porcentaje_acumulado:      number;
  clasificacion?: string;

}


export interface Count {
  detalle_pedido: number;
}
