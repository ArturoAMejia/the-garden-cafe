import { IProducto } from "./producto";

export interface ITransaccion {
  id: number;
  id_producto: number;
  producto?: IProducto;
  fecha_movimiento: Date;
  cod_documento: string;
  cantidad: number;
  tipo_movimiento: string;
}
