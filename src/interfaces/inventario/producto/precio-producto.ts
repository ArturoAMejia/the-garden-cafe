import { ICatEstado } from "@/interfaces/general";
import { IProducto } from "./producto";

export interface IPrecioProducto {
  id: number;
  id_producto: number;
  producto?: IProducto;
  id_estado: number;
  cat_estado?: ICatEstado;
  gasto: number;
  precio_compra: number;
  precio_venta: number;
  margen_ganancia: number;
  fecha_precio: Date;
}
